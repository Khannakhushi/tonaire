import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const promptKeys = ["rephrase", "linkedin", "twitter", "instagram"] as const;
type ContentType = (typeof promptKeys)[number];

const toneInstructions = {
  rephrase: {
    professional:
      "Rewrite the following message in a formal, business-appropriate, and concise tone. Use clear, polite, and professional language. Only return the rewritten message, do not include any explanations or quotation marks.",
    casual:
      "Rewrite the following message in a casual, friendly, and informal way. Use natural, conversational language and contractions. Only return the rewritten message, do not include any explanations or quotation marks.",
    funny:
      "Rewrite the following message in a humorous, witty, and playful way. Add a light joke or clever twist if possible. Only return the rewritten message, do not include any explanations or quotation marks.",
    emotional:
      "Rewrite the following message with emotional depth and sincerity. Express feelings and empathy. Only return the rewritten message, do not include any explanations or quotation marks.",
    assertive:
      "Rewrite the following message in a confident, assertive, and direct tone. Be clear and decisive. Only return the rewritten message, do not include any explanations or quotation marks.",
    friendly:
      "Rewrite the following message in a warm, approachable, and friendly tone. Sound supportive and positive. Only return the rewritten message, do not include any explanations or quotation marks.",
  },
  linkedin: {
    empowering:
      "Write a LinkedIn post that is empowering, motivational, and inspiring for others. Use uplifting language and include relevant hashtags. Only return the post, do not include any explanations or quotation marks.",
    professional:
      "Write a LinkedIn post in a formal, polished, and business-appropriate tone. Be clear, concise, and include relevant hashtags. Only return the post, do not include any explanations or quotation marks.",
    thankful:
      "Write a LinkedIn post that expresses gratitude and appreciation. Be sincere and include relevant hashtags. Only return the post, do not include any explanations or quotation marks.",
    inspiring:
      "Write a LinkedIn post that is inspiring and focused on lessons learned or motivation. Include relevant hashtags. Only return the post, do not include any explanations or quotation marks.",
    humblebrag:
      "Write a LinkedIn post that shares an achievement with humility and gratitude. Balance confidence with modesty. Include relevant hashtags. Only return the post, do not include any explanations or quotation marks.",
  },
  twitter: {
    funny:
      "Write a tweet that is funny, witty, and playful about the following topic. Keep it under 280 characters. Only return the tweet, do not include any explanations or quotation marks.",
    confident:
      "Write a tweet that is confident and self-assured, but not arrogant. Keep it under 280 characters. Only return the tweet, do not include any explanations or quotation marks.",
    relatable:
      "Write a tweet that is relatable and easy for others to connect with. Keep it under 280 characters. Only return the tweet, do not include any explanations or quotation marks.",
    witty:
      "Write a tweet that is clever and smart with the humor. Keep it under 280 characters. Only return the tweet, do not include any explanations or quotation marks.",
    hype: "Write a tweet that is energetic, exciting, and hype. Build excitement. Keep it under 280 characters. Only return the tweet, do not include any explanations or quotation marks.",
  },
  instagram: {
    aesthetic:
      "Write an Instagram caption that is aesthetic, dreamy, and visually appealing. Use minimal, poetic language. Only return the caption, do not include any explanations or quotation marks.",
    chill:
      "Write an Instagram caption that is chill, relaxed, and laid-back. Only return the caption, do not include any explanations or quotation marks.",
    soft: "Write an Instagram caption that is gentle, soft, and peaceful. Only return the caption, do not include any explanations or quotation marks.",
    motivational:
      "Write an Instagram caption that is motivational and inspiring. Encourage your audience. Only return the caption, do not include any explanations or quotation marks.",
    humorous:
      "Write an Instagram caption that is funny and entertaining. Add a playful twist. Only return the caption, do not include any explanations or quotation marks.",
  },
};

const toneKeys = {
  rephrase: Object.keys(toneInstructions.rephrase),
  linkedin: Object.keys(toneInstructions.linkedin),
  twitter: Object.keys(toneInstructions.twitter),
  instagram: Object.keys(toneInstructions.instagram),
};

export async function POST(request: NextRequest) {
  try {
    const { inputText, tone, contentType } = await request.json();

    if (!inputText || !tone || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contentTypeStr = String(contentType);
    const toneStr = String(tone);
    let prompt: string = "";
    let instruction = "";
    switch (contentTypeStr) {
      case "rephrase":
        if (toneKeys.rephrase.includes(toneStr)) {
          instruction =
            toneInstructions.rephrase[
              toneStr as keyof typeof toneInstructions.rephrase
            ];
          prompt = `${instruction}\n\nMessage: "${inputText}"`;
        }
        break;
      case "linkedin":
        if (toneKeys.linkedin.includes(toneStr)) {
          instruction =
            toneInstructions.linkedin[
              toneStr as keyof typeof toneInstructions.linkedin
            ];
          prompt = `${instruction}\n\nTopic: "${inputText}"`;
        }
        break;
      case "twitter":
        if (toneKeys.twitter.includes(toneStr)) {
          instruction =
            toneInstructions.twitter[
              toneStr as keyof typeof toneInstructions.twitter
            ];
          prompt = `${instruction}\n\nTopic: "${inputText}"`;
        }
        break;
      case "instagram":
        if (toneKeys.instagram.includes(toneStr)) {
          instruction =
            toneInstructions.instagram[
              toneStr as keyof typeof toneInstructions.instagram
            ];
          prompt = `${instruction}\n\nTopic: "${inputText}"`;
        }
        break;
      default:
        return NextResponse.json(
          { error: "Invalid content type or tone" },
          { status: 400 }
        );
    }
    if (!prompt) {
      return NextResponse.json(
        { error: "Invalid content type or tone" },
        { status: 400 }
      );
    }

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.8,
      system:
        "You are Tonaire, an AI-powered tone stylist that helps users rewrite and generate content in different tones and for different social platforms. Always match the requested tone and platform.",
    });

    return NextResponse.json({ content: result.text });
  } catch (error) {
    console.error("Error generating content:", error);
    let errorMsg = "Failed to generate content";
    if (typeof error === "string") errorMsg = error;
    else if (error instanceof Error)
      errorMsg = error.message + (error.stack ? `\n${error.stack}` : "");
    else if (error && typeof error === "object")
      errorMsg = JSON.stringify(error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
