# Pebblio Academy trainer experience

The trainer library at `trainers-home.html` links to the practice studio (`trainers.html`) for seven tracks: AMC 8, AMC 10, AMC 12, AIME-style, General Math, Reading Comprehension, and Vocabulary. Current question content is original Pebblio-authored practice inspired by typical contest formats. It is not official contest material and not copied from TrainerSite.

Features in the browser implementation: topic/difficulty/year filters, adaptive weak-topic selection, specific question choice, hints, step-by-step guidance, worked solutions, content reporting by email, missed-question review, accuracy by topic, recent activity, configurable timed challenges, scorecards, progress export/import, and reset. The student dashboard widget reads the local trainer stats and links to the trainer catalog and scorecards. Complete a timed challenge while signed in to receive one local XP/coin bonus per day.

## Sync status and production considerations

Trainer progress and challenge scorecards are kept in `localStorage` under the Pebblio user ID, so they persist only in that browser. Classroom sync currently uses a shared Realtime Database path and is not suitable for private per-user trainer records without authenticated Firebase rules and a schema redesign. The Firebase config in this repository appears to contain demo values. This branch therefore does not pretend the trainer has real cross-device sync.

A secure future sync service should authenticate users with Firebase Auth, store trainer state under a UID-scoped path, apply restrictive database rules, validate challenge rewards server-side (for example via Cloud Functions), and expose an explicit offline/local fallback. Do not store AI provider secrets in frontend files. TrainerSite's original Flask endpoints and problem data are not included; use only authorized datasets and services. Sample question bank is small and needs editorial review and broader authored content before production use.
