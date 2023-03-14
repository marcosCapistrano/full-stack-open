import { useState, useEffect } from "react";
import noteService from "./services/notes";

import Note from "./components/Note";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching");
      const data = await noteService.getAll();

      setNotes(data);
    }

    fetchData();
  }, []);

  const addNote = async (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    const data = await noteService.create(noteObject);

    setNotes(notes.concat(data));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const data = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : data)));
    } catch (err) {
      setErrorMsg(`Note '${note.content}' was already removed from server`);

      setTimeout(() => {
        setErrorMsg(null)
      }, 5000);

      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
