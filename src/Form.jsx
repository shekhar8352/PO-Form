import React from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

const Form = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <ThemeProvider theme={theme}>
    <form onSubmit={handleSubmit}>
      <Grid size={12}>
        <div className="form-items">
          <TextField
            fullWidth
            label="PO Number"
            name="poNumber"
            value={formData.poNumber}
            onChange={handleChange}
            required
            error={!!errors.poNumber}
            helperText={errors.poNumber || ""}
          />
        </div>

        {/* <div className="form-items">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#002c77",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#001f5a", 
              },
            }}
          >
            Submit
          </Button>
        </div> */}
      </Grid>
    </form>
    </ThemeProvider>
  );
};

export default Form;
