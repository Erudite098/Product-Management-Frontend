import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, FormLabel, Button} from "react-bootstrap";


function AddProduct(props) {
    const [showAdd, setShowAdd] = useState(false);

    return  (
        <Form className="custom-container2" {...props}>
            <FormLabel style={{fontWeight: "bold", fontSize: "20px"}}>Add Product</FormLabel>   
            <Form.Group>
                <Row className='mb-3 mt-3'>
                    <Col>
                        <FormLabel>Item Barcode</FormLabel>
                        <Form.Control type="text" placeholder="Enter Item Barcode"/>
                    </Col>
                    <Col>
                        <FormLabel>Product Name</FormLabel>
                        <Form.Control type="text" placeholder="Enter Product Name"/>
                    </Col>
                    <Col>
                        <FormLabel>Category</FormLabel>
                        <Form.Control type="text" placeholder="Enter Category"/>
                    </Col>
                </Row>
                <Row className='mb-3'>
                <Col xs={6}>
                    <FormLabel>Description</FormLabel>
                    <Form.Control type="text" placeholder="Enter Description"/>
                </Col>
                <Col>
                    <FormLabel>Price</FormLabel>
                    <Form.Control type="number" placeholder="Enter Price"/>
                </Col>
                <Col>
                    <FormLabel>Quantity</FormLabel>
                    <Form.Control type="number" placeholder="Enter Quantity"/>
                </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end" gap="3">
                        <Button variant="light" onClick={() => setShowAdd(!showAdd)} >Cancel</Button>
                        <Button type="submit" variant="primary" onClick={props.onHide}>Save</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>

    )

}

export default AddProduct;