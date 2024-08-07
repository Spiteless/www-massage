import type { AvailabilitySlotsMap } from "./lib/types"

export const ALLOWED_DURATIONS = [60, 90, 120, 150]
export const DEFAULT_PRICING: {[key: number] : number} = {
  60: 140,
  90: 140*1.5,
  120: 140*2,
  150: 140*2.5,
}
export const DEFAULT_DURATION = 90

export const CALENDARS_TO_CHECK = ["primary", "trillium@hatsfabulous.com"]
export const SLOT_PADDING = 0
export const OWNER_TIMEZONE = "America/Los_Angeles"
export const LEAD_TIME = 3 * 60 // 3 hours
export const DEFAULT_APPOINTMENT_INTERVAL = 30 // minutes

const DEFAULT_WORKDAY = [
  {
    start: {
      hour: 10,
    },
    end: {
      hour: 23,
    },
  },
]

export const OWNER_AVAILABILITY: AvailabilitySlotsMap = {
  0: DEFAULT_WORKDAY,
  1: DEFAULT_WORKDAY,
  2: DEFAULT_WORKDAY,
  3: DEFAULT_WORKDAY,
  4: DEFAULT_WORKDAY,
  5: DEFAULT_WORKDAY,
  6: DEFAULT_WORKDAY,
}

export const LOCAL_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}

export const LOCAL_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
}
