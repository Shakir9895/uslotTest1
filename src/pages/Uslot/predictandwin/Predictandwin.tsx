import React from 'react'
import { Helmet } from 'react-helmet-async'
import PredictAndWin from 'src/components/Uslot/Predictandwin/user-edit-view'


const Predictandwin = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Predict and Win</title>
      </Helmet>

      <PredictAndWin />
    </>
  )
}

export default Predictandwin