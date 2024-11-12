import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import React, { useState } from 'react';

function AddProduct(props) {
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  // Error states for each field
  const [barcodeError, setBarcodeError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  // Helper function for validation
  const validateInputs = () => {
    let isValid = true;

    // Reset error messages
    setBarcodeError('');
    setProductNameError('');
    setDescriptionError('');
    setPriceError('');
    setQuantityError('');
    setCategoryError('');

    // Validate empty fields
    if (barcode.trim() === '' || productName.trim() === '' || description.trim() === '' || price.trim() === '' || quantity.trim() === '') {
      alert('Please fill in all the required fields.');
      isValid = false;
    }

    // Validate barcode
    if (!/^\d+$/.test(barcode) || parseInt(barcode) <= 0) {
      setBarcodeError('Item barcode must be a positive number.');
      isValid = false;
    }

    // Validate product name
    if (productName.trim() === '') {
      setProductNameError('Product name must not be empty.');
      isValid = false;
    }

    // Validate description
    if (description.trim() === '') {
      setDescriptionError('Description must not be empty.');
      isValid = false;
    }

    // Validate price
    if (price < 0) {
      setPriceError('Price must be a positive number.');
      isValid = false;
    }

    // Validate quantity
    if (!/^\d+$/.test(quantity) || parseInt(quantity) < 0) {
      setQuantityError('Quantity must be a positive number.');
      isValid = false;
    }

    if (category === '') {
      setCategoryError('Please choose a category.');
      isValid = false;
    }

    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    // Create the data object to be sent to the API
    const productData = {
      barcode: barcode,
      product_name: productName,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
    };
    console.log(productData);

    // Post the data to the API
    fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        props.onAddProduct(data);
    
        // Reset form fields after successful submission
        setBarcode('');
        setProductName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');

        // Close the modal
        props.onHide();
        setSuccessMessage('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>

      <div className='mt-3'>
      {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>          
      )}        
      </div>
        
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row className="mb-3">
              <Col>
                <FormLabel>Item Barcode</FormLabel>
                <Form.Control
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Enter Item Barcode"
                  autoFocus
                />
                {barcodeError && <small className="text-danger">{barcodeError}</small>}
              </Col>
              <Col>
                <FormLabel>Product Name</FormLabel>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Product Name"
                />
                {productNameError && <small className="text-danger">{productNameError}</small>}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6}>
                <FormLabel>Description</FormLabel>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
                {descriptionError && <small className="text-danger">{descriptionError}</small>}
              </Col>
              <Col>
                <FormLabel>Price</FormLabel>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                />
                {priceError && <small className="text-danger">{priceError}</small>}
              </Col>
              <Col>
                <FormLabel>Quantity</FormLabel>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                />
                {quantityError && <small className="text-danger">{quantityError}</small>}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormLabel>Category</FormLabel>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="" disabled>Choose...</option>
                  <option>Fashion & Apparel</option>
                  <option>Electronics & Gadgets</option>
                  <option>Health & Beauty</option>
                  <option>Home & Living</option>
                  <option>Toys & Baby Products</option>
                  <option>Sports & Outdoor Equipment</option>
                  <option>Books & Media</option>
                  <option>Groceries & Food Products</option>
                  <option>Pet Supplies</option>
                  <option>Automotive Parts & Accessories</option>
                </Form.Select>
                {categoryError && <small className="text-danger">{categoryError}</small>}
              </Col>
            </Row>
          </Form.Group>

          <Modal.Footer>
            <Button variant="light" onClick={props.onHide}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    </div>
  );
}

export default AddProduct;
