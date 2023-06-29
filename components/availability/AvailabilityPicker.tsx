import { utcToZonedTime } from "date-fns-tz"
import dynamic from "next/dynamic"

import BookingForm from "../booking/BookingForm"
import DurationPicker from "./controls/DurationPicker"
import TimezonePicker from "./controls/TimezonePicker"
import { useProvider } from "@/context/AvailabilityContext"
import type { DateTimeInterval } from "@/lib/types"
import format from "date-fns-tz/format"
import { bookingConfigType } from "@/bookingConfig"

// Load these dynamically, without SSR, to avoid hydration issues
// that arise with timezone differences.
const Calendar = dynamic(() => import("./date/Calendar"), { ssr: false })
const TimeList = dynamic(() => import("./time/TimeList"), { ssr: false })

export type PickerProps = {
  durationProps: {
    title: string
  },
  tzPickerProps?: {
    showPicker: boolean
  }
}

export default function AvailabilityPicker({ slots, pickerProps, options }: {
  slots: DateTimeInterval[],
  pickerProps: PickerProps,
  options: bookingConfigType
}) {
  const { durationProps } = pickerProps
  const { showPicker } = pickerProps.tzPickerProps || { showPicker: true }
  const {
    state: { selectedDate, timeZone, duration },
  } = useProvider()

  let maximumAvailability = 0
  const availabilityByDate = slots.reduce<Record<string, DateTimeInterval[]>>(
    (acc, slot) => {
      // Gives us the same YYYY-MM-DD format as Day.toString()
      const date = format(slot.start, "yyyy-MM-dd", { timeZone })

      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(slot)

      if (acc[date].length > maximumAvailability) {
        maximumAvailability = acc[date].length
      }
      return acc
    },
    {}
  )

  const availability = selectedDate
    ? availabilityByDate[selectedDate.toString()]
    : []

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex space-x-6">
        <DurationPicker {...durationProps} />
        {showPicker && <TimezonePicker />}
      </div>
      <BookingForm pricingStatement={`$${options.pricing[duration]} - ${duration} minutes`} />
      <Calendar
        offers={availabilityByDate}
        maximumAvailability={maximumAvailability}
      />
      <TimeList availability={availability} />
    </div>
  )
}
