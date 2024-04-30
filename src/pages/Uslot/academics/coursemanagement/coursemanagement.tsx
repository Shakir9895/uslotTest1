import { Helmet } from 'react-helmet-async';
import CourseManagementListView from 'src/components/Uslot/academics/Coursemanagement/user-managment-listview';
import TeacherManagementListView from 'src/components/Uslot/teachermanagement/user-managment-listview';


// ----------------------------------------------------------------------

export default function CourseManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <CourseManagementListView />
    </>
  );
}
