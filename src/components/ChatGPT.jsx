import React, { useState } from "react";
import axios from "axios";
import { Slider, Typography, Button } from "@mui/material";

export default function ChatGPT() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [formality, setFormality] = useState(50);
    const [tone, setTone] = useState(50);

    const HTTP = "http://localhost:8020/chat";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${HTTP}`, { prompt , formality, tone}).then(res => setResponse(res.data)).catch((error) => {
            console.log(error);
        });
    };

    const handlePrompt=(e)=> setPrompt(e.target.value);
    const handleFormality = (event,value) => setFormality(Number(value));
  const handleTone = (event,value) => setTone(Number(value));

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
        </div>
    )
}
