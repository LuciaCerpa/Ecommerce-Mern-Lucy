import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'antd/dist/antd.css'
import './index.css';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Purchase from './pages/Purchases/Purchases';
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRouter>
            <Home/>
            </ProtectedRouter>
        }/>
        <Route path='/products' element={
          <ProtectedRouter>
            <Products/>
          </ProtectedRouter>  
        }/>    
        <Route path='/carts' element={
          <ProtectedRouter>
            <Cart/>
          </ProtectedRouter>
        }/>  
        <Route path='/users' element={
          <ProtectedRouter>
            <User/>
          </ProtectedRouter>
        }/>
        <Route path='/orders' element={
          <ProtectedRouter>
            <Purchase/>
          </ProtectedRouter>
        }/>    
        <Route path='/login' element={
          
          <Login/>
          
        }/>
        <Route path='/register' element={
          <Register/>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

export function ProtectedRouter({children}){
  if(localStorage.getItem("auth")){
    return children;
  }else{
    return <Navigate to ="/login"/>
  }
}
