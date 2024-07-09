import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [stoppedTimes, setStoppedTimes] = useState([]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1);
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      startTimer();
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStoppedTimes([time, ...stoppedTimes]);
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch-wrapper">
      <div className="stopwatch-timer">
        <h2>{formatTime(time)}</h2>
      </div>
      <div className="stopwatch-controls">
        <button className="control-btn start-btn" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="control-btn stop-btn" onClick={handleStop}>
          Stop
        </button>
        <button className="control-btn reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      {stoppedTimes.length > 0 && (
        <div className="time-list">
          <h3>Stopped Times:</h3>
          <ul>
            {stoppedTimes.map((stoppedTime, index) => (
              <li key={index}>{formatTime(stoppedTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
