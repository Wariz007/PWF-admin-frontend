import Navbar from "./components/Navbar/Navbar";
import Admin from "./components/Admin/Admin"; // ✅ import Admin

function Root() {
  return (
    <div>
      <Navbar />
      <div className="content-container">
        <Admin /> {/* ✅ this handles login + PostForm */}
      </div>
    </div>
  );
}

export default Root;
