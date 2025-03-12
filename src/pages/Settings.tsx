import {
  Container,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

// Import package.json for version info
import packageJson from "../../package.json";

function Settings({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}) {
  const [version, setVersion] = useState("");
  const [dependencies, setDependencies] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    setVersion(packageJson.version);
    setDependencies(packageJson.dependencies);
  }, []);

  return (
    <Container sx={{ flex: 1, p: 3, mt: { xs: 6, sm: 0 } }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ padding: 3, borderRadius: "12px" }}>
        {/* Dark Mode Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={() => { setMode(mode === "light" ? "dark" : "light"); }}
            />
          }
          label="Dark Mode"
        />

        <Divider sx={{ my: 2 }} />

        {/* App Version & Source */}
        <Typography variant="body1">
          Version: <strong>{version}</strong>
        </Typography>
        <MuiLink
          href="https://github.com/vorlie/markdown-editor"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "block", mt: 1 }}
        >
          View Source on GitHub
        </MuiLink>

        <Divider sx={{ my: 2 }} />

        {/* Dependencies List */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Dependencies
        </Typography>
        <Paper elevation={0} sx={{ p: 2, borderRadius: "12px" }}>
          <List dense>
            {Object.entries(dependencies).map(([name, version]) => (
              <ListItem key={name} sx={{ py: 0.5 }}>
                <ListItemText
                  sx={{ m: 0 }}
                  primary={
                    <Typography variant="body2">
                      <span style={{ fontWeight: "bold" }}>{name}</span>:{" "}
                      <code
                        style={{
                          fontWeight: "normal",
                          backgroundColor: mode === "dark" ? "#1C1B1F" : "#F5F5F5",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        {version}
                      </code>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </Container>
  );
}

export default Settings;
