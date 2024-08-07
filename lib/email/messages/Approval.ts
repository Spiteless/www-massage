import { EmailProps } from "@/lib/types"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ApprovalEmail({
  email,
  name,
  location,
  dateSummary,
  approveUrl,
  timeZone,
  price,
  duration
}: EmailProps) {
  const SUBJECT = `REQUEST: ${name}, ${duration}, ${price}`

  const declineUrl = `mailto:${encodeURI(email)}?subject=${encodeURIComponent(
    `Re: Massage appointment request`
  )}&body=${encodeURIComponent(
    `Hi ${name || "there"},

I just checked my calendar and it looks like ${dateSummary} won't work.

Would you be able to meet at a different time?`
  )}`

  let body = `<div dir="ltr">`
  body += [
    `<b>${name}</b> has requested a meeting:`,
    `<br>`,
    `Their local timezone is ${timeZone}`,
    `<br>`,
    `<b>Name:</b> ${name}`,
    `<b>Date:</b> ${dateSummary}`,
    `<b>Location:</b> ${location}`,
    `<b>Price:</b> $${price}`,
    `<b>Duration:</b> ${duration} minutes`,
    `<br>`,
    `<br>`,
    `<b><a href=${approveUrl}>Accept the meeting</a></b>`,
    `<br>`,
    `<b><a href=${declineUrl}>Decline the meeting</a></b>`,
    `<br>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
