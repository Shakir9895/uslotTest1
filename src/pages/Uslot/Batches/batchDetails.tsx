import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import BatchesListView from 'src/components/Uslot/Batches/user-managment-listview';
import BatchDetailsListView from 'src/components/Uslot/teachermanagement/TeachermanagementProfile/user-managment-listview';
import UserManagementListView from 'src/components/Uslot/usermanagement/user-managment-listview';

// ----------------------------------------------------------------------

export default function BatchManagementBatchDetails() {

  const auth = useSelector((state)=>state);
  console.log(auth)

  

  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <BatchesListView />
    </>
  );
}
