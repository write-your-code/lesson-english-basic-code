import { useEffect, useState } from "react";

const ThirtySecCounter = () => {
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const progress = (8 - timeLeft) / 8;

  return (
    <div>
      <div
        className="rounded relative ml-7 border-2 border-orange-300"
        style={{
          backgroundColor: "#000",
          height: "20px",
          borderRadius: "5px",
        }}
      >
        <div className="absolute w-full h-full flex items-center z-10 text-red-700 text-sm top-0 -ml-[5px]"
         style={{
          // right: "100%",
          left: `${progress * 100}%`,
        }}>
          <span>{timeLeft}</span>
        </div>
        <div
          style={{
            // width: `${progress * 100}%`,
            width: `${progress * 100}%`,
            height: "100%",
            // backgroundColor: "red",
            // borderRadius: "5px",
            position: "relative",
          }}
          className="bg-gradient-to-r from-orange-500  to-orange-300"
        />
        <span
          style={{
            // width: `${progress * 100}%`,
            position: "absolute",
            // right: "100%",
            left: `${progress * 100}%`,
            height: "100%",
            top: "-10px",
          }}
          className="text-4xl -ml-6"
        >
          🌟
        </span>
      </div>
    </div>
  );
};

export default ThirtySecCounter;
