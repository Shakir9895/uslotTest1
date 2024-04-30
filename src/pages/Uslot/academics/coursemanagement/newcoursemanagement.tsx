import { Helmet } from 'react-helmet-async';
import CoursemagntCreateView from 'src/components/Uslot/academics/Coursemanagement/NewCourseManagement/user-create-view';
import UsermagntCreateView from 'src/components/Uslot/usermanagement/NewUserManagement/user-create-view';
// sections


// ----------------------------------------------------------------------

export default function CreateCourseManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <CoursemagntCreateView />
    </>
  );
}
