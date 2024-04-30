
import { store } from "src/redux/store";
import axios from "../../utils/Uslotaxios";
import { logIn } from "src/redux/slices/checkout";
import React from "react";



type data = {
  email: string;
  password: string;
}

type setErrorMsg = React.Dispatch<React.SetStateAction<string>>;


// UslotLogin
export const Uslotlogin = async ({ email, password }: data,setErrorMsg:setErrorMsg,Heading?:string) => {
  console.log(Heading)
  console.log("data>>>>", email, password)


  try {

    const response = await axios.post(`/api/auth/login${Heading === 'Teacher' ? '?role=teacher' : ""}`, {
      email,
      password,
    });

    console.log("Test data",response)
    // const response = await axios.post('/api/auth/login', {
    //   email,
    //   password,
    // });

    console.log(response)
    localStorage.setItem('access_token',response.data.access_token)
    localStorage.setItem('refresh_token',response.data.refresh_token)
    localStorage.setItem('role',response.data.response.role)


    //login
    store.dispatch(logIn({ loginData: response.data, isLogged: true }));

  } catch (error) {
 
    setErrorMsg(typeof error === 'string' ? error : error.message);
    store.dispatch(logIn({ loginData: "", isLogged: false }))
  }
};
