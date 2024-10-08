import React, { useEffect, useRef, useState } from "react";
import { CountDown } from "./CounDown";
import CountDownNew from "./ProgressBarTimer";
// import { idiomsWithExpAndVisuals } from "./data/List";
import { sentences } from "./data/Sentences";
import SpeechWaves from "./SpeechWaves";

const EnglishSentences = () => {
  // states
  const [data, setData] = useState();
  const [waves, setWaves] = useState();
  const [exp, setExp] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [speaker, setSpeaker] = useState(1);
  const [origin, setOrigin] = useState(false);
  const [reason, setReason] = useState(false);
  const [timer, setTimer] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
  let totalCount = sentences.length;
  let res;
  // create a reference to synth
  const synth = window.speechSynthesis;
  const getData = async () => {
    // const res = await fetch("http://localhost:8000/test");
    res = sentences[index];
    audioRef1.current?.play();
    setSpeaker(0);
    speechStart("Next senetnce ", 0);
    // const dataArray = await res.json();
    setExp(false);
    setOrigin(false);
    // setTimer(false);
    setReason(false);
    console.log(res);
    setData((current) => {
      return res;
    });
    speechStart(res?.sentence, 1, 1);
    speechStart(res?.sentence, 2, 1);
    speechStart(res?.sentence, 1, 2);
    speechStart(res?.sentence, 2, 2);

    // speechStart("option a.", 0);
    // speechStart("explanation.      " + res?.explanation, 4);
    // speechStart("lets discover its origin.  " + res?.origin, 5);
    // speechStart("for example. ", 0);
    // setTimeout(showAnswer, 2000);
    // ok = true;
    if (index + 1 === totalCount) {
      index = 0;
    } else index++;
    setQuestionNo(index);
    console.log("required: ", index, ok);
    // reset caption position
    setHighlightSection({
      from: 0,
      to: 0,
    });
  };

  const showTimer = () => {
    // setTimer((current) => true);
    audioRef2.current?.play();
    setTimeout(showAnswer, 8000);
  };
  const showAnswer = () => {
    setExp(true);
    audioRef.current?.play();
    setTimeout(() => {
      speechStart(res?.exp + " is correct exp", 0);
    }, 500);
    // setTimeout(showReason, 2000);
  };
  const showReason = () => {
    audioRef3.current?.play();
    setHighlightSection({
      from: 0,
      to: 0,
    });
    setReason(true);
    playReason(data);
    setTimeout(getData, 15000);
  };
  const playReason = () => {
    setDisabled(false);
    // speechStart(res?.exp + " is correct exp because ", 0);
    speechStart(res?.example, 1);
  };
  const playSentence = () => {
    setDisabled(false);
    // speechStart(res?.exp + " is correct exp because ", 0);
    speechStart(res?.sentence, 1);
  };

  const speechStart = (text, flag, mode = 0) => {
    // const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setDisabled(false);
    if (flag === 5) {
      setOrigin(true);
    }
    if (flag === 4) {
      setExp(true);
    }
    if (flag === 2) {
      u.pitch = 1;
      u.rate = 0.7;
      u.volume = 1;
    }
    if (flag === 1 || flag === 2) {
      u.addEventListener("start", () => {
        setWaves(true);
        if (mode === 2) {
          setSpeaker(2);
        } else {
          setSpeaker(1);
        }
      });
      u.addEventListener("end", () => {
        setWaves(false);
      });
      u.addEventListener("boundary", ({ charIndex, charLength }) => {
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
      });
    }

    const voices = window.speechSynthesis.getVoices();
    // console.log("voices", voices);
    if (voices.length > 0) {
      if (mode === 2) {
        u.voice = voices[111];
      } else {
        u.voice = voices[82];
      }
      ok = true;
    }
    // start waves
    if (synth.speaking) {
      // setWaves(true);
    }
    // };
    // handlePlay();
    // setIsPlaying(true);
    // setIsPaused(false);

    // speak the text using speechSynthesis
    // synth.speak(u);
    // console.log("state:", synth.pending);
    // console.log("startng voice:", text, synth.pending);
    synth.speak(u);
    console.log("state:", synth.pending);
    console.log("startng voice:", text, synth.pending);

    // setIsPaused(false);
  };

  useEffect(() => {
    // const intervalId = setInterval(getData, 32000);
    // const intervalId1 = setInterval(showAnswer, 20000);
    // return () => {
    //   clearInterval(intervalId);
    //   //   clearInterval(intervalId1);
    // };
    // --------------------
    // showTimer();
    const intervalId = setInterval(() => {
      if (!synth.speaking && ok) {
        // console.log("timer value:", timer);
        // if (!isComplete) {
        // const intervalId1 = setTimeout(showTimer, 1000);
        getData();
        // const intervalId1 = setTimeout(showAnswer, 10000);
        // const intervalId2 = setTimeout(showReason, 13000);
        // const intervalId3 = setTimeout(getData, 32000);
        // const intervalId2 = setTimeout(showAnswer, 13000);
        // setIsComplete((current) => true);
        ok = true;
        // const intervalId4 = setTimeout(getData, 25000);
        // }
        console.log("setinterval inside run:", ok);
      }
      console.log("useefect in setinterval", ok);
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
    <div className="bg-black w-full h-full py-2 rounded">
      <div className="flex justify-center items-start mt-[30px] w-full h-[515px]">
        <span className="px-2 py-0 text-cyan-50 ml-4 border-b-2">
          {questionNo}
        </span>
        {/* <p className="text-red-600">Total: {collocationsEnglish.length}</p> */}
        {/* {timer && (
        // <div className="absolute top-[10px]">
        <div className="absolute top-[30px] w-[660px]">
          <CountDownNew initMinute={0} initSeconds={7} />
        </div>
      )} */}
        <div className="mx-[200px] flex flex-col gap-4 w-full justify-center items-center relative mt-10">
          {/* image avatars */}
          <div className="flex justify-between items-center absolute top-0">
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 1
                ? "w-[120px] h-[120px] border-4 border-green-700"
                : speaker === 2
                ? "w-[80px] h-[80px]"
                : ""
            }`}
            >
              <img
                className="absolute -top-4 object-cover "
                src={"/images/female-avatar.jpg"}
                alt="avatar"
              />
            </div>
            {/* speech waves */}

            <div
              className={`transition-all ${
                waves ? "opacity-100" : "opacity-0"
              }`}
            >
              <SpeechWaves />
            </div>
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 2
                ? "w-[120px] h-[120px] border-4 border-green-700"
                : speaker === 1
                ? "w-[80px] h-[80px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 object-cover "
                src={"/images/male-avatar-3.jpg"}
                alt="avatar"
              />
            </div>
          </div>
          {/* Sentence */}
          <div className="flex-1 flex-col  rounded text-white text-2xl justify-center items-center font-semibold w-full mt-[140px]">
            <span className="px-4 text-lg ml-[2pxs] py-4 rounded-l text-gray-100 uppercase">
              Sentence
            </span>
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-4xl">
              {/* {data?.sentence} */}
              <HighlightedText
                text={data.sentence}
                {...highlightSection}
                disabled={disabled}
              />
              {/* <TextToSpeech text={data?.question} /> */}
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-between w-full mt-1">
            {/* Explanation */}
            {exp && (
              <div className="flex-1 flex flex-col items-start justify-start rounded text-white text-lg font-semibold">
                <span className="px-2 text-xl py-1 text-gray-100 uppercase">
                  Explanation
                </span>
                <p
                  className={`flex-1 py-4 px-6 rounded bg-teal-700 text-white/[0.9] trans text-xl font-semibold text-wrap
                     ${
                       timer
                         ? data?.exp === "c"
                           ? "!bg-green-700 text-white "
                           : "!bg-red-700"
                         : ""
                     }`}
                >
                  {data?.explanation}
                </p>
              </div>
            )}
            {/* Origin */}
            {/* <div className="flex-1 flex flex-col items-start justify-center rounded text-white text-lg font-semibold">
              <span className="px-2 text-xl py-2 rounded text-gray-100 flex items-start justify-center uppercase">
                Origin
              </span>
              <p
                className={`flex-1 py-4 px-6 rounded bg-teal-600 text-white/[0.9] trans text-lg font-semibold text-wrap ${
                  timer
                    ? data?.exp === "d"
                      ? "!bg-green-700 text-white "
                      : "!bg-red-700"
                    : ""
                } `}
              >
                {data?.origin}
              </p>
            </div> */}
            {/* example */}
          </div>
        </div>
        {1 && (
          <div className="text-left absolute bottom-8">
            {/* <span className="text-cyan-50 text-lg">For Example:</span> */}
            <p
              //   onClick={() => playReason(data)}
              className="p-4 py-2 mt-0 text-white text-nowrap text-xl font-normal rounded mx-1 text-center"
            >
              {/* {data?.explanation} */}
              <HighlightedText
                text={data.sentence}
                {...highlightSection}
                disabled={disabled}
                mode={2}
              />
            </p>
          </div>
        )}
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
    </div>
  );
};

export default EnglishSentences;

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to),
];

const HighlightedText = ({ text, from, to, disabled, mode = 1 }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <>
      {start}
      <span
        className={`${
          highlight.length === 0
            ? "bg-transparent"
            : mode === 1
            ? "bg-white text-pink-500 mt-0"
            : "text-pink-500 mt-0"
        }  rounded px-[0px] ${mode === 1 ? "font-semibold" : "font-normal"}`}
      >
        {highlight}
        {/* {finish.length} */}
      </span>
      {finish}
    </>
  );
};
