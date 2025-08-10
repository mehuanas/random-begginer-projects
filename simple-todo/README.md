# To-Do App – My First Project

This is my **first JavaScript project** — a simple and responsive to-do list application built with **HTML**, **CSS**, and **JavaScript**, and deployed on **Vercel**.  
It allows users to add, edit, delete, and store tasks in their browser's **Local Storage** so that data persists even after refreshing the page.

## Features

- **Add Tasks**: Users can add new tasks via an input field.
- **Delete Tasks**: Remove tasks individually.
- **Edit Tasks**: Update existing tasks directly from the list.
- **Persistent Storage**: All tasks are saved in Local Storage.
- **Responsive UI**: Works smoothly on both desktop and mobile devices.
- **Clear Input on Submit**: Input field resets after adding/updating a task.

## How It Works

1. **Adding a Task**
   - User enters a task in the input field and clicks "Add Task".
   - The task is stored in Local Storage and displayed on the page.

2. **Editing a Task**
   - Clicking the "Edit" button moves the task text into the input field.
   - The "Add Task" button changes to "Update Task".
   - Upon update, Local Storage is refreshed and the UI re-renders.

3. **Deleting a Task**
   - Clicking the "Delete" button removes the task from both Local Storage and the page.

4. **Rendering**
   - On page load, tasks are fetched from Local Storage and displayed dynamically.

## Live Demo

[View on Vercel](https://to-do-psi-weld.vercel.app/)

---