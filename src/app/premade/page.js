"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function PremadePage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "/characters/maya.avif",
      alt: "Maya",
      description: `
        <b>Name</b>: Maya<br>
        <b>Age</b>: 19<br>
        <b>Personality</b>: Curious, studious, ambitious, compassionate, loyal, independent, determined, playful, witty<br>
        <b>Background & Interests</b>: Maya is a university student majoring in computer science and philosophy, 
        drawn to both the logic of programming and the deep questions of existence. She spends hours coding, debugging, 
        and discussing theories over coffee. Outside of academics, she enjoys reading sci-fi novels, sketching characters, 
        and playing strategy games. Despite her studious nature, Maya has an adventurous side—she dreams of traveling the 
        world and experiencing different cultures.
      `
    },
    {
      src: "/characters/serena.avif",
      alt: "Serena",
      description:  `
        <b>Name</b>: Serena<br>
        <b>Age</b>: 24<br>
        <b>Personality</b>: elegant, poised, charismatic, confident, inspirational, intelligent, emphathetic, rich<br>
        <b>Background & Interests</b>: Serena is the founder and CEO of LuxeVision Consulting
        a high-end business strategy firm specializing in branding, marketing, and corporate growth. 
        She started her company in her early 20s after realizing that many businesses lacked a cohesive vision. 
        Through her leadership, LuxeVision has helped startups scale into multi-million-dollar enterprises.
      `
    },
    {
      src: "/characters/luna.avif",
      alt: "Luna",
      description: `
        <b>Name</b>: Luna<br>
        <b>Age</b>: 22<br>
        <b>Personality</b>: creative, expressive, free-spirited, intuitive, dreamy, entertaining, gamer, streamer<br>
        <b>Background & Interests</b>: Luna is a full-time streamer and content creator, 
        best known for her skills in FPS, strategy games, and MMORPGs. 
        She started gaming as a kid, inspired by classic titles, and eventually turned her passion into a career. 
        Now, she has a dedicated fanbase on Twitch and YouTube, where she streams competitive matches, 
        reacts to game updates, and collaborates with other creators.
      `
    }
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const navigateToChat = () => {
    router.push("/chat");
  };

  const goBack = (event) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <div className="premade-container">
      <div className="flex justify-center m-3">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <button className="m-2 back-btn p-2 rounded-lg cursor-pointer outline-none" onClick={goBack}>
        Back to Home
      </button>
      <div className="flex justify-center m-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            width="300"
            height="300"
            className="m-2 cursor-pointer"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <div className="flex justify-center m-3">
        {selectedImage !== null && (
          <p className="text-center" dangerouslySetInnerHTML={{ __html: images[selectedImage].description }}></p>
        )}
      </div>
      <div className="flex justify-center m-3">
        <button
          className="m-2 chat-btn p-2 rounded-lg cursor-pointer outline-none"
          onClick={navigateToChat}
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
}