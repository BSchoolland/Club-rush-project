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

const GamePrototype = () => {
  const [points, setPoints] = useState(initialPoints);
  const [preGameCountdown, setPreGameCountdown] = useState(5);
  const [victoryText, setVictoryText] = useState("");
  const startTimeRef = useRef(new Date().getTime());
  const imageRef = useRef(null);
  const successAudioRef = useRef(new Audio("/success.mp3"));
  const victoryAudioRef = useRef(new Audio("/victory.mp3"));

  useEffect(() => {
    if (preGameCountdown > 0) {
      setTimeout(() => setPreGameCountdown(preGameCountdown - 1), 1000);
    }
  }, [preGameCountdown]);

  useEffect(() => {
    const handleClick = (event) => {
      const rect = image.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const imageWidth = image.clientWidth;
      const imageHeight = image.clientHeight;

      const percentageX = (x / imageWidth) * 100;
      const percentageY = (y / imageHeight) * 100;

      const closestPoint = findClosestPoint(percentageX, percentageY, points);
      if (closestPoint && closestPoint.distance < 10) {
        successAudioRef.current.play();
        const newPoints = points.filter((p) => p !== closestPoint.point);
        console.log("Points left: ", newPoints.length);
        setPoints(newPoints);

        if (newPoints.length === 0) {
          victoryAudioRef.current.play();
          const timeElapsed =
            (new Date().getTime() - startTimeRef.current) / 1000;
          setVictoryText(
            `You found all the bugs in ${timeElapsed.toFixed(2)} seconds!`,
          );
        }
      }
    };

    const image = imageRef.current;
    if (!image) return;
    image.addEventListener("click", handleClick);
    return () => image.removeEventListener("click", handleClick);
  }, [points]);

  const findClosestPoint = (x, y, points) => {
    if (points.length === 0) return null;

    return points.reduce((closest, point) => {
      const currentDistance = distance(x, y, point.x, point.y);
      if (currentDistance < (closest?.distance || Infinity)) {
        return { point, distance: currentDistance };
      }
      return closest;
    }, null);
  };

  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      {preGameCountdown > 0 ? (
        <div className="w-full text-center">
          <div id="pre-game-info" className="text-2xl font-bold">
            {preGameCountdown > 1 ? preGameCountdown - 1 : "GO!"}
          </div>
        </div>
      ) : (
        <div className="relative flex justify-center items-center w-full h-full">
          <img
            ref={imageRef}
            id="find-the-bug"
            src="/findthebug.jpg"
            alt="Find the Bug Game"
            className="max-w-full max-h-full object-contain"
            style={{ display: victoryText ? "none" : "block" }}
          />
          {/* Points overlays could be added here if you decide to visually represent them */}
        </div>
      )}
      {victoryText && (
        <div className="w-full text-center">
          <div id="victory-text" className="text-2xl font-bold">
            {victoryText}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePrototype;
