import React, { useEffect } from "react";
import noteService from "../../services/notes";
import { useLoaderData } from "react-router-dom";
import Note from "../../components/Note";

export async function loader() {
  const notes = await noteService.getAll();

  return { notes };
}

export default function Notes() {
  const { notes } = useLoaderData();

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <ul>
      {notes.map((note) => (
        <li>
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
}
