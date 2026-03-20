import { useEffect } from 'react'
import { supabase } from '@/supabase-client'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const createCRUD = (tableName) => ({
  getAll: async (setLoading, setData) => {
    const { error, data } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true })
    
    if(error){
      console.error('Error getting task: ', error.message)
      setLoading(false)
      return
    }
    
    setData(data)
    setLoading(false)
  },
  getById: async (id, setLoading, setData) => {
    const { error, data } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
    
    if(error){
      console.error('Error getting task: ', error.message)
      setLoading(false)
      return
    }
    
    setData(data)
    setLoading(false)
  },
  putData: async (payload) => {
    const { error } = await supabase
      .from(tableName)
      .insert(payload)

    return { error }
  },
  updateData: async (payload, id) => {
    const { error } = await supabase
      .from(tableName)
      .update(payload)
      .eq('id', id)

    return { error }
  },
  deleteData: async (id) => {
    Swal.fire({
      title: `Do you want to Delete this ${tableName}?`,
      showDenyButton: true,
      denyButtonText: `Cancel`,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if(!result.isConfirmed) return

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if(error){
        toast.error('an error occured')
        console.error('an error occured: ', error)
        return
      }

      toast.success('Event has been deleted')
    })
  },
  subscribeToChanges: (getData) => {
    const channel = supabase
      .channel(`${tableName}-channel`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: tableName,
      }, () => getData())
      .subscribe()
  }
})