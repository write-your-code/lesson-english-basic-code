import React, { useEffect, useRef, useState } from "react";
import { CountDown } from "./CounDown";
import CountDownNew from "./ProgressBarTimer";
// import { idiomsWithExpAndVisuals } from "./data/List";
import { dailySentencesIn5Languages } from "./data/Languages";
import SpeechWaves from "./SpeechWaves";

const EnglishToMultiLanguages = () => {
  // states
  const [data, setData] = useState();
  const [waves, setWaves] = useState();
  const [exp, setExp] = useState(false);
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
  let totalCount = dailySentencesIn5Languages.length;
  let res;
  // create a reference to synth
  const synth = window.speechSynthesis;
  const getData = async () => {
    // reset caption position
    resetCaptionPosition();
    // const res = await fetch("http://localhost:8000/test");
    res = dailySentencesIn5Languages[index];
    setSpeaker(0);
    speechStart("Next senetnce ", 1, 0, 82);
    audioRef1.current?.play();
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

    // russian language => 229
    // for captions=true and normla speed=true
    speechStart(res?.russian, 1, 3, 229);
    // for captions=true and  slowspeed= true
    speechStart(res?.russian, 2, 3, 229);

    // french language => 141
    // for captions=true and normla speed=true
    speechStart(res?.french, 1, 4, 141);
    // for captions=true and  slowspeed= true
    speechStart(res?.french, 2, 4, 141);

    // german language => 154
    // for captions=true and normla speed=true
    speechStart(res?.german, 1, 5, 154);
    // for captions=true and  slowspeed= true
    speechStart(res?.german, 2, 5, 154);

    if (index + 1 === totalCount) {
      index = 0;
    } else index++;
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
    const intervalId = setInterval(() => {
      if (!synth.speaking && ok) {
        getData();
        ok = true;
        console.log("setinterval inside run:", ok);
      }
      console.log("useefect in setinterval", ok);
    }, 3000);
    return () => {
      clearInterval(intervalId);
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
        <div className="mx-[200px] flex flex-col gap-4 w-full justify-center items-center relative mt-0">
          {/* image avatars */}
          <div className="flex justify-between items-center gap-2 absolute top-0">
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
              speaker === 1
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 2 ||
                  speaker === 3 ||
                  speaker === 4 ||
                  speaker === 5
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 w-full h-full object-cover "
                src={"/images/american-female.png"}
                alt="avatar"
              />
            </div>
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 2
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 1 ||
                  speaker === 3 ||
                  speaker === 4 ||
                  speaker === 5
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 w-full h-full object-cover "
                src={"/images/arab-female.png"}
                alt="avatar"
              />
            </div>
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 3
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 1 ||
                  speaker === 2 ||
                  speaker === 4 ||
                  speaker === 5
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 w-full h-full object-cover "
                src={"/images/russian-female.png"}
                alt="avatar"
              />
            </div>
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 4
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 1 ||
                  speaker === 2 ||
                  speaker === 3 ||
                  speaker === 5
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 w-full h-full object-cover "
                src={"/images/french-female.png"}
                alt="avatar"
              />
            </div>
            <div
              className={`relative w-[100px] h-[100px] border-2 border-white rounded-full transition-all
            overflow-hidden ${
              speaker === 5
                ? "w-[120px] h-[120px] border-4 border-green-700 shadow-2xl shadow-green-600/80"
                : speaker === 1 ||
                  speaker === 2 ||
                  speaker === 3 ||
                  speaker === 4
                ? "w-[60px] h-[60px]"
                : ""
            }`}
            >
              <img
                className="absolute top-0 w-full h-full object-cover "
                src={"/images/german-female.png"}
                alt="avatar"
              />
            </div>
          </div>
          {/* Sentence */}
          <div className="flex-1 flex-col  rounded text-white text-2xl justify-center items-center font-semibold w-full mt-[140px]">
            {/* <span className="px-4 text-lg ml-[2pxs] py-4 rounded-l text-gray-100 uppercase">
              Sentence
            </span> */}
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-3xl">
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
            </p>
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-4xl">
              {/* {data?.sentence} */}
              {speaker === 3 ? (
                <HighlightedText
                  text={data.russian}
                  {...highlightSection}
                  disabled={disabled}
                />
              ) : (
                data?.russian
              )}
            </p>
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-4xl">
              {/* {data?.sentence} */}
              {speaker === 4 ? (
                <HighlightedText
                  text={data.french}
                  {...highlightSection}
                  disabled={disabled}
                />
              ) : (
                data?.french
              )}
            </p>
            <p className="px-4 flex-1 text-cyan-50 py-2 rounded text-center text-4xl">
              {/* {data?.sentence} */}
              {speaker === 5 ? (
                <HighlightedText
                  text={data.german}
                  {...highlightSection}
                  disabled={disabled}
                />
              ) : (
                data?.german
              )}
            </p>
          </div>
        </div>
        {/* captions at bottom */}
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
                  : speaker === 3
                  ? data.russian
                  : speaker === 4
                  ? data.french
                  : speaker === 5
                  ? data.german
                  : ""
              }`}
              {...highlightSection}
              disabled={disabled}
              captionToRun={2}
            />
          </p>
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
    </div>
  );
};

export default EnglishToMultiLanguages;

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
