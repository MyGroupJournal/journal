import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {courses, link} from "../Components/otherFile";
import axios from "axios";

export const getData = createAsyncThunk(
    'data/getData',
    async function(_, {rejectWithValue}) {
        try{
            let tempArr = []
            for(let i = 1; i < courses.length+1; i++) {
                const response = await axios.get(link + '/' + i)
                if (response.statusText !== 'OK') throw new Error('Server ERROR!')
                else {
                    response.data.data.map(element => {
                        let month = [Number(element['Дата'].split('.')[1])] - 1;
                        element['Subj'] = i - 1
                        if (!tempArr[month]) tempArr[month] = [];
                        tempArr[month].push(element)
                    })
                }
            }
            return tempArr
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
)


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    reducers:{
        addReducer(state, action){
            let newData = action.payload.dataSend
            newData['Subj'] = action.payload.id - 1
            state.data[action.payload.monthID].push(newData)
            state.status = true
        },
        updateReducer(state, action){
            let newData = action.payload.dataSend
            newData['Subj'] = action.payload.id - 1
            let filteredData = state.data[action.payload.monthID].filter(element => Number(element['Subj']) === Number(newData['Subj']))
            let indexChanged = state.data[action.payload.monthID].indexOf(filteredData.find(element => element['Дата'] === newData['Дата']))
            state.data[action.payload.monthID][indexChanged] = newData
            state.status = true

        },
        editStatus(state){
            state.status = !state.status
        }
    },
    extraReducers (builder){
        builder
            .addCase(getData.pending, (state) => {
                state.status = false
            })
            .addCase(getData.fulfilled, (state, action) =>{
                state.status = true
                state.data = action.payload
            })
    },
})

export const {addReducer, updateReducer, editStatus} = dataSlice.actions
export default dataSlice.reducer