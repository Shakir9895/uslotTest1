import { Helmet } from 'react-helmet-async';
import CourseMgmtSingleView from 'src/components/Uslot/academics/Coursemanagement/SingleViewCourseManagement/user-edit-view';
import UserMgmtSingleView from 'src/components/Uslot/usermanagement/UserManagementSingleView/user-edit-view';
// sections
import UserEditView from 'src/sections/user/view/user-edit-view';

// ----------------------------------------------------------------------

export default function UserMngmtSingleView() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <CourseMgmtSingleView />
    </>
  );
}
