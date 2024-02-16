import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem, Avatar , Badge } from "@nextui-org/react";
import { ListboxWrapper } from "./scripts-next/ListboxWrapper";
import userActivedGif from './Icons/user-actived.png';
import userPNG from './Icons/user.png';
import Send from "./Send";
import { useAppContext } from './MenuDesplegable';

var Ultimacharla = null;

var ConsumoVariable = [];
export var  PocisionActual = {}


export default function Conversations( user ) {



  const { isPanelOpen, setPanelOpen } = useAppContext(); 


  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };



  function buscarConsumoPorIdChat(IDChat) {
    // Buscar el objeto en el array que tiene el mismo idChat
    var resultado = ConsumoVariable.find(ConsumoVariable => ConsumoVariable.idChat === IDChat);

    // Verificar si se encontró un resultado
    if (resultado === undefined) {
        // Manejar el caso en que el resultado no se encuentre
        // Puedes retornar null, 0, o cualquier otro valor apropiado
        return "Sin consumo";
    }

    return resultado.consumo;
}





if (user.users.user) {
  user.users.user.Clientes.forEach(cliente => {
      // Buscar si el cliente ya existe en el array
      let clienteExistente = ConsumoVariable.find(c => c.idChat === cliente.IDchat);

      if (clienteExistente) {
          // Si ya existe, actualizamos su consumo
          if (typeof cliente.Consumo === 'number') {
              clienteExistente.consumo = cliente.Consumo.toFixed(5);
          } else {
              clienteExistente.consumo = "Sin Consumo"; // O manejar de otra forma
          }
      } else {
          // Si es un nuevo cliente
          if (typeof cliente.Consumo === 'number') {
              ConsumoVariable.push({
                  idChat: cliente.IDchat,
                  consumo: cliente.Consumo.toFixed(5)
              });
          } else {
              ConsumoVariable.push({
                  idChat: cliente.IDchat,
                  consumo: "Sin Consumo" // O manejar de otra forma
              });
          }
      }
  });
}





  const [users, setUsers] = useState([]);

  useEffect(() => {
 
    let shouldUpdateState = false;
    let newUsers = [...users];
  
    if (user.users.user) {
      if (user.users.user.Clientes && user.users.user.Tipo === "3") {
        newUsers = user.users.user.Clientes.map((cliente, index) => (
          {
          id: index,
          name: cliente.IDchat,
          FechaActualizacion: esMismoDia(cliente.UltimaActualizacion),
          team: "Management",
          status: "active",
          age: "29",
          avatar: userPNG,
          Id_chat:  buscarConsumoPorIdChat(cliente.IDchat),
        }));
        shouldUpdateState = true;
      } else if (user.users.user.Clientes && user.users.user.Tipo === "4") {
    
        let idChat = user.users.user.Clientes[0].IDchat;

        
        
        
      let foundUser = newUsers.find(u => u.name === idChat);

    
              


      if (!foundUser) {
        // Crear y agregar un nuevo usuario si IDchat no existe
        const newUser = {
          id: newUsers.length + 1, // O alguna lógica para generar un ID único
          name: idChat,
          FechaActualizacion: true,
          team: "Nuevo equipo",
          status: 1,
          age: "Nueva edad",
          avatar: userActivedGif,
          Id_chat:buscarConsumoPorIdChat(idChat),
        };
        newUsers = [newUser, ...newUsers];
        shouldUpdateState = true;
      } else if (foundUser) {

        let consultarubicacion = user.users.user.Clientes[0].conversationMessages.length - 1;
        if(user.users.user.Clientes[0].conversationMessages[consultarubicacion]._id !=  Ultimacharla &&  user.users.user.Clientes[0].conversationMessages[consultarubicacion].role == "user" ) {


          Ultimacharla = user.users.user.Clientes[0].conversationMessages[consultarubicacion]._id;

          const updatedUsers = users.map(user => {
 
                
            if (selectedUserId == user.id) { 


         
              const newStatus = user.status === 'active';
                  const newAvatar = userPNG ;
                  return { ...user, status: newStatus, avatar: newAvatar , Id_chat : buscarConsumoPorIdChat(user.name) , FechaActualizacion : true};
            } else if (user.id === foundUser.id) {
                  const newStatus = typeof user.status === 'number' ? user.status + 1 : 1;
                  const newAvatar = userActivedGif;
                  return { ...user, status: newStatus, avatar: newAvatar , Id_chat : buscarConsumoPorIdChat(user.name), FechaActualizacion : true};
              }
              return user;
          });
      
          newUsers = updatedUsers;

          
      
          shouldUpdateState = true;
      }
    }

  }
    } else if (user.user == null) {
      newUsers = [{
        id: 1,
        name: "Sin chats",
        FechaActualizacion: false,
        team: "Management",
        status: "active",
        age: "29",
        avatar: userPNG ,
        Id_chat: "No posee chats activos",
      }];
      shouldUpdateState = true;
    }
  
    if (shouldUpdateState) {
      setUsers(newUsers);
    }
  }, [user]); // Elimina 'users' del array de dependencias
  
  function esMismoDia(fechaParametro) {
    // Zona horaria de Argentina (GMT-3)
    const offsetArgentina = -3 * 60; // Offset en minutos para la zona horaria de Argentina
    
    // Fecha actual en la zona horaria local del servidor
    let now = new Date();
    
    // Fecha actual en UTC
    let nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));
  
    // Ajustar la fecha actual a la zona horaria de Argentina
    nowUTC.setMinutes(nowUTC.getMinutes() + offsetArgentina);
  
    // Convertir la fecha de parámetro a objeto Date
    let inputDateUTC = new Date(fechaParametro);
  
    // Ajustar la fecha de parámetro a la zona horaria de Argentina
    inputDateUTC.setMinutes(inputDateUTC.getMinutes() + offsetArgentina);
  
    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferenciaMilisegundos = nowUTC - inputDateUTC;
    const horasDiferencia = Math.abs(diferenciaMilisegundos) / (1000 * 60 * 60);
  
    // Determinar si la diferencia es menor a 24 horas
    return horasDiferencia < 24;
  }
  
  



  function reestablecerChat(I ,) {

    PocisionActual = {
      IDchat:users[I].name,
      ID:users[I].id,
      Activo: users[I].FechaActualizacion
    };
  
    togglePanel();
    // Crear una nueva lista basada en el estado actual
    const nuevosUsuarios = users.map(usuario => {


  

      if (usuario.id === I) {
    
        return {
          ...usuario,
          status: "active",
          avatar: userPNG 
        };
      }
      return usuario;
    });

    // Actualiza el estado con la nueva lista
    setUsers(nuevosUsuarios);
  }

  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    
    <ListboxWrapper itemClasses="overflow:hidden" className="fixed top-0 left-0 w-full h-screen no-scroll z-indexpersonalizado10 Scrollbar">
      <Listbox
        classNames={{
          base: "max-w-xs Scrollbar",
          list: "max-h-screen overflow-scroll Scrollbar",
        }}
        defaultSelectedKeys={[selectedUserId]}
        items={users}
        label="Assigned to"
        selectionMode="single"
        onSelectionChange={(selectedItems) => {
          const selectedArray = Array.from(selectedItems);
          if (selectedArray.length > 0) {

            reestablecerChat(parseInt(selectedArray[0], 10));
            setSelectedUserId(selectedArray[0]);
          }
        }}
                
        variant="shadow"
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.name} >
            <div className="flex gap-2 items-center">
              

            <Badge 
  isInvisible={item.status === 'active'}
  content={item.status === 'active' ? null : item.status}
  size="md" 
  placement="bottom-right"
  color="primary"
>


            <Badge content="" size="md" color = {item.FechaActualizacion ? "success" : "danger"}>
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              </Badge></Badge>
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.Id_chat}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
