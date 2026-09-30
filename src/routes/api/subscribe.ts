import { json } from "@tanstack/react-router";

export async function POST(request: Request) {
  try {
    const { email, goal } = await request.json();

    if (!email) {
      return json({ error: "Email is required" }, { status: 400 });
    }

    // Send to Systeme.io
    const response = await fetch(
      "https://api.systeme.io/api/v1/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "u9jtipq1l49i4kztcehwwc24ajhrtrpbv7886vwzcxi0qm9lgp2n40qr07hsieex",
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
      const errorData = await response.text();
      console.error("Systeme.io error:", errorData);
      return json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
