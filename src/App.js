import { useRef, useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { PillarBar } from './Pillar';
import bird from './bird.png';
import mountain from './mountain.png';
import {isMobile, isDesktop} from 'react-device-detect';
import sound from './jumpSound.mp3';
import gameOverSound from './gameOver.mp3';

function App() {

  const highScore = localStorage.getItem("flappyhighscore");
  const divRef = useRef(null);
  const birdRef = useRef(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [top, setTop] = useState(300);
  const [score, setScore] = useState(0);
  const [localHighScore, setHighScore] = useState(Math.floor(highScore));
  const [xaxis, setxaxis] = useState((window.innerWidth / 4) - 40);
  const [x2axis, setx2axis] = useState((window.innerWidth / 4) - 40 + 500);
  const [x3axis, setx3axis] = useState((window.innerWidth / 4) - 40 + 1000);
  const [rectTop, setrectTop] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isJumped, setIsJumped] = useState(false);
  const [isGameOver, setisGameOver] = useState(false);
  const [screenHeight, setScreenHeight] = useState("160")

  function handleGameOver() {
    const playAudio = () => {
      const audio = new Audio(gameOverSound);
      audio.play();
    };
    playAudio();
    setTimeout(()=> {
      
    var conform = window.confirm("game over" + "\nYour score: " + Math.floor(score));
    if (highScore == null) {
      localStorage.setItem("flappyhighscore", Math.floor(score));
    } else {
      if (score > highScore) {
        localStorage.setItem("flappyhighscore", Math.floor(score));
      }
    }
    if (conform) {
      window.location.reload();
    }
    }, 800)
    
  }

  useEffect(() => {
    const ground = divRef.current;
    const rect = ground.getBoundingClientRect();
    const timer = setInterval(() => {
      if (isGameStarted) {
        setScore(prev => prev + 0.01)
        setrectTop(rect.top)
        if (top >= rect.top) {
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
          handleGameOver();
        }


        if ((top >= 0 && top <= screenHeight) &&
          (xaxis <= 207 && xaxis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);
          setisGameOver(true);
          setTop(100);
        }

        if ((top >= rect.top-30 - screenHeight && top <= rect.top-20) &&
          (xaxis <= 207 && xaxis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
        }

        if ((top >= 0 && top <= screenHeight) &&
          (x2axis <= 207 && x2axis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
        }

        if ((top >= rect.top-30 - screenHeight && top <= rect.top-20) &&
          (x2axis <= 207 && x2axis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
        }
        if ((top >= 0 && top <= screenHeight) &&
          (x3axis <= 207 && x3axis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
        }

        if ((top >= rect.top-30 - screenHeight && top <= rect.top-20) &&
          (x3axis <= 207 && x3axis >= 167)) {
          handleGameOver();
          setIsGameStarted(false);

          setisGameOver(true);
          setTop(100);
        }




        if (x2axis < 0) {
          setx2axis(xaxis + 500);
        } else {
          setx2axis(prev => prev - 3)
        }

        if (x3axis < 0) {
          setx3axis(x2axis + 500);
        } else {
          setx3axis(prev => prev - 3)
        }

        if (xaxis < 0) {
          setxaxis(x3axis + 500);
        } else {
          setxaxis(prev => prev - 3);
        }

        setTop(prev => prev + 3);
      }
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [top]);

  function jump() {

    if(isGameStarted){

      const playAudio = () => {
        const audio = new Audio(sound);
        audio.play();
      };
      playAudio();
      setIsJumped(prev => !prev);
    setTop(prev => prev - 70);
    }else{
      setIsGameStarted(true);
      const playAudio = () => {
        const audio = new Audio(sound);
        audio.play();
      };
      playAudio();
      setIsJumped(prev => !prev);
    setTop(prev => prev - 70);
    }
  
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotation(45)

    }, 250);

    return () => {
      clearTimeout(timeout);
      setRotation(-100);
    };
  }, [isJumped]);

  function startToggle() {
    setIsGameStarted(prev => !prev);
    setTop(200);
    if(isGameStarted){
      handleGameOver();
    }
  }

  return (
    <div onClick={jump} className="App bg-gray-700  items-center w-screen overflow-hidden  h-screen flex flex-col">
      <div className='w-[350px] lg:w-[30%] flex flex-col overflow-hidden bg-teal-300 h-[896px]'>
        <div className='flex-[2.5] relative  flex-col w-full bg-blue-400 '>
          <img src={mountain} className='h-[90%] absolute bottom-[-26%]' alt="" />
          <p className='absolute text-white bg-red-400 rounded-xl p-2 top-20 font-bold left-1/4 text-5xl w-fit -z-0'>Score: {Math.floor(score)}</p>
          {localHighScore > 0 && <h1 className=' top-2 z-10 text-white absolute drop-shadow-lg left-5 text-3xl font-bold'>High score: {localHighScore}</h1>}
          <div ref={birdRef} className={`rotate-[${rotation}deg] bird relative  mx-auto rounded-full h-20 w-20`}
            style={{
              top: top,
            }}
          >
            <img src={bird} />
          </div>
          
          {!isGameStarted && <p className={`absolute mt-52 ml-32 text-3xl w-50 font-extrabold text-red-500`}>Tap to play!</p>}
          <PillarBar  toporbottom={"bottom-0"} xaxis={xaxis} />
          <PillarBar toporbottom={"top-0"} xaxis={xaxis} />
          <PillarBar toporbottom={"bottom-0"} xaxis={x2axis} />
          <PillarBar toporbottom={"top-0"} xaxis={x2axis} />
          <PillarBar toporbottom={"bottom-0"} xaxis={x3axis} />
          <PillarBar toporbottom={"top-0"} xaxis={x3axis} />
        </div>
        <div ref={divRef} className='z-10 flex-1 text-center bg-green-400 w-full'>
          <button onClick={startToggle} className='bg-red-400 mt-10 w-fit text-white p-3 rounded-xl font-extrabold mx-auto'>Start Game</button>
          <p className='text-6xl font-extrabold text-yellow-300 '>Flappy bird</p>
        </div>
      </div>
    </div>
  );
}


export default App;
