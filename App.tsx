import React, { useState } from "react";
import { analyzePalm } from "./services/geminiService";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload a palm image first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const analysis = await analyzePalm(image);
      setResult(analysis);
    } catch (error) {
      console.error(error);
      setResult("Error analyzing palm image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fff3e0, #ffe0b2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#ff6f00", fontSize: "2rem", marginBottom: "1rem" }}>
        🪬 AI Palm Astro – हस्तरेखा विश्लेषण
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: "1rem" }}
      />

      {preview && (
        <img
          src={preview}
          alt="Palm Preview"
          style={{
            width: "250px",
            height: "auto",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            marginBottom: "1rem",
          }}
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "0.5rem",
          backgroundColor: "#ff6f00",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "all 0.3s ease",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Palm"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <h2 style={{
