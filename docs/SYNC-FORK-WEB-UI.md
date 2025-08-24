# 🔄 Fork Sync via GitHub Web UI

**Voor Gertjan en andere web-only gebruikers**

## 🎯 Doel:
Je fork up-to-date houden met de nieuwste template features en fixes.

## 📊 Wanneer Syncen?
- ✅ Als je deployment problemen hebt
- ✅ Als er nieuwe features zijn (zoals Mermaid diagrams)
- ✅ Als er belangrijke bug fixes zijn
- ✅ Elke paar weken voor de nieuwste updates

## 🔄 Methode 1: GitHub Sync Button (Makkelijkst)

### Stap 1: Check Sync Status
1. Ga naar je repository op GitHub
2. Kijk of er een **"Sync fork"** button staat
3. Als je ziet: "This branch is X commits behind rkristelijn:main"

### Stap 2: Sync Fork
1. Klik **"Sync fork"**
2. Klik **"Update branch"**
3. ✅ Klaar! Je fork is nu up-to-date

## 🔄 Methode 2: Pull Request (Als sync button niet werkt)

### Stap 1: Create Pull Request
1. Ga naar je repository
2. Klik **"New pull request"**
3. Klik **"compare across forks"**

### Stap 2: Setup PR
- **Base repository**: `gjvdptev/next-blog` (jouw fork)
- **Base branch**: `main`
- **Head repository**: `rkristelijn/next-blog` (template)
- **Head branch**: `main`

### Stap 3: Review & Merge
1. Review de changes (nieuwe features, fixes)
2. Klik **"Create pull request"**
3. Title: `sync: update fork with latest template`
4. Klik **"Create pull request"**
5. Klik **"Merge pull request"**

## ⚠️ Conflict Resolution

Als er conflicts zijn (jouw content vs template updates):

### Voor Blog Posts:
- **Keep yours**: Je eigen posts (Mice Men's Matter)
- **Accept theirs**: Template posts die je niet hebt aangepast

### Voor Code Files:
- **Usually accept theirs**: Bug fixes en nieuwe features
- **Check carefully**: Als je eigen aanpassingen hebt gemaakt

## 🎯 Na de Sync:

### Check List:
- [ ] Je eigen blog posts zijn er nog
- [ ] Je images zijn er nog  
- [ ] GitHub Actions werkt
- [ ] Site deployed correct

### Test:
1. Check GitHub Actions tab
2. Bezoek je live site
3. Test een nieuwe blog post

## 🚨 Backup Strategie:

**Voor belangrijke syncs:**
1. Download je `src/content/posts/` folder
2. Download je `public/` folder met images
3. Doe de sync
4. Upload je content terug als iets mis gaat

## 🆕 Nieuwe Features na Sync:

Na sync krijg je automatisch:
- ✅ **Mermaid diagrams** - Maak flowcharts in posts
- ✅ **Betere error handling** - Minder cryptische errors
- ✅ **Nederlandse documentatie** - Complete handleidingen
- ✅ **Testing infrastructure** - Automatische quality checks
- ✅ **Improved deployment** - Minder deployment failures

## 📅 Aanbevolen Schema:

- **Weekly**: Check for updates
- **Monthly**: Sync if there are useful updates
- **Immediately**: Sync if you have deployment issues

## 🆘 Hulp Nodig?

Als sync problemen geeft:
1. Check GitHub Actions logs
2. Maak een issue in de template repository
3. Tag @rkristelijn voor hulp

---

*Deze guide helpt je om altijd de nieuwste features en fixes te hebben!* 🚀
