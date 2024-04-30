import React from 'react'
import { Helmet } from 'react-helmet-async';
import ModuleQuiz from 'src/components/Uslot/academics/Coursemanagement/ModuleQuiz/user-managment-listview';



const modulequiz = () => {
  return (
    <>
    <Helmet>
      <title> Dashboard: User List</title>
    </Helmet>

    <ModuleQuiz />
  </>
  )
}

export default modulequiz