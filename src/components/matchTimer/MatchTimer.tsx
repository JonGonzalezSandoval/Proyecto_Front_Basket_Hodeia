import { useEffect, useState } from "react";

const JUGADORESLOCAL: string[] = ["Ander", "Leo", "Mikel", "Unax", "Peio"];
const JUGADOREVISITANTE: string[] = ["Mike", "Lucas", "Angel", "Unai", "Pedro"];

export default function MatchTimer() {
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number>(0);
  const [miliseconds, setMiliseconds] = useState<number>(0);
  const [matchTimer, setMatchTimer] = useState<number>(40);
  const [cuartos, setCuartos] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean | null>(null);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        if (miliseconds > 0) {
          setMiliseconds((miliseconds) => miliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMiliseconds(399);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setMatchTimer((matchTimer) => matchTimer - 1);
          setSeconds(59);
          setMiliseconds(399);
        }
      });
    }

    return () => clearInterval(interval);
  }, [miliseconds, seconds, minutes, isRunning]);

  function startTimer() : void{
    if (minutes !== 0 || seconds !== 0 || miliseconds !== 0) {
      setIsRunning(true);
    } else {
      setCuartos(cuartos + 1);
      window.alert("Reinicia el tiempo del cuarto");
    }
  }

  function stopTimer() : void{
    setIsRunning(false);
  }

  function restartTimer() :void{
    setIsRunning(false);
    setMinutes(10);
    setSeconds(0);
    setMiliseconds(0);
  }

  return (
    <>
      <div>
        <input type="range" min="0" max="40" value={matchTimer}/>
      </div>
      <div>
        <label htmlFor="">Minutos</label>
        <input value={minutes} readOnly />
      </div>
      <div>
        <label htmlFor="">Segundos</label>
        <input value={seconds} readOnly />
      </div>
      <div>
        <label htmlFor="">Milisegundos</label>
        <input value={miliseconds} readOnly />
      </div>
      {isRunning === null || !isRunning ? (
        <button onClick={startTimer}>Start</button>
      ) : (
        <button onClick={stopTimer}>Stop</button>
      )}
      <button onClick={restartTimer}>Restart</button>
    </>
  );
}
