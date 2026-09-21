# FitFlow

Unabhängige Vite/React-Version von FitFlow.

- Die Daten der App werden lokal im Browser (`localStorage`) gespeichert.
- Die KI-Fotoanalyse wurde entfernt.
- Die rechnerische Körper-Schätzung aus Profil + Gewicht bleibt erhalten.
- Die Barcode-Suche nutzt weiterhin Open Food Facts und benötigt Internet.
- Es wird kein AppDeploy-Backend benötigt.

## Lokal starten

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
```

Der fertige Ordner ist `dist/`.
