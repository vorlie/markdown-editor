import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { TextField, Paper, Typography, Box, Button, Divider } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface Note {
  title: string;
  content: string;
}

interface EditorProps {
  selectedNote: Note | null;
  setNotes: (notes: Note[]) => void;
  notes: Note[];
}

function Editor({ selectedNote, setNotes, notes }: EditorProps) {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setTitle(selectedNote?.title || "");
    setMarkdown(selectedNote?.content || "");
  }, [selectedNote]);

  const saveNote = () => {
    if (!selectedNote) return;

    const updatedNotes = notes.map((note) =>
      note.title === selectedNote.title ? { ...note, title, content: markdown } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        height: "100vh", 
        width: "100vw", 
        gap: 2, 
        p: 2 
      }}
    >
      {/* Left: Markdown Editor */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Note Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Write Markdown"
          multiline
          fullWidth
          rows={33}
          variant="outlined"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          sx={{ flex: 1}}
        />
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />} 
          sx={{flex: 1,borderRadius: "4px"}}
          onClick={saveNote}
        >
          Save Note
        </Button>
      </Box>

      {/* Right: Markdown Preview */}
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          p: 3, 
          overflowY: "auto", 
          borderRadius: "4px", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title || "Preview"}
        </Typography>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
}

export default Editor;
