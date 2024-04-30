// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from 'src/sections/user/user-new-edit-form';
import UsermngmtNewEditForm from './user-new-edit-form';
import NewModuleSingleViewForm from './user-new-edit-form copy';
//


// ----------------------------------------------------------------------

type Props = {
  Heading?: string // optional
}


export default function NewModuleCreateView({ Heading }: Props) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        // heading= "Create new module"
        heading={Heading === "Edit Module" ? "Edit Module" : "Create new module"}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Course',
            href: '',
          },
          // { name: 'Newmodule' },
          { name: Heading === "Edit Module" ? "Edit Module" : "Newmodule" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <NewModuleSingleViewForm Heading={Heading}/>
    </Container>
  );
}
