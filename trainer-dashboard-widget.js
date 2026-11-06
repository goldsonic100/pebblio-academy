<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pebblio Trainer Dashboard</title>
  <meta name="description" content="Pebblio Academy trainer dashboard with practice progress, streaks, and activities." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="trainers.css" />
</head>
<body>
  <header class="topbar">
    <div class="container topbar__inner">
      <div class="brand">
        <div class="brand__mark">P</div>
        <div class="brand__text">Pebblio Academy</div>
      </div>
      <nav class="nav" aria-label="Trainer navigation">
        <a href="index.html" class="chip">Home</a>
        <a href="dashboard.html" class="chip">Dashboard</a>
        <a href="trainers-home.html" class="chip chip--primary">Trainer Home</a>
      </nav>
    </div>
  </header>

  <main class="dashboard-shell">
    <div class="container dashboard-layout">
      <aside class="sidebar" aria-label="Trainer sidebar">
        <div class="nav-group">
          <div class="nav-item active">🏠 Overview</div>
          <div class="nav-item">📐 Math</div>
          <div class="nav-item">📚 Reading</div>
          <div class="nav-item">🧠 Vocabulary</div>
          <div class="nav-item">📈 Progress</div>
          <div class="nav-item">⚙️ Settings</div>
        </div>
      </aside>

      <section class="dashboard-main">
        <div class="welcome">
          <div class="welcome__left">
            <div class="avatar">A</div>
            <div class="welcome__meta">
              <h1>Welcome back, Alex</h1>
              <p class="subline">Your trainer plan is ready for today.</p>
              <div class="badge-row">
                <span class="badge badge--lavender">Student</span>
                <span class="badge badge--green">On track</span>
              </div>
            </div>
          </div>
          <a href="trainers-home.html" class="btn btn--primary">Open trainer home</a>
        </div>

        <div class="stats-grid" aria-label="Practice summary metrics">
          <article class="kpi">
            <div class="kpi__label">Current streak</div>
            <div class="kpi__value">12d</div>
            <div class="kpi__sub">Best streak: 16d</div>
          </article>
          <article class="kpi">
            <div class="kpi__label">XP earned</div>
            <div class="kpi__value">820</div>
            <div class="kpi__sub">+90 this week</div>
          </article>
          <article class="kpi">
            <div class="kpi__label">Accuracy</div>
            <div class="kpi__value">88%</div>
            <div class="kpi__sub">Up 6% from last week</div>
          </article>
          <article class="kpi">
            <div class="kpi__label">Minutes</div>
            <div class="kpi__value">58m</div>
            <div class="kpi__sub">Across 3 sessions</div>
          </article>
        </div>

        <div class="card-row">
          <div class="card-panel">
            <h3>Today's plan</h3>
            <div class="entry">
              <div class="entry__top">
                <div class="entry__title">Algebra drill</div>
                <span class="entry__tag">15 min</span>
              </div>
              <div class="entry__meta">8 questions · Medium difficulty</div>
            </div>
            <div class="entry">
              <div class="entry__top">
                <div class="entry__title">Reading comprehension</div>
                <span class="entry__tag">10 min</span>
              </div>
              <div class="entry__meta">2 passages · Evidence-based review</div>
            </div>
            <div class="entry">
              <div class="entry__top">
                <div class="entry__title">Vocabulary review</div>
                <span class="entry__tag">12 min</span>
              </div>
              <div class="entry__meta">12 flashcards · Mixed levels</div>
            </div>
          </div>

          <div class="card-panel">
            <h3>Focus goal</h3>
            <div class="goal">
              <div class="progress-ring" aria-label="72 percent complete"></div>
              <div class="goal__text">
                <strong>72%</strong>
                <span>This week</span>
              </div>
            </div>
            <div class="small-note">You're ahead of your weekly learning target.</div>
          </div>
        </div>

        <div class="card-row">
          <div class="card-panel">
            <h3>Recent activity</h3>
            <ul class="list-plain">
              <li><span>Algebra sprint</span><strong>85%</strong></li>
              <li><span>Vocabulary check-in</span><strong>92%</strong></li>
              <li><span>Reading passage</span><strong>88%</strong></li>
            </ul>
          </div>

          <div class="card-panel">
            <h3>Quick picks</h3>
            <ul class="list-plain">
              <li><span>Math warmup</span><span class="entry__tag">Retry</span></li>
              <li><span>Problem solver</span><span class="entry__tag">Open</span></li>
              <li><span>Word study</span><span class="entry__tag">New</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>

  <script src="trainer-dashboard-widget.js"></script>
</body>
</html>
