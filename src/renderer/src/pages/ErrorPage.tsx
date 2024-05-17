/* eslint-disable prettier/prettier */

import { useRouteError } from 'react-router-dom'

const ErrorPage = (): JSX.Element => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Disculpa un error ha ocurrido.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
