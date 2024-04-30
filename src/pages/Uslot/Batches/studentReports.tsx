import { Helmet } from 'react-helmet-async';
import StudentReportSingleView from 'src/components/Uslot/Batches/StudentReport/user-edit-view';

// sections
import UserEditView from 'src/sections/user/view/user-edit-view';

const studentReports = () => {
  return (
    <>
    <Helmet>
      <title> Dashboard: User Edit</title>
    </Helmet>

    <StudentReportSingleView />
  </>
  )
}

export default studentReports