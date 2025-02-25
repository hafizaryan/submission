const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

// Custom Element: App Header
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background-color: #6200ea;
          color: white;
          padding: 1rem;
          text-align: center;
        }
      </style>
      <header>
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);

// Custom Element: Note Form
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        #note-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        #note-form input,
        #note-form textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        #note-form button {
          padding: 0.5rem;
          background-color: #6200ea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        #note-form button:hover {
          background-color: #3700b3;
        }
      </style>
      <form id="note-form">
        <input type="text" id="note-title" placeholder="Judul Catatan" required>
        <textarea id="note-body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    this.shadowRoot
      .getElementById("note-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const title = this.shadowRoot.getElementById("note-title").value;
        const body = this.shadowRoot.getElementById("note-body").value;

        const newNote = {
          id: `notes-${Math.random().toString(36).substring(2, 9)}`,
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        };

        notesData.push(newNote);
        displayNotes();
        this.shadowRoot.getElementById("note-form").reset();
      });
  }
}

customElements.define("note-form", NoteForm);

// Custom Element: Note Card
class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    this.shadowRoot.innerHTML = `
      <style>
        .note-card {
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .note-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }
        .note-card p {
          margin: 0;
          color: #555;
        }
      </style>
      <div class="note-card">
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
    `;
  }
}

customElements.define("note-card", NoteCard);

// Fungsi untuk Menampilkan Catatan
function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notesData.forEach((note) => {
    const noteElement = document.createElement("note-card");
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    notesList.appendChild(noteElement);
  });
}

// Tampilkan Catatan Saat Halaman Dimuat
displayNotes();
