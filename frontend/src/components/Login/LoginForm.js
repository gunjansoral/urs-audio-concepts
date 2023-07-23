import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import LoginInput from '../inputs/logininput'
import { useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader"
import { BsGoogle } from 'react-icons/bs'
import { googleSignIn } from '../../helpers/userAuth'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'


const loginInfos = {
  email: '',
  password: ''
}

export default function LoginForm({
  setShowForm,
  setShowRegForm
}) {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(loginInfos)
  const { email, password } = login
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleloading, setGoogleLoading] = useState(false)
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string()
      .required("Password is required")
  })
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }
  const handleSignIn = async () => {
    try {
      setGoogleLoading(true)
      const userData = await googleSignIn()
      Cookies.set('ursac-user', JSON.stringify(userData))
      dispatch({ type: 'LOGIN', payload: userData })
      setGoogleLoading(false)
    } catch (error) {
      setGoogleLoading(false)
    }
  }
  return (
    <div className="login_2_wrap">
      <div className="form_wrap">
        <Formik
          enableReinitialize
          initialValues={{
            email,
            password
          }}
          validationSchema={loginValidation}
          onSubmit={() => {
            // loginSubmit()
          }}
        >
          {(formik) =>
          (<Form>
            <LoginInput
              type='text'
              name='email'
              placeholder='Email address or phone'
              onChange={handleLoginChange}

            />
            <LoginInput
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleLoginChange}
            />
            <button type='submit' className='white_btn'>
              {loading ?
                <PulseLoader color="black" loading={loading} size={6} />
                : 'Log In'}
            </button>
            {/* google login */}
            <div className="black_btn google_login"
              onClick={() => {
                handleSignIn()
              }}
            >
              {googleloading ? <PulseLoader style={{
                padding: '8px'
              }} color="white" loading={googleloading} size={6} />
                : (
                  <>
                    <BsGoogle size='25' />
                    <span>Sign In with Google</span>
                  </>
                )}

            </div>
            {/* google login */}
          </Form>)}
        </Formik>
        {error && <div className="error_text">{error}</div>}
        <div className="sign_splitter"></div>
      </div>
    </div>
  )
}
