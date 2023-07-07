import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);
