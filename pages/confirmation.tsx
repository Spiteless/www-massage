export default function Confirmation() {
  return (
    <div className="p-8 sm:py-16 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-secondary-700 sm:text-5xl">
        Thanks!
      </h1>
      <p className="mt-6 text-xl text-gray-800 dark:text-gray-200 font-medium">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        I'll review your appointment request shortly and get back to you shortly!
      </p>
    </div>
  )
}
