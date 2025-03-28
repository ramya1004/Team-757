import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import CareTakerContextProvider from './context/CareTakerContext.jsx'
import { SocketProvider } from "./context/SocketProvider.jsx";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <CareTakerContextProvider>
          <SocketProvider>
          <App />
          </SocketProvider>
          </CareTakerContextProvider>
       
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
);
reportWebVitals();
