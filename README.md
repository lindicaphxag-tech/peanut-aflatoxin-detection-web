# Peanut Mold Screening Web

A React + TypeScript frontend for an image-based peanut mold screening prototype.

The application lets a user upload an image, sends it to the companion inference API, visualizes the 3-class probability distribution, and stores recent screening history locally in the browser.

> **Scope:** this interface presents visual mold-classification results. It does **not** measure aflatoxin concentration and should not be treated as a substitute for laboratory food-safety testing.

## Features

- Image upload and preview.
- Three-class result display: normal / moldy without visible fuzz / moldy with visible fuzz.
- Per-class probability visualization.
- Detection statistics.
- Local history stored in `localStorage` (up to 50 recent records).
- History filtering, detail view, and deletion.
- Responsive animated UI.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

## System architecture

```text
Browser
  │
  ├─ React / TypeScript UI
  ├─ image upload
  └─ local history
          │
          │ POST /api/detect
          ▼
Flask inference API
          │
          ├─ Otsu foreground preprocessing
          └─ ResNet18 3-class inference
          │
          ▼
JSON probabilities + class
```

Companion API: [peanut-aflatoxin-detection-api](https://github.com/lindicaphxag-tech/peanut-aflatoxin-detection-api)

## Quick start

```bash
git clone https://github.com/lindicaphxag-tech/peanut-aflatoxin-detection-web.git
cd peanut-aflatoxin-detection-web
npm install
npm run dev
```

The Vite development server runs on `http://localhost:3000`.

During development, requests to `/api/*` are proxied to:

```text
http://127.0.0.1:5000
```

Start the companion Flask API on port 5000 before running inference from the UI.

## Build

```bash
npm run build
npm run preview
```

## Pages

- **Home** — upload an image and inspect the prediction.
- **History** — browse locally stored screening records and filter by class.
- **About** — explains the implemented pipeline and project limitations.

## Data handling

Detection history is stored in browser `localStorage`. The current implementation keeps up to 50 recent records. Clearing browser storage removes that history.

## Limitations

- The frontend depends on the companion API for inference.
- Displayed probabilities are model outputs, not calibrated laboratory measurements.
- No benchmark claims are made in this repository unless backed by a reproducible evaluation pipeline.
- This is a research/engineering prototype, not a certified food-safety device.
