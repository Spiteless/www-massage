import templates, { detailsHelper, signatureBlock } from "@/lib/messageTemplates/templates"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ConfirmationEmail(props: any) {
  const { dateSummary, name, price } = props
  const SUBJECT = "Request for " + templates.eventSummary(props)

  let body = `<div dir="ltr">`
  body += [
    `Hi ${name},`,
    `<br>`,
    `Just wanted to let you know that your request for <b>${dateSummary}</b> for $<b>${price}</b> has been received I'll double check my calendar and get back to youn ASAP!`,
    `<br>`,
    `Thanks!`,
    `<br>`,
    `<b>Details:</b>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += detailsHelper(props, "<br>")
  body += "<br>"
  body += signatureBlock("<br>")
  body += `</div>`

  return { subject: SUBJECT, body }
}
