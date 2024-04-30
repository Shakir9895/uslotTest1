
import axios from "../../utils/Uslotaxios";
import { store } from "src/redux/store";
import { AllBatchesListslice, CategoryList, CourseMngList, ModuleListById, QuizListById, SingleCourseList, SingleModuleLists, SingleQuizById, SingleViewCategory } from "src/redux/slices/app";


//----------------------

const Token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;



// CourseCategory
//------------------------//
// Add Category
export const AddNewCategoryApiCall = (data: any, CreateCategorySuccessfun: any) => {

    console.log(data)

    axios.post('/api/v1/category', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => {

        CreateCategorySuccessfun()

    }).catch((err) => {
        window.alert("Something is Wrong!!!!")
    })

}






// getCategoryList
export const GetCourseCategoryApiCall = () => {
    axios.get("/api/v1/category", {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Token}`
        },
    }).then((res) => {
        store.dispatch(CategoryList({ data: res.data }))
    }).catch((err) => {
        store.dispatch(CategoryList({ data: [] }))

    })

}



//SingleViewCategoryApiCall
export const SingleViewCategoryApiCall = (id?: string) => {

    axios.get(`/api/v1/category/${id}`, {
        headers: {
            'Content-Type': "application/json"
        }
    }).then((res) => {
        // SingleViewCategory
        store.dispatch(SingleViewCategory({ data: res.data }))

    }).catch((err) => {
        window.alert('Faild')

    })
}


// EditCategoryApiCall
export const EditCategoryApiCall = (id: string, fd: any, CreateCategorySuccessfun: any) => {

    axios.patch(`/api/v1/category/${id}`, fd, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((res) => {
        CreateCategorySuccessfun()

    }).catch((err) => {
        window.alert('failde>>')
    })

}


// DeleteCategory ApiCall 
export const DeleteCategoryApiCall = async (id?: string, modifyFun?: any, enqueueSnackbar?: any) => {

    try {

        const res = await axios.delete(`/api/v1/category/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.data.success) {
            console.log(res)
            modifyFun()
            enqueueSnackbar(res.data?.message);
        }
    } catch (err) {
        // error mode notification set cheyyanam
        enqueueSnackbar(err.message);
    }

}




// Coursemanagement
//----------------------//

//CreateNewCourseApiCall
export const CreateNewCourseApiCall = async (fd: any, enqueueSnackbar: any, SucssFun: any) => {
    console.log(fd)


    try {

        const res = await axios.post('/api/v1/courses', fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        if (res.data.success) {
            enqueueSnackbar(res.data?.message)
            SucssFun()
        }

    } catch (err) {
        enqueueSnackbar(err.message)
    }

}



//GetAllCoursesApiCall

export const getAllCoursesAPiCall = async () => {

    try {
        const res = await axios.get('/api/v1/courses', {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res) {
            // console.log(res)
            store.dispatch(CourseMngList({ data: res.data }))

        }
    } catch (err) {
        store.dispatch(CourseMngList({ data: [] }));
    }

}



// GetSingleCours
export const GetSingleCourseApiCall = async (id?: string) => {
    try {

        const res = await axios.get(`/api/v1/courses/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.status === 200) {
            store.dispatch(SingleCourseList({ data: res.data }));

        }

    } catch (err) {
        store.dispatch(SingleCourseList({ data: "" }))
    }

}



//DeleteUser

export const DeleteUserApiCall = async (id?: string, enqueueSnackbar?: any, DeleteSucssFun?: any) => {
    try {
        const res = await axios.delete(`/api/v1/courses/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.success) {
            enqueueSnackbar(res.data?.message);
            DeleteSucssFun();
        }


    } catch (err) {
        console.log(err)
        enqueueSnackbar(err?.message, { variant: 'error' });
    }
}


//UpdateCourseApiCall

export const UpdateCourseApiCall = async (data: any, id?: string, enqueueSnackbar?: any) => {

    try {

        const res = await axios.patch(`/api/v1/courses/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        if (res.data.success) {
            enqueueSnackbar(res.data.message);
        }
    } catch (err) {
        enqueueSnackbar('Something went Wrong !!', { variant: 'error' });
    }
}






//-------Module-----//

// getModuleByIDapicall
export const GetModuleByIDApiCall = async (id?: string) => {
    // window.alert(id)
    try {

        const res = await axios.get(`/api/v1/modules?course_id=${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            console.log(res)
            store.dispatch(ModuleListById({ data: res.data }))
        }
    } catch (err) {
        store.dispatch(ModuleListById({ data: [] }))
    }
}



//CreateModuleApiCall
export const CreateModuleApiCall = async (course_id: string, data: any, enqueueSnackbar?: any, reset?: any) => {
    try {
        // window.alert(course_id)
        const res = await axios.post(`/api/v1/modules?course_id=${course_id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.success) {
            enqueueSnackbar(res.data.message)
            reset()
        }
    }
    catch (err) {
        console.log(err)
        enqueueSnackbar(err.message || "Something went Wrong !!..")

    }


}


// GetSingleModuleApiCall
export const GetSingleModuleApiCall = async (id?: string) => {

    try {
        const res = await axios.get(`/api/v1/modules/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status == 200) {
            store.dispatch(SingleModuleLists({ data: res.data }))
        }
    } catch (err) {
        store.dispatch(SingleModuleLists({ data: "" }))
    }
}


//UpdateModuleApiCall
export const UpdateModuleApiCall = async (id?: string, data?: any, enqueueSnackbar?: any) => {
    try {
        const res = await axios.patch(`/api/v1/modules/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.data.success) {
            enqueueSnackbar(res.data.message)
        }
    } catch (err) {
        enqueueSnackbar(err.message || "Something went Wrong !!..")
    }
}





//DeleteModuleApiCall
export const DeleteModuleApiCall = async (id: string, enqueueSnackbar: any, modifyFun: any) => {

    try {
        const res = await axios.delete(`/api/v1/modules/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.data.success) {
            modifyFun()
            enqueueSnackbar(res.data.message || "Module deleted successfully");

        }
    } catch (err) {
        enqueueSnackbar("Something went wrong !!", { variant: 'error' })
    }
}


//-------------Quiz-----//

//CreateQuizbyCourseId
export const CreateQuizbyCourseId = async (course_id?: string, body?: any, enqueueSnackbar?: any, reset?: any) => {
    try {

        const course_idinLocaalStorage = localStorage.getItem('course_id')

        const res = await axios.post(`/api/v1/quiz?course_id=${course_id || course_idinLocaalStorage}`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.data.success) {
            enqueueSnackbar(res.data.message)
            reset()

        }

    } catch (err) {
        enqueueSnackbar('Someting went Wrong !!', { variant: 'error' })

    }
}



// getQuizlistbyCouresID
export const getQuizListByCouresId = async (id?: string) => {

    try {
        const res = await axios.get(`/api/v1/quiz?course_id=${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status == 200) {
            store.dispatch(QuizListById({ data: res.data }))
        }
    } catch (err) {
        store.dispatch(QuizListById({ data: [] }))
    }
}


// getSingleQuizById
export const getSingleQuizById = async (id?: string) => {

    try {
        const res = await axios.get(`/api/v1/quiz/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            console.log(res)
            store.dispatch(SingleQuizById({ data: res.data }))
        }

    } catch (err) {
        store.dispatch(SingleQuizById({ data: "" }))
    }

}

//UpdateQuizByID
export const UpdateQuizByIdApiCall = async (id?: string, body?: any, enqueueSnackbar?: any) => {
    try {
        const res = await axios.patch(`/api/v1/quiz/${id}`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.data.success) {
            enqueueSnackbar(res.data.message)
        }

    } catch (err) {
        enqueueSnackbar(err.message || 'Something went Wrong !!', { variant: 'error' })
    }

}


//DeleteQuizApiCall
export const DeleteQuizByIdApiCall = async (id?: string, enqueueSnackbar?: any, modifyFun?: any) => {
    try {
        const res = await axios.delete(`/api/v1/quiz/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.data.success) {
            modifyFun()
            enqueueSnackbar(res.data.message || "Module deleted successfully");
        }

    } catch (err) {
        enqueueSnackbar("Something went wrong !!", { variant: 'error' })
    }

}


//----------moduleQuiz----------------//

//CreateQuizbyModuleId

export const CreateQuizbyModuleId = async (id?: string, body?: any, enqueueSnackbar?: any, reset?: any) => {
    try {

        const res = await axios.post(`/api/v1/quiz?module_id=${id}`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.data.success) {
            enqueueSnackbar(res.data.message)
            reset()

        }

    } catch (err) {
        enqueueSnackbar('Someting went Wrong !!', { variant: 'error' })

    }
}


//getQuizListByModuleId

export const getQuizListByModuleId = async (id?: string) => {

    try {
        const res = await axios.get(`/api/v1/quiz?module_id=${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status == 200) {
            //slice duplicatedd already usedIn (getQuizListByCouresId)
            store.dispatch(QuizListById({ data: res.data }))

        }
    } catch (err) {
        // slice duplicatedd
        store.dispatch(QuizListById({ data: [] }))
    }
}





//-----------------Batch Management------------------//

//CreateNewBatchApiCall

export const CreateNewBatchApiCall = async (body?: any) => {

    try {
        const res = await axios.post('/api/v1/batch', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res) {
            window.alert("SUCCESS")
        }
    } catch (err) {
        window.alert("FAILDE!!!")
    }
}



//getAllbatchesList

export const getAllBatchesApiCall = async () => {
    try {


        //pagenation is pending
        const res = await axios.get('/api/v1/batch?page=1&limit=15', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            store.dispatch(AllBatchesListslice({ data: res.data }))
        }

    } catch (err) {

        store.dispatch(AllBatchesListslice({ data: [] }))

    }

}

