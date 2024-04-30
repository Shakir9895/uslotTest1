import React from 'react'
import { Helmet } from 'react-helmet-async';
import ModuleQuizNewQuestionsCreateView from 'src/components/Uslot/academics/Coursemanagement/ModuleQuiz/user-create-view';
import NewQuestionsCreateView from 'src/components/Uslot/academics/Coursemanagement/user-create-view';


const createmodulequizqustions = () => {
    return (
        <>
          <Helmet>
            <title> Dashboard: Create a new user</title>
          </Helmet>
          <ModuleQuizNewQuestionsCreateView />
        </>
      )
}

export default createmodulequizqustions