import templates ,{ EventProps, detailsHelper } from "@/lib/messageTemplates/templates"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ApprovalEmail(props: EventProps & { approveUrl: string, dateSummary: string }) {
  const { name, email, location, dateSummary, timeZone, approveUrl } = props
  const SUBJECT = "Request for " + templates.eventSummary(props)

  let body = `<div dir="ltr">`
  body += [
    `<b>${name}</b> has requested a meeting on <b>${dateSummary}</b>, at <b><a href="https://www.google.com/maps/preview?q=${encodeURI(location)}">${location}</a></b>`,
    `<br>`,
    `Their local timezone is ${timeZone}`,
    `<br>`, 
    `<b><a href=${approveUrl}>Accept the meeting</a></b>`,
    `<br>`,
    `<b><a href=${getDeclineUrl(props)}>Decline the meeting</a></b>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += "<br>"
  body += detailsHelper(props, "<br>")
  body += `</div>`

  return { subject: SUBJECT, body }
}

function getDeclineUrl ({email, dateSummary, name}: {email: string, dateSummary: string, name: string}) {
  let declineUrl = `mailto:${encodeURI(email)}?subject=${encodeURIComponent(
    `Re: Your meeting request`
  )}&body=${encodeURIComponent(
    `Hi ${name},

I just checked my calendar and it looks like ${dateSummary} won't work.

Would you be able to meet at a different time?`
  )}`
  return declineUrl
}
