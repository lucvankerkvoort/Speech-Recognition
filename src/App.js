import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import logo from "./logo.svg";
function App() {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      }
    },
    {
      command: "change font color to *",
      callback: (color) => {
        document.body.style.color = color;
      }
    },
    {
      command: "reset font color",
      callback: () => {
        document.body.style.color = "white";
      }
    },
    {
      command: "change background color to *",
      callback: (color) => {
        document.body.style.background = color;
      }
    },
    {
      command: "help",
      callback: () => {
        const modal = document.getElementById("modal")
        return modal.style.display = "flex"
      }
    },
    {
      command: "close help",
      callback: () => {
        const modal = document.getElementById("modal")
        return modal.style.display = "none"
      }
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "reset background color",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={logo} alt="mic" className="microphone-icon" />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      <div id="modal">
        <div className="modal-body">
        <h2>Welcome to React Speech Recognition</h2>
        <p>These are a list of commands you can use on me so go ahead and try them out</p>
        <ul>
          <li><h2>Open</h2>
            <p>Opens any webpage you would like to see in a new tab/window (e.g. google.com)</p></li>

          <li><h2>change background color</h2>
            <p>changes the background color to any color you like (e.g. yellow)</p></li>

          <li><h2>reset background color</h2>
            <p>changes the background color back to its original color</p></li>


          <li><h2>change font color</h2>
            <p>changes the font color to any color you like (e.g. blue)</p></li>

          <li><h2>reset font color</h2>
            <p>changes the font color back to white</p></li>
            
          <li><h2>reset</h2>
            <p>Resets the speech recognition to its initial values and stops the listening process</p></li>
            
          <li><h2>help</h2>
            <p>opens up this modal</p></li>

            <li><h2>close help</h2>
            <p>closes up this modal</p></li>

        </ul>
        </div>
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>

      )}
    </div>
  );
}
export default App;