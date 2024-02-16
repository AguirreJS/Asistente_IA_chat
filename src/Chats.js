import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Tooltip, Button } from "@nextui-org/react";
import './index.css';
import { PocisionActual } from './Conversations';
import { ObjetoPrincipal } from '.';
import { dominioActual } from '.';

// Crear una copia del objeto principal
var objetoPrincipalCompleto;

function Chat() {


  // Aquí puedes trabajar con objetoPrincipalCompleto sin modificar ObjetoPrincipal original.
 if(ObjetoPrincipal.Tipo == "3"){
  objetoPrincipalCompleto = ObjetoPrincipal
 }

 actualizarClientes(objetoPrincipalCompleto, ObjetoPrincipal)
 function actualizarClientes(objetoTipo3, objetoTipo4) {
  // Verificar que ambos objetos y sus propiedades Clientes existan
  if (!objetoTipo3 || !objetoTipo3.Clientes || !objetoTipo4 || !objetoTipo4.Clientes) {
    console.error("Uno de los objetos no está definido o le falta la propiedad Clientes.");
    return objetoTipo3; // Retornar el objetoTipo3 como está o null/undefined si no está definido
  }

  let clientesTipo3 = objetoTipo3.Clientes;
  let clientesTipo4 = objetoTipo4.Clientes;

  clientesTipo4.forEach(clienteTipo4 => {
    let clienteTipo3 = clientesTipo3.find(c => c._id === clienteTipo4._id);

    if (clienteTipo3) {
      // Actualizar clienteTipo3 con la información de clienteTipo4
      Object.keys(clienteTipo4).forEach(key => {
        clienteTipo3[key] = clienteTipo4[key];
      });
    } else {
      // Si el cliente no existe en Tipo 3, lo añadimos
      clientesTipo3.push(clienteTipo4);
    }
  });

  objetoPrincipalCompleto = objetoTipo3;
  return objetoTipo3;
}



  const [mensajes, setMensajes] = useState([]);
  const messagesContainerRef = useRef(null);
  
  function encontrarClientePorIDchat(idChat, objetoPrincipal) {
    if (objetoPrincipal && objetoPrincipal.Clientes) {
      const clientes = objetoPrincipal.Clientes;
      for (let cliente of clientes) {
        if (cliente && cliente.IDchat === idChat) {
          return cliente;
        }
      }
    }
    return null;
  }
  function generarMensajesHTML(cliente) {
    if (!cliente || !cliente.conversationMessages) return null;
  
    return cliente.conversationMessages.map((mensaje, index) => {
      console.log(mensaje.fecha)
      // Comprobar si el mensaje es una imagen o un audio
      const esImagen = mensaje.content.endsWith('.jpg');
      const esAudio = mensaje.content.endsWith('.mp3');
  
      if (mensaje.role === 'system') {
        return (
          <div key={index} className="flex justify-end">
            <div className="w-4/5 lg:max-w-md bg-[#555] p-4 rounded-l-lg rounded-tr-lg">
              {esImagen ? (
                <img src={`${dominioActual}/${mensaje.content}`} alt="Imagen del mensaje" />
              ) : esAudio ? (
                <div className="w-full flex justify-center">
                <audio controls className="w-full">
                  <source src={`${dominioActual}/${mensaje.content}`} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
              ) : (<div> 
                <p className="text-sm">{mensaje.content}</p>
                <p className="text-right text-fecha">{mensaje.fecha}</p>
               </div>
              )}
            </div>
          </div>
        );
      } else if (mensaje.role === 'cliente') {
        return (
          <div key={index} className="flex justify-end">
            <div className="w-4/5 lg:max-w-md bg-green-700 text-white p-4 rounded-r-lg rounded-tl-lg">
              {esImagen ? (
                <img src={`${dominioActual}/${mensaje.content}`} alt="Imagen del mensaje" />
              ) : esAudio ? (
                <audio controls>
                  <source src={`${dominioActual}/${mensaje.content}`} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              ) : (
                <div> 
                <p className="text-sm">{mensaje.content}</p>
                <p className="text-right text-fecha">{mensaje.fecha}</p>
               </div>
              )}
            </div>
          </div>
        ) } else {
        return (
          <div key={index} className="flex justify-start">
          <div className={
            `w-4/5 lg:max-w-md ${
              esAudio ? 'bg-transparent' : 'bg-blue-500'
            } text-white p-4 rounded-r-lg rounded-tl-lg`
          }>
            {esImagen ? (
              <img src={`${dominioActual}/${mensaje.content}`} alt="Imagen del mensaje" />
            ) : esAudio ? (
              <audio controls>
                <source src={`${dominioActual}/${mensaje.content}`} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            ) : (
              <div> 
              <p className="text-sm">{mensaje.content}</p>
              <p className="text-right text-fecha">{mensaje.fecha}</p>
             </div>
            )}
          </div>
        </div>
        
        );
      }
    });
  }
  
  // ... El resto del componente permanece igual
  
  useEffect(() => {
    const cliente = encontrarClientePorIDchat(PocisionActual.IDchat, objetoPrincipalCompleto);
    const mensajesActualizados = generarMensajesHTML(cliente);
    setMensajes(mensajesActualizados);
  }, [PocisionActual, ObjetoPrincipal]); // Dependencias actuales
  
  useEffect(() => {
    // Hacer scroll hacia abajo
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [mensajes]); // Nuevo useEffect para manejar el desplazamiento

  return (
    <div className="absolute w-screen h-screen bg-[#333] m-0 p-0 flex justify-center Scrollbar items-center">
      <div
        ref={messagesContainerRef} 
        className="w-[100vh] h-[70vh] max-w-[190vh]  bg-[#3220] m-0 flex flex-col gap-4 px-2 Scrollbar translate-y-[-19%] overflow-y-auto"
      >
        {mensajes}
      </div>
    </div>
  );
}

export default Chat;
