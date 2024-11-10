
// import './Styles/App.css';
// import Dashboard from './pages/Dashboard';
// //import Login from './pages/Login';

// function App() {
//   return (
//     //<Login />
//     <Dashboard />
  
//   );
// }

// export default App;
//  {/* <Route path="/" element={<Login />} /> */}
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';  

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />       
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    
  );
};

export default App;
