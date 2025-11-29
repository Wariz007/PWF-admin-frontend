import { useState } from "react";
import Login from "../Login/Login";
import PostForm from "../PostForm/PostForm";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function handleLoginSuccess(token: string) {
    // You can store the token for API use,
    // but it will NOT auto-authenticate on refresh.
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
