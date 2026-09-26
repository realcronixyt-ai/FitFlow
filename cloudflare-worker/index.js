const MODEL = "@cf/google/gemma-4-26b-a4b-it";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return Response.json(data, { status, headers: corsHeaders });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("FitFlow AI Worker läuft!", {
        headers: { ...corsHeaders, "Content-Type": "text/plain; charset=UTF-8" },
      });
    }

    if (request.method !== "POST" || url.pathname !== "/api/ai") {
      return json({ error: "Not Found" }, 404);
    }

    try {
      const body = await request.json();

      let messages = body.messages;

      if (!messages && typeof body.message === "string") {
        messages = [{ role: "user", content: body.message }];
      }

      if (!Array.isArray(messages) || messages.length === 0) {
        return json(
          { error: "Bitte 'messages' oder 'message' senden." },
          400
        );
      }

      const result = await env.AI.run(MODEL, {
        messages,
        chat_template_kwargs: {
          enable_thinking: false,
        },
      });

      const answer =
        result?.response ??
        result?.choices?.[0]?.message?.content ??
        "";

      return json({
        success: true,
        answer,
        response: answer,
      });
    } catch (error) {
      return json(
        {
          success: false,
          error: "Cloudflare AI Fehler",
          details: error?.message || String(error),
        },
        500
      );
    }
  },
};
