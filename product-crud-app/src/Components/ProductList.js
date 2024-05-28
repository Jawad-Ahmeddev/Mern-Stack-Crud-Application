import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, CircularProgress } from '@mui/material';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);  // State to handle loading
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);  // Start loading
        const fetchProducts = async () => {
            try {
                const productsResponse = await axios.get("http://localhost:5000/api/products");
                if (productsResponse.data && productsResponse.data.length > 0) {
                    const productsWithImages = await Promise.all(productsResponse.data.map(async product => {
                        try {
                            const imageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(product.category)}&client_id=7GAiOasVqbwuLbx8JwDy8DUaoXyNODK9CFzXqm_awZU`);
                            product.imageUrl = imageResponse.data.results[0]?.urls?.regular || 'https://via.placeholder.com/140';
                        } catch (imageError) {
                            console.error("Error fetching image for category " + product.category + ":", imageError);
                            product.imageUrl = 'https://via.placeholder.com/140';  // Fallback placeholder image
                        }
                        return product;
                    }));
                    setProducts(productsWithImages);
                } else {
                    setError("No products found.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products or images. Please try again later.");
            } finally {
                setLoading(false);  // Stop loading regardless of the outcome
            }
        };

        fetchProducts();
    }, []);

    return (
        <Grid container spacing={2}>
            {loading ? (
                <CircularProgress style={{ margin: 'auto', display: 'block' }} />  // Center the loader
            ) : error ? (
                <Typography color="error" style={{ margin: 'auto' }}>{error}</Typography>
            ) : (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imageUrl}
                                    alt={product.name}
                                    style={{ objectFit: 'cover', height: 140 }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
}

export default ProductList;
