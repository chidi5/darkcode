import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import sessions from "./routes/sessions";

const app = new Hono();

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      {
        error: error.message || "Request failed",
      },
      error.status,
    );
  }
  console.error("Unhandled server error", error);
  return c.json({ error: "Internal server error" }, 500);
});

const routes = app.route("/sessions", sessions);

export type AppType = typeof routes;

// idletimeout is set to 255 seconds to prevent LLM tool calls from closing the connection prematurely
export default { port: 3000, fetch: app.fetch, idleTimeout: 255 };
