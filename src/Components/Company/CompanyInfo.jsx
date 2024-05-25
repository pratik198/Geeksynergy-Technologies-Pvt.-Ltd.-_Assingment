import React from "react";
import { Box, Typography, styled } from "@mui/material";
import Header from "../Header/Header";

const Wrapper = styled(Box)`
  margin-top: 40px;
  position: absolute;
  padding-left: 20px;
`;

const Companyinfo = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Typography variant="h4">Company Info</Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Company:</strong> Geeksynergy Technologies Pvt Ltd
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> Sanjayanagar, Bengaluru-56
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> XXXXXXXXX09
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> XXXXXX@gmail.com
        </Typography>
      </Wrapper>
    </>
  );
};

export default Companyinfo;
