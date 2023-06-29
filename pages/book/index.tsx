import BookingFeature, { PageProps, getServerSideProps as componentGetServiceSideProps } from "@/components/features/BookingFeature"
import type {
  GetServerSidePropsContext,
} from "next"
import bookingConfig, { bookingConfigType } from "@/bookingConfig"

bookingConfig.pricing = {
  60: 100,
  90: 150,
  120: 200,
  150: 250,
}

const options: bookingConfigType = {
  ...bookingConfig
}

//type that combines PageProps and options
export type PagePropsWithOptions = PageProps & bookingConfigType

function BookPage(props: PagePropsWithOptions) {
  return (
    <BookingFeature.Component {...props} options={options} />
  )
}

export async function getServerSideProps() {
  const cProps = await BookingFeature.getSSR({ query: {} } as GetServerSidePropsContext)
  return {
    props: {
      ...cProps.props,
    }
  }
}

export default BookPage