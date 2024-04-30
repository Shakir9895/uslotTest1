// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from 'src/sections/user/user-new-edit-form';
import UsermngmtNewEditForm from 'src/components/Uslot/usermanagement/NewUserManagement/user-new-edit-form';
import CoursemngmtNewEditForm from '../../Coursemanagement/NewCourseManagement/user-new-edit-form';
import BatchmngmtNewEditForm from './user-new-edit-form';


//


// ----------------------------------------------------------------------

export default function BatchmagntCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create  new batch"
        links={[
          {
            name: 'Dashboard',
            href: '',
          },
          {
            name: 'Batch',
            // href: paths.dashboard.user.root,
          },
          { name: 'New Batch' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BatchmngmtNewEditForm />
    </Container>
  );
}
