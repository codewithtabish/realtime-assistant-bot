// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { instructions } = await req.json();

    const apikey = process.env.OPENAI_API_KEY;

    if (!apikey) {
      return NextResponse.json({ 
        error: "OPENAI_API_KEY is missing in .env.local" 
      }, { status: 500 });
    }

    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apikey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expires_after: {
            anchor: "created_at",
            seconds: 600,
          },
          session: {
            type: "realtime",
            model: "gpt-4o-realtime-preview-2024-12-17",   // ← Best & Latest Model

            instructions: instructions ?? 
              "You are a friendly, patient, and encouraging language tutor. Speak naturally and clearly.",

            audio: {
              input: {
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.75,           // Less sensitive to background noise
                  prefix_padding_ms: 400,
                  silence_duration_ms: 1200, // Wait longer before responding
                  create_response: true,
                  interrupt_response: true,
                },
                transcription: {
                  model: "whisper-1",
                  language: "en", 
                },
              },
              output: {
                voice: "shimmer",   // Clear and natural voice
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

    console.log("✅ Session Created Successfully");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}