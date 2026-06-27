/**
 * Quick example (matches curl usage):
 *   await callDataApi("Youtube/search", {
 *     query: { gl: "US", hl: "en", q: "manus" },
 *   })
 */
import { ENV } from "./env";

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  if (!ENV.forgeApiUrl) {
    throw new Error("BUILT_IN_FORGE_API_URL is not configured");
  }
  if (!ENV.forgeApiKey) {
    throw new Error("BUILT_IN_FORGE_API_KEY is not configured");
  }

  // Build the full URL by appending the service path to the base URL
  const baseUrl = ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL("webdevtoken.v1.WebDevService/CallApi", baseUrl).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      apiId,
      query: options.query,
      body: options.body,
      path_params: options.pathParams,
      multipart_form_data: options.formData,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Data API request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  // Read raw text first so we can inspect non-JSON error pages or plain-text responses.
  const raw = await response.text().catch(() => "");

  // Try to parse JSON from the raw text. If parsing fails, log the raw text (truncated)
  // and return the raw string so callers can inspect the real server response.
  let parsed: unknown;
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch (e) {
    // Non-JSON response (could be HTML or plain text). Log first 1000 chars to help debugging.
    try {
      console.error("[DataAPI] Non-JSON response (first 1000 chars):", raw.slice(0, 1000));
    } catch {}
    return raw;
  }

  // Maintain existing jsonData handling: some backends wrap the real payload in { jsonData: string }
  if (parsed && typeof parsed === "object" && "jsonData" in (parsed as Record<string, unknown>)) {
    try {
      return JSON.parse((parsed as Record<string, string>).jsonData ?? "{}");
    } catch {
      return (parsed as Record<string, unknown>).jsonData;
    }
  }

  return parsed;
}
