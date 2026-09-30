import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/subscribe")({
  method: "POST",
  handler: async ({ request }) => {
    try {
      const body = await request.json();
      const { email, goal } = body;

      if (!email) {
        return new Response(
          JSON.stringify({ error: "Email is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Send to Systeme.io
      const response = await fetch(
        "https://api.systeme.io/api/v1/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key":
              "u9jtipq1l49i4kztcehwwc24ajhrtrpbv7886vwzcxi0qm9lgp2n40qr07hsieex",
          },
          body: JSON.stringify({
            email,
            first_name: goal || "Founder",
            custom_fields: {
              goal: goal || "",
            },
          }),
        }
      );

      if (!response.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to subscribe. Please try again.",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Subscribed successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Subscribe error:", error);
      return new Response(
        JSON.stringify({
          error: "Something went wrong. Please try again.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
