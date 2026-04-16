import { supabase } from '@/supabase-client'

export const createCRUD = (
  tableName,
  {
    defaultSelect = '*',
  } = {}
) => ({
  getAll: async ({ select = defaultSelect, order = { column: 'id', ascending: true } } = {}) => {
    const result = await supabase
      .from(tableName)
      .select(select)
      .order(order.column, { ascending: order.ascending })

    if(result.error) console.error(`Error getting on ${tableName}:`, result.error.message)
    return result
  },
  getPage: async ({ select = defaultSelect, page = 1, pageSize = 10, order = { column: 'id', ascending: true } } = {}) => {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const result = await supabase
      .from(tableName)
      .select(select, { count: 'exact' })
      .order(order.column, { ascending: order.ascending })
      .range(from, to)

    if(result.error) console.error(`Error getting page on ${tableName}:`, result.error.message)
    return result
  },
  getById: async (id, { select = defaultSelect } = {}) => {
    const result = await supabase
      .from(tableName)
      .select(select)
      .eq('id', id)
      .single()
    
    if(result.error) console.error(`Error getting on ${tableName}:`, result.error.message)
    return result
  },
  putData: async (payload) => {
    const result = await supabase
      .from(tableName)
      .insert(payload)
      .select()

    if(result.error) console.error(`Error insert on ${tableName}:`, result.error.message)
    return result
  },
  updateData: async (payload, id) => {
    const result = await supabase
      .from(tableName)
      .update(payload)
      .eq('id', id)
      .select()

    if(result.error) console.error(`Error update on ${tableName}:`, result.error.message)
    return result
  },
  deleteData: async (id) => {
    const result = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if(result.error) console.error(`Error delete on ${tableName}:`, result.error.message)
    return result
  },
  deleteWhere: async (column, value) => {
    const result = await supabase
      .from(tableName)
      .delete()
      .eq(column, value)

    if(result.error) console.error(`Error delete on ${tableName}:`, result.error.message)
    return result
  },
  subscribeToChanges: (getData, extraTables = []) => {
    const tables = [tableName, ...extraTables]

    tables.forEach(table => {
      const existing = supabase
        .getChannels()
        .find(ch => ch.subTopic === `${table}-channel`)
      if(existing) supabase.removeChannel(existing)
    })

    const channels = tables.map(table =>
      supabase
        .channel(`${table}-channel`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table,
        }, () => getData())
        .subscribe()
    )
    
    return () => channels.forEach(ch => supabase.removeChannel(ch))
  },
})