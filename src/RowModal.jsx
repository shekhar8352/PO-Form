import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

const RowModal = ({ open, rowData, title, onChange, onClose, onSave }) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {Object.entries(rowData).map(([key, value]) => (
              <TextField
                key={key}
                label={key.replace(/_/g, " ")}
                value={value}
                onChange={(e) => onChange(key, e.target.value)}
                size="small"
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              color: "#002c77",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ backgroundColor: "#002c77", color: "white" }}
            variant="contained"
            onClick={onSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default RowModal;
