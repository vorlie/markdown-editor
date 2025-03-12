import {
  Container,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
} from "@mui/material";

function Settings({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}) {
  return (
    <Container sx={{ flex: 1, p: 3, mt: { xs: 6, sm: 0 } }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ padding: 3, borderRadius: "12px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          }
          label="Dark Mode"
        />
      </Paper>
    </Container>
  );
}

export default Settings;
