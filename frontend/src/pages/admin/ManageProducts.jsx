import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "All",
        image: "",
        stock: ""
    });

    const categories = [
        "Imitation Jewellery",
        "Bridal Jewellery for Rent",
        "Bridal Bangles",
        "Fancy Products",
        "Toys",
        "Gifts",
        "Hair Accessories",
        "Impon Jewellery",
        "Golden Covering Jewellery"
    ];

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/products/add", form);
            alert("Product Added Successfully");
            setForm({
                name: "",
                price: "",
                description: "",
                category: "All",
                image: "",
                stock: ""
            });
            fetchProducts();
        } catch (error) {
            alert("Error adding product");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:4000/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert("Error deleting product");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Manage Products</h2>

            {/* Add Product Form */}
            <div style={styles.formContainer}>
                <h3>Add New Product</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        style={styles.textarea}
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <div style={styles.row}>
                        <input
                            style={styles.input}
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            style={styles.input}
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <select
                        style={styles.input}
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <button type="submit" style={styles.button}>
                        Add Product
                    </button>
                </form>
            </div>

            {/* Product List */}
            <div style={styles.listContainer}>
                <h3>Existing Products</h3>
                <div style={styles.grid}>
                    {products.map((product) => (
                        <div key={product._id} style={styles.card}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.image}
                            />
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <button
                                onClick={() => handleDelete(product._id)}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "30px",
        maxWidth: "600px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "15px"
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px"
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
        minHeight: "80px"
    },
    row: {
        display: "flex",
        gap: "15px"
    },
    button: {
        padding: "10px",
        backgroundColor: "#B76E79",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    },
    listContainer: {
        marginTop: "20px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "15px"
    },
    card: {
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center"
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "5px",
        marginBottom: "10px"
    },
    deleteBtn: {
        marginTop: "10px",
        padding: "5px 10px",
        backgroundColor: "#e53935",
        color: "white",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer"
    }
};

export default ManageProducts;
