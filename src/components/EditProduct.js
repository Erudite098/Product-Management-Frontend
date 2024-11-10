import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row, FormSelect } from 'react-bootstrap';

function EditProduct({ show, handleClose, product, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    barcode: '',
    product_name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  });

  useEffect(() => {
    if (product) {
      // Prefill the form if editing
      setFormData({
        id: product.id,
        barcode: product.barcode,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category
      });
    }
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData); // Pass the updated product data to parent
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row className='mb-3'> 
              <Col>
                <Form.Label>Barcode</Form.Label>
                <Form.Control
                  name="barcode"
                  type="text"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="product_name"
                  type="text"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>       
                <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
              </Col>

              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Label>Category</Form.Label>
                <FormSelect name="category" value={formData.category} onChange={handleInputChange} required>
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
                </FormSelect>
              </Col>
            </Row>    
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>
    </Modal>

  );
}

export default EditProduct;
