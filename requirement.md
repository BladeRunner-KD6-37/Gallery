# Photo Gallery Web App — Requirements

**Assignment:** Celebrare Frontend Intern Pre-Screening
**Deadline:** Within 24 hours of receiving the assignment
**Estimated effort:** 4–8 hours
**Submit:** GitHub link + 5-minute screen recording (via Google Form)

## Goal

Build a Photo Gallery web app in React. It fetches photos from a free public API, shows them in a grid, lets the user search by keyword, and lets the user mark photos as favourites.

**Scope is fixed. Do not add anything beyond the 7 requirements below.**

---

## Functional Requirements

### 1. Project Setup
- React + Vite project
- Tailwind CSS for all styling
- No other UI libraries (no MUI, Ant Design, Bootstrap)

### 2. Fetch Photos from API
- Endpoint: `https://picsum.photos/v2/list?limit=30`
- Fetch 30 photos on load
- Show a **loading spinner** while fetching
- Show an **error message** if the fetch fails

### 3. Responsive Grid
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Each card shows:
  - the photo
  - the author name
  - a heart icon button

### 4. Search Filter
- Search input at the top of the page
- Filters photos by **author name**, in real time as the user types
- No page reload
- No API call on search — filter the already-fetched data

### 5. Favourites with `useReducer`
- Heart icon toggles a photo as favourite
- Favourites list must be managed with **`useReducer`** (not `useState`)
- Favourites must **persist across page refreshes** using `localStorage`

### 6. Custom Hook
- Create a custom hook named **`useFetchPhotos`**
- It must return: `photos`, `loading`, `error`
- The Gallery component must use this hook and must not fetch data directly

### 7. `useCallback` + `useMemo`
- Use **`useCallback`** on the search filter handler
- Use **`useMemo`** to compute the filtered photo list
- Be ready to explain why each was used

---

## Rules

- No component libraries — Tailwind only
- No class components — functional components with hooks only
- Do not skip `useReducer` — `useState` is not accepted for favourites
- Do not add extra features
- Do not submit without a recording (code without video will not be reviewed)
- AI tools are allowed, but you must be able to explain every line

---

## Screen Recording (5 minutes, mandatory)

Explain your code on screen, covering these 5 points:

1. **Show the app working** — photos loading, search filter working, favourites toggling and persisting after refresh
2. **Open `useFetchPhotos`** — read it out; explain what it returns and what happens if the API fails
3. **Open the `useReducer` code** — explain which actions the reducer handles and why `useReducer` was chosen over `useState`
4. **Open the component using `useCallback` and `useMemo`** — explain in plain words what problem each solves and what would break without them
5. **Show one difficult thing** — what the problem was and how you solved it

Free tools: Windows `Win + G`, Mac QuickTime → New Screen Recording, or OBS Studio. Upload to Google Drive or YouTube (unlisted).

---

## Submission Checklist

- [ ] Code pushed to a **public GitHub repository**
- [ ] Screen recording uploaded (Google Drive or YouTube, unlisted)
- [ ] Google Form filled with:
  - GitHub link
  - Recording link
  - One line describing the hardest part of the assignment
- [ ] Submitted within 24 hours

---

## What Reviewers Look For

A simple, working app with a confident video explanation beats a complex app you cannot explain. Understanding and clear explanation matter more than perfection.