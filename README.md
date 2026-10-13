# FORM — Training in balance

Eine unabhängige, zweisprachige Trainings-Webapp für GitHub Pages. Kein Build, kein Konto, kein API-Schlüssel und keine laufenden Serverkosten. Die Benutzeroberfläche ist für Smartphone und Desktop gestaltet.

## Schnellstart: auf GitHub veröffentlichen

1. ZIP-Datei entpacken.
2. Auf GitHub ein neues Repository anlegen, z. B. `form-training`. Für kostenloses GitHub Pages im normalen Free-Konto ein öffentliches Repository verwenden.
3. **Add file → Upload files** auswählen. Den **Inhalt** des entpackten Ordners hochladen. `index.html` muss direkt im Hauptverzeichnis des Repositorys liegen, nicht in einem zusätzlichen Unterordner. Die Dateien im Ordner `tests` sind optional.
4. **Commit changes** anklicken.
5. **Settings → Pages → Build and deployment** öffnen.
6. Bei **Source** „Deploy from a branch“, bei **Branch** `main` und `/(root)` auswählen und speichern.
7. Warten, bis GitHub die Website veröffentlicht hat. GitHub zeigt dir dort die Adresse, typischerweise `https://DEIN-NAME.github.io/form-training/`.
8. Die veröffentlichte Adresse auf deinem Handy öffnen. Optional zum Home-Bildschirm hinzufügen.

GitHub-Anleitung: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Alle Pfade sind relativ. Die App funktioniert sowohl in einem Repository-Unterpfad als auch unter einer eigenen Domain. Für eine lokale Funktionsprobe kann `index.html` direkt geöffnet werden; für zuverlässige Speicherung und Offline-Funktion bitte die HTTPS-Adresse auf GitHub Pages verwenden. Es wurde noch kein Repository in deinem GitHub-Konto erstellt und nichts dort veröffentlicht.

## Was du damit machen kannst

- Deutsch / Englisch jederzeit wechseln.
- Fünf vorbereitete Trainingstage: Kraftbasis; Ausdauer & Hüfte; Stabilität & Kraft; Ausdauer & Oberkörper; Erhalten & aufbauen.
- Drei Krafttage: 5 Minuten Vorbereitung, 35 Minuten Kraft und 20 Minuten Cardio. Zwei Cardio-/Mobility-Tage: 45 + 15 Minuten.
- Hack Squat, Rudern, Kurzhanteldrücken, RDL und alle weiteren Übungen des optimierten Plans sind eingetragen. Bei „Klimmzüge oder Latziehen“ ist Latziehen voreingestellt; Klimmzüge sind als Alternative in der Bibliothek verfügbar.
- Zeitwerte sind Planwerte. Aufwärmsätze, Gerätewechsel und längere Satzpausen können zusätzliche Zeit erfordern.
- Pro Kraftsatz Gewicht, Wiederholungen und optional RIR notieren und abhaken. 0 kg steht für eine reine Körpergewichtsübung. Aufwärmsätze sind nicht Teil der vorgegebenen Arbeitssätze.
- Für Cardio Minuten, optional Kilometer und RPE erfassen. Für Mobility Minuten und optional Gewicht erfassen, etwa bei Farmer’s Carries.
- Werte der letzten abgeschlossenen Einheit direkt beim Training sehen. Neue Eingaben werden automatisch gespeichert. Nach dem Neuladen lässt sich eine offene Einheit fortsetzen.
- Pausen- und Übungstimer per Klick starten. Er verwendet eine absolute Endzeit und bleibt auch nach einem Tabwechsel zeitlich korrekt. Im Hintergrund kann der Browser die Anzeige verzögern; es gibt keine garantierte akustische Erinnerung.
- Trainingstage ergänzen, löschen und umbenennen. Übungen hinzufügen, entfernen, umsortieren sowie Sätze, Wiederholungen, Supersatzgruppen, Pausen und Zeitbudget ändern.
- Eigene Übungen mit Anleitungen in beiden Sprachen und eigenem JPG-/PNG-/WebP-Bild hinzufügen. Bilder werden auf maximal 800 Pixel verkleinert und lokal als JPEG gespeichert.
- Beste Last, Volumen, Wiederholungen, geschätztes 1RM, Dauer oder Strecke pro Übung über die Zeit vergleichen. Nur abgehakte Einträge zählen.
- Historische Trainingseinheiten ansehen, korrigieren und löschen. Jede Einheit enthält eine eigene Kopie der damaligen Übungsnamen, Erfassungsarten und Zielwerte. Spätere Planänderungen schreiben keine Historie um.
- JSON-Backups für Sicherung und Gerätewechsel sowie CSV-Export für Tabellenkalkulationen.

## So startest du die erste Einheit

1. Unter **Mein Training** den gewünschten Tag wählen und **Training starten** anklicken.
2. Für jeden Satz Gewicht und tatsächlich absolvierte Wiederholungen eintragen; mit dem Haken bestätigen. RIR bedeutet „noch mögliche Wiederholungen“.
3. Die Gewichtswerte werden bei der nächsten Einheit aus dem letzten Training vorausgefüllt. Wiederholungen, RIR und Erledigt-Status bleiben bewusst leer.
4. Cardio-/Mobility-Dauer erst nach Durchführung eintragen und abhaken. Die vorbelegte Zielzeit ist nur ein Platzhalter.
5. **Abschließen** klicken. Nicht abgehakte Einträge zählen nicht für Fortschrittswerte. Eine teilweise absolvierte Einheit kann nach Bestätigung gespeichert werden.
6. Unter **Fortschritt** eine Übung und Kennzahl auswählen.

## Gewicht und Auswertungen konsistent erfassen

Bei Kurzhanteln empfiehlt die App die kombinierte Last beider Hanteln: zwei Hanteln à 20 kg = 40 kg. Bei einseitigen Übungen werden Wiederholungen pro Seite eingetragen. Es erfolgt keine automatische Verdopplung. Notiere abweichende Seitenwerte bei Bedarf in den Übungsnotizen.

Volumen ist die Summe von eingetragenen kg × Wiederholungen; es ist eine konsistente interne Vergleichszahl, keine präzise mechanische Arbeitsmessung. Vergleiche dieselbe Übung nur mit derselben Lastkonvention und demselben Gerät. Maschinengewichte sind geräteabhängig. Reine Körpergewichtssätze werden über Wiederholungen ausgewertet, nicht über eine erfundene Körperlast.

Geschätztes 1RM: Epley-Formel `Gewicht × (1 + Wiederholungen / 30)`, nur positive Lasten und 1–12 Wiederholungen. Für Zusatzlast-Klimmzüge ist dies keine sinnvolle Schätzung der gesamten Systemlast. Die Formel ist lediglich ein Orientierungspunkt und keine Empfehlung für einen Maximalkrafttest.

Progressionshinweise sind transparent regelbasiert: Erst wenn mindestens alle vorgegebenen Sätze am oberen Wiederholungsende mit eingetragener Reserve abgeschlossen wurden, erscheint eine optionale kleine Laststeigerung. Es gibt keine KI-Verbindung. Technik, Wohlbefinden und Erholung bleiben ausschlaggebend.

## Datenspeicherung und Datenschutz

**Die App speichert im `localStorage` deines Browsers. Es gibt keine Cloud-Synchronisierung.** Die Daten sind an Browser, Gerät, Domain und Repository-Pfad gebunden. Jeder Besucher verwendet seinen eigenen lokalen Datenbestand. GitHub erhält über die App keine Trainingswerte. Keine Analyse-Skripte, externen Schriftarten oder eingebetteten Videos werden geladen. GitHub als Website-Host verarbeitet wie üblich technische Zugriffe.

Regelmäßig **Einstellungen → Backup exportieren** verwenden. Bei einem Gerätewechsel das JSON-Backup auf das neue Gerät übertragen und dort importieren. Ein Import **ersetzt** den dortigen Bestand nach Bestätigung; er führt ihn nicht zusammen. Auch laufende Einheiten und eigene Bilder sind im Backup enthalten. CSV dient der Auswertung und kann nicht als Backup importiert werden.

Backups enthalten persönliche Trainingsdaten. Nicht in das öffentliche GitHub-Repository hochladen. Die `.gitignore` schützt beim normalen Git-Workflow vor versehentlichem Hinzufügen der Standard-Exportdateinamen; sie schützt nicht vor manuellem Upload im GitHub-Webinterface.

Browserdaten können durch Zurücksetzen, private Sitzungen, Speicherbereinigung oder Quoten verloren gehen. Bei einem Speicherfehler erscheint ein dauerhafter Hinweis; neue Daten dann sofort exportieren. Mehrere gleichzeitig bearbeitete Tabs werden erkannt: Änderungen im zweiten Tab sperren Schreibzugriffe im ersten bis zum Neuladen. Nicht parallel in mehreren Tabs trainieren.

Es gibt keinen Login oder eine Verschlüsselung auf einem gemeinsam genutzten Gerät. Andere Personen mit Zugriff auf dasselbe Browserprofil können dessen Trainingsdaten sehen.

## Anleitungen, Zeichnungen und Bilder

Alle mitgelieferten Anleitungstexte sind eigenständig formulierte allgemeine Ausführungshinweise. Die einfachen SVG-Zeichnungen stellen Bewegungsmuster dar; sie sind keine vollständigen biomechanischen Technikdemonstrationen. Für konkrete Gerätevarianten gelten deren Einstellungen und eine fachkundige Einweisung.

In jeder Übungsansicht gibt es eine externe YouTube-Suche nach dem jeweiligen Übungsnamen. Suchergebnisse werden nicht automatisch geprüft. Eigene Referenzbilder können in der Übungsbearbeitung hinzugefügt werden. Nur Bilder verwenden, für die du die nötigen Rechte hast.

Weiterführende Übungsbibliothek: https://www.acefitness.org/resources/everyone/exercise-library/

## Offline und Updates

Nach dem ersten vollständigen Laden über HTTPS legt der Service Worker die App-Dateien offline ab. Externe Video- und Quellenlinks benötigen weiterhin Internet. Die Installationsmöglichkeit hängt vom Browser ab. Unter iOS: Safari → Teilen → Zum Home-Bildschirm; unter Android/Chrome: Browsermenü → App installieren, sofern angeboten.

Beim Ändern von App-Dateien den Versionssuffix in `sw.js` erhöhen, z. B. von `v1.0.0` auf `v1.0.1`, und zusammen mit allen geänderten Dateien veröffentlichen. Nach dem Laden der neuen Version alle FORM-Tabs und das installierte App-Fenster schließen und erneut öffnen. Der Service Worker aktiviert neue Dateien erst nach dem Schließen alter Fenster. Trainingsdaten werden bei normalen Updates nicht gelöscht.

## Für Weiterentwicklung

```text
index.html           Einstiegspunkt, Content Security Policy
style.css            Responsive Oberfläche
data.js              Ausgangsplan und zweisprachige Übungsbibliothek
core.js              Datenmodell, Importvalidierung, Kennzahlen
app.js               Oberfläche, Editor, Speicherung und Exporte
sw.js                Offline-Cache
manifest.webmanifest Installationsmetadaten
icon*.png / icon.svg App-Symbole
tests/               Automatisierte Kern- und UI-Logiktests
```

Tests mit Node.js: `node --test tests/*.test.cjs`. Die App benötigt Node.js nicht zum Betrieb. Es werden keine npm-Pakete gebraucht.

Bewusste Grenzen dieser Version: keine automatische geräteübergreifende Synchronisierung, keine Cloud-Konten, keine Wearable-Anbindung und keine KI-Videoanalyse. Vor einer solchen Erweiterung ist ein Backend mit Authentifizierung und klarer Datentrennung erforderlich.

## English quick start

Upload the contents of this folder to a GitHub repository, with `index.html` at the repository root. In **Settings → Pages**, choose **Deploy from a branch → main → /(root)**. Open the published HTTPS URL and switch to **EN**.

Your training data stays in this browser. Export JSON backups regularly; import them on another device to transfer your plan, exercises and history. Import replaces existing local data after confirmation. Never upload your personal backups to a public repository. CSV is for analysis, not restore. Drawings are schematic movement icons; exercise guides and rule-based suggestions are general training guidance.
