import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"

type TimeProps = {
  time: DateTimeInterval
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Time({ time: { start, end }, ...props }: TimeProps) {
  const {
    state: { timeZone },
    dispatch,
  } = useProvider()
  return (
    <button
      type="button"
      className={clsx(
        "rounded-md border-2 py-2 px-3 shadow-md transition-all",
        "bg-white border-slate-300",
        "text-sm font-semibold text-gray-900",
        "hover:bg-slate-500/30 hover:shadow-sm hover:shadow-secondary-100 hover:border-secondary-500 dark:hover:text-gray-200",
        "hover:focus:bg-slate-500/30",
        "focus:border-b-4 focus:-mb-0.5",
        "outline-slate-400",
        "focus:ring-secondary-400",
        "focus:ring-2 focus:ring-offset-1"
      )}
      onClick={() => {
        dispatch({
          type: "SET_SELECTED_TIME",
          payload: { start, end },
        })
      }}
      {...props}>
      {formatLocalTime(start, { timeZone })} –{" "}
      {formatLocalTime(end, { timeZone })}
    </button>
  )
}
