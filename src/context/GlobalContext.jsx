import { createContext, useContext, useReducer } from 'react'
import { initialState } from './initialState'

const GlobalContext = createContext()

const ACTIONS = {}

function reducer(state, action){
  const {type, payload} = action

  switch (type) {
    default:
      return state
  }
}

const useGlobal = () => useContext(GlobalContext)

function GlobalProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}