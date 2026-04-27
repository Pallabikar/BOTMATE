"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UploadMedia({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("media", file);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await response.json();
      setResult(data);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6">Upload to Cloudinary</h3>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="relative group">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-neutral-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 dark:file:bg-neutral-800 dark:file:text-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={!file || uploading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white rounded-xl font-bold transition-all transform active:scale-95"
        >
          {uploading ? "Uploading..." : "Upload Media"}
        </button>
      </form>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
        >
          <p className="text-green-700 dark:text-green-400 text-sm font-medium">Success!</p>
          <a 
            href={result.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline text-xs break-all"
          >
            View File
          </a>
        </motion.div>
      )}
    </div>
  );
}
