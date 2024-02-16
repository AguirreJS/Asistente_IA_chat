import Conversations from './Conversations';
import { Button, ButtonGroup,Badge, Link } from "@nextui-org/react";
import { Image  } from "@nextui-org/react";
import  Send  from './Send';
import React, { useState , useEffect } from 'react';
import './index';
import alerta from './alerta.mp3';
import { useAppContext } from './MenuDesplegable';
import { dominioActual } from './index';
var ContadorNotificaciones = null;
export var UltomaCharla = null;




function Screen(user) {

  function cerrarsesion() {

    fetch( dominioActual + '/cerrarsesion', {
      method: 'POST', // Método HTTP para la solicitud
      headers: {
        'Content-Type': 'application/json', // Indica el tipo de contenido que se está enviando
      },
      body: JSON.stringify({
        id: 'TU_ID_AQUI' // Reemplaza 'TU_ID_AQUI' con el valor real del ID que deseas enviar
      }),
    })
    .then(response => {
      window.location.href = '../login '
      })
 

  }


  
function goToHome  ()  {
  window.location.href = './'
  };



  function reproducirMP3(rutaArchivo) {
    // Crear un nuevo objeto de audio
    var audio = new Audio(rutaArchivo);

    // Reproducir el audio
    audio.play();
}


  if(user){
    if(user.user){
      let consultarubicacion = user.user.Clientes[0].conversationMessages.length - 1;
      if(user.user.Tipo == 4 && UltomaCharla != user.user.Clientes[0].conversationMessages[consultarubicacion]._id  &&  user.user.Tipo == 4 && user.user.Clientes[0].conversationMessages[consultarubicacion].role == "user" ) {
        UltomaCharla = user.user.Clientes[0].conversationMessages[consultarubicacion]._id;
        ContadorNotificaciones = ContadorNotificaciones + 1;
        reproducirMP3(alerta)
      }
    }
  }
  
  const { isPanelOpen, setPanelOpen } = useAppContext(); 

  const [conversations, setConversations] = useState([]);



  useEffect(() => {

    setConversations(user);
  }, [user]);

  const togglePanel = () => {
    ContadorNotificaciones = null;
    setPanelOpen(!isPanelOpen);
  };

  return (
    
    <div className='bg-[#333] '>
       <div className="flex w-full flex-wrap justify-center items-center "> 
  <ButtonGroup>
  <Badge content={ContadorNotificaciones} color="danger" placement="bottom-lefts">
    <Button  onClick={togglePanel}>Chats</Button>  </Badge>
    <Button onClick={goToHome}>Inicio</Button>
    <Button onClick={cerrarsesion} >Salir</Button>
  </ButtonGroup>  
</div>

    <div className="container  z-indexpersonalizado10">
    <div className={isPanelOpen ? 'panel open' : 'panel'} >
  <Conversations users={conversations}  />
</div>
      <Send/>
    </div>
  
    </div>
    

  );
}

export default Screen;

