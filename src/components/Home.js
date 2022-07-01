import React from "react";

const Home = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <div className="container d-flex justify-content-between">
          <h1>HomePage</h1>
          <h4>Welcome,{user.name}</h4>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
