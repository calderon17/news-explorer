# Limpieza de lint — dónde vamos

Progreso: **112 → 37 problemas**

## Hecho

- [x] **1. `react/prop-types` desactivado** en `.eslintrc.cjs` (~70 errores). Regla legacy; React 19 la deprecó en componentes función.
- [x] **2. Resolver de imports configurado** (~26 errores). `eslint-plugin-import` no sabía buscar `.jsx`; se agregó `import/resolver` en `settings` y se apagó `import/extensions`.
- [x] **Bug real arreglado:** casing de archivos. `Searchform.css` → `SearchForm.css`, `ModalWithform.*` → `ModalWithForm.*`. Funcionaba en macOS (filesystem case-insensitive) pero habría roto los estilos en producción/Linux.

## En curso — 3. Variables sin usar

### Grupo A — borrado limpio

| Archivo | Línea | Qué borrar |
|---|---|---|
| `Preloader.jsx` | 1 | `import React from "react";` (línea completa — el JSX transform nuevo no lo necesita) |
| `SearchForm.jsx` | 1 | solo `, useEffect` |
| `RegisterModal.jsx` | 2 | solo `, useEffect` |
| `LoginModal.jsx` | 4 | el import de `authenticateUser` |
| `App.jsx` | 159 | la función `handleSaveArticle` completa (duplicado viejo de `handleToggleSave`) |

### `SavedNews.jsx` — dos errores de un tiro

`uniq` (línea 19) y `uniqKeywords` (líneas 22-26) calculan lo mismo con técnicas distintas.
Borrar el `for...of` y renombrar `uniq` → `uniqKeywords`. Elimina también el error
`no-restricted-syntax` de la línea 24.

### Grupo B — revelan trabajo sin terminar (decidir, no borrar a ciegas)

- **`App.jsx` líneas 10-17** — `authorize`, `checkToken`, `saveToken`, `getToken`,
  `removeToken`, `getSavedArticles` importados pero sin usar. Al final de `App.jsx` hay
  ~40 líneas comentadas con el login real; en su lugar se usa el mock de `data/users.js`.
  Son de la Stage 2, aún sin conectar.
- **`RegisterModal.jsx` línea 11** — `errorMessage` se usa pero `setErrorMessage` nunca.
  Hay un espacio para mostrar errores que nunca se puede llenar: si el registro falla,
  el usuario no ve nada.
- **`CurrentUserContext.jsx`** — `useMemo`, `useEffect`, `removeToken` sin usar. Ligado
  al punto 6 de abajo.

## Pendiente

- [ ] **4. `catch {}` vacío en `App.jsx` línea 57** — se traga errores en silencio.
- [ ] **5. `no-use-before-define` en `api.js` línea 27** — `cryptoRandomId` se usa antes de definirse.
- [ ] **6. Lógica de auth duplicada** — `CurrentUserProvider` existe en
      `CurrentUserContext.jsx` pero nadie lo usa; `App.jsx` usa `<CurrentUserContext.Provider>`
      directo. Elegir un patrón y borrar el otro.
- [ ] **7. Estilo suelto** — `no-underscore-dangle` (`_id`), `react/no-unescaped-entities`,
      `consistent-return`, `no-promise-executor-return`, `import/prefer-default-export`,
      `no-nested-ternary` (`NewsCard.jsx` 48), `no-empty-pattern` (`Footer.jsx` 5),
      `no-useless-path-segments` (`main.jsx` 5 — autofixable),
      `import/no-extraneous-dependencies` (`vite.config.js`).
- [ ] **8. Verificar** — `npm run lint` y que `npm run dev` cargue sin overlay de Vite.

## Comandos útiles

```bash
npm run lint     # cuenta real de problemas
npm run dev      # servidor de desarrollo
```
