type ErrorResponse = {
  json: () => Promise<unknown>;
  status: number;
  statusText: string;
};

export async function getErrorMessage(
  response: ErrorResponse,
): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    if (data && typeof data.error === "string" && data.error.length > 0) {
      return data.error;
    }
  } catch (e) {
    // Ignore JSON parsing errors
  }
  return (
    `Response failed with status ${response.status}` || response.statusText
  );
}
