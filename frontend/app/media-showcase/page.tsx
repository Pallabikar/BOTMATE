"use client";

import { useEffect, useState } from "react";
import CloudinaryImage from "@/components/CloudinaryImage";
import CloudinaryVideo from "@/components/CloudinaryVideo";
import UploadMedia from "@/components/UploadMedia";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  _id: string;
  url: string;
  public_id: string;
  resource_type: string;
  format: string;
  createdAt: string;
}

export default function MediaShowcase() {
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/media");
      const data = await response.json();
      setMediaLibrary(data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-20 px-6 font-geist">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Media Intelligence Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto"
          >
            Powered by Cloudinary & MongoDB. Optimized storage with AI-driven transformations.
          </motion.p>
        </header>

        {/* Upload Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Secure Transmission</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Upload assets directly to the neural cloud.</p>
          </div>
          <UploadMedia onUploadSuccess={fetchMedia} />
        </section>

        {/* Dynamic Media Library */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Media Library</h2>
            <button 
              onClick={fetchMedia}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Refresh Library
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {mediaLibrary.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative"
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                      {item.resource_type === "video" ? (
                        <CloudinaryVideo src={item.public_id} className="h-full w-full object-cover" />
                      ) : (
                        <CloudinaryImage 
                          src={item.public_id} 
                          alt="Library Image" 
                          width={600} 
                          height={600} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="text-xs font-mono text-neutral-500 uppercase">{item.format}</span>
                      <span className="text-[10px] text-neutral-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {mediaLibrary.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
              <p className="text-neutral-500">No media found in the library. Start by uploading above!</p>
            </div>
          )}
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Dynamic Transformations
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Every image in this library is automatically transformed on-the-fly. We use smart cropping, auto-format selection, and quality compression to ensure 100/100 performance scores.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Persistent Metadata
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Metadata for every upload is securely indexed in MongoDB. This allows for rapid searching, categorization, and cross-referencing of assets across the entire BotMate ecosystem.
            </p>
          </motion.div>
        </section>

        <footer className="text-center text-neutral-400 text-xs py-10 border-t border-neutral-200 dark:border-neutral-800">
          BotMate Neural Cloud v1.0 • Connected to Cluster0
        </footer>
      </div>
    </div>
  );
}
