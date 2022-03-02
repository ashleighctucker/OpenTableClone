import { createContext, useState } from 'react';
import { useContext } from 'react';

export const MenuContext = createContext();
export const useMenu = () => useContext(MenuContext); /// custom hook

export function MenuProvider(props) {
  const [showMenu, setShowMenu] = useState(false);


  return (
    <MenuContext.Provider
      value={{
        showMenu,
        setShowMenu,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}
