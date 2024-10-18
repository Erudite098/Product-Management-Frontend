import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Navigation from '../components/Navigation';
import FormInput from '../components/FormInput';
import TableProduct from '../components/TableProduct';
import TablePagination from '../components/TablePagination';

function Dashboard() {
    return (
        <div className='custom-container'>
            <Navigation />
            <FormInput/>
            <TableProduct />
            <TablePagination />
            
          
        </div>
    )
}    

export default Dashboard;