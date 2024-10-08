import React, { useEffect, useRef, useState } from "react";
import { CountDown } from "./CounDown";
import CountDownNew from "./ProgressBarTimer";
// import { idiomsWithExpAndVisuals } from "./data/List";
import { idiomsWithExample } from "./data/List";

const EnglishIdioms = () => {
  // states
  const [data, setData] = useState();
  const [answer, setAnswer] = useState(false);
  const [reason, setReason] = useState(false);
  const [timer, setTimer] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [highlightSection, setHighlightSection] = useState({
    from: 0,
    to: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  // useRef states
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);

  let ok = true;
  let index = 0;
  let totalCount = idiomsWithExample.length;
  let res;
  // create a reference to synth
  const synth = window.speechSynthesis;
  const getData = async () => {
    // const res = await fetch("http://localhost:8000/test");
    res = idiomsWithExample[index];
    audioRef1.current?.play();
    speechStart("Next idiom", 0);
    // const dataArray = await res.json();
    setAnswer(false);
    setTimer(false);
    setReason(false);
    console.log(res);
    setData((current) => {
      return res;
    });
    speechStart(res?.idiom, 0);
    // speechStart("option a.", 0);
    speechStart("option a.      " + res?.options.a, 0);
    speechStart("option b.  " + res?.options.b, 0);
    speechStart("option c. " + res?.options.c, 0);
    speechStart("option d. " + res?.options.d, 0);
    ok = true;
    if (index + 1 === totalCount) {
      index = 0;
    } else index++;
  };

  const showTimer = () => {
    setTimer((current) => true);
    audioRef2.current?.play();
    setTimeout(showAnswer, 8000);
  };
  const showAnswer = () => {
    setAnswer(true);
    audioRef.current?.play();
    setTimeout(() => {
      speechStart(res?.answer + " is correct answer", 0);
    }, 500);
    setTimeout(showReason, 2000);
  };
  const showReason = () => {
    audioRef3.current?.play();
    setReason(true);
    playReason(data);
    setTimeout(getData, 15000);
    setHighlightSection({
      from: 0,
      to: 0,
    });
  };
  const playReason = () => {
    setDisabled(false);
    // speechStart(res?.answer + " is correct answer because ", 0);
    speechStart(res?.explanation || res.reason, 1);
  };

  const speechStart = (text, flag) => {
    // const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setDisabled(false);
    if (flag === 1) {
      u.addEventListener("start", () => setDisabled(true));
      u.addEventListener("end", () => setDisabled(false));
      u.addEventListener("boundary", ({ charIndex, charLength }) => {
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
      });
    }
    // const handlePlay = () => {
    // const synth = window.speechSynthesis;

    // if (isPaused) {
    //   synth.resume();
    // }
    const voices = window.speechSynthesis.getVoices();
    // console.log("voices", voices);
    if (voices.length > 0) {
      u.voice = voices[82];
    }
    synth.speak(u);
    console.log("state:", synth.pending);
    console.log("startng voice:", text, synth.pending);

    // setIsPaused(false);
  };

  useEffect(() => {
    // const intervalId = setInterval(getData, 32000);
    // // const intervalId1 = setInterval(showAnswer, 20000);
    // return () => {
    //   clearInterval(intervalId);
    //   //   clearInterval(intervalId1);
    // };
    // --------------------
    // showTimer();

    const intervalId = setInterval(() => {
      if (!synth.speaking && ok) {
        console.log("timer value:", timer);
        // if (!isComplete) {
        // const intervalId1 = setTimeout(showTimer, 1000);
        showTimer();
        // const intervalId1 = setTimeout(showAnswer, 10000);
        // const intervalId2 = setTimeout(showReason, 13000);
        // const intervalId3 = setTimeout(getData, 32000);
        // const intervalId2 = setTimeout(showAnswer, 13000);
        // setIsComplete((current) => true);
        ok = false;
        // const intervalId4 = setTimeout(getData, 25000);
        // }
        console.log("setinterval inside run:");
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
      // clearInterval(intervalId1);
      // clearInterval(intervalId2);
      // clearInterval(intervalId3);
      // clearInterval(intervalId4);
    };
  }, []);
  useEffect(() => {
    getData();
  }, []);

  //   const { question, a, b, c, d } = data;

  if (!data) {
    return (
      <div className="flex justify-center items-center mt-[50px] w-full h-[500px]">
        <div className="w-full h-full flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-start mt-[30px] w-full h-[500px]">
      {/* <p className="text-red-600">Total: {idiomsWithExample.length}</p> */}
      <div className="mx-[250px] flex flex-col gap-4 w-full justify-center items-center">
        <span className="px-2 py-0 text-teal-700 text-3xl border-b-2 border-teal-600 font-semibold text-wrap mb-4">
          English Idioms
        </span>
        {/* timer */}
        {timer && (
          // <div className="absolute top-[10px]">
          <div className="w-[400px] absolute top-[90px]">
            <CountDownNew initMinute={0} initSeconds={7} />
          </div>
        )}
        {/* img */}
        {/* <img src={data?.visualAid} alt="" className="w-6 h-6" /> */}
        {/* {idiomsWithExpAndVisuals200.length} */}
        {/* Question */}
        <div className="flex-1 flex  rounded text-white text-2xl font-semibold mb-4 w-full">
          <span className="px-4 text-xl ml-1 bg-teal-700 py-4 rounded-l text-gray-100 flex  uppercase">
            Q
          </span>
          <p
            className={`${
              data?.idiom.length > 50 ? "text-lg " : ""
            } px-6 flex-1 bg-teal-500 trans py-4 rounded-r`}
          >
            {data?.idiom}
            {/* <HighlightedText
              text={data.idiom}
              {...highlightSection}
              disabled={disabled}
            /> */}
            {/* <TextToSpeech text={data?.question} /> */}
          </p>
        </div>
        {/* Options */}
        <div className="flex flex-col gap-3 justify-between w-full text-nowrap mt-0">
          {/* <div className="flex justify-between items-center w-full gap-4"> */}
          {/* option A */}
          <div
            className={`flex-1  flex items-center text-white text-lg font-semibold `}
          >
            <span className="px-4 text-xl ml-1 bg-teal-700 py-3 rounded-l text-gray-100 flex items-center uppercase">
              a
            </span>
            <p
              className={`flex-1 px-6 text-xl bg-teal-500 trans py-3 ${
                answer
                  ? data?.answer === "a"
                    ? "!bg-green-700 text-white "
                    : "!bg-red-700"
                  : ""
              }  rounded-r`}
            >
              {data?.options?.a}
            </p>
          </div>
          {/* option B */}
          <div
            className="flex-1   flex items-center justify-end
              rounded text-white text-lg font-semibold"
          >
            <span className="px-4 text-xl ml-1 bg-teal-700 py-3 rounded-l text-gray-100 flex items-center uppercase">
              b
            </span>
            <p
              className={`flex-1 py-3 px-6 rounded-r bg-teal-500 trans text-white text-xl font-semibold ${
                answer
                  ? data?.answer === "b"
                    ? "!bg-green-700 text-white "
                    : "!bg-red-700"
                  : ""
              }`}
            >
              {data?.options?.b}
            </p>
          </div>
          {/* </div> */}
          {/* <div className="flex justify-between items-center w-full gap-2"> */}
          {/* option C */}
          <div className="flex-1  flex items-center rounded text-white text-lg font-semibold">
            <span className="px-4 text-xl ml-1 bg-teal-700 py-3 rounded-l text-gray-100 flex items-center uppercase">
              c
            </span>
            <p
              className={`flex-1 py-3 px-6 rounded-r bg-teal-500 trans text-white text-xl font-semibold ${
                answer
                  ? data?.answer === "c"
                    ? "!bg-green-700 text-white "
                    : "!bg-red-700"
                  : ""
              }`}
            >
              {data?.options.c}
            </p>
          </div>

          {/* option D */}
          <div className="flex-1  flex items-center justify-end  rounded text-white text-lg font-semibold">
            <span className="px-4 text-xl ml-1 bg-teal-700 py-3 rounded-l text-gray-100 flex items-center uppercase">
              d
            </span>
            <p
              className={`flex-1 py-3 px-6 rounded-r bg-teal-500 trans text-white text-xl font-semibold ${
                answer
                  ? data?.answer === "d"
                    ? "!bg-green-700 text-white "
                    : "!bg-red-700"
                  : ""
              } `}
            >
              {data?.options?.d}
            </p>
          </div>
          {/* </div> */}
          {/* <p>{data?.answer}</p> */}
          {reason && (
            <p
              //   onClick={() => playReason(data)}
              className="bg-teal-900 p-4  text-white text-wrap text-lg font-medium w-[700px] rounded  bottom-4 mx-10 trans-reason"
            >
              {/* {data?.explanation} */}
              <HighlightedText
                text={data?.explanation || data?.reason}
                {...highlightSection}
                disabled={disabled}
              />
            </p>
          )}
        </div>
      </div>
      {/* {audios} */}
      <>
        <audio ref={audioRef}>
          <source src="Ding.mp3" type="audio/mpeg" />
          <p>Your browser does not support the audio element.</p>
        </audio>

        <audio ref={audioRef1}>
          <source src="Swoosh.mp3" type="audio/mpeg" />
          <p>Your browser does not support the audio element.</p>
        </audio>

        <audio ref={audioRef2}>
          <source src="Clock.mp3" type="audio/mpeg" />
          <p>Your browser does not support the audio element.</p>
        </audio>

        <audio ref={audioRef3}>
          <source src="Pop.mp3" type="audio/mpeg" />
          <p>Your browser does not support the audio element.</p>
        </audio>
      </>
      {/* )} */}
    </div>
  );
};

export default EnglishIdioms;

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to),
];

const HighlightedText = ({ text, from, to, disabled }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <>
      {start}
      <span
        className={`${
          highlight.length === 0 ? "bg-transparent" : "bg-white text-black"
        }  rounded py-1 px-[1px]`}
      >
        {highlight}
        {/* {highlight.length} */}
      </span>
      {finish}
    </>
  );
};
