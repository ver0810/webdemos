import { useEffect, useRef, useState } from "react"


function Stopwatch() {

    const [isrunning, setIsrunning] = useState(false);
    const [elapsedtime, setElapsedtime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);


    useEffect(() => {

        if (isrunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedtime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isrunning])
    function start() {
        setIsrunning(true);
        startTimeRef.current = Date.now() - elapsedtime;
    }

    function stop() {
        setIsrunning(false);
    }

    function reset() {
        setElapsedtime(0);
        setIsrunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedtime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedtime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedtime / (1000) % 60);
        let millisecondes = Math.floor((elapsedtime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        millisecondes = String(millisecondes).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}:${millisecondes}`;
    }

    return (
        <div className="Stopwatch">
            <div className="display">{formatTime()}</div>
            <div>
                <button onClick={start} className="start-btn">Start</button>
                <button onClick={stop} className="stop-btn">Stop</button>
                <button onClick={reset} className="reset-btn">Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;
