import React, { useState, useEffect } from "react";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MIN = 1;
const MAX = 20;

function App() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start guessing...");
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [number, setNumber] = useState(getRandomInt(MIN, MAX));

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        alert(`The real answer is ${number}`);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [number]);

  useEffect(() => {
    document.body.style.backgroundColor = showNumber ? "#60b347" : "";
  }, [showNumber]);

  const handleCheck = () => {
    if (!guess || Number(guess) <= 0) {
      setMessage("⛔️ Invalid Number!");
      return;
    }

    if (score > 1) {
      if (Number(guess) === number) {
        setShowNumber(true);
        setHighscore(Math.max(highscore, score));
        setMessage("🎉 Correct Number!");
      } else {
        setMessage(guess > number ? "📈 Too high!" : "📉 Too low!");
        setScore(score - 1);
      }
    } else {
      setMessage("💥 You lost the game!");
      setScore(0);
    }
  };

  const handleAgain = () => {
    setGuess("");
    setMessage("Start guessing...");
    setShowNumber(false);
    setNumber(getRandomInt(MIN, MAX));
    setScore(20);
  };

  return (
    <>
      <header>
        <h1>Guess The Number!</h1>
        <p className="between">
          (Between {MIN} and {MAX})
        </p>
        <button className="btn again" onClick={handleAgain}>
          Again!
        </button>
        <div
          className="number"
          style={{ width: showNumber ? "30rem" : "15rem" }}
        >
          {showNumber ? number : "?"}
        </div>
      </header>

      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button className="btn check" onClick={handleCheck}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highscore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
