import { useState } from "react";
import { createReport } from "../services/reportService";

export default function ReportForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReport({ title, location, description });
    alert("Report submitted");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Submit Safety Report</h1>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
