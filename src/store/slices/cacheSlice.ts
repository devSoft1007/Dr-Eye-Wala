import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define cache types
interface CacheData<T> {
    data: T | null
    timestamp: number
    error: Error | null
  }
  
  interface CacheState {
    [key: string]: CacheData<any>
  }
  
  // Create cache slice
  const cacheSlice = createSlice({
    name: 'cache',
    initialState: {} as CacheState,
    reducers: {
      setCacheData: (state, action: PayloadAction<{ key: string; data: CacheData<any> }>) => {
        state[action.payload.key] = action.payload.data
      },
      clearCache: (state) => {
        return {}
      }
    }
  })
  
  export const { setCacheData, clearCache } = cacheSlice.actions
  export const cacheReducer = cacheSlice.reducer