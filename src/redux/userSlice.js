import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart: (state) => {
        state.loading = true
      },
      loginSuccess: (state, action) => {
        state.currentUser = action.payload
        state.loading = false
      },
      loginFailure: (state) => {
        state.loading = false
        state.error = true
      },
      logout: (state) => {
        state.currentUser = initialState
      }
    }
})


export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions

export default userSlice.reducer