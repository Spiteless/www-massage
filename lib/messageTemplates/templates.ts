import { paymentMethod as paymentMethods } from "@/components/booking/BookingForm"

function timeStringFormatter(timeString: string) {
  const date = new Date(timeString)
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  } as Intl.DateTimeFormatOptions

  return date.toLocaleString([], options)
} 

export type EventProps =  {
  name: string,
  duration: string,
  email: string,
  phone: string,
  start: string,
  end: string,
  timeZone?: string,
  location: string,
  price?: string
  summary?: string
  paymentMethod?: string
} 
/**
 * Formats props into basic html for event/email.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
export function detailsHelper({ name, duration, email, phone, start, end, location, price, paymentMethod} : EventProps, sep: string = "\n") {
  let paymentTip = ""
  if (!!paymentMethod) {
    paymentTip = paymentMethods.filter(method => method.value === paymentMethod)[0].hint
  }
  let output = ""

  output += `<b>name</b>: ${name}` + sep
  output += `<b>duration</b>: ${duration}` + sep
  output += `<b>email</b>: ${email}` + sep
  output += `<b>phone</b>: ${phone}` + sep
  output += `<b>start</b>: ${ timeStringFormatter(start) }` + sep
  output += `<b>end</b>: ${ timeStringFormatter(end) }` + sep
  output += `<b>location:</b> <a href="https://www.google.com/maps/preview?q=${encodeURI(location)}">${location}</a>` + sep
  
  if (price) output += `<b>price</b>: $${price}` + sep
  
  if (price && paymentMethod) output += `<b>payment method</b>: ${paymentMethod}` + sep

  if (paymentTip) output += `<b>payment tip</b>: ${paymentTip}` + sep
  
  return output
}



export function signatureBlock(sep: string = "\n") {
  let output = ""

  output += sep
  output += "Trillium Smith, LMT" + sep
  output += `<a href="www.trilliummassage.la">www.trilliummassage.la</a>`

  return output
}

/**
 * Creates a title "summary" for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventSummary (
  {
    name,
    duration,
    price
  } : {
  name: string,
  duration: string
  price?: string}
  ) {
  let outStr = `${duration}m massage with ${name}`
  if (price) {
    outStr = `${outStr}, $${price}`
  outStr = `${outStr} - TrilliumMassage`
  return outStr
  }
}

/**
 * Creates a description for a calendar event.
 *
 * @function
 * @returns {string} Returns the summary string for an event.
 */
function eventDescription({
  name,
  duration,
  email,
  phone,
  start,
  end,
  timeZone,
  location,
  summary,
  price
} : EventProps ) {
  let output = "Thanks for booking!"
  output += "\n\n"

  const details = detailsHelper({ name, duration, email, phone, start, end, location, price})
  output = output + details
  
  output += "\n"
  output += "Trillium Smith,  LMT"
  output += "\n"
  output += `<a href="www.trilliummassage.la">www.trilliummassage.la</a>`

  return output
}

const templates = {
  eventSummary,
  eventDescription
}

export default templates