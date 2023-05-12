import * as fs from "fs";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const prompt = fs.readFileSync("./input.txt", "utf8");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chatGPTAnswer() {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

chatGPTAnswer();
