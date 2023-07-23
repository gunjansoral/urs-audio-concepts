import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import LoginInput from '../inputs/logininput'
import { useState } from 'react'
import Cookies from 'js-cookie'
import axios from "axios"
import PulseLoader from "react-spinners/PulseLoader"
import { useDispatch } from 'react-redux'

const clientId = '593355305344-k6giq5vkdn2b2pq7f71pcjdpgpf0bb3r.apps.googleusercontent.com'
const loginInfos = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
}
export default function RegisterForm({
  setShowForm,
  setProfile
}) {
  const [login, setLogin] = useState(loginInfos)
  const { email, password } = login
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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

  const loginSubmit = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password
        }
      )
      dispatch({ type: 'LOGIN', payload: data })
      Cookies.set('user', JSON.stringify(data))
      setLoading(false)
      setShowForm(false)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
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
            <div className="form_col">
              <LoginInput
                type='text'
                name='firstname'
                placeholder='First name'
                onChange={handleLoginChange}
              />
              <LoginInput
                type='text'
                name='lastname'
                placeholder='Last name'
                onChange={handleLoginChange}
              />
            </div>
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
            <button type='submit' className='black_btn'>
              {loading ?
                <PulseLoader color="white" loading={loading} size={7} />
                : 'Create Account'}
            </button>
            <div id="signInDiv">

            </div>
          </Form>)}
        </Formik>
        {error && <div className="error_text">{error}</div>}
        <div className="sign_splitter"></div>
      </div>
    </div>
  )
}
