import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
  },
};

export default NotFound;