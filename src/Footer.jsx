import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#002c77",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} PO Form
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
