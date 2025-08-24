# GitHub Web User Checklist - "Mijn Deployment Werkt Niet"

Voor gebruikers die alleen via de GitHub website werken (geen lokale setup).

## ✅ Stap-voor-Stap Checklist

### 1. GitHub Actions Status Controleren
- [ ] Ga naar je repository op GitHub
- [ ] Klik op `Actions` tab
- [ ] Zie je rode X'jes (gefaalde runs)?
- [ ] Klik op de meest recente run voor details

### 2. GitHub Actions Inschakelen
- [ ] Zie je "Workflows aren't being run on this forked repository"?
- [ ] Zo ja: klik "I understand my workflows, go ahead and enable them"

### 3. Cloudflare Secrets Instellen
**Dit is meestal het probleem!**

**Cloudflare gegevens ophalen:**
- [ ] Log in op [Cloudflare Dashboard](https://dash.cloudflare.com)
- [ ] Account ID: staat in de rechter sidebar
- [ ] API Token: "My Profile" → "API Tokens" → "Create Token" → "Workers:Edit"

**Secrets toevoegen aan GitHub:**
- [ ] Ga naar je repository → `Settings` tab
- [ ] Links: `Secrets and variables` → `Actions`
- [ ] Klik "New repository secret"
- [ ] Voeg toe: `CLOUDFLARE_API_TOKEN` (je API token)
- [ ] Voeg toe: `CLOUDFLARE_ACCOUNT_ID` (je account ID)

### 4. Branch Controleren
- [ ] Bewerk je bestanden op de `main` branch (niet `master`)
- [ ] Check de branch dropdown bij het bewerken

### 5. Post Format Controleren
Zorg dat je nieuwe posts deze format hebben:

```markdown
---
title: "Je Post Titel"
date: "2024-01-25"
excerpt: "Korte beschrijving"
---

# Je Post Titel

Je content hier...
```

**Let op:**
- [ ] `---` lijnen boven en onder frontmatter
- [ ] Aanhalingstekens rond alle waarden
- [ ] Datum format: YYYY-MM-DD
- [ ] Alle vereiste velden: title, date, excerpt

## 🚨 Meest Voorkomende Problemen

### "Error: Unable to find account"
→ `CLOUDFLARE_ACCOUNT_ID` ontbreekt of is verkeerd

### "Authentication failed" 
→ `CLOUDFLARE_API_TOKEN` ontbreekt of is verlopen

### "Workflow not found"
→ GitHub Actions niet ingeschakeld

### Nieuwe posts verschijnen niet
→ Frontmatter format verkeerd of ontbreekt

## 🆘 Noodoplossing

Als niets werkt:

1. **Check je secrets opnieuw:**
   - Verwijder oude secrets
   - Maak nieuwe Cloudflare API token
   - Voeg opnieuw toe aan GitHub

2. **Test met een kleine wijziging:**
   - Bewerk de README.md
   - Voeg een spatie toe
   - Commit de wijziging
   - Kijk of GitHub Actions start

3. **Vraag hulp:**
   - Maak een issue in de [originele repository](https://github.com/rkristelijn/next-blog/issues)
   - Vermeld: error messages uit GitHub Actions
   - Vermeld: welke stappen je al geprobeerd hebt

## 📞 Contact

Voor directe hulp: contact @rkristelijn via GitHub issues.

---

*Deze checklist is speciaal gemaakt voor gebruikers die alleen via de GitHub website werken.*
