import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Say hello in one sentence.",
    });

    console.log(response.output_text);
  } catch (err) {
    console.error("Error:");
    console.error(err);
  }
}

main();