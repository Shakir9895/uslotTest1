import React from 'react'


import { Helmet } from 'react-helmet-async';
import NewModuleCreateView from 'src/components/Uslot/academics/Coursemanagement/SingleViewCourseManagement/user-create-view';
import NewQuestionsCreateView from 'src/components/Uslot/academics/Coursemanagement/user-create-view';

// sections

const newquestions = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>
      <NewQuestionsCreateView />
    </>
  )
}

export default newquestions