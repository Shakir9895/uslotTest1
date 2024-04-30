import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import UserManagementListView from 'src/components/Uslot/usermanagement/user-managment-listview';

// ----------------------------------------------------------------------

export default function UserManagement() {

  const auth = useSelector((state)=>state);
  console.log(auth)

  

  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <UserManagementListView />
    </>
  );
}
