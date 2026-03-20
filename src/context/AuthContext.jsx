import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '@/supabase-client'

const AuthContext = createContext()

export function AuthContextProvider({children}) {
  const [session, setSession] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if(error){
      console.error('Error on signing up: ', error)
      return { success: false, error }
    }
    return { success: true, data }
  }

  const logInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if(error){
        console.error('Error on login: ', error)
        return { success: false, error: error.message }
      }
      
      return { success: true, data }
    } catch (error) {
      console.error('Error on login: ', error)
    }
  }

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (isMounted) setSession(session)
      } catch (error) {
        console.error('Error getting session: ', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    init()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signOut = () => {
    const { error } = supabase.auth.signOut()

    if(error) console.error('Error on sign out: ', error)
  }

  return (
    <AuthContext.Provider value={{session, isLoading, logInUser, signUpNewUser, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}