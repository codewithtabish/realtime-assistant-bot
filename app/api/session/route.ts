// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { instructions } = await req.json();

    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expires_after: {
            anchor: "created_at",
            seconds: 600,
          },
          session: {
            type: "realtime",
            model: "gpt-realtime-2",
            instructions: instructions ?? "You are a helpful language tutor.",

            audio: {
              input: {
                turn_detection: {
                type: "server_vad",
                   threshold: 0.75,

  prefix_padding_ms: 300,

  silence_duration_ms: 800,

  create_response: true,

  interrupt_response: true,
                },
                transcription: {
                  model: "whisper-1",
                  language: "en", 
                  prompt: "Speak naturally, clear pronunciation, everyday conversation",
                },
              },
              output: {
                voice: "shimmer",
              },
            },

                        tools: [
              {
                type: "function",
                name: "get_weather",
                description: "Get current weather for any city or location.",
                parameters: {
                  type: "object",
                  properties: {
                    location: {
                      type: "string",
                      description: "City name like Karachi, London, New York, Tokyo",
                    },
                    units: {
                      type: "string",
                      enum: ["celsius", "fahrenheit"],
                    }
                  },
                  required: ["location"]
                }
              },
              {
                type: "function",
                name: "get_users",
                description: "Get fake users data from JSONPlaceholder public API",
                parameters: {
                  type: "object",
                  properties: {
                    limit: {
                      type: "integer",
                      description: "How many users to get (default 5)"
                    }
                  }
                }
              }
            ]

         
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Session Error:", JSON.stringify(data, null, 2));
      return NextResponse.json(data, { status: response.status });
    }

    console.log("✅ Success - Tool Added");
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}