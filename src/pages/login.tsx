const Login = (props: {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  if (props.isLoggedIn) return (<>Logged in!</>)

  return (
  <>
      <h1>Login</h1>
  </>
  )
}

export default Login;