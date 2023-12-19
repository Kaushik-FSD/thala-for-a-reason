import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState, useRef } from "react";
import ShowImage from "./ShowImage";
import Alert from "@mui/material/Alert";
import thalaMusic from "./koyal-thala.mp3";

function App() {
  const [thalaText, setThalaText] = useState("");
  const [displayFlag, setDisplayFlag] = useState(false);
  let [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        const timeoutId = setTimeout(() => {
          setIsPlaying(false); // Stop the music after 20 seconds
        }, 10000);
        return () => clearTimeout(timeoutId);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const isThala = () => {
    const retunnVal = checkInput(thalaText);
    setDisplayFlag(retunnVal);
    setIsPlaying(retunnVal);
    setCount(Number(1));
  };

  const checkInput = (thalaStr) => {
    if (!isNaN(thalaStr)) {
      let n = parseInt(thalaStr);
      let sum = 0;
      while (n !== 0) {
        sum = sum + (n % 10);
        n = parseInt(n / 10);
      }

      if (sum % 7 === 0) {
        return true;
      } else {
        return false;
      }
    } else if (typeof thalaStr === "string" || thalaStr instanceof String) {
      return thalaStr.length === 7 ? true : false;
    } else {
      return false;
    }
  };

  const changeInput = (e) => {
    setThalaText(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <h1>THALA FOR A REASON</h1>
        <TextField
          onChange={changeInput}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={thalaText}
        />
        <Button
          onClick={isThala}
          className="thala-button"
          variant="outlined"
          size="large"
        >
          Thala ?
        </Button>
      </div>
      {displayFlag && (
        <div>
          <ShowImage />
          <audio ref={audioRef} src={thalaMusic} />
        </div>
      )}
      {displayFlag === false && count !== 0 && (
        <div>
          <Alert className="alert" variant="filled" severity="warning">
            {`${thalaText} is not Thala!`}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default App;
