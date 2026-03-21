import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "http://localhost:5000/api/notes";

  const fetchNotes = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = () => {
    if (!input.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    })
      .then(() => {
        setInput("");
        fetchNotes();
      })
      .catch(err => console.error(err));
  };

  const deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchNotes())
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Mini Notes App</h1>

      <input
        type="text"
        placeholder="Write a note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addNote}>Add</button>

      <div>
        {notes.map(note => (
          <div key={note.id} className="note">
            <span>{note.text}</span>
            <button onClick={() => deleteNote(note.id)}></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;