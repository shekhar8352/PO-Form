import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Typography,
  Paper,
  TableContainer,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PODataTable = ({
  data,
  handleTableChange,
  handleTableSubmit,
  setMatchedData,
}) => {
  if (!data.length) return null;

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(data[0]).forEach((key) => {
      newRow[key] = "";
    });
    setMatchedData((prev) => [...prev, newRow]);
  };

  const handleDeleteRow = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setMatchedData(updated);
  };

  return (
    <div className="table-container">

      <TableContainer component={Paper} elevation={3} sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }} size="large">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    padding: "12px",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "#ffffff",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {Object.entries(row).map(([key, val]) => (
                  <TableCell key={key} sx={{ padding: "10px" }}>
                    <Tooltip
                      title={val?.toString() || ""}
                      arrow
                      placement="top-start"
                    >
                      <TextField
                        value={val}
                        onChange={(e) =>
                          handleTableChange(rowIndex, key, e.target.value)
                        }
                        fullWidth
                        size="small"
                        sx={{
                          borderRadius: 2,
                          "& input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                ))}

                {/* Delete Button */}
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteRow(rowIndex)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
          sx={{
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            color: "#002c77",
          }}
        >
          Add Line
        </Button>
    </div>
  );
};

export default PODataTable;
