import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BatchManagementModuleListView from 'src/components/Uslot/academics/BatchManagement/StudentModule/user-managment-listview';


// ----------------------------------------------------------------------

export default function BatchManagementStudentModule() {

  

  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <BatchManagementModuleListView />
    </>
  );
}
