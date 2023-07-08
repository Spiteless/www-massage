import type { NextApiRequest, NextApiResponse } from "next"

import createCalendarAppointment from "@/lib/availability/createAppointment"
import getHash from "@/lib/hash"

import templates from "@/lib/messageTemplates/templates"
import schema from "@/lib/api/appointmentSchema"

const AppointmentPropsSchema = schema.propsSchema

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const { data, key } = req.query

  if (!data) {
    res.status(400).json({ error: "Data is missing" })
    return
  }
  // Make sure the hash matches before doing anything
  const hash = getHash(decodeURIComponent(data as string))

  if (hash !== key) {
    res.status(403).json({ error: "Invalid key" })
    return
  }

  const object = JSON.parse(decodeURIComponent(data as string))

  // ...and validate it using Zod's safeParse method
  const validationResult = AppointmentPropsSchema.safeParse(object)

  if (!validationResult.success) {
    res.status(400).json({ error: "Malformed request in data validation" })
    return
  }

  const validObject = validationResult.data

  // Check if start and end dates are valid
  if (
    Number.isNaN(Date.parse(validObject.start)) ||
    Number.isNaN(Date.parse(validObject.end))
  ) {
    res.status(400).json({ error: "Malformed request in date parsing" })
    return
  }

  // Create the confirmed appointment
  const response = await createCalendarAppointment({
    ...validObject,
    requestId: hash,
    summary: templates.eventSummary(validObject) || "Error in createEventSummary()",
  })

  const details = await response.json()

  const htmlLink = details.htmlLink
  const regex = /eid=([^&]+)/
  const match = htmlLink.match(regex)

  // If we have a link to the event, take us there.
  if (match && match[1]) {
    res.redirect(`/booked?url=${encodeURIComponent(match[1])}`)

    return
  }

  // Otherwise, something's wrong.
  res.status(500).json({ error: "Error trying to create an appointment" })
}
