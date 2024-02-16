import React, { useState } from 'react';
import {Textarea} from "@nextui-org/react";
import {Tooltip, Button , Tabs, Tab , Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import Chat from './Chats';
import ChatGPT from './Icons/IA.png'
import SendIco from './Icons/Send.png'
import './index.css'
import Screen from './Screen';
import Menu from './menu';
import { PocisionActual } from './Conversations';
import io from "socket.io-client";
import { IdSocket } from '.';
import { dominioActual , ObjetoPrincipal } from '.';


function Send() {


const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const [message, setMessage] = useState(''); // Estado para el mensaje

  // Función para actualizar el estado con el valor del Textarea
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  



  // Función para manejar el envío del mensaje
  const handleSend = () => {

    // Verificar si message está vacío o solo contiene espacios en blanco
    if (!message || message.trim() === "") {
      console.log("El mensaje está vacío.");
      return false;
  }
   
    
    let data = {
      tipo:"5",
      id:IdSocket,
      mensaje:message,
      IDchat:PocisionActual.IDchat,
      
      }



      
      const fetchDataPromise = fetch(dominioActual + '/SolicitudEnvioMensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al enviar la solicitud');
          }
        });
      
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Tiempo de espera agotado'));
        }, 3000); // 3000 milisegundos (3 segundos)
      });
      
      Promise.race([fetchDataPromise, timeoutPromise])
        .then(data => {
          // Maneja la respuesta del servidor aquí
          if (data.success == true) {
            console.log("Respondió dentro de los 3 segundos");
          } else {
            console.log("Sin respuesta del servidor");
          }
        })
        .catch(error => {
          // Maneja los errores aquí, incluyendo el error de tiempo de espera
          console.error(error.message);
        });
      

  setMessage('');

  };

  ///////////////////
  const handleTabSelectionChange = (key) => {
    // Actualizar el estado con la key y el índice de la pestaña seleccionada
    const index = tabs.findIndex(tab => tab.key === key);
    setSelectedTab({ key, index });
  };


  const tabs = [
    { key: 'Si', title: 'Nuevo Hilo' },
    { key: 'No', title: 'Mantener Hilo Anterior' },
  ];

  const [selectedTab, setSelectedTab] = useState({ key: 'Si', index: 0 });

  const ActivarIA = () => {
   
    
    let data = {
      IA : selectedTab.key ,
      IDchat:PocisionActual.IDchat,

      
      }



      
      
fetch(dominioActual + '/ActivarAsistente', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al enviar la solicitud');
    }
  })
  .then(data => {
    // Maneja la respuesta del servidor aquí

  })
  .catch(error => {
    // Maneja los errores aquí
    console.error(error);
  });




  };

  let isDisabledCondition = PocisionActual.Activo;

  
  return (
    <div>
      <Chat></Chat>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-2 bg-transparent translate-y-[-5%]">
      <div id="myDiv" class=" tituloperzonalizado relative w-full md:w-1/3 h-20 mx-auto p-2 rounded bg-transparent hover:bg-opacity-50 hover:h-40 text-white transition-all">

          <Textarea
          isInvalid={isDisabledCondition ? false : true}
             {...(!isDisabledCondition ? { isDisabled: true } : {})}  // Cambiado aquí
              className={`w-full p-4 ${isDisabledCondition ? "pb-2 " : "pb-10"}`}
            key="bordered"
            variant="flat"
            label={isDisabledCondition ? "Nuevo mensaje" : "CHAT FUERA DE TIEMPO"} 
            labelPlacement="inside"
            placeholder= {isDisabledCondition ? "" : ""} 
            value={message}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { // Detecta la tecla Enter sin Shift
                e.preventDefault(); // Previene el salto de línea
                handleSend(); // Llama a la función de envío
              }
            }}
          />
          <div className="absolute bottom-2 right-2">
            <Button
            size="sm"
            {...(!isDisabledCondition ? { isDisabled: true } : {})} 
              radius="full"
              className="bg-gradient-to-tr text-xxs from-blue-500 to-black-500 text-white shadow-lg"
              onClick={handleSend}
            >
            <img src={SendIco} alt="Send icon" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
  <Button
    size="sm"
    radius="full"
    className="bg-gradient-to-tr text-xxs from-purple-500 to-black text-white shadow-lg "
    onPress={onOpen}
  >
 <img src={ChatGPT} alt="Chat IA" />
  </Button>

  <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 overflow-y-auto"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Activar IA en este chat</ModalHeader>
              <ModalBody>
              <p class="font-bold">Nuevo Hilo:</p>
    <p>Al seleccionar esta opción, iniciará una conversación  entre el usuario y la IA nueva, sin ninguna referencia a comverzaciones anteriores. Esta es la mejor elección desea empezar un nuevo tema desde cero. o bien para que la IA reestablezca el carrito de compra.  </p>
    
    <p class="font-bold">Mantener Hilo Anterior:</p>
    <p>Optando por esta alternativa, la conversación anterior se conserva, y la IA reconocerá el historial de diálogo previo. Esta opción es ideal si desea frenar momentaneamente la ia respondiendo por su cuenta y luego reactivando la misma para que siga la comverzacion.</p>



                <Tabs
          color="primary"
          aria-label="Tabs colors"
          variant='solid'
          value={selectedTab.key}
          className='text-xs'
          onSelectionChange={handleTabSelectionChange} // Usar onSelectionChange aquí
        >
          {tabs.map((tab) => (
            <Tab  key={tab.key} value={tab.key} title={tab.title} />
          ))}
        </Tabs>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light"   onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={ActivarIA} onPress={onClose}>
                  Activar IA
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



</div>

        </div>
      </div>
    </div>
  );}
  
  export default Send;
  