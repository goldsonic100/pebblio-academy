# Pebblio Academy trainer experience

The trainer studio is available at `trainers.html` and is a browser-native implementation for the current static Firebase-hosted Pebblio app. Features include:

- AMC 8/10/12, AIME-style, general math, reading comprehension, and vocabulary practice tracks.
- Topic, difficulty, and year filters; question selection; avoid-answered and adaptive weak-topic practice.
- Multiple-choice and numeric answer validation, retries, hints, step-by-step guided hints, worked solutions, and a local content-report email link.
- Mistake review, first-try topic accuracy chart, recent activity, stats, and a configurable timed challenge with results.
- Local progress export/import and clearing.

## Limitations and future backend work

Trainer progress is saved in browser localStorage by Pebblio user ID; it does not sync across devices or to Firebase and isn't wired into classroom assignments/grades. Guided steps are authored hints, not AI chat. The original TrainerSite trainers call Flask APIs for problem sets, solutions, guided AI, issue submissions, and persistent account data. Those server features and datasets aren't made available by copying their frontend into this static app. No TrainerSite questions or backend code were copied here. To enable parity, deploy an authorized API and dataset, then add authenticated Firebase/server persistence, assignment/grade integration, server-side AI proxy (never expose provider secrets in browser code), reporting endpoints, and comprehensive verified problem content.

The sample bank is intentionally small and consists of original Pebblio examples; these are illustrative practice items, not official contest questions.
