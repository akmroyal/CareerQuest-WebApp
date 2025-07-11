import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    }
});
export const {setAllApplicants} = applicationsSlice.actions;
export default applicationsSlice.reducer;