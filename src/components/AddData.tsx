"use client";
import { getDataList, MarketData } from "@/lib/data";
import { useState } from "react";

export default function AddData({ onAdd }: { onAdd?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    content: "",
  });
  const [msg, setMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, content: file.name }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.desc || !form.price || !form.content) {
      setMsg("please fill all fields");
      return;
    }
    const list = getDataList();
    const newId = list.length > 0 ? Math.max(...list.map((d) => d.id)) + 1 : 1;
    const newData: MarketData = {
      id: newId,
      title: form.title,
      desc: form.desc,
      price: form.price,
      content: form.content,
      owner: "me",
      issubscribe: true,
    };
    const newList = [...list, newData];
    localStorage.setItem("market_data_list", JSON.stringify(newList));
    setMsg("add success");
    setForm({ title: "", desc: "", price: "", content: "" });
    if (onAdd) onAdd();
    window.dispatchEvent(new Event("storage")); // 通知其他组件刷新
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8"
    >
      <h3 className="text-xl font-bold mb-4">Add New Data</h3>
      <input
        className="w-full border p-2 mb-2 rounded"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        className="w-full border p-2 mb-2 rounded"
        name="desc"
        placeholder="Description"
        value={form.desc}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 mb-2 rounded"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 mb-2 rounded"
        name="content"
        type="file"
        onChange={handleFileChange}
        placeholder="Content"
      />
      <div className="text-sm text-gray-500 mb-2">
        {form.content ? `Chosen file: ${form.content}` : "No file chosen"}
      </div>
      <button
        type="submit"
        className="bg-[#8af7ff] text-black px-6 py-2 rounded font-bold mt-2"
      >
        Confirm Add
      </button>
      {msg && <div className="mt-2 text-green-600">{msg}</div>}
    </form>
  );
}
