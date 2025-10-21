import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useRelayEnvironment } from "react-relay/hooks";
// import { registerUser } from "../mutations/RegisterUserMutation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const environment = useRelayEnvironment();

  const handleRegister = (e) => {
    e.preventDefault();

    registerUser(
      environment,
      email,
      password,
      (response) => {
        console.log("Registered:", response);
        // Optionally: auto-login or redirect to login page
        navigate("/login");
      },
      (err) => {
        console.error("Registration failed:", err);
        alert("Registration failed!");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={{ display: "inline-block", textAlign: "left" }}>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
