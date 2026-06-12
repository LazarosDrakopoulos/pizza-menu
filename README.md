🍕 Pizza Menu

A responsive pizza menu web app built with React and TypeScript.  
Live demo → [PIZZA MENU](https://pizza-menu-ecru-nine.vercel.app/)

<img width="847" height="441" alt="image" src="https://github.com/user-attachments/assets/f037a76c-5709-44c9-8ccc-caba8741e404" />




## Features

- Accordion-style item cards only one open at a time
- Enable/disable sizes per item with a checkbox
- Editable prices numbers only
- Changes persist after page refresh (localStorage)
- Undo button per item — reverts to original prices
- Fully responsive
- Accessible (WCAG 2.1 AA)

## Tech Stack

- React 18
- TypeScript
- CSS (no third-party UI libraries)
- localStorage for persistence
- Jest + React Testing Library for tests

## Getting Started

```bash
npm install
npm start
```

## Running Tests

```bash
npm test -- --watchAll=false
```
## Notes

- The original data had a bug  `Large` size had `sizeId: 0` (same as `Small`). Fixed to `sizeId: 2`.
- Built with React instead of Angular.
- Focused on clean component structure, accessibility, and best practices over complexity.
