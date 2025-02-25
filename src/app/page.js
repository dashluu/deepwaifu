"use client";
import { useRouter } from "next/navigation";
import "./page.css";

export default function HomePage() {
  const router = useRouter();

  const navigateToPersonalized = () => {
    router.push("/personalized");
  };

  const navigateToPremade = () => {
    router.push("/premade");
  };

  return (
    <div className="homepage-container">
      <div className="flex justify-center m-3">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl m-3">Welcome to DeepWaifu!</h1>
        <button
          className="m-2 chat-btn p-2 rounded-lg cursor-pointer outline-none"
          onClick={navigateToPersonalized}
        >
          Create Your Own Character!
        </button>
        <button
          className="m-2 chat-btn p-2 rounded-lg cursor-pointer outline-none"
          onClick={navigateToPremade}
        >
          Play with pre-made characters!
        </button>
      </div>
    </div>
  );
}