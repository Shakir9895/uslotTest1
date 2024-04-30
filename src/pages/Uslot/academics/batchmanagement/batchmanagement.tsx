import { Helmet } from 'react-helmet-async';
import BatchManagementListView from 'src/components/Uslot/academics/BatchManagement/user-managment-listview';
import CourseManagementListView from 'src/components/Uslot/academics/Coursemanagement/user-managment-listview';
import TeacherManagementListView from 'src/components/Uslot/teachermanagement/user-managment-listview';


// ----------------------------------------------------------------------

export default function BatchManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <BatchManagementListView />
    </>
  );
}
