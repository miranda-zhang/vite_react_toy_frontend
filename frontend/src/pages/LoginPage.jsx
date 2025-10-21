import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useRelayEnvironment } from "react-relay/hooks";
import { loginUser } from "../mutations/LoginUserMutation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const environment = useRelayEnvironment();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(
      environment,
      email,
      password,
      (response) => {
        const token = response.loginUser;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/dashboard");
        } else {
          alert("Invalid login credentials.");
        }
      },
      (err) => {
        console.error("Login failed:", err);
        alert("Login failed!");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
