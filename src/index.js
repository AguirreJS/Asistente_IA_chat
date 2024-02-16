import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Screen from './Screen';
import { NextUIProvider } from "@nextui-org/react";
import io from "socket.io-client";
import { AppProvider } from './MenuDesplegable';
export let dominioActual = 'https://remoto.rhglobal.com.ar';
export  let IdSocket;

export var ObjetoPrincipal = [];








const App = () => {
    const [userValue, setUserValue] = useState(null);
   

    useEffect(() => {
        const socket = io(dominioActual);

        socket.on('connect', () => {
            socket.emit('mensaje_cliente', { tipo: "1" });
            IdSocket = socket.id;
            logueo()
        });

        socket.on('evento_del_servidor', (data) => {
        
          ObjetoPrincipal = data
            setUserValue(data);
        });

    
    }, []);


 function logueo() {


      console.log("enviando")
          fetch('https://remoto.rhglobal.com.ar/onlinesocket', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: IdSocket , 
          tipo: "6" })
      })
      .then(response => {
        console.log(response)
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Hubo un problema con la solicitud fetch:', error);
      });
      
      
      }



///////////////////////////////// renderizado react



    return (
        <NextUIProvider className="dark text-foreground bg-[#333]">
            <AppProvider>
            <div className="h-screen">
      <Screen user={userValue} />
    </div>
            </AppProvider>
        </NextUIProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);





