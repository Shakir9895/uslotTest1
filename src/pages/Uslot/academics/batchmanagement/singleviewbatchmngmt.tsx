import { Helmet } from 'react-helmet-async';
import BatchMgmtSingleView from 'src/components/Uslot/academics/BatchManagement/SingleViewBatchManagement/user-edit-view';
import CourseMgmtSingleView from 'src/components/Uslot/academics/Coursemanagement/SingleViewCourseManagement/user-edit-view';
// sections

// ----------------------------------------------------------------------

export default function BatchMngmtSingleView() {
    
  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <BatchMgmtSingleView />
    </>
  );
}
