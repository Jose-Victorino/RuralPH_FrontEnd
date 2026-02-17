import { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState'

const GlobalContext = createContext();

const ACTIONS = {
  TOGGLE_DELETE_STATE: 'TOGGLE_DELETE_STATE',
};

function reducer(state, action){
  const {type, payload} = action;

  switch (type) {
    case ACTIONS.TOGGLE_DELETE_STATE:
      return { ...state,
        deleteMode: !state.deleteMode
      }
    default:
      return state;
  }
}

const useGlobal = () => useContext(GlobalContext);

function GlobalProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}