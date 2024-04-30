import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CourseCategoryListView from 'src/components/Uslot/academics/CourseCategory/user-managment-listview';

// ----------------------------------------------------------------------

export default function CourseCategory() {

  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <CourseCategoryListView />
    </>
  );
}
