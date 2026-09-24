# 📰 News Explorer

A responsive React + Vite application for searching news articles and saving
favorites. Built as part of the TripleTen Software Engineering Bootcamp.

---

## 🔑 Test credentials

Authentication currently runs against a local mock user store (`src/data/users.js`),
seeded into `localStorage` on first load. Use any of these accounts to sign in:

| Email | Password | Username |
|---|---|---|
| `manu@example.com` | `pass123` | manu |
| `matt@example.com` | `matt123` | matt |
| `eli@example.com` | `eli123` | elivivas |

Signing in unlocks the **Saved articles** page at `/saved-news`.

> If sign-in behaves unexpectedly, clear the `ne_users_v1` and `ne_current_user`
> keys in DevTools → Application → Local Storage, then reload.

---

## 🚀 Features

**News search**

- Queries the News API and renders results as cards
- Loading state via a `Preloader` component
- "Show more" pagination, three cards at a time
- Empty-state and error messaging when a search returns nothing

**Authentication**

- Sign in / sign out against the mock user store
- Session persisted in `localStorage`, restored on reload
- Current user shared across the tree via React Context

**Saved articles**

- Save and remove articles from the results list
- Protected `/saved-news` route — redirects to home when signed out
- Keyword summary derived from the saved set

**Responsive layout**

- Desktop, tablet, and mobile breakpoints
- Custom fonts loaded with `@font-face`

---

## 🛠️ Tech stack

- **Frontend:** React 18, Vite 5
- **Routing:** React Router 6
- **Language:** JavaScript (ES2020+)
- **Styling:** plain CSS per component, `normalize.css`
- **Fonts:** Inter, Roboto, Roboto Slab (self-hosted `.woff2` / `.woff`)
- **Linting:** ESLint (Airbnb base + React plugins) with Prettier

---

## 📂 Project structure

```
news-explorer/
├── public/
├── src/
│   ├── components/          # one folder per component: .jsx + .css
│   │   ├── About/
│   │   ├── App/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LoginModal/
│   │   ├── Main/
│   │   ├── ModalWithForm/
│   │   ├── Navigation/
│   │   ├── NewsCard/
│   │   ├── Preloader/
│   │   ├── RegisterModal/
│   │   ├── SavedNews/
│   │   └── SearchForm/
│   ├── contexts/
│   │   └── CurrentUserContext.jsx
│   ├── data/
│   │   └── users.js         # mock user store
│   ├── images/
│   ├── utils/
│   │   ├── api.js           # saved-articles operations
│   │   ├── auth.js          # token helpers (stubbed for Stage 1)
│   │   └── newsApi.js       # News API client
│   ├── vendor/
│   │   ├── fonts/           # .woff2 / .woff
│   │   ├── fonts.css        # @font-face declarations
│   │   └── normalize.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚡ Getting started

Clone the repository:

```bash
git clone https://github.com/calderon17/news-explorer.git
cd news-explorer
```

Install dependencies:

```bash
npm install
```

Run the development server (opens on `http://localhost:3000`):

```bash
npm run dev
```

Other scripts:

```bash
npm run build     # production build
npm run preview   # serve the production build locally
npm run lint      # ESLint across the project
```

---

## 📌 Notes

- `src/utils/auth.js` contains stubbed token helpers that stand in for a real
  backend. They are wired for Stage 2, when the API replaces the mock store.
- News results come from the News API; search terms are passed straight through.
