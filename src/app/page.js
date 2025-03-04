"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Daftar pujian romantis
const compliments = [
  "Senyummu bisa bikin hari ku lebih cerah! ☀️",
  "Kamu itu definisi keindahan yang nggak bisa dijelaskan dengan kata-kata. 💖",
  "Percaya diri aja, karena kamu luar biasa! 🔥",
  "Dunia lebih baik karena ada kamu di dalamnya. 🌍",
  "Kamu punya aura positif yang bikin orang nyaman di dekatmu. 😊",
  "Kamu berbakat dan lebih hebat dari yang kamu kira! 🎨",
  "Setiap kali aku melihatmu, semuanya terasa spesial. ✨",
  "Kamu seperti kopi pagi, bikin semangat! ☕",
  "Gaya kamu selalu keren dan unik, tetaplah jadi diri sendiri! 💃",
  "Jangan lupa kalau kamu itu spesial, lebih dari yang kamu bayangkan! 🌟",
  "Kamu itu magnet kebahagiaan, aku senang berada di dekatmu. 💕",
  "Kamu memiliki hati yang penuh kasih, itu yang membuatmu begitu luar biasa. ❤️",
  "Bicaramu selalu menyenangkan, aku bisa mendengarnya sepanjang hari. 🎶",
  "Kamu bikin dunia ini lebih indah hanya dengan menjadi dirimu sendiri. 🌷",
  "Senyummu lebih berharga dari semua berlian di dunia. 💎",
  "Kamu seperti sinar matahari setelah hujan, selalu membawa kehangatan. ☀️",
  "Ketulusanmu itu sesuatu yang jarang ditemukan, itu membuatmu sangat spesial. 🌸",
  "Kamu itu seperti lagu favoritku, bikin nyaman dan selalu ingin kuulangi. 🎵",
  "Kamu punya bakat luar biasa yang patut dibanggakan! 🌟",
  "Aku yakin kamu bisa mencapai semua impianmu karena kamu orang yang hebat! 🚀",
  "Setiap kali aku berbicara denganmu, rasanya seperti membaca buku favoritku. 📖",
  "Kamu menginspirasi banyak orang, termasuk aku. 💡",
  "Kamu adalah alasan aku tersenyum hari ini. 😊",
  "Caramu berbicara penuh dengan ketulusan, itu yang membuatmu spesial. 🥰",
  "Dari sekian banyak orang di dunia ini, kamu salah satu yang paling unik dan luar biasa. 🌏",
  "Aku yakin jika dunia punya lebih banyak orang sepertimu, tempat ini akan lebih indah. 🌍",
  "Ketulusanmu lebih berharga dari emas atau perak. 🏆",
  "Matamu itu seperti bintang di langit malam, bersinar dan menenangkan. ✨",
  "Kamu adalah paket komplit: cantik, lucu, dan baik hati. 🎁",
  "Kamu adalah definisi dari kecantikan sejati, luar dan dalam. 💖",
  "Orang-orang yang mengenalmu adalah orang yang beruntung. 🍀",
  "Aku suka caramu melihat dunia, begitu penuh dengan keindahan dan harapan. 🌅",
  "Kamu seperti pelangi setelah hujan, penuh warna dan menghidupkan suasana. 🌈",
  "Setiap kali kamu ada, semuanya terasa lebih baik. 🎇",
  "Aku yakin kamu bisa mencapai apapun yang kamu inginkan. 💪",
  "Kebaikanmu adalah hal yang paling indah darimu. 💕",
  "Kamu memiliki aura yang membuat aku merasa nyaman di sekitarmu. 🌿",
  "Ketulusanmu lebih berharga dari apapun di dunia ini. 💎",
  "Caramu berpikir unik, dan itu yang membuatmu istimewa. 🧩",
  "Aku tidak tahu apa yang dunia ini lakukan sebelum kamu ada. 😄",
  "Kamu adalah sumber inspirasi bagi banyak orang. 🌠",
  "Kamu membawa kedamaian ke dalam hidup orang lain, termasuk aku. ☮️",
  "Aku harap kamu tahu betapa berharganya kamu bagi orang-orang di sekitarmu. 💙",
  "Jangan pernah ragu, karena kamu lebih kuat dari yang kamu bayangkan. 🔥",
  "Senyummu adalah sihir yang bisa membuat hari aku lebih baik. 🪄",
  "Kamu adalah keindahan yang tak ternilai harganya. 💐",
  "Tak peduli seberapa sulit hariku, Komunikasi denganmu selalu membuatku lebih baik. 💬",
  "Kamu punya cara unik untuk membuat dunia ini lebih indah. 🎨",
  "Kamu tidak hanya cantik dari luar, tapi juga dari dalam. 🥰",
  "Setiap detik bersamamu terasa seperti hadiah. 🎁",
];

const gifs = [
  "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif",
  "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif",
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif",
  "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
  "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
];

export default function Home() {
  const [name, setName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);
  const [compliment, setCompliment] = useState(compliments[0]);
  const [gif, setGif] = useState(gifs[0]);
  const router = useRouter();

  const checkName = () => {
    if (name.trim().toLowerCase() === "fairuz chalisa") {
      setIsAuthorized(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const generateCompliment = () => {
    const randomCompliment =
      compliments[Math.floor(Math.random() * compliments.length)];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setCompliment(randomCompliment);
    setGif(randomGif);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-purple-600 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 opacity-80"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-full w-[800px] h-[800px] absolute animate-pulse"></div>
        </div>
      </div>

      {!isAuthorized ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-md p-6 bg-white text-gray-900 rounded-2xl shadow-2xl text-center"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Siapa namamu? 📝
          </h1>
          <motion.input
            type="text"
            placeholder="Masukkan nama..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 rounded-xl text-gray-900 focus:outline-none transition-all ${
              showError
                ? "border-2 border-red-500 bg-red-100"
                : "border-2 border-gray-300 focus:border-pink-500"
            }`}
            animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
          />
          <br />
          <motion.button
            onClick={checkName}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Masuk ❤️
          </motion.button>
          {showError && (
            <motion.p
              className="text-red-600 font-semibold mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Maaf bukan kamu orang nya!
            </motion.p>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-md p-6 bg-white text-gray-900 rounded-2xl shadow-2xl text-center"
        >
          <motion.img
            key={gif}
            src={gif}
            alt="Cute GIF"
            className="w-40 mx-auto mb-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.p
            key={compliment}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-gray-800"
          >
            {compliment}
          </motion.p>
          <motion.button
            onClick={generateCompliment}
            className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Lagi?! 💕
          </motion.button>

          <motion.button
            onClick={() => router.push("/notes")}
            className="mt-4 w-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Lihat Catatan 📖
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
