import { createSlice } from '@reduxjs/toolkit';
import { Uslotapp } from 'src/types/product';

//-----------------------------------

// const initialState: ICheckout = {
//     activeStep: 0,
//     cart: [],
//     subTotal: 0,
//     total: 0,
//     discount: 0,
//     shipping: 0,
//     billing: null,
//     totalItems: 0,
//     //auth
//     auth: {
//       UserCredentials: "",
//       isLogged: false,
//     },
//   };





// initialSate
const initialState: Uslotapp = {
    CategoryList: [],
    SingleCategory: "",
    CourseList: [],
    SingleCourse: "",
    ModuleList: [],
    SingleModuleList: "",
    QuizList: [],
    SingleQuiz: "",
    AllBatchesList: [],
    AllSslcList: [],
    AllPlusTwoList: [],

}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        fetchUser(state, action) {

        },

        CategoryList(state, action) {
            state.CategoryList = action.payload.data;
        },

        SingleViewCategory(state, action) {
            state.SingleCategory = action.payload.data

        },
        CourseMngList(state, action) {
            state.CourseList = action.payload.data;

        },
        SingleCourseList(state, action) {
            state.SingleCourse = action.payload.data;
        },
        ModuleListById(state, action) {
            //ModuleList
            state.ModuleList = action.payload.data;
        },
        SingleModuleLists(state, action) {
            //SingleModuleList 
            state.SingleModuleList = action.payload.data;
        },

        QuizListById(state, action) {
            //QuizList
            state.QuizList = action.payload.data;
        },
        SingleQuizById(state, action) {
            //SingleQuiz
            state.SingleQuiz = action.payload.data;

        },
        AllBatchesListslice(state, action) {
            //AllBatchesList
            state.AllBatchesList = action.payload.data;
        },
        AllSslcListSlice(state, action) {
            //AllSslcList
            state.AllSslcList = action.payload.data;
        },
        AllPlusTwoListSlice(state, action) {
            //AllPlusTwoList
            state.AllPlusTwoList = action.payload.data;
        }




    }
});

//Reducer
export default slice.reducer;
//actions
export const { AllPlusTwoListSlice, AllSslcListSlice, fetchUser, AllBatchesListslice, SingleQuizById, QuizListById, SingleModuleLists, ModuleListById, SingleCourseList, CourseMngList, SingleViewCategory, CategoryList } = slice.actions;