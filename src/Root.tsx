import Navbar from "./components/Navbar/Navbar";
import PostForm from "./components/PostForm/PostForm";

function Root() {

  return (
    <div>
      <Navbar />

      <div className="content-container">
        <h1>Admin Portal</h1>
        <PostForm />
      </div>
    </div>
  )
}

export default Root
