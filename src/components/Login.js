import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/v1/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);

      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center "
      style={{ marginTop: "80px" }}
    >
      <div className="d-flex justify-content-center flex-direction-column ">
        <form
          onSubmit={handleSubmit}
          className="form-control"
          style={{ marginTop: "20px", padding: "40px" }}
        >
          <h1>Login</h1>
          <div className="input-groups">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>
          <div className="input-groups">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
          </div>
          {error && <div>{error}</div>}

          <div style={{ marginLeft: "40px", marginTop: "10px" }}>
            <button type="submit" className="btn btn-success">
              Log In
            </button>
            <h6
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              If you are new here?
            </h6>
            <Link to="/signup">
              <button type="button" className="btn btn-secondary">
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
