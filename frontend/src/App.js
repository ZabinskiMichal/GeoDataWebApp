import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import User from './components/User';
import Admin from './components/Admin';
import MapLayout from './components/MapLayout';

// const ROLES = {
//   "USER": 2001,
//   "ADMIN": 5150
// }

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>


        {/* routy dostepne dla kazdego */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="linkpage" element={<LinkPage />} /> */}
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
        <Route path='map' element={<MapLayout />} />

        {/* <Route path='/' element={<Home />} /> */}


        {/* USER to 2001 */}
        <Route element={<RequireAuth allowedRoles={["USER"]}/>}>
          <Route path='user' element={<User/>} />
          {/* mozna dodac tu wiecej sciezek */}
        </Route>
      
      {/* to tablicy mozemy przekazac kilka elementow */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='admin' element={<Admin />} />
        </Route>

        {/* rout, który zostanie wyswietlany w przypadku niepoprawego routa*/}
        {/* <Route path='*' element={<Missing />} /> */}


      </Route>
    </Routes>



    
  );
}



export default App;
