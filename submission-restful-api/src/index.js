import './styles/main.css';
import {
  fetchNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  fetchArchivedNotes,
} from './utils/api';

const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const loadingIndicator = document.getElementById('loading-indicator');
const showNotesButton = document.getElementById('show-notes');
const showArchivedButton = document.getElementById('show-archived');

// Fungsi untuk menampilkan catatan
async function displayNotes() {
  loadingIndicator.style.display = 'block';
  const notes = await fetchNotes();
  loadingIndicator.style.display = 'none';

  notesList.innerHTML = '';
  notes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button onclick="handleDeleteNote('${note.id}')">Delete</button>
      <button onclick="handleArchiveNote('${note.id}')">Archive</button>
    `;
    notesList.appendChild(noteItem);
  });
}

// Fungsi untuk menampilkan catatan arsip
async function displayArchivedNotes() {
  loadingIndicator.style.display = 'block';
  const archivedNotes = await fetchArchivedNotes();
  loadingIndicator.style.display = 'none';

  notesList.innerHTML = '';
  archivedNotes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button onclick="handleDeleteNote('${note.id}')">Delete</button>
      <button onclick="handleUnarchiveNote('${note.id}')">Unarchive</button>
    `;
    notesList.appendChild(noteItem);
  });
}

// Event listener untuk form tambah catatan
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('note-title').value;
  const body = document.getElementById('note-body').value;

  await addNote({ title, body });
  await displayNotes();
  noteForm.reset();
});

// Fungsi untuk menghapus catatan
window.handleDeleteNote = async (noteId) => {
  await deleteNote(noteId);
  await displayNotes();
};

// Fungsi untuk mengarsipkan catatan
window.handleArchiveNote = async (noteId) => {
  await archiveNote(noteId);
  await displayNotes();
};

// Fungsi untuk membatalkan arsip catatan
window.handleUnarchiveNote = async (noteId) => {
  await unarchiveNote(noteId);
  await displayArchivedNotes();
};

// Event listener untuk tombol "Show Notes"
showNotesButton.addEventListener('click', async () => {
  await displayNotes();
});

// Event listener untuk tombol "Show Archived"
showArchivedButton.addEventListener('click', async () => {
  await displayArchivedNotes();
});

// Tampilkan catatan saat aplikasi dimuat
displayNotes();
