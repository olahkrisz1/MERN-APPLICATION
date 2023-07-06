import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);
