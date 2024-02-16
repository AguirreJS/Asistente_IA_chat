import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const AppContext = createContext();

// Crea un proveedor que envuelva tu aplicación
export const AppProvider = ({ children }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isPanelOpen, setPanelOpen }}>
      {children}
    </AppContext.Provider>
  );
};

// Un gancho personalizado para acceder al contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
