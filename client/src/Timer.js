import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="container"> 
            <div id="time">
                <span className="digit">{String(hours).padStart(2, "0")}</span>
                <span className="txt">Hr</span>
                <span className="digit">{String(minutes).padStart(2, "0")}</span>
                <span className="txt">Min</span>
                <span className="digit">{String(seconds).padStart(2, "0")}</span>
                <span className="txt">Sec</span>
                <span className="digit">{String(milliseconds).padStart(2, "0")}</span>
            </div>
            <div id="buttons">
                <button className="btn" onClick={handleStart}>Start</button>
                <button className="btn" onClick={handleStop}>Stop</button>
                <button className="btn" onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
