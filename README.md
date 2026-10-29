# Pro Loco Attigliano APS — sito web

Sito statico (Eleventy + Nunjucks) pubblicato su GitHub Pages. Gli eventi sono file markdown in `src/eventi/`; la pagina *Eventi* è un’unica galleria: prima i prossimi, poi i passati, in grigio. La distinzione avviene in fase di build e un rebuild automatico giornaliero (ore 02:00 UTC) sposta da solo gli eventi conclusi tra i passati.

## Sviluppo in locale

```
npm install
npm start      # http://localhost:8080
npm run build  # genera la cartella _site/
```

Richiede Node 22 (consigliato). Per simulare una data diversa: `TODAY=2030-01-01 npm run build`.

## Aggiungere un evento

- **Dal pannello** `/admin` (login con GitHub): *Eventi → Nuovo evento*. Compila titolo, data, ecc. e pubblica.
- **A mano**: copia uno dei file in `src/eventi/`, rinominalo e modifica l'intestazione (`title`, `date`, `endDate` opzionale, `time`, `location`, `cover` foto di copertina, `poster` locandina, `summary`).

Gli eventi già presenti (Festa di Fine Estate e Sapori d'Autunno 2026) sono presi dai post Instagram della Pro Loco.

## Sostituire il logo

`media/images/logo.jpg` è l'immagine profilo di Instagram, di soli 150×150 px: appare un po' sgranata nella home. Per una resa migliore copia il file originale ad alta risoluzione in `media/images/` (es. `logo.png`) e cambia solo `logo` in `src/_data/site.json`.

## Foto a scorrimento nella home

Le foto dello sfondo della home sono in `media/images/hero/` e scorrono ogni 6 secondi (formato consigliato 16:9, circa 1600×900). Per aggiungerne, cambiarne o toglierne una, copia il file nella cartella e modifica l'elenco `slides` in cima a `src/index.njk`; la prima dell'elenco è quella mostrata subito.

## Dati dell'associazione

In `src/_data/site.json` (o da `/admin` → *Informazioni sito*) compila i campi vuoti: `address`, `phone`, `president`, `fiscalCode`, `openingHours`, `foundedYear`, `facebook`. Compaiono nel sito solo se valorizzati.

## Pubblicazione su GitHub Pages

1. Fai push su `main` del repository `jespolone/prolocoattigliano` (se diverso, aggiorna `repo` in `src/admin/config.yml`).
2. Su GitHub: *Settings → Pages → Source: GitHub Actions*, e in *Custom domain* `prolocoattigliano.it` (poi *Enforce HTTPS*).
3. Il workflow `.github/workflows/deploy.yml` costruisce e pubblica il sito a ogni push, manualmente e ogni giorno.

Il sito è su `https://prolocoattigliano.it/`.

### DNS (Aruba)

- Record `A` del dominio principale verso GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Record `CNAME` di `www` verso `jespolone.github.io`.
- I record `MX` della posta Aruba non vanno toccati.

### Cambiare dominio

Cambia `url` in `src/_data/site.json` e `CNAME`, poi aggiorna *Custom domain* in *Settings → Pages*. Se il sito venisse servito in una sottocartella (es. `jespolone.github.io/prolocoattigliano/`) imposta `PATH_PREFIX` nel workflow a `/prolocoattigliano/`.
