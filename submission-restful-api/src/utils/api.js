const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fetch all notes (non-archived)
export const fetchNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes`);
  const { data } = await response.json();
  return data;
};

// Fetch archived notes
export const fetchArchivedNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/notes/archived`);
  const { data } = await response.json();
  return data;
};

// Add a new note
export const addNote = async (note) => {
  await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
};

// Delete a note
export const deleteNote = async (noteId) => {
  await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
  });
};

// Archive a note
export const archiveNote = async (noteId) => {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to archive note');
  }
  return response.json();
};

// Unarchive a note
export const unarchiveNote = async (noteId) => {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to unarchive note');
  }
  return response.json();
};
