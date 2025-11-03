import { useState } from "react";

function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    date: "",
    writing: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/writings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to post data");

      alert("Post submitted successfully!");
      setFormData({ title: "", tag: "", date: "", writing: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your post.");
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="title"
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        value={formData.tag}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <textarea
        name="writing"
        placeholder="Write your post..."
        value={formData.writing}
        onChange={handleChange}
        required
        className="writing"
      />
      <button type="submit">Submit Post</button>
    </form>
  );
}

export default PostForm;
