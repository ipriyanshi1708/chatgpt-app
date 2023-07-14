import React, { useState} from "react";
import axios from "axios";
import { Slider, Typography, Button } from "@mui/material";

export default function ChatGPT() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [formality, setFormality] = useState(50);
    const [tone, setTone] = useState(50);
    const [messageHistory, setMessageHistory] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const HTTP = "http://localhost:8020/chat";

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
          prompt,
          formality,
          tone,
        };
        axios.post(`${HTTP}`, message).then((res) => {
          setResponse(res.data);
          setMessageHistory((prevHistory) => [...prevHistory, message]);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handlePrompt=(e)=> setPrompt(e.target.value);
    const handleFormality = (event,value) => setFormality(Number(value));
    const handleTone = (event,value) => setTone(Number(value));
    const handleClickMessage = (message) => {
      setSelectedMessage(message);
      setPrompt(message.prompt);
    };

    return (
        <div>
            <h1>ChatGPT</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Ask questions</label>
                    <input type="text" 
                    className="shadow-sm"
                    placeholder="Enter-text" 
                    value={prompt} 
                    onChange={handlePrompt}
                    />
                </div>
                <div>
          <Typography id="formality-slider-label">Formality</Typography>
          <Slider
            aria-labelledby="formality-slider-label"
            value={formality}
            onChange={handleFormality}
          />
          <Typography>{formality}%</Typography>
        </div>
        <div>
          <Typography id="tone-slider-label">Tone</Typography>
          <Slider
            aria-labelledby="tone-slider-label"
            value={tone}
            onChange={handleTone}
          />
          <Typography>{tone}%</Typography>
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
            </form>
            <div>
                <p>{response ? response : "Ask me anything...."}</p>
            </div>
            <div>
        <h3>Message History</h3>
        {messageHistory.map((message, index) => (
          <p key={index} onClick={()=> handleClickMessage(message)}
          style={{
            cursor: "pointer",
            textDecoration: selectedMessage ===message ? "underline": "none",
          }}
          >{message.prompt}</p>
        ))}
      </div>
        </div>
    )
}
