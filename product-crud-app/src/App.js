import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import About from './Components/About';
import { AppBar, Toolbar, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/" exact>Home</Button>
          <Button color="inherit" component={NavLink} to="/create">Create Product</Button>
          <Button color="inherit" component={NavLink} to="/about">About Me</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
