export type AttendPayload = {
  fullName: string;
  phoneNumber: string;
  guests: string;
  timestamp: string;
  blessing?: string;
};

export type AttendErrorCode = "not_configured" | "invalid" | "remote";

export class AttendError extends Error {
  readonly code: AttendErrorCode;

  constructor(code: AttendErrorCode, message: string) {
    super(message);
    this.name = "AttendError";
    this.code = code;
  }
}

export function getAttendEndpoint() {
  return process.env.NEXT_PUBLIC_RSVP_GOOGLE_SHEETS_URL?.trim() ?? "";
}

export async function submitAttendance(payload: AttendPayload) {
  const endpoint = getAttendEndpoint();

  if (!endpoint) {
    throw new AttendError(
      "not_configured",
      "Guest confirmation is not open yet. Please try again later.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      fullName: payload.fullName,
      phoneNumber: payload.phoneNumber,
      email: "",
      guests: payload.guests,
      blessing: payload.blessing ?? "",
      timestamp: payload.timestamp,
    }),
  });

  if (!response.ok) {
    throw new AttendError("remote", "Something went wrong. Please try again.");
  }

  const result = (await response.json().catch(() => null)) as {
    result?: string;
    error?: string;
  } | null;

  if (result?.result && result.result !== "success") {
    throw new AttendError(
      "remote",
      result.error || "Something went wrong. Please try again.",
    );
  }
}
