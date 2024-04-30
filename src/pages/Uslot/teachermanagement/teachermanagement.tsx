import { Helmet } from 'react-helmet-async';
import TeacherManagementListView from 'src/components/Uslot/teachermanagement/user-managment-listview';


// ----------------------------------------------------------------------

export default function TeacherManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <TeacherManagementListView />
    </>
  );
}
