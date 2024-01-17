import OpenAI from "openai";
import { NEW_OPENAPI_GPT_KEY, OPENAI_GPT_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: NEW_OPENAPI_GPT_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
