import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "All",
        image: null,
        arType: "None",
        arImage: null,
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
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:4000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.log("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleArImageChange = (e) => {
        setForm({ ...form, arImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("stock", form.stock);
        formData.append("image", form.image);
        if (form.arType && form.arType !== "None") {
            formData.append("arType", form.arType);
        }
        if (form.arImage) {
            formData.append("arImage", form.arImage);
        }

        // Debug logs
        console.log("Form submission - arType:", form.arType);
        console.log("Form submission - arImage:", form.arImage?.name);

        try {
            const response = await axios.post(
                "http://localhost:4000/api/products/add",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Product added response:", response.data);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Added Successfully",
                confirmButtonColor: "#B76E79"
            });

            setForm({
                name: "",
                price: "",
                description: "",
                category: "All",
                image: null,
                arType: "None",
                arImage: null,
                stock: ""
            });

            fetchProducts();

        } catch (error) {
            console.error("Product add error:", error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || error.response?.data?.error || "Error adding product",
                confirmButtonColor: "#B76E79"
            });
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B76E79',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:4000/api/products/${id}`);
                fetchProducts();
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'Error deleting product', 'error');
            }
        }
    };

    return (
        <div className="manage-products animate-fade-in">
            <h2 className="page-title mb-lg">Manage Products</h2>

            <div className="content-grid">

                {/* Add Product Form */}
                <div className="form-card">
                    <div className="card-header border-bottom mb-md pb-sm">
                        <h3>Add New Product</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="product-form">

                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Upload Image</label>
                            <div className="input-with-icon">
                                <ImageIcon className="icon" size={18} />
                                <input
                                    className="form-input indent"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">AR Type (optional)</label>
                            <select
                                className="form-input"
                                name="arType"
                                value={form.arType}
                                onChange={(e) => setForm({ ...form, arType: e.target.value })}
                            >
                                <option value="None">None</option>
                                <option value="earring">Earring</option>
                                <option value="chain">Chain</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Upload AR PNG (optional)</label>
                            <div className="input-with-icon">
                                <ImageIcon className="icon" size={18} />
                                <input
                                    className="form-input indent"
                                    type="file"
                                    name="arImage"
                                    accept="image/png"
                                    onChange={handleArImageChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-input"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="3"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Price</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Stock</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary full-width mt-md">
                            <Plus size={18} />
                            <span>Add Product</span>
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div className="list-container">
                    <h3 className="section-title mb-md">Product Inventory</h3>
                    <div className="product-list-grid">
                        {loading ? (
                            <div className="flex-center col-span-full" style={{ padding: "40px" }}>
                                <Loader text="Loading inventory..." />
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product._id} className="admin-product-card">
                                    <div className="img-wrapper">
                                        <img
                                            src={`http://localhost:4000/uploads/${product.image}`}
                                            alt={product.name}
                                            onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                                        />
                                    </div>
                                    <div className="info">
                                        <h4>{product.name}</h4>
                                        <div className="meta flex-between">
                                            <span>₹{product.price}</span>
                                            <span className={product.stock < 5 ? 'text-danger' : 'text-success'}>
                                                Stock: {product.stock}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn-trash"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* ===== YOUR ORIGINAL STYLE BLOCK RESTORED ===== */}
            <style jsx>{`
                .manage-products { padding-bottom: 50px; }
                .content-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
                @media (max-width: 900px) {
                    .content-grid { grid-template-columns: 1fr; }
                }
                .form-card {
                    background: white;
                    padding: 25px;
                    border-radius: var(--radius-card);
                    box-shadow: var(--shadow-sm);
                    height: fit-content;
                    position: sticky;
                    top: 20px;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                .input-with-icon { position: relative; }
                .icon {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                    pointer-events: none;
                }
                .form-input.indent { padding-left: 35px; }
                .product-list-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                .admin-product-card {
                    background: white;
                    border-radius: var(--radius-card);
                    box-shadow: var(--shadow-sm);
                    overflow: hidden;
                    position: relative;
                    transition: all 0.2s;
                }
                .admin-product-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                .img-wrapper { height: 140px; background: var(--bg-muted); }
                .img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .info { padding: 15px; }
                .info h4 {
                    font-size: 0.95rem;
                    margin-bottom: 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .meta {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin-bottom: 15px;
                }
                .btn-trash {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--danger);
                    cursor: pointer;
                    box-shadow: var(--shadow-sm);
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .admin-product-card:hover .btn-trash { opacity: 1; }
                .btn-trash:hover { background: var(--danger); color: white; }
            `}</style>
        </div>
    );
};

export default ManageProducts;
