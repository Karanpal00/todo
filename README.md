# Todo App

This is my Todo app project from The Odin Project.

It lets you create projects and add todos inside each project.
I built this to practice JavaScript, modules, and DOM manipulation.

Click [here](https://karanpal00.github.io/todo/) to try it yourself.
## Features

- Add, edit, and delete projects
- Add, edit, and delete todos
- Mark todos as done
- Priority colors for todo cards
- Data saved in localStorage (so data stays after refresh)

## Tech Used

- HTML
- CSS
- JavaScript (ES Modules)
- Webpack

## Run Locally

1. Clone this repo
2. Open terminal in the project folder
3. Install dependencies:

```bash
npm install
```

4. Build project:

```bash
npx webpack
```

5. Start dev server:

```bash
npx webpack serve
```

## What I Learned

- How to split code using modules
- Basic MVC-style structure (models, views, controller)
- Event delegation for dynamic elements
- Saving and loading app data with localStorage
- Better CSS organization with reusable classes and variables

## Future Improvements

- Add due-date sorting
- Add filters (done / not done / priority)
- Add drag and drop todos
