import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(`Username: ${username}, Password: ${password}`);

    const loginData = {
      username: username,
      password: password
    };
    console.log(loginData);

    fetch(http)


  };

  return (
    <div className="container-fluid">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <h4 className="text-center">Login</h4>
        <div className="mb-3 mt-5">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
