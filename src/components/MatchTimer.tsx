import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Container, ProgressBar } from "react-bootstrap";
import { io } from "socket.io-client";

type IMatchTimerProps = {
  partidoId: string | undefined;
};

const socket = io("http://localhost:3001");
const MatchTimer: React.FC<IMatchTimerProps> = ({ partidoId }) => {
  const totalSeconds = 10 * 60;
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number>(0);
  const [cuartos, setCuartos] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean | null>(null);

  const progress = ((minutes * 60 + seconds) / totalSeconds) * 100;

  useEffect(() => {
    socket.emit("joinMatchRoom", partidoId);

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          return 0;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes]);
  
  useMemo(()=>{
    socket.emit("timerUpdate", {
      partidoId,
      minutes,
      seconds,
      cuartos,
    });
  },[minutes, seconds, setMinutes, setSeconds])

  function startTimer(): void {
    if (minutes !== 0 || seconds !== 0) {
      setIsRunning(true);
    } else {
      setCuartos(cuartos + 1);
      window.alert("Reinicia el tiempo del cuarto");
    }
  }

  function stopTimer(): void {
    setIsRunning(false);
  }

  function restartTimer(): void {
    setIsRunning(false);
    setMinutes(10);
    setSeconds(0);
  }

  return (
    <>
      <Container className="mt-4">
        <div>
          <ProgressBar
            className="custom-progress-bar-animated"
            animated
            now={progress}
          />
        </div>
        <div>
          <h1>
            <Badge
              bg="light"
              text="black"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {minutes >= 10 ? minutes : `0${minutes}`}:
              {seconds >= 10 ? seconds : `0${seconds}`}
            </Badge>
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "5vh",
          }}
        >
          {isRunning === null || !isRunning ? (
            <Button
              variant="secondary"
              style={{ width: "20%", marginRight: "1vw" }}
              onClick={startTimer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </Button>
          ) : (
            <Button
              variant="secondary"
              style={{ width: "20%", marginRight: "1vw" }}
              onClick={stopTimer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-pause-btn-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.25-7C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
              </svg>
            </Button>
          )}
          <Button
            variant="secondary"
            style={{ width: "20%", marginLeft: "1vw" }}
            onClick={restartTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </Button>
        </div>
      </Container>
    </>
  );
};

export default MatchTimer;
