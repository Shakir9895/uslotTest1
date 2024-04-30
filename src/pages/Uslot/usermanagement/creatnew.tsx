import { Helmet } from 'react-helmet-async';
import UsermagntCreateView from 'src/components/Uslot/usermanagement/NewUserManagement/user-create-view';
// sections


// ----------------------------------------------------------------------

export default function CreateUserManagement() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <UsermagntCreateView />
    </>
  );
}
