import React, { useState, useEffect, useRef } from "react";

// Initial points configuration
const initialPoints = [
  { name: "Bug 1", x: 22, y: 85 },
  { name: "Bug 2", x: 80, y: 7 },
  { name: "Bug 3", x: 2, y: 15 },
  { name: "Bug 4", x: 45, y: 30 },
  { name: "Bug 5", x: 85, y: 2 },
  { name: "Bug 6", x: 37, y: 99 },
  { name: "Bug 7", x: 96, y: 31 },
];

const Game = () => {
  const [points, setPoints] = useState(initialPoints);
  const [preGameCountdown, setPreGameCountdown] = useState(5);
  const [victoryText, setVictoryText] = useState("");
  const startTimeRef = useRef(new Date().getTime());
  const imageRef = useRef(null);
  const successAudioRef = useRef(new Audio("/success.mp3"));
  const victoryAudioRef = useRef(new Audio("/victory.mp3"));
  var image = null;

  // Countdown Effect
  useEffect(() => {
    if (preGameCountdown > 0) {
      setTimeout(() => setPreGameCountdown(preGameCountdown - 1), 1000);
    }
  }, [preGameCountdown]);

  
  useEffect(() => {
    const handleClick = (event) => {
      try {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const imageWidth = image.clientWidth;
        const imageHeight = image.clientHeight;

        const percentageX = (x / imageWidth) * 100;
        const percentageY = (y / imageHeight) * 100;

        const closestPoint = findClosestPoint(percentageX, percentageY, points);
        if (closestPoint && closestPoint.distance < 10) {
          // play success sound
          successAudioRef.current.play();

          // Adjust distance sensitivity as needed
          const newPoints = points.filter((p) => p !== closestPoint.point);
          console.log("Points left: ", newPoints.length);
          setPoints(newPoints);

          if (newPoints.length === 0) {
            // All bugs found, play victory sound
            victoryAudioRef.current.play();
            const timeElapsed =
              (new Date().getTime() - startTimeRef.current) / 1000;
            setVictoryText(
              `You found all the bugs in ${timeElapsed.toFixed(2)} seconds!`,
            );
          }
        }
      } catch (error) {
        console.log("Error handling click: ", error);
      }
    };


    //Image gets registered along with evenListener
    setTimeout(() => {
    image = imageRef.current;
    if (image) {
      image.addEventListener("click", handleClick);
      return () => {
        image.removeEventListener("click", handleClick);
      };
    }
  }, 7000);
  }, [points]);

  const findClosestPoint = (x, y, points) => {
    if (points.length === 0) {
      return null;
    }

    let closestPoint = points[0];
    let closestDistance = distance(x, y, closestPoint.x, closestPoint.y);

    points.forEach((point) => {
      const currentDistance = distance(x, y, point.x, point.y);
      if (currentDistance < closestDistance) {
        closestPoint = point;
        closestDistance = currentDistance;
      }
    });

    return { point: closestPoint, distance: closestDistance };
  };

  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {preGameCountdown > 0 ? (
        <div id="pre-game-info" className="text-center text-2xl font-bold">
          {preGameCountdown > 1 ? preGameCountdown - 1 : "GO!"}
        </div>
      ) : victoryText ? (
        <div id="victory-text" className="text-5xl font-bold"></div>
      ) : (
        <div className="relative max-w-full h-auto">
          <img
            ref={imageRef}
            id="find-the-bug"
            src="/findthebug.jpg"
            alt="Find the Bug Game"
            className="w-full h-auto"
            style={{ display: victoryText ? "none" : "block" }}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
