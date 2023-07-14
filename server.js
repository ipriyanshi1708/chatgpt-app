const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

// Setup server

const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  const { prompt, formality, tone } = req.body;

  const instruction = `Tone: ${tone}\nFormality: ${formality}`;
  const fullPrompt = `${prompt}\n\n${instruction}`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: fullPrompt,
  });
  res.send(completion.data.choices[0].text);
});

const PORT = 8020;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});