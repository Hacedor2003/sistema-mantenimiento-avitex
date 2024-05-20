/* eslint-disable prettier/prettier */

import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = (): JSX.Element => {
  const error:any = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Disculpa un error ha ocurrido.</p>
      <Link to={'/'}>Ir a home</Link>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
