# Validation / Prüfung

The project has no runtime dependencies or build step.

Run `node --test tests/*.test.cjs` with Node.js.

Automated checks cover:

- The five-day source plan: 60 minutes per day; 150 planned cardio minutes per week; 11/12/11 working sets on the three strength days.
- Set completion, empty-field validation, actual cardio and mobility durations.
- Session resume, finish, historical edit and deletion.
- Progress calculations and optional progression advice.
- New exercises, day editing, exercise order and target changes.
- German and English rendering paths.
- Backup validation and round-trip, successful replacement, malformed input rejection and quota-failure protection.
- Snapshot separation, unsafe HTML escaping, corrupted-storage preservation and cross-tab write blocking.

UI integration tests use a minimal DOM stub; they are **not** real browser tests. Responsive visual layout, touch interaction, actual PWA installation, cache activation and offline behavior have not been verified in a real browser in this environment.

Suggested first check after publishing: create a test session, reload and resume it, finish it, export a JSON backup, then import that backup in a separate browser profile. After the first online load, close and reopen the app offline. Remove your test session afterwards.
