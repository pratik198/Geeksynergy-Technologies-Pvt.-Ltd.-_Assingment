import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./Components/Accounts/Login";
import Home from "./Components/Homepage/Home";
import Header from "./Components/Header/Header";
import Companyinfo from "./Components/Company/CompanyInfo";
function App() {
  return (
    <BrowserRouter>
      <Box style={{ marginTop: "50px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/companyinfo" element={<Companyinfo />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
