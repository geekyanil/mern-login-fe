import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/v1/register";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.user));
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
          <h2>Register</h2>
          <div className="input-groups">
            <input
              type="text"
              placeholder=" Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
            />
          </div>

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
          <div style={{ marginLeft: "40px" }}>
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
            <h6 style={{ marginTop: "16px", marginBottom: "8px" }}>
              If you already signed in,
            </h6>
            <div>
              <Link to="/login">
                <button type="button" className="btn btn-primary">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
