import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // ✅ define currency symbol here
  const currency = "$ "   // or "$", "€", etc.

  const value = {
    calculateAge,
    currency
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
