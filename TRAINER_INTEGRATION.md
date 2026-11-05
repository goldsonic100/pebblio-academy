# Pebblio Trainer integration

The new `trainers.html` practice studio brings a Pebblio-native first pass of the TrainerSite experience into the static Academy: trainer library, subject/difficulty filters, adaptive practice that prioritizes lower-accuracy topics, hints, answer feedback, mistake review, recent-answer history, accuracy/streak statistics, and a timed 10-question challenge. The starter library contains original sample questions across AMC 8/10/12, AIME-style arithmetic, general math, reading comprehension, and vocabulary.

## Run it

Open `trainers.html` from the Pebblio Academy site. Trainer state is stored in browser localStorage by Pebblio user ID (or a guest key). It does not yet sync to Firebase, attach assignments to classroom records, or provide an AI tutor. The timed challenge and hints work without the TrainerSite Flask API. Existing classroom, assignment, and gamification flows remain as they are.

## Follow-up integration

The TrainerSite app includes Flask endpoints, problem databases, and external services that are not present in this static Firebase project. Porting the UI alone would leave those API-backed features broken. This integration is a browser-native implementation of the central practice workflow; use a compatible backend and review content/data licensing before importing TrainerSite datasets or backend code.
