import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'

//el store es el que va a tener el estado de la aplicacion y va a tener los reducers que se van a utilizar en la aplicacion
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    auth: authSlice.reducer,
  },
})

