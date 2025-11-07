import { useState } from "react";

function Login({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("jwt", data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.error || "❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
}

export default Login;
