import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Form from "./Form";
import PODataTable from "./PODataTable";
import poData from "./assets/dummData.json";
import Calculate from "./Calculate";

const FormBody = () => {
  const [formData, setFormData] = useState({
    approvalOption: "Yes",
    poNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({ poNumber: "" });
  const [matchedData, setMatchedData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "poNumber") {
      const isValid = /^\d{0,11}$/.test(value);
      if (!isValid) return;

      setErrors((prev) => ({
        ...prev,
        poNumber:
          value.length !== 11 && value.length > 0
            ? "PO Number must be exactly 11 digits"
            : "",
      }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.poNumber.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        poNumber: "PO Number must be exactly 11 digits",
      }));
      return;
    }

    console.log("Selected PO number", formData.poNumber);

    const data = poData[formData.poNumber];
    console.log("Data", data);

    if (data) {
      setMatchedData(data);
      setShowTable(true);
    } else {
      alert("No matching PO data found.");
      setMatchedData([]);
      setShowTable(false);
    }
  };

  const handleTableChange = (index, key, value) => {
    const updated = [...matchedData];
    updated[index][key] = value;
    setMatchedData(updated);
  };

  const handleTableSubmit = () => {
    console.log("Updated PO Data:", matchedData);
    alert("Submitted changes successfully!");
  };

  return (
    <div className="form-body">
    <Container maxWidth="lg">
      <div className="form-header">
        <Typography variant="h5" gutterBottom>
          Change Order Form (Amendment to Existing PO)
        </Typography>
      </div>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Form
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid size={6}>
          {showTable && matchedData.length > 0 && (
            <Grid item xs={6}>
              <Calculate data={matchedData} />
            </Grid>
          )}
        </Grid>
      </Grid>

      {showTable && (
        <Grid item xs={12}>
          <PODataTable
            data={matchedData}
            handleTableChange={handleTableChange}
            handleTableSubmit={handleTableSubmit}
            setMatchedData={setMatchedData}
          />
        </Grid>
      )}
    </Container>
    </div>
  );
};

export default FormBody;
