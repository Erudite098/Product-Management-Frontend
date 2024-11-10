import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Button, Row, Col, Dropdown } from 'react-bootstrap';
import AddProduct from './AddProduct';
import TableProduct from './TableProduct';

function FormInput() {
    const [modalShow, setModalShow] = useState(false);
    
    // States for search, category filter, products, and search results
    const [search, setSearch] = useState("");
    // const [selectedCategory, setSelectedCategory] = useState(""); // For storing the selected category
    const [searchResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch products from API on component mount
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(products => {
                setProducts(products);
                setSearchResults(products); // Initialize search results
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Function to handle search and category filtering
    const handleSearch = () => {
        let filteredProducts = products;
        
        if (search.length > 0) {
             // Filter by search query
            filteredProducts = filteredProducts.filter((product) =>
                product.product_name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(filteredProducts);
        }
        setSearchResults(filteredProducts);
    };

    const handleCategorySelect = (category) => {
        let filteredProducts = products;

        filteredProducts = filteredProducts.filter(product =>
            product.category === category
            
        );
        setSearchResults(filteredProducts);
    };

    // Handle adding a new product
    const handleAddProduct = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        setSearchResults(prevSearchResults => [...prevSearchResults, newProduct]);
    };

    // Handle product save (edit)
    const handleSaveProduct = (updatedProduct) => {
        fetch(`http://127.0.0.1:8000/api/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(response => response.json())
            .then(() => {
                const updatedProducts = products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                setProducts(updatedProducts);
                setSearchResults(updatedProducts);
            })
            .catch(error => console.error("Error updating product:", error));
    };

    // Handle product delete
    const handleDeleteProduct = (id) => {
        fetch(`http://127.0.0.1:8000/api/products/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts);
                setSearchResults(updatedProducts);
            })
            .catch(error => console.error("Error deleting product:", error));
    };

    const handleSortProduct = (isSort, sortedProducts) => {

         fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(products => {
                setProducts(products);
            })
            .catch(error => console.error("Error fetching data:", error));

        if (isSort) {
           setProducts(sortedProducts);
        }
        
    };

    return (
        <>
            <Form className='mt-5'>
                <Row>
                    <Col md={4}>
                        <InputGroup size="md">
                            <Form.Control
                                type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by Product Name"
                            />
                            <Button variant="outline-primary" onClick={handleSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-primary"
                                style={{
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <span>Filter category by</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='pe-5'>
                            <Dropdown.Item onClick={() => handleCategorySelect("All Products")}>
                                    All Products
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Fashion & Apparel")}>
                                    Fashion & Apparel
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Electronics & Gadgets")}>
                                    Electronics & Gadgets
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Health & Beauty")}>
                                    Health & Beauty
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Home & Living")}>
                                    Home & Living
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Toys & Baby Products")}>
                                    Toys & Baby Products
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Sports & Outdoor Equipment")}>
                                    Sports & Outdoor Equipment
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Books & Media")}>
                                    Books & Media
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Groceries & Food Products")}>
                                    Groceries & Food Products
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Pet Supplies")}>
                                    Pet Supplies
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect("Automotive Parts & Accessories")}>
                                    Automotive Parts & Accessories
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button
                            as="input"
                            type="button"
                            value="+ Add"
                            onClick={() => setModalShow(true)}
                            variant="outline-primary"
                            style={{ width: '100px' }}
                        />
                    </Col>
                </Row>

                {/* AddProduct modal component */}
                <AddProduct
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onAddProduct={handleAddProduct}
                />
            </Form>

            {/* Render TableProduct component */}
            <TableProduct
                data={searchResults.length > 0 ? searchResults : products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
                onSortProduct={handleSortProduct}
            />
        </>
    );
}

export default FormInput;
