# 📝 Easy Blogging Guide

**Voor gebruikers zoals Gert Jan - Hoe je makkelijk kunt bloggen met dit systeem**

## 🎯 In 3 simpele stappen bloggen:

### Stap 1: Fork het project
- Ga naar https://github.com/rkristelijn/next-blog
- Klik op "Fork" (rechtsboven)
- Je hebt nu je eigen kopie!

### Stap 2: Voeg je posts toe
- Ga naar `src/content/posts/` in je fork
- Maak nieuwe `.mdx` bestanden aan
- Gebruik deze format:

```markdown
---
title: "Mijn Blog Post Titel"
date: "2024-01-25"
author: "Jouw Naam"
excerpt: "Korte beschrijving van je post"
---

# Mijn Blog Post Titel

Hier schrijf je je content...

## Subkopjes werken ook

- Lijstjes zijn mogelijk
- **Vet** en *cursief* tekst
- Links naar [andere sites](https://example.com)

```javascript
// Code blokken met syntax highlighting
console.log("Hallo wereld!");
```
```

### Stap 3: Publiceer
```bash
git add .
git commit -m "Nieuwe blog post toegevoegd"
git push origin main
```

**Klaar!** 🎉 Je blog wordt automatisch gebouwd en online gezet.

## 🔄 Wat gebeurt er automatisch?

Wanneer je naar `main` branch pusht:

1. **GitHub Actions start** 🤖
2. **Posts worden verwerkt** - Het systeem leest je `.mdx` bestanden
3. **Data wordt gegenereerd** - `posts.json` wordt automatisch gemaakt
4. **Blog wordt gebouwd** - Next.js maakt statische pagina's
5. **Deployment** - Je blog gaat live op Cloudflare Workers

## 📁 Bestandsstructuur

```
je-blog/
├── src/content/posts/     👈 HIER zet je je blog posts!
│   ├── 01-eerste-post.mdx
│   ├── 02-tweede-post.mdx
│   └── 03-nieuwste-post.mdx
├── src/data/posts.json    👈 Dit wordt automatisch gemaakt
└── andere bestanden...
```

## ✅ Checklist voor nieuwe posts

- [ ] Bestand eindigt op `.mdx`
- [ ] Frontmatter is compleet (`title`, `date`, `author`, `excerpt`)
- [ ] Datum format is `YYYY-MM-DD`
- [ ] Titel is beschrijvend
- [ ] Excerpt is 1-2 zinnen
- [ ] Content is in markdown format

## 🌍 Talen

Het systeem werkt met **elke taal**:
- 🇳🇱 Nederlands ✅
- 🇬🇧 Engels ✅  
- 🇩🇪 Duits ✅
- 🇫🇷 Frans ✅
- En alle andere talen!

## 🎨 Aanpassingen

### Je blog personaliseren:

1. **Site titel**: Bewerk `src/app/layout.tsx`
2. **Kleuren**: Pas `src/lib/theme.ts` aan
3. **Homepage**: Wijzig `src/components/Hero.tsx`
4. **Footer**: Bewerk `src/components/Footer.tsx`

## 🆘 Hulp nodig?

### Veelgestelde vragen:

**Q: Mijn nieuwe post verschijnt niet**
A: Controleer of:
- Je frontmatter compleet is
- Je naar `main` branch hebt gepusht
- GitHub Actions klaar is (groene vinkje)

**Q: Foutmelding bij bouwen**
A: Check of:
- Alle posts geldige frontmatter hebben
- Geen syntax fouten in je markdown
- Datum format correct is (`YYYY-MM-DD`)

**Q: Hoe zie ik of deployment werkt?**
A: Ga naar je GitHub repository → "Actions" tab → bekijk de laatste workflow

### Contact:
- 🐛 Bug melden: [GitHub Issues](https://github.com/rkristelijn/next-blog/issues)
- 💬 Vragen stellen: [GitHub Discussions](https://github.com/rkristelijn/next-blog/discussions)

## 🎉 Voorbeelden

### Voorbeeld post:
```markdown
---
title: "Mijn avontuur met AI"
date: "2024-01-25"
author: "Gert Jan"
excerpt: "Hoe ik AI gebruik in mijn dagelijks leven"
---

# Mijn avontuur met AI

Vandaag wil ik vertellen over mijn ervaringen met AI...

## Wat ik heb geleerd

AI is een krachtig hulpmiddel, maar...

### Tips voor beginners:
1. Start klein
2. Experimenteer veel
3. Blijf kritisch

**Conclusie**: AI is fantastisch als je weet hoe je het moet gebruiken!
```

---

**Happy blogging!** 🚀 Veel plezier met je nieuwe blog!
