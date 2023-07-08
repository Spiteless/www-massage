import { Dialog } from "@headlessui/react"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import type { Dispatch, FormEvent } from "react"

import Modal from "../Modal"
import Spinner from "../Spinner"
import type { ActionType } from "@/context/AvailabilityContext"
import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalDate, formatLocalTime } from "@/lib/availability/helpers"

/**
 * Represents form data from the booking form
 */
export type BookingFormData = {
  /** Name of the requester */
  name?: string,
  /** Email address of the requester */
  email?: string,
  /** Address of the requester */
  location?: string,
  /** Phone number of the requester */
  phone?: string,
  /** Payment method of the requester */
  paymentMethod?: string,
  /** The cost of the appointment */
  price?: string,
}

export const paymentMethod = [
  {
    name: "Cash",
    value: "cash",
    hint: "Having exact change helps a lot :)"
  },
  {
    name: "Venmo",
    value: "venmo",
    hint: "Venmo name is @TrilliumSmith, last 4 phone is -5344"
  },
  {
    name: "CashApp",
    value: "cashapp",
    hint: "CashApp name is $trilliummassage"
  },
  {
    name: "Credit Card",
    value: "creditCard",
    hint: "Chip cards preferred, reduces fees"
  },
  {
    name: "Invoice",
    value: "invoice",
    hint: "Invoice sent via email"
  },
]

export default function BookingForm() {
  const {
    state: { modal, selectedTime, timeZone, duration, formData, pricing },
    dispatch,
  } = useProvider()
  const router = useRouter()
  const price = pricing[duration]

  if (!selectedTime || !timeZone) {
    return <></>
  }

  const dateString = formatLocalDate(selectedTime.start, { timeZone })
  const startString = formatLocalTime(selectedTime.start, { timeZone })
  const endString = formatLocalTime(selectedTime.end, {
    timeZone,
    timeZoneName: "shortGeneric",
  })

  return (
    <Modal
      open={modal !== "closed"}
      setOpen={(open) => {
        dispatch({ type: "SET_MODAL", payload: open ? "open" : "closed" })
      }}>
      <form
        className="mt-3 sm:mt-0 sm:ml-4"
        onSubmit={(event) => {
          handleSubmit(event, dispatch, router)
        }}
        onChange={(event) => {
          const target = event.target as HTMLInputElement
          const newState = {...formData, [target.name]: target.value}
          dispatch({ type: "SET_FORM", payload: newState })
        }}
      >
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
          Request appointment
        </Dialog.Title>

        <input
          type="hidden"
          name="start"
          value={selectedTime.start.toISOString()}
        />
        <input
          type="hidden"
          name="end"
          value={selectedTime.end.toISOString()}
        />
        <input type="hidden" name="duration" value={duration} />
        <input type="hidden" name="timeZone" value={timeZone} />
        <input type="hidden" name="price" value={pricing[duration]} />
        <input type="hidden" name="honeypot" />

        <div className="border-l-4 border-l-secondary-400 bg-secondary-50/30 dark:bg-secondary-50/10 p-3 mt-3 mb-4 rounded-md">
          <p className="text-sm md:text-base font-semibold text-secondary-800 dark:text-secondary-400">
            {dateString}
          </p>
          <p className="text-xs md:text-sm">
            {startString} - {endString}
          </p>
          {price && <p className="mt-1 text-xs md:text-sm font-semibold text-secondary-800 dark:text-secondary-400">
          {`$${price} - ${duration} minutes`}
          </p>}
        </div>

        <div className="flex flex-col space-y-4">
          <div className="isolate -space-y-px rounded-md shadow-sm">
            <div className="relative rounded-md rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-secondary-600">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900 dark:text-gray-100">
                Name
              </label>
              <input
                aria-label="Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                required
                aria-required
                name="name"
                id="name"
                value={formData && formData.name}
                className="pl-2 py-1 block w-full border-0 p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Will Smith"
              />
            </div>
            <div className="relative px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-secondary-600">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-900 dark:text-gray-100">
                Phone Number
              </label>
              <input
                aria-label="Phone Number"
                required
                autoComplete="tel"
                aria-required
                name="phone"
                id="phone"
                value={formData && formData.phone}
                className="pl-2 py-1 block w-full border-0 p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="(555) 444 - 3333"
              />
            </div>
            <div className="relative px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-secondary-600">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-900 dark:text-gray-100">
                Location
              </label>
              <input
                aria-label="street address"
                required
                autoComplete="street-address"
                aria-required
                name="location"
                id="location"
                value={formData && formData.location}
                className="pl-2 py-1 block w-full border-0 p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="123 Address Road, Beverly Hills, CA 90210"
              />
            </div>
            <div className="relative rounded-md rounded-t-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-secondary-600">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-900 dark:text-gray-100">
                Email Address
              </label>
              <input
                aria-label="Email"
                required
                autoComplete="email"
                aria-required
                type="email"
                name="email"
                id="email"
                value={formData && formData.email}
                className="pl-2 py-1 block w-full border-0 p-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Intended payment method</p>
            <fieldset className="mt-2">
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                {paymentMethod.map((payType) => (
                  <div key={payType.value} className="flex items-center">
                    <input
                      id={payType.value}
                      aria-label={payType.name}
                      name="paymentMethod"
                      type="radio"
                      value={payType.value}
                      defaultChecked={payType.value === paymentMethod[0].value}
                      className="h-4 w-4 border-gray-300 text-secondary-600 focus:ring-secondary-600"
                    />
                    <label
                      htmlFor={payType.value}
                      className="ml-1.5 block text-sm leading-6 text-gray-800 dark:text-gray-100">
                      {payType.name}
                    </label>
                    <p className="text-sm pl-4 text-gray-500 dark:text-secondary-400 block sm:hidden">
                {(!!formData && formData.paymentMethod == payType.value) && `* ${payType.hint}`}
              </p>
                  </div>
                ))}
              </div>
              <p className="text-sm pl-4 text-gray-500 dark:text-secondary-400 hidden sm:block">
                * {!!formData && paymentMethod.filter((p) => p.value === formData.paymentMethod)[0].hint}
              </p>
            </fieldset>
          </div>
        </div>
        {modal === "error" && (
          <div className="bg-red-50 text-red-600">
            There was an error submitting your request.
          </div>
        )}
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            disabled={modal === "busy"}
            className="inline-flex w-full justify-center rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 sm:ml-3 sm:w-auto disabled:opacity-50">
            {modal === "busy" ? (
              <>
                Submitting ... <Spinner className="ml-2" />
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hocus:bg-gray-100 sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch({ type: "SET_MODAL", payload: "closed" })
            }}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

/**
 *
 * Handles form submissions by intercepting the native event,
 * passing params to the `/book` endpoint, and redirecting
 * upon success (or showing a failure message).
 *
 */
function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  dispatch: Dispatch<ActionType>,
  router: AppRouterInstance
) {
  event.preventDefault()
  dispatch({ type: "SET_MODAL", payload: "busy" })
  fetch(`/api/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
  })
    .then(async (data) => {
      const json = await data.json()
      if (json.success) {
        router.push("/confirmation")
      } else {
        dispatch({ type: "SET_MODAL", payload: "error" })
      }
    })
    .catch(() => {
      dispatch({ type: "SET_MODAL", payload: "error" })
    })
}
