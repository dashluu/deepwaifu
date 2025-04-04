"use client";
import Image from "next/image";
import Chat from "../chat/page";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./page.css";



export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characters = ["John", "Hubert", "Michael"];
  const avatars = [
    "/characters/placeholder1.avif",
    "/characters/placeholder2.avif",
    "/characters/placeholder3.avif"
  ]
  const occupations = ["student", "engineer", "teacher", "barista"];
  const personalities = ["witty", "mysterious", "cheeky", "stoic"];
  const [characterName, setCharacterName] = useState(characters[0]);
  const [avatar, setAvatar] = useState(avatars[0]);
  const [occupation, setOccupation] = useState(occupations[0]);
  const [personality, setPersonality] = useState(personalities[0]);
  const [age, setAge] = useState(18);
  const [keywords, setKeywords] = useState("");
  const [background, setBackground] = useState("");
  const [interests, setInterests] = useState("");

  const onCharacterChange = (event) => {
    const name = event.target.value;
    setCharacterName(name);
    const index = characters.indexOf(name);
    if (index !== -1) {
      setAvatar(avatars[index]);
    }
  };

  const onOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const onPersonalityChange = (event) => {
    setPersonality(event.target.value);
  };

  const onAgeChange = (event) => {
    setAge(event.target.value);
  }

  const onBackgroundChange = (event) => {
    setBackground(event.target.value);
  }

  const onInterestsChange = (event) => {
    setInterests(event.target.value);
  }

  const onKeywordsChange = (event) => {
    setKeywords(event.target.value);
  }

  async function newChat() {
    try {
      const character = {
        name: characterName,
        avatar: avatar,
        occupation: occupation,
        personality: personality,
        age: age,
        keywords: keywords,
        background: background,
        interests: interests
      }
      const response = await fetch("http://localhost:8000/new-chat", {
        method: "post",
        body: JSON.stringify(character),
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

  const onNewChat = (event) => {
    event.preventDefault();
    newChat();
  }

  const goHome = (event) => {
    event.preventDefault();
    router.push("/");
  }

  return (
    <div className="p-2">
      <div className="flex justify-center m-3">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="form-container p-4 rounded-lg bg-stone-900">
          <form method="post" onSubmit={onNewChat}>
            <div className="flex flex-col items-center">
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Age</legend>
                <div className="flex gap-2">
                  <input id="ageSlider" type="range" min="18" max="99" step="1" defaultValue="18" onChange={onAgeChange} />
                  <span>{age}</span>
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Character</legend>
                <div className="flex gap-3">
                  {characters.map((c, i) => {
                    return (
                      <label key={i}>
                        <input type="radio" name="character" value={c} checked={characterName === c} onChange={onCharacterChange} />
                        <img src={avatars[i]} width="100" height="100" draggable="false" />
                        {c}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Occupation</legend>
                <div className="flex gap-3">
                  {occupations.map((o, i) => {
                    return (
                      <div key={i} className="flex gap-1 flex-row justify-center items-center">
                        <input id={o} type="radio" name="occupation" value={o} checked={occupation === o} onChange={onOccupationChange} />
                        <label htmlFor={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Personality Traits</legend>
                <div className="flex gap-3">
                  {personalities.map((p, i) => {
                    return (
                      <div key={i} className="flex gap-1 flex-row justify-center items-center">
                        <input id={p} type="radio" name="personality" value={p} checked={personality === p} onChange={onPersonalityChange} />
                        <label htmlFor={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Background</legend>
                <input className="background-input outline-none bg-transparent w-96" type="text" name="background" onChange={onBackgroundChange} />
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Interests</legend>
                <input className="interests-input outline-none bg-transparent w-96" type="text" name="interests" onChange={onInterestsChange} />
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Keywords</legend>
                <input className="keyword-input outline-none bg-transparent w-96" type="text" name="keywords" onChange={onKeywordsChange} />
              </fieldset>
              <div className="flex flex-row gap-1">
                <input className="w-[7rem] m-2 chat-btn pt-2 pb-2 pl-3 pr-3 rounded-full cursor-pointer outline-none" type="submit" value="Let's Chat!" />
                <button className="w-[7rem] home-btn m-2 pt-2 pb-2 pl-3 pr-3 rounded-full cursor-pointer outline-none" onClick={goHome}>Home</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
