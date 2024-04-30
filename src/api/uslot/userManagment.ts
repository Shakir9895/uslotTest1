import axios from "../../utils/Uslotaxios";

//create user managment
export const createUserManagement=async()=>{
    try {
        const response = await axios.post('/api/v1/students', {
    // "email":"danissw.tefora@gmail.com",
    // "password":"user",
    // "full_name":"mubu",
    // "phone_no":"9999999999",
    // "alternative_no":"9999999999",
    // "class":"10",
    // "board":"cbse"
        });
        return response.data; // Return the response data on successful login
      } catch (error) {
        throw new Error('faild'); // Throw an error on login failure
      }
}


//list user managment

    export const listUserManagement=async()=>{
        try {
            const response = await axios.get('/api/v1/students');
            return response.data; // Return the response data on successful login
          } catch (error) {
            throw new Error('faild'); // Throw an error on login failure
          }
}

// user profile managment
export const singleProfileUserMnt=async()=>{
    try {
        const response = await axios.get('/api/v1/students/7c48e723-8815-4496-89a0-c662d213eb20', {
        });
        return response.data; // Return the response data on successful login
      } catch (error) {
        throw new Error('faild'); // Throw an error on login failure
      }
}
