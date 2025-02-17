import React from "react";
import VideoChat from "./VideoChat";

function Home() {
  const handleNextPerson = () => {
    console.log("Switching to next person");
    // Здесь будет логика переключения на следующего собеседника
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <VideoChat onNextPerson={handleNextPerson} />
    </div>
  );
}

export default Home;
