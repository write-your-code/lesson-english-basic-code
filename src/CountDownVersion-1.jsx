import React, { useEffect } from "react";

const CountDownVersion = (props) => {
  const { initMinute = 0, initSeconds = 10 } = props;
  const [minutes, setMinutes] = React.useState(initMinute);
  const [seconds, setSeconds] = React.useState(initSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <div className="wrapper bg-black p-2 rounded">
        <>
          <h1 className="text-white font-semibold text-xl">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </>
      </div>
    </>
  );
};

export default CountDownVersion;
