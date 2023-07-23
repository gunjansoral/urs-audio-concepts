import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

const initialState = {
  userProfile: false,
  mainMenu: false,
  notification: false
}

export const ContextProvider = ({ children }) => {
  const [activeMenu1, setActiveMenu1] = useState()
  const [showForm, setShowForm] = useState(false)

  return (
    <StateContext.Provider
      value={{
        activeMenu1,
        setActiveMenu1,
        showForm,
        setShowForm
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)