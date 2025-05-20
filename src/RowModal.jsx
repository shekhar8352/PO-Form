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

const RowModal = ({ open, rowData, title, onChange, onClose, onSave }) => {
  return (
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
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RowModal;
