import { createClient } from '@supabase/supabase-js'
import { createCRUDHooks } from './tanstackHooks'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/**
 * @typedef {{
 *  defaultSelect?: String
 *  extend?: (base: import('@supabase/supabase-js').PostgrestQueryBuilder, crud: any) => ({})
 * }} Options
 */
/**
 * @param {String} tableName 
 * @param {Options} param2
 */
export const createCRUD = (
  tableName,
  {
    defaultSelect = '*',
    extend = (_base, _crud) => ({}),
  } = {}
) => {
  const base = supabase.from(tableName)

  const crud = {
    getAll: async ({ select = defaultSelect, filters = {}, search = { query: '', columns: [] }, order = { column: 'id', ascending: false }, page = null, pageSize = 10 } = {}) => {
      let req = base
        .select(select, page ? { count: 'exact' } : undefined)
        .order(order.column, { ascending: order.ascending })
  
      req = req.match(filters)
  
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
    getById: async ({column = 'id', id}, { select = defaultSelect, filters = {} } = {}) => {
      const result = await base
        .select(select)
        .eq(column, id)
        .match(filters)
        .maybeSingle()
  
      if(result.error) console.error(`Error getting ${tableName}:`, result.error.message)
      return result
    },
    putData: async (payload) => {
      const result = await base
        .insert(payload)
        .select()
  
      if(result.error) console.error(`Error insert ${tableName}:`, result.error.message)
      return result
    },
    updateData: async (payload, id) => {
      const result = await base
        .update(payload)
        .eq('id', id)
        .select()
  
      if(result.error) console.error(`Error update ${tableName}:`, result.error.message)
      return result
    },
    deleteData: async ({ column = 'id', value }) => {
      const result = await base
        .delete()
        .eq(column, value)
  
      if(result.error) console.error(`Error delete ${tableName}:`, result.error.message)
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
  return Object.assign(crud, extend(base, crud))
}

export const eventService = createCRUD('event')
export const eventHooks = createCRUDHooks(eventService, 'event')

export const newsService = createCRUD('news')
export const newsHooks = createCRUDHooks(newsService, 'news')

export const storyService = createCRUD('story', {
  defaultSelect: '*, story_media(id, media_path), category(name, slug)',
  extend: (base) => ({
    getStories: async ({ filters = {}, category = null, hashtags = null, searchQuery = null, date = null, page = null, pageSize = 10 } = {}) => {
      const baseSelect = 'id, public_id, title, description, published_at, story_media(id, media_path),'

      const categorySelect = category
        ? 'category!inner(name)'
        : 'category(name)'

      let req = base
        .select(`${baseSelect}${categorySelect}`, page ? { count: 'exact' } : undefined)
        .order('published_at', { ascending: false })

      req = req.match(filters)

      if(category)
        req = req.eq('category.slug', category)
      
      if(date){
        const dayStart = `${date}T00:00:00Z`
        const dayEnd = `${date}T23:59:59Z`

        req = req
          .gte('published_at', dayStart)
          .lte('published_at', dayEnd)
      }

      if(hashtags)
        req = req.ilike('hashtags', `%${hashtags}%`)

      if(searchQuery)
        req = req.textSearch('title', searchQuery.split(' ').map(s => `'${s}'`).join(' | '), {
          type: 'websearch',
        })

      if(page){
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        req = req.range(from, to)
      }

      const result = await req

      if(result.error) console.error(`Error getting on stories:`, result.error.message)
      return result
    },
    getStory: async (id) => {
      const result = await base
        .select('title, description, published_at, story_media(id, media_path), category(name, slug)')
        .eq('public_id', id)
        .match({status: 'published'})
        .filter('visibility', 'in', '("public","unlisted")')
        .maybeSingle()
  
      if(result.error) console.error(`Error getting story:`, result.error.message)
      return result
    },
    getPublicIds: async (id) => {
      const result = await base
        .select('id')
        .eq('public_id', id)
        .maybeSingle()

      return result
    }
  })
})
export const storyHooks = createCRUDHooks(storyService, 'story')

export const categoryService = createCRUD('category')
export const categoryHooks = createCRUDHooks(categoryService, 'category')

export const storyMediaService = createCRUD('story_media')
export const storyMediaHooks = createCRUDHooks(storyMediaService, 'story_media')

export const journeyService = createCRUD('journey', {
  extend: (base) => ({
    getRecent: async (excludeId, { select = '*', limit = 4, order = { column: 'id', ascending: false } } = {}) => {
      const result = await base
        .select(select)
        .neq('id', excludeId)
        .order(order.column, { ascending: order.ascending })
        .limit(limit)

      if (result.error) console.error(`Error getting recent journeys:`, result.error.message)
      return result
    }
  })
})
export const journeyHooks = createCRUDHooks(journeyService, 'journey')