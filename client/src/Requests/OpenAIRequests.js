import { openai } from "./configai";

async function getAnswer(prompt) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAnswerFromAI(prompt) {
  const c = await getAnswer(prompt);
  return c;
}
