import BookingFeature, { PageProps, getServerSideProps as componentGetServiceSideProps } from "@/components/features/BookingFeature"
import type {
  GetServerSidePropsContext,
} from "next"
import bookingConfig from "@/bookingConfig"

export type options = {}

const options: options = {
  ...bookingConfig
}

//type that combines PageProps and options
export type PagePropsWithOptions = PageProps & options

function TestPage(props: PagePropsWithOptions) {
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

export default TestPage