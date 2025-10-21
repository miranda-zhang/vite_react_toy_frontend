import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome</h1>
      <p>Please register or log in to continue.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
