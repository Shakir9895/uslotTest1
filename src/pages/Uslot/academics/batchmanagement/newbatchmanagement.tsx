import { Helmet } from 'react-helmet-async';
import BatchmagntCreateView from 'src/components/Uslot/academics/BatchManagement/NewBatchManagement/user-create-view';
import CoursemagntCreateView from 'src/components/Uslot/academics/Coursemanagement/NewCourseManagement/user-create-view';
import UsermagntCreateView from 'src/components/Uslot/usermanagement/NewUserManagement/user-create-view';
// sections


// ----------------------------------------------------------------------

export default function CreateBatchManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <BatchmagntCreateView />
    </>
  );
}
