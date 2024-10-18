import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import React, {useState} from 'react';

function AddProduct(props) {
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    //Create the data obj to be sent to the API
    const productData = {
      barcode: barcode,
      product_name: productName,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
    }
    console.log(productData);

    //Post the data to the API 
    fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    .then((response) =>{
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      //display a success message here
      <Alert variant='success' className='mt-5'>Product added successfully! </Alert>
      // Reset form fields after successful submission
      setBarcode('');
      setProductName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory('');

      // Close the modal
      props.onHide();
    })
    .catch((error) => {
      console.error('Errawr:', error);
    });
  };
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"np
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group>
            <Row className='mb-3'>
                <Col>
                  <FormLabel>Item Barcode</FormLabel>
                  <Form.Control 
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)} 
                    placeholder="Enter Item Barcode" 
                    autoFocus
                  />
                </Col>
                <Col>
                  <FormLabel>Product Name</FormLabel>
                  <Form.Control 
                    type="text" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                  />
                </Col>
            </Row>

            <Row className='mb-3'>
              <Col xs={6}>
                <FormLabel>Description</FormLabel>
                <Form.Control 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
              </Col>
              <Col>
                <FormLabel>Price</FormLabel>
                <Form.Control 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                />
              </Col>
              <Col>
                <FormLabel>Quantity</FormLabel>
                <Form.Control 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                />
              </Col>
            </Row>

            <Row className='mb-3'>
                <Col>
                    <FormLabel>Category</FormLabel>
                    <Form.Control 
                      type="text" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Enter Category"
                    />
                </Col>
            </Row>
          </Form.Group>

          <Modal.Footer>
            <Button variant="light" onClick={props.onHide}>Cancel</Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>Save</Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>

    </Modal>
  );
}

export default AddProduct;