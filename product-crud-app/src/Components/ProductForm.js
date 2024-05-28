import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, Box, Snackbar, Alert } from '@mui/material';

function ProductForm() {
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false); // For handling the Snackbar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/products", product);
            console.log("Product created:", response.data);
            setOpen(true); // Open the Snackbar
            setProduct({ name: "", description: "", price: "", category: "" }); // Clear form fields
        } catch (error) {
            console.error("Error creating product:", error);
            setError("Failed to create product. Please try again later.");
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Create Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={4} margin="normal" />
                    <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Category" name="category" value={product.category} onChange={handleChange} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Create</Button>
                </form>
            </Paper>
            {error && <Typography color="error">{error}</Typography>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Product added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ProductForm;
