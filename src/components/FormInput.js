import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, InputGroup, Button, Row, Col} from 'react-bootstrap';
import AddProduct from './AddProduct';

function FormInput() {

    const [modalShow, setModalShow] = React.useState(false);
    //const [showAdd, setShowAdd] = useState(false);

    return (
        <>
        <Form className='mt-5'>
            <Row>
                <Col md={4}>
                    <InputGroup size="md">
                        <Form.Control type="search" placeholder="Search by Product Name or Barcode"/>
                        <Button variant="outline-primary" id="button-addon2">Search</Button>          
                    </InputGroup>                
                </Col>
                <Col md={3}>
                    <Form.Group as={Col} controlId="formGridState" size="md">                    
                        <Form.Select defaultValue="Choose...">
                            <option>Filter category by</option>
                            <option>Electronics</option>
                            <option>Clothing</option>
                            <option>50</option>
                            <option>All</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button 
                    as="input" 
                    type="button" 
                    value="Add"
                    onClick={() => setModalShow(true)}
                    variant="outline-primary" style={{width: '100px'}}  />{' '}
                </Col>
            </Row>

            <AddProduct
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
        </Form>
        </>
    )
}

export default FormInput;