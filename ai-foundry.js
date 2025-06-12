import dotenv from "dotenv";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

async function main() {
  const client = new ModelClient(
    "https://aistudioaiservices380144926400.cognitiveservices.azure.com",
    new AzureKeyCredential(
      process.env.AZURE_INFERENCE_SDK_KEY ?? "YOUR_KEY_HERE"
    )
  );

  var messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "What are 3 things to see in Seattle?" },
  ];

  var response = await client
    .path("/openai/deployments/gpt-4.1/chat/completions")
    .post({
      body: {
        messages: messages,
        max_tokens: 800,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
    });

  if (response.status === "200") {
    console.log("\nAI Assistant's Response:\n");
    console.log(response.body.choices[0].message.content);
  } else {
    console.error(
      "Error:",
      response.body.error?.message || "Unknown error occurred"
    );
  }
}

main().catch((error) => {
  console.error("Error occurred:", error.message);
});
