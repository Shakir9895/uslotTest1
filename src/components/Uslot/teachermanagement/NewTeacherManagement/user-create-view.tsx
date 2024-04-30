// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from 'src/sections/user/user-new-edit-form';
import UsermngmtNewEditForm from '../../usermanagement/NewUserManagement/user-new-edit-form';
import TeachermngmtNewEditForm from './user-new-edit-form';

//


// ----------------------------------------------------------------------

export default function TeachermagntCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create new teacher"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: 'New Teacher' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TeachermngmtNewEditForm />
    </Container>
  );
}
