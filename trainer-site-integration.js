(() => {
  'use strict';

  function addTrainerNavigation() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    let nav = topbar.querySelector('nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.setAttribute('aria-label', 'Main navigation');
      nav.style.cssText = 'display:flex;align-items:center;gap:14px;flex-wrap:wrap';
      const actions = topbar.querySelector('.topbar__right, [data-auth-actions], .account-actions');
      topbar.insertBefore(nav, actions || null);
    }

    const links = [
      ['trainers-home.html', 'Trainer library'],
      ['trainer-dashboard.html', 'My practice']
    ];
    links.forEach(([href, label]) => {
      if (nav.querySelector(`a[href="${href}"]`)) return;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.style.cssText = 'font-size:.88rem;font-weight:600;color:#4d5564;text-decoration:none;padding:6px 2px';
      if (location.pathname.endsWith(href)) {
        link.setAttribute('aria-current', 'page');
        link.style.color = '#5b4fe8';
      }
      nav.appendChild(link);
    });
  }

  function addStudentTrainerCard() {
    const studentArea = document.getElementById('student-stats');
    if (!studentArea || document.getElementById('trainer-dashboard-card')) return;

    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const userId = currentUser?.userId || 'guest';
    let progress = {};
    try {
      progress = JSON.parse(localStorage.getItem(`pebblio_trainer_${userId}`) || '{}');
    } catch (_) {
      progress = {};
    }
    const attempts = (progress.attempts || []).filter(item => item.first);
    const correct = attempts.filter(item => item.correct).length;
    const accuracy = attempts.length ? Math.round(correct / attempts.length * 100) : 0;

    const card = document.createElement('section');
    card.id = 'trainer-dashboard-card';
    card.className = 'card';
    card.innerHTML = `
      <h3>Practice trainers</h3>
      <p style="font-size:.86rem;color:#5b6472;margin:0 0 14px;line-height:1.55">
        ${attempts.length} questions answered · ${accuracy}% first-try accuracy · ${(progress.challengeResults || []).length} timed challenges
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a href="trainers-home.html" class="btn btn--solid btn--sm">Browse trainers</a>
        <a href="trainer-dashboard.html" class="btn btn--ghost btn--sm">View scorecards</a>
      </div>`;
    studentArea.appendChild(card);
  }

  function connectTrainerPages() {
    addTrainerNavigation();
    addStudentTrainerCard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectTrainerPages, { once: true });
  } else {
    connectTrainerPages();
  }
})();
