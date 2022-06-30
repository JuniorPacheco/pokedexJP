import { createSlice } from '@reduxjs/toolkit'

export const trainerNameSlice = createSlice({
    name: 'nameTrainer',
    initialState: '',
    reducers: {
        setTrainerName: (state, action) => action.payload
    }
})

export const { setTrainerName } = trainerNameSlice.actions

export default trainerNameSlice.reducer;