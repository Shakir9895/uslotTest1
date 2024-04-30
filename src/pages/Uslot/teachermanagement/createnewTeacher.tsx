import { Helmet } from 'react-helmet-async';
import TeachermagntCreateView from 'src/components/Uslot/teachermanagement/NewTeacherManagement/user-create-view';
import UsermagntCreateView from 'src/components/Uslot/usermanagement/NewUserManagement/user-create-view';
// sections


// ----------------------------------------------------------------------

export default function CreateTeacherManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <TeachermagntCreateView />
    </>
  );
}
