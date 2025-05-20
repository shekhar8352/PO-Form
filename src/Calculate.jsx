import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Container,
} from "@mui/material";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";

const conversionRates = {
  USD: 1,
  INR: 83.5,
  EUR: 0.91,
  GBP: 0.78,
};

const Calculate = ({ data }) => {
  const [currency, setCurrency] = useState("USD");
  const [grandTotal, setGrandTotal] = useState("");

  if (!data || data.length === 0) return null;

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
    const rate = conversionRates[currency] || 1;
    const convertedTotal = subTotalUSD * rate;
    setGrandTotal(`${currency} ${convertedTotal.toFixed(2)}`);
  };

  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Typography variant="h6" gutterBottom>
        PO Calculation Summary
      </Typography>

      <Grid size={12}>
        <div className="form-items">
          <TextField
            label="Sub Total (USD)"
            value={subTotalUSD.toFixed(2)}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </div>

        <div className="form-items">
          <TextField
            select
            label="Currency"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              setGrandTotal("");
            }}
            fullWidth
          >
            {Object.keys(conversionRates).map((cur) => (
              <MenuItem key={cur} value={cur}>
                {cur}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="form-items">
          <TextField
            label="Grand Total"
            value={grandTotal}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </div>
        <div className="form-items">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            sx={{
              borderRadius: 2,
              px: 4,
              textTransform: "none",
              backgroundColor: "#002c77",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#001f5a",
              },
            }}
          >
            Calculate
          </Button>
        </div>
      </Grid>
    </Container>

    </ThemeProvider>
  );
};

export default Calculate;
