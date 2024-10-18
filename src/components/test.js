import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Table, Row, Col } from 'react-bootstrap';

function Test() {
    // Sample product data
    const products = [
        { id: 1, barcode: '1423242', name: 'Product 1', description: 'Description 1', price: 100, quantity: 10, category: 'Electronics' },
        { id: 2, barcode: '2424242', name: 'Product 2', description: 'Description 2', price: 200, quantity: 5, category: 'Clothing' },
        { id: 3, barcode: '3424342', name: 'Product 3', description: 'Description 3', price: 150, quantity: 8, category: 'Food' },
        // Add more products here
    ];

    // State for filters
    const [searchName, setSearchName] = useState('');
    const [searchBarcode, setSearchBarcode] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Filtered products based on the input values
    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchName.toLowerCase()) &&
            product.barcode.includes(searchBarcode) &&
            (filterCategory === 'All' || product.category === filterCategory)
        );
    });

    return (
        <>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            Item Barcode
                            <InputGroup size="sm" className="mt-2">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Filter by Barcode" 
                                    value={searchBarcode} 
                                    onChange={(e) => setSearchBarcode(e.target.value)}
                                />
                            </InputGroup>
                        </th>
                        <th>
                            Product Name
                            <InputGroup size="sm" className="mt-2">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Filter by Name" 
                                    value={searchName} 
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                            </InputGroup>
                        </th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>
                            Category
                            <Form.Select 
                                size="sm" 
                                className="mt-2" 
                                value={filterCategory} 
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Food">Food</option>
                            </Form.Select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.barcode}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Test;
