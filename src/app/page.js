"use client";
import Image from "next/image";
import Chat from "./chat/page";
import { useState } from "react";



export default function Home() {
  const [age, setAge] = useState(18);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  }


  return (
    <div className="p-2">
      <div className="flex justify-center m-3">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl m-3">Character Selection</h1>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <form method="post" action="/chat">
            <div className="flex flex-col items-center">
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
              <legend className="px-2">Age</legend>
                <div className="flex gap-2">
                  <input id="ageSlider" type="range" min="18" max="99" step="1" defaultValue="18" onChange={handleAgeChange}/>
                  <span>{age}</span>
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Character</legend>
                <div className="flex gap-3">
                    <label>
                      <input type="radio" name="character" value="placeholder1"/>
                      <img src="/characters/placeholder1.avif" alt="Placeholder 1" width="100" height="100" draggable="false" />
                      John
                    </label>
                    <label>
                      <input type="radio" name="character" value="placeholder2"/>
                      <img src="/characters/placeholder2.avif" alt="Placeholder 2" width="100" height="100" draggable="false" />
                      Hubert
                    </label>
                    <label>
                      <input type="radio" name="character" value="placeholder3"/>
                      <img src="/characters/placeholder3.avif" alt="Placeholder 3" width="100" height="100" draggable="false" />
                      Michael
                    </label>
                </div>
              </fieldset>
              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Occupation</legend>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <input id="student" type="radio" name="occupation" value="student" defaultChecked/>
                    <label htmlFor="student">Student</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="engineer" type="radio" name="occupation" value="engineer"/>
                    <label htmlFor="engineer">Engineer</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="teacher" type="radio" name="occupation" value="teacher"/>
                    <label htmlFor="teacher">Teacher</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="barista" type="radio" name="occupation" value="barista"/>
                    <label htmlFor="barista">Barista</label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Personality Traits</legend>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <input id="witty" type="radio" name="personality" value="witty" defaultChecked/>
                    <label htmlFor="witty">Witty</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="mysterious" type="radio" name="personality" value="mysterious"/>
                    <label htmlFor="mysterious">Mysterious</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="cheeky" type="radio" name="personality" value="cheeky"/>
                    <label htmlFor="cheeky">Cheeky</label>
                  </div>
                  <div className="flex gap-1">
                    <input id="stoic" type="radio" name="personality" value="stoic"/>
                    <label htmlFor="stoic">Stoic</label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-2 pb-2 px-2 m-2 text-center">
                <legend className="px-2">Keywords</legend>
                <input className="outline-none bg-transparent border-b-2 border-b-pink-500 w-96" type="text" name="keywords"/>
              </fieldset>
              
              <input className="m-2 bg-pink-500 p-2 rounded-lg cursor-pointer" type="submit" value="Let's Chat!"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
