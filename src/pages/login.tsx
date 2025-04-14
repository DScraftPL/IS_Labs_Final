const Login = (props: {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  if (props.isLoggedIn) return (<>Logged in!</>)

  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
    <div className="flex border-2 rounded-lg p-4 w-full">
        <h1>Login</h1>
    </div>
</div>
  )
}

export default Login;