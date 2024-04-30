import { Helmet } from 'react-helmet-async';
import NewModuleCreateView from 'src/components/Uslot/academics/Coursemanagement/SingleViewCourseManagement/user-create-view';
import UsermagntCreateView from 'src/components/Uslot/usermanagement/NewUserManagement/user-create-view';
// sections


// ----------------------------------------------------------------------

export default function EditNewModule() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <NewModuleCreateView Heading = "Edit Module"/>
    </>
  );
}
