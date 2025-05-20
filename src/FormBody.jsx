import React, { useState } from "react";
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import Form from "./Form";
import PODataTable from "./PODataTable";
import Calculate from "./Calculate";
import poData from "./assets/dummData.json";

const steps = ["Enter PO Number", "Edit PO Data", "Notes & Calculation"];

const FormBody = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    approvalOption: "Yes",
    poNumber: "",
    message: "",
    currency: "USD",
    grandTotal: "",
  });
  const [errors, setErrors] = useState({ poNumber: "" });
  const [matchedData, setMatchedData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleNext = () => {
    if (activeStep === 0) {
      if (formData.poNumber.length !== 11) {
        setErrors((prev) => ({
          ...prev,
          poNumber: "PO Number must be exactly 11 digits",
        }));
        return;
      }

      const data = poData[formData.poNumber];
      if (data) {
        setMatchedData(data);
        setActiveStep(1);
      } else {
        alert("No matching PO data found.");
      }
    } else if (activeStep === 1) {
      setActiveStep(2);
    } else {
      console.log("Form submitted:", formData);
      console.log("Matched Data:", matchedData);

      setSnackbarMessage("Form Submitted Successfully!");
      setSnackbarOpen(true);

      setTimeout(() => {
        handleReset();
      }, 2000);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setFormData({ approvalOption: "Yes", poNumber: "", message: "" });
    setMatchedData([]);
    setErrors({ poNumber: "" });
    setActiveStep(0);
  };

  const handleTableChange = (index, key, value) => {
    const updated = [...matchedData];
    updated[index][key] = value;
    setMatchedData(updated);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {activeStep > 0
          ? `Change Order Form ${formData.poNumber}`
          : "Change Order Form (Amendment to Existing PO)"}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper
        elevation={3}
        sx={{
          width: "90%",
          margin: "0 auto",
          p: 3,
          mb: 4,
          boxSizing: "border-box",
          // maxWidth: "1200px",
          minHeight: "400px",
        }}
      >
        {activeStep === 0 && (
          <Form
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          />
        )}

        {activeStep === 1 && (
          <PODataTable
            data={matchedData}
            handleTableChange={handleTableChange}
            handleTableSubmit={() => handleNext()}
            setMatchedData={setMatchedData}
          />
        )}

        {activeStep === 2 && (
          <Grid container spacing={2}>
            <Calculate
              data={matchedData}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            />
          </Grid>
        )}
      </Paper>
      <Box sx={{ mt: 3, mb: 2 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} sx={{ mr: 2 }}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ backgroundColor: "#002c77", color: "white" }}
          >
            {activeStep === 1 ? "Save and Continue" : "Continue"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ backgroundColor: "#002c77", color: "white" }}
          >
            Submit
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={handleReset} sx={{ ml: 2 }}>
            Reset
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FormBody;
