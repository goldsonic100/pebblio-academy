/* ============================================================
   Pebblio account system
   Runs entirely in the browser using localStorage — there is no
   backend/database yet, so accounts only exist on the device/
   browser that created them. Good enough for a demo, not for a
   real multi-device product.
   ============================================================ */

const USERS_KEY = 'pebblio_users';
const SESSION_KEY = 'pebblio_current_user';

/* ---------- low level storage ---------- */

function getUsers(){
  try{
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  }catch(e){
    return [];
  }
}

function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser(){
  const uid = localStorage.getItem(SESSION_KEY);
  if(!uid) return null;
  return getUsers().find(u => u.userId === uid) || null;
}

function setCurrentUser(userId){
  localStorage.setItem(SESSION_KEY, userId);
}

function logout(){
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

function dashboardUrlFor(role){
  if(role === 'teacher') return 'teacher.html';
  if(role === 'parent') return 'parent.html';
  if(role === 'admin') return 'admin.html';
  return 'dashboard.html';
}

/* The site owner's account is always an admin, even if they originally
   signed up as a student/teacher/parent, or the rule is added after
   they already had an account. */
const OWNER_ADMIN_EMAIL = 'goldsonic100@gmail.com';

function ensureOwnerIsAdmin(){
  const users = getUsers();
  const owner = users.find(u => u.email.trim().toLowerCase() === OWNER_ADMIN_EMAIL);
  if(owner && owner.role !== 'admin'){
    owner.role = 'admin';
    saveUsers(users);
  }
}
document.addEventListener('DOMContentLoaded', ensureOwnerIsAdmin);

/* Updates a "last seen" timestamp for whoever's logged in on THIS
   browser. This only ever reflects accounts used on this device —
   it can't see anyone else's real activity across the internet. */
function touchLastSeen(user){
  user.lastSeenAt = new Date().toISOString();
  saveUser(user);
}

function saveUser(updatedUser, previousUserId = null){
  const matchId = previousUserId || updatedUser.userId;
  const users = getUsers().map(u => u.userId === matchId ? updatedUser : u);
  saveUsers(users);
}

/* ---------- password hashing (real SHA-256, done client-side) ----------
   This is a real cryptographic hash using the browser's built-in
   Web Crypto API — no fake string. That said, since it's stored in
   localStorage (readable via dev tools), this is still only a demo
   of the concept, not production-grade auth security. */

async function sha256Hex(message){
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ---------- user ID rules ----------
   lowercase letters, numbers, underscores only. No spaces, no
   punctuation, no emoji "shenanigans". */

function isValidUserIdFormat(id){
  return /^[a-z0-9_]+$/.test(id);
}

function isUserIdTaken(id, exceptUserId = null){
  return getUsers().some(u => u.userId === id && u.userId !== exceptUserId);
}

function isEmailTaken(email){
  const normalized = email.trim().toLowerCase();
  return getUsers().some(u => u.email.trim().toLowerCase() === normalized);
}

function slugifyUserId(base){
  let slug = base.toLowerCase().trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  if(!slug) slug = 'user';
  let candidate = slug;
  let n = 1;
  while(isUserIdTaken(candidate)){
    n++;
    candidate = `${slug}_${n}`;
  }
  return candidate;
}

/* ---------- account creation ---------- */

async function createAccount({ username, email, password, role, firstName, lastName, schoolOrg }){
  if(isEmailTaken(email)){
    throw new Error('EMAIL_TAKEN');
  }

  const userId = slugifyUserId(username);
  const passwordHash = await sha256Hex(password);
  const today = new Date().toISOString();
  const effectiveRole = email.trim().toLowerCase() === OWNER_ADMIN_EMAIL ? 'admin' : role;

  const user = {
    userId,
    username,
    email,
    passwordHash,
    role: effectiveRole,
    createdAt: today,
    verified: true,
    profilePicture: '',
    status: 'Active',

    firstName: firstName || '',
    lastName: lastName || '',
    schoolOrg: schoolOrg || '',
    birthday: '',

    xp: 0,
    level: 1,
    coins: 0,
    streak: 0,
    lastActiveDate: '',
    totalLearningMinutes: 0,
    recentActivity: []
  };

  const users = getUsers();
  users.push(user);
  saveUsers(users);
  setCurrentUser(userId);
  return user;
}

/* ---------- gamification ---------- */

function levelFromXP(xp){
  return Math.floor(xp / 100) + 1;
}

function xpIntoLevel(xp){
  return xp % 100;
}

function todayString(){
  return new Date().toISOString().slice(0, 10);
}

function yesterdayString(){
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function completeActivity(user, { minutes = 15, xpGain = 25, coinGain = 10 } = {}){
  user.xp += xpGain;
  user.level = levelFromXP(user.xp);
  user.coins += coinGain;
  user.totalLearningMinutes += minutes;

  const today = todayString();
  if(user.lastActiveDate === today){
    // Daily streak was already advanced today.
  } else if(user.lastActiveDate === yesterdayString()){
    user.streak += 1;
  } else {
    user.streak = 1;
  }
  user.lastActiveDate = today;

  saveUser(user);
  return user;
}

/* ---------- admin actions ---------- */

function deleteUserAccount(userId){
  const users = getUsers().filter(u => u.userId !== userId);
  saveUsers(users);

  const classes = readList(CLASSES_KEY);
  classes.forEach(c => { c.studentIds = c.studentIds.filter(id => id !== userId); });
  writeList(CLASSES_KEY, classes);
}

async function adminResetPassword(userId, newPassword){
  const users = getUsers();
  const target = users.find(u => u.userId === userId);
  if(!target) return false;
  target.passwordHash = await sha256Hex(newPassword);
  saveUsers(users);
  return true;
}

function setUserRole(userId, newRole){
  const users = getUsers();
  const target = users.find(u => u.userId === userId);
  if(!target) return;
  target.role = newRole;
  saveUsers(users);
}

/* ---------- nav bar swap ---------- */

function wireAuthNav(){
  const user = getCurrentUser();
  if(!user) return;

  document.querySelectorAll('[data-auth-actions]').forEach(container => {
    container.innerHTML = `
      <a href="${dashboardUrlFor(user.role)}" class="btn btn--ghost">Dashboard</a>
      <button class="btn btn--solid" id="navLogoutBtn">Logout</button>
    `;
    const btn = container.querySelector('#navLogoutBtn');
    if(btn) btn.addEventListener('click', logout);
  });
}
document.addEventListener('DOMContentLoaded', wireAuthNav);

/* Load the trainer navigation/dashboard integration on every page that
   includes auth.js. It runs after normal auth navigation is wired. */
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'trainer-site-integration.js';
  script.async = true;
  document.body.appendChild(script);
}, { once: true });
