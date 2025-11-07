import { useState } from "react";

function PostForm() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    tag: "",
    date: "",
    writing: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    if (name === "date") {
      const [year, month, day] = value.split("-");
      const shortYear = year.slice(2); // e.g., 2025 → 25
      const formatted = `${day}-${month}-${shortYear}`;
      setFormData((prev) => ({ ...prev, date: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("⚠️ Please log in again. Your session expired.");
      return;
    }

    const data = new FormData();
    data.append("id", formData.id);
    data.append("title", formData.title);
    data.append("tag", formData.tag);
    data.append("date", formData.date);
    data.append("writing", formData.writing);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/admin/writings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to post data");
      }

      alert("✅ Post submitted successfully!");
      setFormData({ id: "", title: "", tag: "", date: "", writing: "" });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while submitting your post.");
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        required
      />
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
      <input type="date" name="date" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
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
