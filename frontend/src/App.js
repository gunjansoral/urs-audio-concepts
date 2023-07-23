import { Route, Routes } from 'react-router-dom';
import './App.css';
import AudioMotor from './pages/AudioMotor';
import EarWorkout from './pages/EarWorkout';
import LoggedInRoutes from "./routes/LoggedInRoutes"
import Home from './pages/Home';
import MeetTheProducer from './pages/MeetTheProducer';



function App() {
  return (
    <Routes>
      {/* Dashbaord */}
      <Route path='/dashboard' element='home' />

      {/* Pages */}
      <Route path='/' element={<Home />} exact />

      {/* Logged-in routes */}
      <Route element={<LoggedInRoutes />}>
        <Route path='/audiomotor' element={<AudioMotor />} exact />
        <Route path='/meetTheProducer' element={<MeetTheProducer />} exact />
        <Route path='/earworkout' element={<EarWorkout />} exact />
      </Route>

    </Routes>
  );
}

export default App;
