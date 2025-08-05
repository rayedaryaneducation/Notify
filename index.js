// Get all necessary elements from the DOM
const deleteBtn = document.getElementById('delete-btn');
const list = document.getElementById('ul-list');
const error = document.getElementById('error');
const noteInput = document.getElementById('note');
const saveBtn = document.getElementById('save-btn');
const showBtn = document.getElementById('show-hide-btn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render all notes to the list
function renderNotes() {
  list.innerHTML = ''; // Clear the list before re-rendering
  notes = JSON.parse(localStorage.getItem('notes')) || [];
  
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${note} <button class="delete-this" onclick="deleteThis(${index})">X</button>`;
    list.appendChild(li);
  });
}

// Function to save a new note
function saveNote() {
  const noteText = noteInput.value.trim();
  error.innerHTML = ''; // Clear any previous error messages

  if (!noteText) {
    error.innerHTML = 'Note cannot be empty.';
    return;
  }

  // Check if the note already exists
  if (notes.includes(noteText)) {
    error.innerHTML = 'Note already saved.';
    return;
  }

  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteInput.value = ''; 
  renderNotes(); 
  showNotes();
}

// Function to delete a single note
function deleteThis(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(); 
}

// Function to show the list of notes
function showNotes() {
  renderNotes();
  list.style.display = list.style.display === 'block' ? 'none':'block'
  showBtn.textContent = showBtn.textContent === 'SHOW' ? 'HIDE':'SHOW'
  if (notes.length === 0) {
    list.innerHTML = '<li>No notes yet.</li>';
    return;
  }
}

// Function to hide the list of notes


// Function to delete all notes
function deleteAllNotes() {
  localStorage.removeItem('notes');
  notes = []; // Clear the notes array
  renderNotes(); // Re-render the list (will show 'No notes yet.')
  hideNotes();
}

// Add event listeners to the buttons and input field
document.addEventListener('DOMContentLoaded', renderNotes);
saveBtn.addEventListener('click', saveNote);
deleteBtn.addEventListener('click', deleteAllNotes);
showBtn.addEventListener('click', showNotes);
hideBtn.addEventListener('click', hideNotes);
noteInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    saveNote();
  }
});