import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  TextField,
  Paper,
  Typography,
  Box,
  Fab,
  Divider,
  useMediaQuery,
  Theme,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

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
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "error" | "warning";
  } | null>(null);

  // Check if screen size is small (mobile)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    setTitle(selectedNote?.title ?? "");
    setMarkdown(selectedNote?.content ?? "");
  }, [selectedNote]);

  const saveNote = () => {
    try {
      if (!title.trim() && !markdown.trim())
        setAlert({ message: "Note cannot be empty!", severity: "warning" });
      return; // Prevent empty notes

      let updatedNotes: Note[];
      if (!selectedNote) {
        // Create a new note
        const newNote = { title: title || "Untitled", content: markdown };
        updatedNotes = [...notes, newNote];
      } else {
        // Update existing note
        updatedNotes = notes.map((note) =>
          selectedNote && note.title === selectedNote.title
            ? { ...note, title, content: markdown }
            : note
        );
      }

      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      // Show success message
      setAlert({ message: "Note saved successfully!", severity: "success" });
    } catch {
      setAlert({ message: "Failed to save note!", severity: "error" });
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw", p: 2 }}>
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
          <TextField
            label="Note Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Write Markdown"
            multiline
            fullWidth
            minRows={10}
            variant="outlined"
            value={markdown}
            onChange={(e) => {
              setMarkdown(e.target.value);
            }}
            sx={{ flex: 1 }}
          />
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "4px",
              overflowY: "auto",
              flex: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {title || "Preview"}
            </Typography>
            <Divider />
            <Box sx={{ overflowY: "auto", height: "fit-content" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "96.8vh", gap: 1 }}>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <TextField
              label="Note Title"
              fullWidth
              variant="filled"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              sx={{ overflowY: "auto" }}
            />
            <TextField
              label="Write Markdown"
              multiline
              fullWidth
              variant="filled"
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
              sx={{ flex: 1, maxHeight: "96.8vh", overflowY: "auto" }}
            />
          </Box>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {title || "Preview"}
            </Typography>
            <Divider />
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Floating Save Button */}
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 16,
          right: 16,
          gap: 1,
        }}
      >
        <Fab color="primary" sx={{ borderRadius: "30px" }} onClick={saveNote}>
          <SaveIcon />
        </Fab>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={!!alert}
        autoHideDuration={3000}
        onClose={() => {
          setAlert(null);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {alert ? (
          <Alert
            severity={alert.severity}
            onClose={() => {
              setAlert(null);
            }}
          >
            {alert.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}

export default Editor;
