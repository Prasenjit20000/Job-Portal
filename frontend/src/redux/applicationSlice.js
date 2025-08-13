import {createSlice} from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name : 'application',
    initialState : {
        applicants : [],
        reload : false,
    },
    reducers : {
        setApplicants : (state,action) => {
            state.applicants = action.payload;
        },
        setReload : (state,action) =>{
            state.reload = action.payload;
        }
    }
})
export const {setApplicants,setReload} = applicationSlice.actions;
export default applicationSlice.reducer;