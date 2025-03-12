import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  Divider,
  useMediaQuery,
  Theme,
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
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [setNotes]);

  return (
    <>
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile ? 280 : open ? 280 : 80,
          transition: "width 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            width: isMobile ? 280 : open ? 280 : 80,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          },
        }}
      >
        {/* Sidebar Toggle Button (Desktop Only) */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 0.5,
              mb: "5px",
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          </Box>
        )}

        <Divider />

        {/* Navigation Links */}
        <List>
          <ListItemButton
            component={Link}
            to="/settings"
            sx={{
              borderRadius: open ? "12px" : "30px",
              margin: "4px",
              justifyContent: open ? "flex-start" : "center",
              backgroundColor:
                location.pathname === "/settings"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
            }}
          >
            <ListItemIcon sx={{ minWidth: "unset", justifyContent: "center" }}>
              <SettingsRoundedIcon />
            </ListItemIcon>
            {open && (
              <ListItemText sx={{ marginLeft: "8px" }} primary="Settings" />
            )}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/"
            sx={{
              borderRadius: open ? "12px" : "30px",
              margin: "4px",
              justifyContent: open ? "flex-start" : "center",
              backgroundColor:
                location.pathname === "/"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
            }}
          >
            <ListItemIcon sx={{ minWidth: "unset", justifyContent: "center" }}>
              <EditNoteRoundedIcon />
            </ListItemIcon>
            {open && (
              <ListItemText sx={{ marginLeft: "8px" }} primary="Editor" />
            )}
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
        <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
          <List>
            {notes.map((note, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  selectedNote === note &&
                  open && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to="/"
                  onClick={() => {
                    setSelectedNote(note);
                    if (isMobile) setOpen(false);
                  }}
                  sx={{
                    borderRadius: open ? "12px" : "30px",
                    margin: "4px",
                    justifyContent: open ? "flex-start" : "center",
                    backgroundColor:
                      selectedNote === note
                        ? "rgba(0, 0, 0, 0.1)"
                        : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: "unset", justifyContent: "center" }}
                  >
                    <NotesRoundedIcon />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      sx={{ marginLeft: "8px" }}
                      primary={note.title}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
