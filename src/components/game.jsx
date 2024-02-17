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

  useEffect(() => {
    if (preGameCountdown > 0) {
      setTimeout(() => setPreGameCountdown(preGameCountdown - 1), 1000);
    }
  }, [preGameCountdown]);

  useEffect(() => {
    const handleClick = (event) => {
      const image = imageRef.current;
      const rect = image.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const imageWidth = image.clientWidth;
      const imageHeight = image.clientHeight;

      const percentageX = (x / imageWidth) * 100;
      const percentageY = (y / imageHeight) * 100;

      const closestPoint = findClosestPoint(percentageX, percentageY, points);
      if (closestPoint && closestPoint.distance < 10) {
        // Adjust distance sensitivity as needed
        const newPoints = points.filter((p) => p !== closestPoint.point);
        setPoints(newPoints);

        if (newPoints.length === 0) {
          const timeElapsed =
            (new Date().getTime() - startTimeRef.current) / 1000;
          setVictoryText(
            `You found all the bugs in ${timeElapsed.toFixed(2)} seconds!`,
          );
        }
      }
    };

    const image = imageRef.current;
    image.addEventListener("click", handleClick);

    return () => {
      image.removeEventListener("click", handleClick);
    };
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
    <div>
      {preGameCountdown > 0 ? (
        <div id="pre-game-info">
          {preGameCountdown > 1 ? preGameCountdown - 1 : "GO!"}
        </div>
      ) : (
        <img
          ref={imageRef}
          id="find-the-bug"
          src="/public/findthebug.jpg" // Update path to your image
          alt="Find the Bug Game"
          style={{
            width: "100%",
            height: "auto",
            display: victoryText ? "none" : "block",
          }}
        />
      )}
      {victoryText && <div id="victory-text">{victoryText}</div>}
    </div>
  );
};

export default Game;
