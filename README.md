# 🏕️ FieldTrip


**FieldTrip** is a developer-focused sandbox for experimenting with modular form graphs, prefill logic, and cross-form field mapping. Inspired by real-world use cases (and a healthy sense of curiosity), this project lets you visually test how data flows between forms—even across complex dependencies.

## 🚀 Features

- Interactive form-switching UI
- Scroll-synced prefill mapping editor
- Local + remote graph loading modes (fallback ready)
- Auto-generated fields from `field_schema`
- Global source injection for environment constants
- Type-safe form node structure via `FormNode` interface

## 🧩 Stack

- ⚛️ React + TypeScript
- 🎨 TailwindCSS (or your preferred flavor)
- 🍃 Vite
- 🧠 Graph structure normalized via utility hooks

## 📦 Local Dev

```bash
npm install
npm run dev
```

## 📁 Structure

- src/data/: mock blueprints + global sources
- src/hooks/: form graph + data context logic
- src/components/: editors, switchers, and graph-aware UI
- src/utils/: transformations + mapping functions

