import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import BatchesBatchDetailsListView from 'src/components/Uslot/Batches/BatchesDetails/user-managment-listview';
import BatchesListView from 'src/components/Uslot/Batches/user-managment-listview';
import UserManagementListView from 'src/components/Uslot/usermanagement/user-managment-listview';

// ----------------------------------------------------------------------

export default function BatchesManagement() {

  const auth = useSelector((state)=>state);
  console.log(auth)

  

  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <BatchesBatchDetailsListView />
    </>
  );
}
