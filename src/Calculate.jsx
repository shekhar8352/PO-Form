import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Container,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

const conversionRates = {
  USD: 1,
  INR: 83.5,
  EUR: 0.91,
  GBP: 0.78,
};

const Calculate = ({ data, formData, handleChange, handleSubmit }) => {
  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const getNumericValue = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const subTotalUSD = data.reduce((acc, item) => {
    const qty = getNumericValue(item["OTY"]);
    const price = getNumericValue(item["Price"]);
    return acc + qty * price;
  }, 0);

  const handleCalculate = () => {
    const rate = conversionRates[formData.currency] || 1;
    const convertedTotal = subTotalUSD * rate;
    handleChange({
      target: {
        name: "grandTotal",
        value: `${formData.currency} ${convertedTotal.toFixed(2)}`,
      },
    });
  };

  if (!data || data.length === 0) return null;

  return (
    <ThemeProvider theme={theme}>
      <Grid size={6}>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          label="Sub Total (USD)"
          value={subTotalUSD.toFixed(2)}
          fullWidth
          InputProps={{ readOnly: true }}
        />

        <TextField
          sx={{ mt: 2, mb: 2 }}
          select
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          fullWidth
        >
          {Object.keys(conversionRates).map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          label="Grand Total"
          name="grandTotal"
          value={formData.grandTotal}
          fullWidth
          InputProps={{ readOnly: true }}
        />

        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{
            backgroundColor: "#002c77",
            color: "#ffffff",
            borderRadius: 2,
            px: 4,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#001f5a",
            },
            mt: 2,
            mb: 2,
          }}
        >
          Calculate
        </Button>
      </Grid>

      <Grid size={6}>
        <TextField
          sx={{ mt: 2, mb: 2 }}
          select
          fullWidth
          label="Approval for Receipting"
          name="approvalOption"
          value={formData.approvalOption}
          onChange={handleChange}
          helperText="Authorize buyer desk team for receipting"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={2}
          value={formData.message}
          onChange={handleChange}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Calculate;
