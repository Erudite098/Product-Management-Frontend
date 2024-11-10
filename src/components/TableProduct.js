import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import '../Styles/App.css'; 
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';

function TableProduct({ data, onSaveProduct, onDeleteProduct }) {
  
  // handle states for selected product and modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message

  const handleCloseEdit = () => setShowEdit(false);

  const handleDelete = (id) => {
    const isYes = window.confirm('Are you sure you want to delete this product?');

    if (isYes) {
      // Call onDeleteProduct passed as a prop
      onDeleteProduct(id);
      setAlertMessage({ type: 'success', message: 'Product deleted successfully!' }); 
    }
  };

  const handleEdit = (product) => {
    // Store product in state for prefilled form
    setSelectedProduct(product);
    setShowEdit(true); 
  };

  const handleSaveProduct = (updatedProduct) => {
    onSaveProduct(updatedProduct); 
    setShowEdit(false);
    setAlertMessage({ type: 'success', message: 'Product updated successfully!' }); 
  };

  return (
    <>
      <div className='p-3'>
        {alertMessage && (
          <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage.message}
          </Alert>
        )}
      </div>
      
      <Table hover responsive className="mt-4 custom-table w-100">
        <thead>
          <tr>
            <th className='p-3'> Item Barcode</th>             
            <th className='p-3'>Product Name</th>                      
            <th className='p-3'>Description</th>
            <th className='p-3'>Price</th>                    
            <th className='p-3' >Quantity</th>                        
            <th className='p-3'>Category</th>
            <th className='p-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No products available
              </td>
            </tr>
          ) : (
            data.map((product) => (
              <tr key={product.id} className="p-3">
                <td className='text-center'>{product.barcode}</td>
                <td className='text-center'>{product.product_name}</td>
                <td width={"30%"} className="justify-content-center">{product.description}</td>
                <td className='text-center'>₱{product.price}</td>
                <td  className='text-center'>{product.quantity}</td>
                <td  className='text-center'>{product.category}</td>
                <td className="text-center" width={"10%"}>
                  <Button variant="success" size="sm" onClick={() => handleEdit(product)}>Edit</Button> {' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      {/* Render edit product */}
      <EditProduct 
        show={showEdit}
        handleClose={handleCloseEdit}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </>
  );
}

export default TableProduct;
