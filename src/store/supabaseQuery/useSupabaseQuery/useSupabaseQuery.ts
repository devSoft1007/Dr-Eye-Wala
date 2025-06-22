import { useCallback, useEffect, useState } from 'react'
import {createClient} from '@/utils/supabase/client'
import { useAppDispatch, useAppSelector } from '../..'
import { setCacheData } from '../../slices/cacheSlice'

// Custom hook for cached Supabase queries
export function useSupabaseQuery<T>(
    table: string | null,
    query: string | null,
    options?: {
      edgeFunction?: string // Optional edge function to call instead of direct query
      body?: object // Optional body for the edge function
      cacheTime?: number // Cache duration in milliseconds
      enabled?: boolean
    }
  ) {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
  
    const cacheKey = `${table}:${query}`
    const cacheTime = options?.cacheTime || 5 * 60 * 1000 // Default 5 minutes
    const enabled = options?.enabled ?? true
  
    // Get cached data from Redux store
    const cachedData = useAppSelector((state) => state.cache[cacheKey])
  
    const fetchData = useCallback(async () => {
      const supabase = createClient()
      setIsLoading(true)
      setError(null)
  
      try {
        let result;
        if (options?.edgeFunction) {
          result = await supabase.functions.invoke(options.edgeFunction, {
            body: options.body || {}
          });
          console.log('Edge function result:', result)
        } else {
          if (!table) throw new Error('Table name is required');
          if (!query) throw new Error('Query is required');
          result = await supabase.from(table).select(query);
        }

        const { data, error } = result;

          if (error) throw error

          // Update cache
          dispatch(setCacheData({
            key: cacheKey,
            data: {
              data,
              timestamp: Date.now(),
              error: null
            }
          }))
    
          setIsLoading(false)
          return data
        } catch (err) {
          console.error('Error fetching supabase data:', err)
          setError(err as Error)
          setIsLoading(false)
          throw err
        }
      }, [table, query, cacheKey])
    
      useEffect(() => {
        if (!enabled) return
    
        const isCacheValid = cachedData && 
          (Date.now() - cachedData.timestamp) < cacheTime
    
        if (!isCacheValid) {
          fetchData()
        }
    }, [enabled, cachedData, cacheTime, fetchData])

    const refetch = () => {
      return fetchData()
    }
  
    return {
      data: cachedData?.data ?? null,
      isLoading,
      error,
      refetch
    }
}