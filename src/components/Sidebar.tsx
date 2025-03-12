import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { Link, useLocation } from "react-router-dom";

interface Note {
  title: string;
  content: string;
}

interface SidebarProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  addNote: () => void;
  deleteNote: (index: number) => void;
}

function Sidebar({
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
  addNote,
  deleteNote,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [setNotes]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 280 : 80,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: open ? 280 : 80,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Sidebar Toggle Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 0.5, mb: "5px" }}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Links */}
      <List>
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            borderRadius: open ? "12px" : "30px",
            margin: "4px",
            justifyContent: open ? "flex-start" : "center",
            backgroundColor:
              location.pathname === "/" ? "rgba(0, 0, 0, 0.1)" : "transparent",
          }}
        >
          <ListItemIcon sx={{ minWidth: "unset", justifyContent: "center" }}>
            <EditNoteRoundedIcon />
          </ListItemIcon>
          {open && <ListItemText sx={{ marginLeft: "8px" }} primary="Editor" />}
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: open ? "12px" : "30px",
            margin: "4px",
            justifyContent: open ? "flex-start" : "center",
          }}
          onClick={addNote}
        >
          <ListItemIcon sx={{ minWidth: "unset", justifyContent: "center" }}>
            <AddRoundedIcon />
          </ListItemIcon>
          {open && (
            <ListItemText sx={{ marginLeft: "8px" }} primary="New Note" />
          )}
        </ListItemButton>
      </List>

      <Divider />

      {/* Scrollable Notes List */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {notes.map((note, index) => (
            <ListItemButton
              component={Link}
              to="/"
              key={index}
              onClick={() => setSelectedNote(note)}
              sx={{
                borderRadius: open ? "12px" : "30px",
                margin: "4px",
                justifyContent: open ? "flex-start" : "center",
                backgroundColor:
                  selectedNote === note ? "rgba(0, 0, 0, 0.1)" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{ minWidth: "unset", justifyContent: "center" }}
              >
                <NotesRoundedIcon />
              </ListItemIcon>
              {open && (
                <ListItemText sx={{ marginLeft: "8px" }} primary={note.title} />
              )}
              {open && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Settings Button (Fixed to Bottom) */}
      <Box
        component={Link}
        to="/settings"
        sx={{
          position: "absolute",
          bottom: 16,
          left: open ? 16 : "50%",
          transform: open ? "none" : "translateX(-50%)",
          backgroundColor:
            location.pathname === "/settings"
              ? "rgba(0, 0, 0, 0.1)"
              : "transparent",
          borderRadius: "30px",
        }}
      >
        <IconButton sx={{ minWidth: "unset", justifyContent: "center" }}>
          <SettingsRoundedIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
