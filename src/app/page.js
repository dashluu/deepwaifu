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
      <div className="flex justify-center">
        <img src="/deepwaifu.png" alt="DeepWaifu" width="400" height="400" />
      </div>
      <div className="flex flex-col justify-center items-center mt-[2rem] text-lg">
        <button className="w-[18rem] m-2 action-btn pt-2 pb-2 pl-3 pr-3 rounded-full cursor-pointer outline-none"
          onClick={navigateToPersonalized}>
          Create Your Own Character!
        </button>
        <button className="w-[18rem] m-2 mt-[1rem] action-btn pt-2 pb-2 pl-3 pr-3 rounded-full cursor-pointer outline-none"
          onClick={navigateToPremade}>
          Play with pre-made characters!
        </button>
      </div>
    </div>
  );
}