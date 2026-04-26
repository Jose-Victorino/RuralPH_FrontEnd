import { useEffect, createContext, useContext, useReducer } from 'react'
import { initialState } from './initialState'
import { navigationLinksService } from '@/service/crudService'

const GlobalContext = createContext()

const ACTIONS = {}

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.SET_NAVIGATION_LINKS:
      return {
        ...state,
        navigationLinks: payload.reduce((acc, { link, name }) => ({...acc, [name]: link}), {})
      }
    default:
      return state
  }
}

const useGlobal = () => useContext(GlobalContext)

function GlobalProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchNavigationLinks = async () => {
      const { data, error } = await navigationLinksService.getAll()
      if(!error) dispatch({ type: ACTIONS.SET_NAVIGATION_LINKS, payload: data })
    }

    fetchNavigationLinks()
    const unsubscribe = navigationLinksService.subscribeToChanges(() => fetchNavigationLinks())
    return () => unsubscribe()
  }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}