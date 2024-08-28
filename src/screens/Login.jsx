import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom"; // Import useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const loginUser = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:4000/login", data);
      const {  user } = response.data;
      setMessage(response.data.message);
      
      // Navigate to home page upon successful login
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={loginUser}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <p className="mt-3 text-center">
                If you don't have an account, <Link to="/register">register</Link>
              </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
