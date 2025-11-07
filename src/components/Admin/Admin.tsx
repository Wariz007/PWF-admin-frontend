import { useState, useEffect } from "react";
import Login from "../Login/Login";
import PostForm from "../PostForm/PostForm";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) setIsAuthenticated(true);
  }, []);

  function handleLoginSuccess(token: string) {
    localStorage.setItem("jwt", token);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  }

  return (
    <div className="admin-container">
      {isAuthenticated ? (
        <>
          <header className="admin-header">
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
          </header>

          <main>
            <PostForm />
          </main>
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default Admin;
