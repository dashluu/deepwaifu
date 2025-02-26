"use client";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./page.css";

export default function PremadePage() {
  const router = useRouter();
  const audioRefs = useRef([]);
  const searchParams = useSearchParams();

  const characters = [
    {
      avatar: "/characters/maya.avif",
      name: "Maya",
      age: 19,
      occupation: "student",
      personality: "Curious, studious, ambitious, compassionate, loyal, independent, determined, playful, witty",
      background: `Maya is a university student majoring in computer science and philosophy, drawn to both the logic 
      of programming and the deep questions of existence. She spends hours coding, debugging, and discussing theories over 
      coffee.`,
      interests: `Outside of academics, she enjoys reading sci-fi novels, sketching characters, and playing strategy games. 
      Despite her studious nature, Maya has an adventurous side—she dreams of traveling the world and experiencing different 
      cultures.`,
      audio: "/audio/maya.mp3"
    },
    {
      avatar: "/characters/serena.avif",
      name: "Serena",
      age: 24,
      occupation: "CEO",
      personality: "elegant, poised, charismatic, confident, inspirational, intelligent, emphathetic, rich",
      background: `Serena is the founder and CEO of LuxeVision Consulting, a high-end business strategy firm specializing
      in branding, marketing, and corporate growth. She started her company in her early 20s after realizing that many
      businesses lacked a cohesive vision. Through her leadership, LuxeVision has helped startups scale into multi-million-dollar
      enterprises.`,
      interests: `Serena is passionate about empowering`,
      audio: "/audio/serena.mp3"
    },
    {
      avatar: "/characters/luna.avif",
      name: "Luna",
      age: 22,
      occupation: "streamer",
      personality: "creative, expressive, free-spirited, intuitive, dreamy, entertaining, gamer, streamer",
      background: `Luna is a full-time streamer and content creator, best known for her skills in FPS, strategy games, and MMORPGs. 
      She started gaming as a kid, inspired by classic titles, and eventually turned her passion into a career. Now, she has a dedicated 
      fanbase on Twitch and YouTube, where she streams competitive matches, reacts to game updates, and collaborates with other creators.`,
      interests: `Luna's streams are known for their high energy and interactive gameplay. She loves engaging with her audience through 
      Q&A sessions and giveaways. When she's not streaming, Luna enjoys exploring new games and attending gaming conventions.`,
      audio: "/audio/luna.mp3"
    }
  ];

  const [character, setCharacter] = useState(characters[0]);

  const handleOnImageClick = (index) => {
    setCharacter(characters[index]);
  };

  const handleOnAudioPlay = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  };

  async function newChat() {
    try {
      const response = await fetch("http://localhost:8000/new-chat", {
        method: "post",
        body: JSON.stringify({
          name: character.name,
          avatar: character.avatar,
          occupation: character.occupation,
          personality: character.personality,
          age: character.age,
          keywords: "",
          background: character.background,
          interests: character.interests
        }),
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        const params = new URLSearchParams(searchParams.toString());
        params.set("id", data);
        router.push("/chat?" + params.toString());
      } else {
        // TODO: handle error
        console.log(response);
      }
    } catch (error) {
      // TODO: handle error
      console.log(error.message);
    }
  }

  const onNewChat = () => {
    newChat();
  };

  return (
    <div className="premade-container w-[60rem]">
      <div className="flex justify-center m-3">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <div className="justify-center mt-[1.5rem]">
        <div className="grid grid-cols-3 gap-4">
          {characters.map((character, index) => (
            <img key={index} src={character.avatar} alt={character.name}
              className="avatar w-[15rem] h-[15rem] m-2 cursor-pointer justify-center"
              onClick={() => handleOnImageClick(index)}
            />
          ))}
        </div>
        <div className="text-left w-[96%] mt-[1.5rem] text-lg m-auto">
          <div className="name"><strong>Name</strong>: {character.name}</div>
          <div className="age"><strong>Age</strong>: {character.age}</div>
          <div className="occupation"><strong>Occupation</strong>: {character.occupation}</div>
          <div className="personality"><strong>Personality</strong>: {character.personality}</div>
          <div className="background"><strong>Background</strong>: {character.background}</div>
          <div className="interests"><strong>Interests</strong>: {character.interests}</div>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-center w-[90%] m-auto mt-[1.5rem]">
        <button className="listen-btn p-2 w-[8rem] rounded-full cursor-pointer outline-none"
          onClick={() => handleOnAudioPlay(character)}>
          Listen to voice
        </button>
        <button className="chat-btn p-2 w-[8rem] rounded-full cursor-pointer outline-none"
          onClick={() => onNewChat()}>
          Let's Chat!
        </button>
        <button className="home-btn p-2 w-[8rem] rounded-full cursor-pointer outline-none"
          onClick={() => router.push("/")}>
          Home
        </button>
      </div>
    </div >
  );
}