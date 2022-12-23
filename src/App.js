import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch, useSelector } from "react-redux";
// import AdminDashboard from './pages/AdminDashboard';
// import OrdersPage from './pages/OdersPage';
import ProfilePage from './components/Profile';
// import AddProfile from './components/AddProfile';
// import UserDashboard from './components/UserDashboard';
import EditProfile from './components/EditProfile';


function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Signup />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user && (
            <>
            <Route path="/profiles" element={<ProfilePage />} />
            <Route path="/profiles/${profile.id}" element={<EditProfile />} />
              {/* <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/addprofile" element={<AddProfile />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/profile/:id/edit" element={<EditProfile />} />
              <Route path="/addProfile" element={<AddProfile />} /> */}
            </>
          )}


          <Route path="*" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;