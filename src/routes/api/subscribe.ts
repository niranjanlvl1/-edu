import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/subscribe")({
  preSearchParams: async () => ({}),
  validateSearch: async () => ({}),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, goal } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Send to Systeme.io with proper headers
    const systemResponse = await fetch(
      "https://api.systeme.io/api/v1/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "u9jtipq1l49i4kztcehwwc24ajhrtrpbv7886vwzcxi0qm9lgp2n40qr07hsieex",
          "User-Agent": "LVL1-Signup/1.0",
        },
        body: JSON.stringify({
          email: email,
          first_name: goal || "Founder",
          custom_fields: {
            goal: goal || "",
          },
        }),
      }
    );

    const responseText = await systemResponse.text();
    
    if (!systemResponse.ok) {
      console.error("Systeme.io error:", systemResponse.status, responseText);
      return new Response(
        JSON.stringify({
          error: "Failed to subscribe. Please try again.",
          details: responseText,
        }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Subscribed successfully",
        email: email,
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again.",
        details: error instanceof Error ? error.message : String(error),
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}
