"use client";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";

export default function Stories() {
  const [story, setStory] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const q = query(
          collection(db, "stories"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        setStories(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const submitStory = async () => {
    if (!story) return;
    setLoading(true);

    const newStory = {
      text: story,
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "stories"), newStory);
      setStories((prevStories) => [
        { id: docRef.id, ...newStory },
        ...prevStories,
      ]);
      setStory("");
      showNotification("Catatan berhasil dikirim! 🎉", "success");
    } catch (error) {
      console.error("Error saat menyimpan ke Firestore:", error);
      showNotification("Terjadi kesalahan, coba lagi.", "error");
    }

    setLoading(false);
  };

  const deleteStory = async (id) => {
    try {
      await deleteDoc(doc(db, "stories", id));
      setStories((prevStories) => prevStories.filter((s) => s.id !== id));
      showNotification("Catatan berhasil dihapus! 🗑️", "success");
    } catch (error) {
      console.error("Error saat menghapus catatan:", error);
      showNotification("Gagal menghapus catatan.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gradient-to-br from-purple-200 to-pink-300 p-6 text-black">
      {notification && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <motion.h1
        className="text-4xl font-bold text-gray-900 mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📖 Catatan Pribadi
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800 resize-none"
          rows="5"
          placeholder="Tulis catatanmu di sini..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        ></textarea>

        <button
          onClick={submitStory}
          className="mt-4 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim Catatan"}
        </button>
      </motion.div>

      <motion.div
        className="w-full max-w-md mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          📌 Catatan Terkini
        </h2>
        {stories.length > 0 ? (
          stories.map((s) => (
            <motion.div
              key={s.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md mb-4 border-l-4 border-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="text-gray-700">{s.text}</p>
                <p className="text-gray-600 text-sm mt-2">
                  {new Date(s.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteStory(s.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash size={20} strokeWidth={2} />
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 italic">Belum ada catatan...</p>
        )}
      </motion.div>
    </div>
  );
}
