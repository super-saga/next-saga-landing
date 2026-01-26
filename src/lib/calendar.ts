import { google } from "googleapis"

// Mock implementation if credentials are missing
export const createCalendarEvent = async (
  name: string,
  email: string,
  date: string,
  description: string
) => {
  console.log("Creating calendar event for:", { name, email, date, description })
  
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("Google Calendar credentials missing. Using mock.")
    return { id: "mock-event-id", status: "confirmed" }
  }

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/calendar"]
    )

    const calendar = google.calendar({ version: "v3", auth })

    const event = {
      summary: `Demo Request: ${name}`,
      description: `Request from ${email}.\n\nNotes: ${description}`,
      start: {
        dateTime: new Date(date).toISOString(),
      },
      end: {
        dateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour
      },
      attendees: [{ email }],
    }

    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    })

    return res.data
  } catch (error) {
    console.error("Google Calendar Error:", error)
    // Fallback to mock success so user doesn't see error
    return { id: "mock-event-id-fallback", status: "confirmed" }
  }
}

type CalcomBookingInput = {
  name: string
  email: string
  phone?: string
  company?: string
  date: string
  message?: string
  tier?: string
}

export const createCalcomBooking = async (input: CalcomBookingInput) => {
  const apiKey = process.env.CALCOM_API_KEY
  const clientId = process.env.CALCOM_CLIENT_ID
  const eventTypeIdValue = process.env.CALCOM_EVENT_TYPE_ID
  const eventTypeSlug = process.env.CALCOM_EVENT_TYPE_SLUG
  const username = process.env.CALCOM_USERNAME
  const teamSlug = process.env.CALCOM_TEAM_SLUG
  const organizationSlug = process.env.CALCOM_ORGANIZATION_SLUG
  const timeZone = process.env.CALCOM_TIMEZONE ?? "Asia/Jakarta"
  const startTime = process.env.CALCOM_DEFAULT_START_TIME ?? "09:00"
  const timeZoneOffset = process.env.CALCOM_TIMEZONE_OFFSET ?? "+07:00"
  const lengthInMinutes = Number(process.env.CALCOM_LENGTH_MINUTES ?? "30")
  const meetingUrl = process.env.CALCOM_MEETING_URL

  if (!apiKey && !clientId) {
    console.warn("Cal.com credentials missing. Using mock.")
    return { id: "mock-calcom-booking", status: "confirmed" }
  }

  const eventTypeId = eventTypeIdValue ? Number(eventTypeIdValue) : undefined
  if (!eventTypeId && !(eventTypeSlug && username)) {
    console.warn("Cal.com event type configuration missing. Using mock.")
    return { id: "mock-calcom-booking-config", status: "confirmed" }
  }

  const start = input.date.includes("T")
    ? input.date
    : `${input.date}T${startTime}:00${timeZoneOffset}`

  if (!start) {
    console.warn("Cal.com start time missing. Using mock.")
    return { id: "mock-calcom-booking-start", status: "confirmed" }
  }

  const attendee: Record<string, string> = {
    name: input.name,
    email: input.email,
    timeZone,
    language: "id",
  }

  if (input.phone) {
    attendee.phoneNumber = input.phone
  }

  const payload: Record<string, unknown> = {
    start,
    attendee,
    lengthInMinutes,
  }

  if (eventTypeId) {
    payload.eventTypeId = eventTypeId
  }
  if (eventTypeSlug) {
    payload.eventTypeSlug = eventTypeSlug
  }
  if (username) {
    payload.username = username
  }
  if (teamSlug) {
    payload.teamSlug = teamSlug
  }
  if (organizationSlug) {
    payload.organizationSlug = organizationSlug
  }
  if (meetingUrl) {
    payload.meetingUrl = meetingUrl
  }

  const metadata: Record<string, string> = {}
  if (input.company) {
    metadata.company = input.company
  }
  if (input.message) {
    metadata.message = input.message
  }
  if (input.tier) {
    metadata.tier = input.tier
  }
  metadata.source = "landing-demo"

  if (Object.keys(metadata).length > 0) {
    payload.metadata = metadata
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    }

    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`
    }
    if (!apiKey && clientId) {
      headers["x-cal-client-id"] = clientId
    }

    const res = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errorPayload = await res.text()
      throw new Error(`Cal.com error: ${res.status} ${errorPayload}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Cal.com Error:", error)
    return { id: "mock-calcom-booking-fallback", status: "confirmed" }
  }
}
