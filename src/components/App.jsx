import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Checkout from './Checkout/Checkout';

//Context
import { DarkModeProvider } from '../context/DarkModeContext';

//Componentes
import Navbar from './Navbar/Navbar';
import ItemListContainer from './itemListContainer/ItemListContainer';
 
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer';
import Cart from './Cart/Cart';
//import Checkout from './Checkout/Checkout';
//import {DarkModeProvider} from '../context/DarkModeContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  return (
    <> 
      <BrowserRouter>
        <DarkModeProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path='/products/:id' element={<ItemDetailContainer/>}/>
            <Route path='/category/:category' element={<ItemListContainer/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Checkout" element={<Checkout/>}/>
          
          </Routes>
          <ToastContainer/>  
        </DarkModeProvider>
      </BrowserRouter>
    </>
      
  );
}

export default App;
