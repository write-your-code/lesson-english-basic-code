import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CountDown = () => (
  <CountdownCircleTimer
    isPlaying
    duration={8}
    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[7, 5, 2, 0]}
    size={60}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);
