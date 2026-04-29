import { createClient } from '@supabase/supabase-js'
import { createCRUDHooks } from './tanstackHooks'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const createCRUD = (
  tableName,
  {
    defaultSelect = '*',
  } = {}
) => {
  const base = supabase.from(tableName)

  return {
    getAll: async ({ select = defaultSelect, filters = [], search = { query: '', columns: [] }, order = { column: 'id', ascending: false }, page = null, pageSize = 10 } = {}) => {
      let req = base
        .select(select, page ? { count: 'exact' } : undefined)
        .order(order.column, { ascending: order.ascending })
      
      filters.forEach(({ column, value }) => req = req.eq(column, value))

      if(search.query && search.columns.length > 0){
        const orFilter = search.columns.map(col => `${col}.ilike.%${search.query}%`).join(',')
        req = req.or(orFilter)
      }

      if(page){
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        req = req.range(from, to)
      }

      const result = await req

      if(result.error) console.error(`Error getting on ${tableName}:`, result.error.message)
      return result
    },
    getById: async (id, { select = defaultSelect } = {}) => {
      const result = await base
        .select(select)
        .eq('id', id)
        .single()
      
      if(result.error) console.error(`Error getting on ${tableName}:`, result.error.message)
      return result
    },
    getRecent: async (excludeId, { select = defaultSelect, limit = 4, order = { column: 'id', ascending: false } } = {}) => {
      const result = await base
        .select(select)
        .neq('id', excludeId)
        .order(order.column, { ascending: order.ascending })
        .limit(limit)

      if (result.error) console.error(`Error getting recent on ${tableName}:`, result.error.message)
      return result
    },
    putData: async (payload) => {
      const result = await base
        .insert(payload)
        .select()

      if(result.error) console.error(`Error insert on ${tableName}:`, result.error.message)
      return result
    },
    updateData: async (payload, id) => {
      const result = await base
        .update(payload)
        .eq('id', id)
        .select()

      if(result.error) console.error(`Error update on ${tableName}:`, result.error.message)
      return result
    },
    deleteData: async ({ column = 'id', value }) => {
      const result = await base
        .delete()
        .eq(column, value)

      if(result.error) console.error(`Error delete on ${tableName}:`, result.error.message)
      return result
    },
    subscribe: (getData, extraTables = []) => {
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
  }
}
export const eventService = createCRUD('event')
export const eventHooks   = createCRUDHooks(eventService, 'event')

export const newsService = createCRUD('news')
export const newsHooks   = createCRUDHooks(newsService, 'news')

export const storyService = createCRUD('story', { defaultSelect: '*, story_media(id, media_path)' })
export const storyHooks   = createCRUDHooks(storyService, 'story')

export const storyMediaService = createCRUD('story_media')
export const storyMediaHooks   = createCRUDHooks(storyMediaService, 'story_media')

export const journeyService = createCRUD('journey', { defaultSelect: '*, journey_category(id, name)' })
export const journeyHooks   = createCRUDHooks(journeyService, 'journey')

export const journeyCategoryService = createCRUD('journey_category')
export const journeyCategoryHooks   = createCRUDHooks(journeyCategoryService, 'journey_category')