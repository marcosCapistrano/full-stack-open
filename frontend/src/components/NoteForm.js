import { useState } from "react";
import noteService from '../services/notes';

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState("a new note...");

  const handleSubmit = async (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: true
    })

    setNewNote("");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
