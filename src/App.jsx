import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [isStart, setisStart] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hour < 0 || minute < 0 || second <= 0) {
      alert("invalid Input");
      return;
    } else {
      setisStart(true);
    }
  };

  const handlePause = () => {
    setisPaused(true);
    clearInterval(timerId);
  };
  const handleReset = () => {
    setisStart(false);
  };
  const handleResume = () => {
    setisPaused(false);
    runTimer(second, hour, minute);
  };

  const handleValue = (e) => {
    console.log(e.target.id, e.target.value);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hour") {
      setHour(value);
    } else if (id === "minute") {
      setMinute(value);
    } else {
      setSecond(value);
    }
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSecond((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinute((m) => m - 1);
      setSecond(59);
    } else {
      setHour((h) => h - 1);
      setMinute(59);
      setSecond(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      setHour(0);
      setMinute(0);
      setSecond(0);
      clearInterval(tid);
      alert("Timer is Finished");
    }
  };
  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(second, minute, hour, tid);
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hour, minute, second]);
  console.log(hour, minute, second);
  return (
    <>
      <div className="APP">
        <h1>Countdown timer</h1>
        {!isStart && (
          <div className="input-container">
            <div className="input-box">
              <input id="hour" placeholder="HH" onChange={handleValue} />
              <input id="minute" placeholder="MM" onChange={handleValue} />
              <input id="second" placeholder="SS" onChange={handleValue} />
            </div>
            <div className="cen-btn">
              <button onClick={handleStart} className="timer-button">
                Start
              </button>
            </div>
          </div>
        )}

        {isStart && (
          <div className="show-container">
            <div className="timer-box">
              <div>{hour < 10 ? `0${hour}` : hour}</div>
              <span>:</span>
              <div>{minute < 10 ? `0${minute}` : minute}</div>
              <span>:</span>
              <div>{second < 10 ? `0${second}` : second}</div>
            </div>
            <div className="action-box cen-btn">
              {!isPaused && (
                <button className="timer-btn" onClick={handlePause}>
                  Pasuse
                </button>
              )}
              {isPaused && (
                <button className="timer-btn" onClick={handleResume}>
                  Resume
                </button>
              )}
              <button className="timer-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
