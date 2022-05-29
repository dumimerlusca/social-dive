import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowWidth:window.innerWidth
}

const UiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        setWindowWidth(state, action) {
            state.windowWidth = action.payload
        }
    }
})

const UiSliceReducer = UiSlice.reducer

export const {setWindowWidth} = UiSlice.actions

export default UiSliceReducer
