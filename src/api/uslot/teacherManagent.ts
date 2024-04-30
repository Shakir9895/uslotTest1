
import axios from "../../utils/Uslotaxios";
// import { store } from "src/redux/store";
// import { CategoryList, SingleViewCategory } from "src/redux/slices/app";

//----------------------

const Token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;








// Fetch teachers
export const getAllTeachers = (page: number, limit: number, successCallback: (data: any) => void, errorCallback: (error: any) => void) => {
    axios.get(`/api/v1/teachers?page=${page}&limit=${limit}`)
        .then((res) => {
            successCallback(res.data);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

export const getBatchData = (page: number, limit: number, role: string, role_id: string, successCallback: (data: any) => void, errorCallback: (error: any) => void) => {
    axios.get(`/api/v1/batch?page=${page}&limit=${limit}&role=${role}&role_id=${role_id}`)
        .then((res) => {
            successCallback(res.data);
        })
        .catch((err) => {
            errorCallback(err);
        });
}

export const deleteTeacher = (teacherId: string, successCallback: () => void, errorCallback: (error: any) => void) => {
    axios.delete(`/api/v1/teachers/${teacherId}`)
        .then(() => {
            successCallback(); // Call the success callback if deletion is successful
        })
        .catch((error) => {
            errorCallback(error); // Call the error callback if an error occurs
        });
}


export const getBatchDetailsRole = (page: number, limit: number, role: string, role_id: string, successCallback: (data: any) => void, errorCallback: (error: any) => void) => {
    axios.get(`/api/v1/batch?page=${page}&limit=${limit}&role=${role}&role_id=${role_id}`)
        .then((res) => {
            successCallback(res.data);
        })
        .catch((err) => {
            errorCallback(err);
        });
}



export const getStudentsByBatchId = (batchId: string, successCallback: (data: any) => void, errorCallback: (error: any) => void) => {
    axios.get(`/api/v1/batch/get-students`, { params: { batch_id: batchId } })
        .then((res) => {
            successCallback(res.data);  // Call the success callback with received data
        })
        .catch((err) => {
            errorCallback(err);  // Call the error callback if an error occurs
        });
}


export const getTeacherById = (teacherId: string, successCallback: (data: any) => void, errorCallback: (error: any) => void) => {
    axios.get(`/api/v1/teachers/${teacherId}`)
        .then((res) => {
            successCallback(res.data); // Pass the response data to the success callback
        })
        .catch((err) => {
            errorCallback(err); // Pass the error to the error callback
        });
}