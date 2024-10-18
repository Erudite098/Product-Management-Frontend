import React, { useState, useEffect} from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';
import '../Styles/App.css'; 
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';

function TableProduct() {

  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Store product in state for prefilled form
    setShowEdit(true); // Show edit modal
  };

  const handleSaveProduct = (updatedProduct) => {
    const updatedData = data.map(item => {
      if (item.id === updatedProduct.id) {
        return updatedProduct;
      }
      return item;
    });
    setData(updatedData);
    setShowEdit(false);
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:8000/api/products')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fethcing data:',error));
    };

    //Initial fetch
    fetchData();

  }, []); // Empty dependency array means effect runs only once after initial render

  return (
    <>
    <Table hover responsive className="mt-5 custom-table w-100">
      <thead >
        <tr>
         
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="" id="barcode">Item Barcode</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Ascending</Dropdown.Item>
                <Dropdown.Item>Desencending</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>     
          </th>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="" id="product-name">Product Name</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Ascending</Dropdown.Item>
                <Dropdown.Item>Desencending</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>  
          </th>
          <th className='p-3'>Description</th>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="" id="price">Price</Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item>Highest</Dropdown.Item>
                <Dropdown.Item>Lowest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </th>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="" id="stock-qty">Quantity</Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item>Highest</Dropdown.Item>
                <Dropdown.Item>Lowest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </th>
          <th>
          <Dropdown>
              <Dropdown.Toggle variant="" id="category">Category</Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Stationery</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </th>
          <th className='p-3'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            <td>{product.barcode}</td>
            <td>{product.product_name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.category}</td>
            <td className="justify-content-center" width={"10%"}>
              <Button variant="success" size="sm" onClick={() => handleEdit(product)}>Edit</Button> {' '}
              <Button variant="danger" size="sm" onClick={() => handleDelete(product.id) }>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <EditProduct 
      show={showEdit}
      handleClose={handleCloseEdit}
      product={selectedProduct}
      onSave={handleSaveProduct}
    
    />
    </>
  );
};

export default TableProduct;
