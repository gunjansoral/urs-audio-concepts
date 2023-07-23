
import axios from "axios";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    const userInfos = {
      firstname: user?.displayName.trim().split(/\s+/)[0],
      lastname: user?.displayName.trim().split(/\s+/)[1],
      email: user?.email,
      username: user?.displayName,
      // picture: ,
    }
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, userInfos)
    if (data) {
      const reduxState = {
        firstname: data.firstname,
        lastname: data.lastname,
        picture: user?.photoURL,
        email: data.email,
        username: data.username,
        message: data.message,
        details: data.details
      }
      return reduxState
    } else {
      return {}
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error.code)
  }
}

export const googleSignOut = (fun) => {
  signOut(auth)
  fun()
}









// export default function useGoogleSignin() {
//   const [userData, setUserData] = useState({})
//   // useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//
//   })
//   const userInfos = {
//     firstname: userData.firstname,
//     lastname: userData.lastname,
//     email: userData.email,
//     username: userData.username
//   }
//   return
//   const registerSubmit = async () => {
//     Cookies.set('user', JSON.stringify(reduxState))
//     dispatch({ type: 'LOGIN', payload: reduxState })
//     console.log(data)
//   }
//   registerSubmit()
//   return () => {
//     unsubscribe()
//   }
//   // }, [])
//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider()
//     signInWithPopup(auth, provider)
//   }
//   const signIn = async () => {
//     try {
//       await googleSignIn()
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // function handleCallbackResponse(response) {
//   //   try {
//   //

//   //     //
//   //     // setToken(response.credential)
//   //   } catch (error) {
//   //     console.log(error.response)
//   //   }
//   // }
//   return signIn
// }

// export function useGoogleSignout(fun) {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch({
//       type: 'LOGOUT',
//       payload: ''
//     })
//     Cookies.set('user', '')
//     fun()
//   }, [])
// }