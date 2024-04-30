import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import SessionListView from 'src/components/Uslot/Sessions/user-managment-listview';
import UserManagementListView from 'src/components/Uslot/usermanagement/user-managment-listview';

const Sessions = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <SessionListView />
    </>
  )
}

export default Sessions