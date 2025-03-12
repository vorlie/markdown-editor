import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";

type Note = {
  title: string;
  content: string;
};

function App({ mode, setMode }: { mode: "light" | "dark"; setMode: (mode: "light" | "dark") => void }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = () => {
    const newNote = { title: `Note ${notes.length + 1}`, content: "" };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    if (selectedNote === notes[index]) {
      setSelectedNote(null);
    }
  };

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh", p: 0 }}>
        <Sidebar 
          notes={notes} 
          setNotes={setNotes} 
          selectedNote={selectedNote} 
          setSelectedNote={setSelectedNote} 
          addNote={addNote} 
          deleteNote={deleteNote} 
        />
        <Routes>
          <Route path="/" element={<Editor selectedNote={selectedNote} setNotes={setNotes} notes={notes} />} />
          <Route path="/settings" element={<Settings mode={mode} setMode={setMode} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
