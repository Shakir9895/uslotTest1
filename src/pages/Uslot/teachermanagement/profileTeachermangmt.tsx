import { Helmet } from 'react-helmet-async';
import TeacherMgmtProfileView from 'src/components/Uslot/teachermanagement/TeachermanagementProfile/user-edit-view';
import UserMgmtSingleView from 'src/components/Uslot/usermanagement/UserManagementSingleView/user-edit-view';
// sections
import UserEditView from 'src/sections/user/view/user-edit-view';

// ----------------------------------------------------------------------

export default function TeacherMngmtProfileView() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <TeacherMgmtProfileView />
    </>
  );
}
