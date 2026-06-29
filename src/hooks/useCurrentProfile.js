import { useEffect, useState } from 'react'
import { supabase } from '@/service/crudService'

export const useCurrentProfile = () => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if(!user){
        if(isMounted){
          setProfile(null)
          setIsLoading(false)
        }
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if(isMounted){
        if(error) console.error('Error fetching profile:', error.message)
        setProfile(data)
        setIsLoading(false)
      }
    }

    fetchProfile()
    return () => { isMounted = false }
  }, [])

  return { profile, isLoading }
}