import { OWNER_TIMEZONE, DEFAULT_WORKDAY, defaultWorkdayType } from "./config"
import { AvailabilitySlotsMap } from "./lib/types"

export type bookingConfigType = {
    durations: number[],
    pricing: {
        [key: number]: number
    },
    padding: number,
    leadTime: number,
    availability: {
        default_workday: defaultWorkdayType, 
        owner_availability: AvailabilitySlotsMap,
    },
    interval: number,
    timeZone: string,
}

const bookingConfig = {
    durations: [60, 90, 120, 150],
    pricing: {
        60: 120,
        90: 180,
        120: 240,
        150: 300,
    },
    padding: 0,
    leadTime: 3 * 60,
    availability: {
        default_workday: [
            DEFAULT_WORKDAY
            /*
            {
                start: {
                    hour: 10,
                },
                end: {
                    hour: 23,
                },
            },
            */
        ],
        owner_availability: {
        },
    },
    interval: 30,
    timeZone: OWNER_TIMEZONE,
}

bookingConfig.availability.owner_availability = {
    0: bookingConfig.availability.default_workday,
    1: bookingConfig.availability.default_workday,
    2: bookingConfig.availability.default_workday,
    3: bookingConfig.availability.default_workday,
    4: bookingConfig.availability.default_workday,
    5: bookingConfig.availability.default_workday,
    6: bookingConfig.availability.default_workday,
}

export default bookingConfig