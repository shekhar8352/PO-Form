import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
  Tooltip,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RowModal from "./RowModal";

const PODataTable = ({
  data,
  handleTableChange,
  handleTableSubmit,
  setMatchedData,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalRow, setModalRow] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  if (!data.length) return null;

  const openEditModal = (row, index) => {
    setModalTitle("Edit Row");
    setModalRow({ ...row });
    setEditIndex(index);
    setModalOpen(true);
  };

  const openAddModal = () => {
    const newRow = {};
    Object.keys(data[0]).forEach((key) => {
      newRow[key] = "";
    });
    setModalTitle("Add New Row");
    setModalRow(newRow);
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleModalChange = (key, value) => {
    setModalRow((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updated = [...data];
    if (editIndex !== null) {
      updated[editIndex] = modalRow;
    } else {
      updated.push(modalRow);
    }
    setMatchedData(updated);
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleDeleteRow = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setMatchedData(updated);
  };

  return (
    <Box>
      <TableContainer component={Paper} elevation={2} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell
                  key={key}
                  sx={{ fontWeight: "bold", fontSize: "11px", border: "none" }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold", fontSize: "11px", border: "none" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "#fff",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {Object.entries(row).map(([key, val]) => (
                  <TableCell key={key} sx={{ border: "none", fontSize: "10px" }}>
                    <Tooltip title={val?.toString() || ""} arrow placement="top-start">
                      <Box
                        sx={{
                          maxWidth: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {val}
                      </Box>
                    </Tooltip>
                  </TableCell>
                ))}
                <TableCell sx={{ border: "none", display: "flex", gap: 1 }}>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => openEditModal(row, rowIndex)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDeleteRow(rowIndex)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={openAddModal}
        sx={{
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
          color: "#002c77",
        }}
      >
        Add Line
      </Button>

      <RowModal
        open={modalOpen}
        rowData={modalRow}
        title={modalTitle}
        onChange={handleModalChange}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default PODataTable;
