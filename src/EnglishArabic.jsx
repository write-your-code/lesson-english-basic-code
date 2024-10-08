import React, { useEffect, useRef, useState } from "react";
import { CountDown } from "./CounDown";
import CountDownNew from "./ProgressBarTimer";
// import { idiomsWithExpAndVisuals } from "./data/List";
import { dailySentences } from "./data/Languages";
import SpeechWaves from "./SpeechWaves";

const EnglishArabic = () => {
  // states
  const [data, setData] = useState();
  const [waves, setWaves] = useState();
  const [exp, setExp] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [speaker, setSpeaker] = useState(1);
  const [lang, setLang] = useState(1);
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
  let totalCount = dailySentences.length;
  let res;
  // create a reference to synth
  const synth = window.speechSynthesis;
  const getData = async () => {
    // reset caption position
    resetCaptionPosition();
    // const res = await fetch("http://localhost:8000/test");
    res = dailySentences[index];
    audioRef1.current?.play();
    setSpeaker(0);
    speechStart("Next senetnce ", 1, 0, 82);
    // const dataArray = await res.json();
    setExp(false);
    setOrigin(false);
    // setTimer(false);
    setReason(false);
    console.log(res);
    setData((current) => {
      return res;
    });

    // (text, voiceSpeed, captionToRun = 0, language = 0)
    // english language => 82
    // for captions=true and normla speed=true and chang language = false
    speechStart(res?.english, 1, 1, 82);
    // for captions=true and  slowspeed= true
    speechStart(res?.english, 2, 1, 82);

    // arabic language => 32
    // for captions=true and normla speed=true
    speechStart(res?.arabic, 1, 2, 32);
    // for captions=true and  slowspeed= true
    speechStart(res?.arabic, 2, 2, 32);

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
    resetCaptionPosition();
  };

  const resetCaptionPosition = () => {
    setHighlightSection({ from: 0, to: 0 });
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
    speechStart(res?.english, 1);
  };

  // const speechStart = (text, voiceSpeed, captionToRun = 0, lang = 0) => {
  //   // const synth = window.speechSynthesis;
  //   const u = new SpeechSynthesisUtterance(text);
  //   setDisabled(false);
  //   if (voiceSpeed === 5) {
  //     setOrigin(true);
  //   }
  //   if (voiceSpeed === 4) {
  //     setExp(true);
  //   }
  //   if (voiceSpeed === 2) {
  //     u.pitch = 0.8;
  //     u.rate = 0.75;
  //     u.volume = 1;
  //   }
  //   if (voiceSpeed === 1 || voiceSpeed === 2) {
  //     u.addEventListener("start", () => {
  //       setWaves(true);
  //       if (captionToRun === 2) {
  //         setSpeaker(2);
  //       } else {
  //         setSpeaker(1);
  //       }
  //     });
  //     u.addEventListener("end", () => {
  //       setWaves(false);
  //       resetCaptionPosition();
  //     });
  //     u.addEventListener("boundary", ({ charIndex, charLength }) => {
  //       setHighlightSection({ from: charIndex, to: charIndex + charLength });
  //     });
  //   }

  //   const voices = window.speechSynthesis.getVoices();
  //   // console.log("voices", voices);
  //   if (voices.length > 0) {
  //     if (lang === 1) {
  //       u.voice = voices[82];
  //     } else if (lang === 2) {
  //       u.voice = voices[32];
  //     } else {
  //       u.voice = voices[82];
  //     }
  //     ok = true;
  //   }
  //   // start waves
  //   if (synth.speaking) {
  //     // setWaves(true);
  //   }
  //   // };
  //   // handlePlay();
  //   // setIsPlaying(true);
  //   // setIsPaused(false);

  //   // speak the text using speechSynthesis
  //   // synth.speak(u);
  //   // console.log("state:", synth.pending);
  //   // console.log("startng voice:", text, synth.pending);
  //   synth.speak(u);
  //   console.log("state:", synth.pending);
  //   console.log("startng voice:", text, synth.pending);
  //   // reset caption position
  //   resetCaptionPosition();
  //   // setIsPaused(false);
  // };

  const speechStart = (text, voiceSpeed, captionToRun = 0, lang = 0) => {
    // const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    //
    setDisabled(false);

    // change voice speed and pitch if 2 is passed then slow speed otherwise normal
    if (voiceSpeed === 2) {
      u.pitch = 0.8;
      u.rate = 0.65;
      u.volume = 1;
    }

    // decide which subtilte/caption to run if 0 is passed wont run any caption
    if (captionToRun !== 0) {
      u.addEventListener("start", () => {
        setWaves(true);
        if (captionToRun) {
          setSpeaker(captionToRun);
        }
      });

      u.addEventListener("end", () => {
        setWaves(false);
        resetCaptionPosition();
      });
      u.addEventListener("boundary", ({ charIndex, charLength }) => {
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
      });
    }

    // get all voices
    const voices = window.speechSynthesis.getVoices();

    // change voice language whatever is come in arg
    if (voices.length > 0) {
      u.voice = voices[lang];
    } else {
      u.voice = voices[82];
    }

    // for next sentence if its true useeffect inner fucntion setinterval would run
    ok = true;

    // strat speaking
    synth.speak(u);
    console.log("state:", synth.pending);
    console.log("startng voice:", text, synth.pending);
    // reset caption position
    resetCaptionPosition();
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
      <div className="flex justify-center items-start mt-[30px] w-full h-[520px]">
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
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 2
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="w-full h-full object-cover "
                src={"/images/american-female.png"}
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
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 1
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="w-full h-full object-cover "
                src={"/images/arab-female.png"}
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
              {speaker === 1 ? (
                <HighlightedText
                  text={data.english}
                  {...highlightSection}
                  disabled={disabled}
                />
              ) : (
                data?.english
              )}
              {/* <TextToSpeech text={data?.question} /> */}
            </p>
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-4xl">
              {/* {data?.sentence} */}
              {speaker === 2 ? (
                <HighlightedText
                  text={data.arabic}
                  {...highlightSection}
                  disabled={disabled}
                />
              ) : (
                data?.arabic
              )}
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
          <div className="text-left absolute bottom-4">
            {/* <span className="text-cyan-50 text-lg">For Example:</span> */}
            <p
              //   onClick={() => playReason(data)}
              className="p-4 py-2 mt-0 text-white text-nowrap text-xl font-normal rounded mx-1 text-center"
            >
              <HighlightedText
                text={`${
                  speaker === 1
                    ? data.english
                    : speaker === 2
                    ? data.arabic
                    : ""
                }`}
                {...highlightSection}
                disabled={disabled}
                captionToRun={2}
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

export default EnglishArabic;

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to),
];

const HighlightedText = ({ text, from, to, disabled, captionToRun = 1 }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <>
      {start}
      <span
        className={`${
          highlight.length === 0
            ? "bg-transparent"
            : captionToRun === 1
            ? "bg-white text-pink-500 mt-0"
            : "text-pink-500 mt-0"
        }  rounded px-[0px] ${
          captionToRun === 1 ? "font-semibold" : "font-normal"
        }`}
      >
        {highlight}
        {/* {finish.length} */}
      </span>
      {finish}
    </>
  );
};
