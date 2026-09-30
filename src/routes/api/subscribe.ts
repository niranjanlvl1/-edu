import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/subscribe")({
  beforeLoad: async () => {},
});

export async function POST(request: Request): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const { email, goal } = body as Record<string, unknown>;

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const goalStr = typeof goal === "string" ? goal : "Founder";

    // Send to Systeme.io
    const response = await fetch("https://api.systeme.io/api/v1/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "u9jtipq1l49i4kztcehwwc24ajhrtrpbv7886vwzcxi0qm9lgp2n40qr07hsieex",
      },
      body: JSON.stringify({
        email,
        first_name: goalStr,
        custom_fields: { goal: goalStr },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Systeme.io error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, email }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
