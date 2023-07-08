import { z } from "zod"

const AppointmentRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    price: z.string().optional(),
    paymentMethod: z.string().optional(), // eventually an enum
    start: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Start must be a valid date.",
    }),
    end: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "End must be a valid date.",
    }),
    timeZone: z.string(),
    location: z.string(),
    duration: z
      .string()
      .refine((value) => !Number.isNaN(Number.parseInt(value)), {
        message: "Duration must be a valid integer.",
      }),
  })

  const AppointmentPropsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    price: z.string().optional(),
    paymentMethod: z.string().optional(),
    start: z.string(),
    end: z.string(),
    timeZone: z.string(),
    location: z.string(),
    duration: z
      .string()
      .refine((value) => !Number.isNaN(Number.parseInt(value)), {
        message: "Duration must be a valid integer.",
      }),
  })

  const schema = {
    requestSchema: AppointmentRequestSchema,
    propsSchema: AppointmentPropsSchema
  }

  export default schema