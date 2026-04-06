import { supabase } from '@/supabase-client'

export const createCRUD = (tableName) => ({
  getAll: async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true })

    if(error) console.error(`Error getting on ${tableName}:`, error.message)
    return { data, error }
  },
  getById: async (id) => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single()
    
    if(error) console.error(`Error getting on ${tableName}:`, error.message)
    return { data, error }
  },
  putData: async (payload) => {
    const { data, error } = await supabase
      .from(tableName)
      .insert(payload)
      .select()

    if(error) console.error(`Error insert on ${tableName}:`, error.message)
    return { data, error }
  },
  updateData: async (payload, id) => {
    const { data, error } = await supabase
      .from(tableName)
      .update(payload)
      .eq('id', id)
      .select()

    if(error) console.error(`Error update on ${tableName}:`, error.message)

    return { data, error }
  },
  deleteData: async (id) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if(error) console.error(`Error delete on ${tableName}:`, error.message)

    return { error }
  },
  subscribeToChanges: (getData) => {
    supabase.getChannels()
      .filter(ch => ch.topic === `realtime:${tableName}-channel`)
      .forEach(ch => supabase.removeChannel(ch))

    const channel = supabase
      .channel(`${tableName}-channel`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: tableName,
      }, () => getData())
      .subscribe()
    
    return () => supabase.removeChannel(channel)
  }
})