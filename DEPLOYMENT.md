# 🚀 Deployment-Anleitung — ES Autopflege

## Schritt 1: GitHub Repository anlegen

1. Gehe auf **https://github.com** und logge dich ein
2. Klicke oben rechts auf **"+"** → **"New repository"**
3. Repository-Name: `es-autopflege`
4. Sichtbarkeit: **Private** (empfohlen)
5. Klicke **"Create repository"**

---

## Schritt 2: Code auf GitHub pushen (via VS Code)

1. Öffne VS Code im Projektordner
2. Drücke `Strg + Shift + P` → tippe **"Git: Initialize Repository"** → Enter
3. Auf der linken Seite das **Source Control Symbol** (Verzweigung) klicken
4. Alle Dateien mit `+` zum Staging hinzufügen
5. Commit-Nachricht eingeben: `Initial commit`
6. Klicke **"Publish Branch"** → GitHub-Account auswählen → `es-autopflege` wählen

---

## Schritt 3: Vercel verknüpfen

1. Gehe auf **https://vercel.com** → mit GitHub-Account einloggen
2. Klicke **"New Project"**
3. Wähle dein `es-autopflege` Repository aus
4. Framework Preset: **"Other"** (kein Framework)
5. Klicke **"Deploy"**

✅ Deine Seite ist jetzt live unter einer `vercel.app`-URL!

---

## Schritt 4: Eigene Domain verknüpfen (optional)

1. In Vercel: Projekt → **"Settings"** → **"Domains"**
2. Gib `es-autopflege.de` ein → **"Add"**
3. Vercel zeigt dir DNS-Einträge, die du bei deinem Domain-Anbieter eintragen musst:
   - **A-Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. DNS-Änderungen dauern bis zu 48h

---

## Schritt 5: Formspree einrichten

### Für Kundenkontaktformular (index.html):
1. Gehe auf **https://formspree.io** → kostenlos registrieren
2. **"New Form"** erstellen → E-Mail: `info@es-autopflege.de`
3. Formular-ID kopieren (z.B. `xpzgkwqr`)
4. In `index.html` ersetze:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   durch:
   ```
   action="https://formspree.io/f/xpzgkwqr"
   ```

### Für B2B-Formular (b2b.html):
1. Ein **zweites Formular** in Formspree anlegen (z.B. "B2B Anfragen")
2. Die neue ID in `b2b.html` ersetzen:
   ```
   action="https://formspree.io/f/YOUR_B2B_FORM_ID"
   ```

---

## Schritt 6: Admin-Passwort ändern

Öffne `admin.html` in VS Code und suche nach:

```javascript
const ADMIN_PASSWORD = 'esadmin2024';
```

Ersetze `esadmin2024` durch ein sicheres Passwort.

---

## Updates deployen (nach Änderungen)

Jede Änderung, die du auf GitHub pushst, wird automatisch von Vercel deployed:

1. Dateien in VS Code bearbeiten
2. Source Control → Änderungen stagen → Commit-Nachricht eingeben
3. **"Sync Changes"** → automatisch live!

---

## Projektstruktur

```
ES-Autopflege/
├── index.html          Startseite
├── galerie.html        Bildergalerie
├── b2b.html            Autohaus-Kooperationen
├── admin.html          Admin-Dashboard (passwortgeschützt)
├── impressum.html      Impressum
├── datenschutz.html    Datenschutzerklärung
├── agb.html            Allgemeine Geschäftsbedingungen
├── 404.html            Fehlerseite
├── vercel.json         Vercel-Konfiguration (Routing, Security-Headers)
├── robots.txt          Suchmaschinen-Anweisungen
├── sitemap.xml         Sitemap für SEO
└── DEPLOYMENT.md       Diese Datei
```

---

## Support

Bei Fragen zum Code oder Deployment: Die gesamte Website wurde mit **Claude (Cowork)** gebaut.
