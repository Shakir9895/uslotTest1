// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from 'src/sections/user/user-new-edit-form';
import CreateQuizForm from '../createquizform';
import ModuleCreateQuizForm from './createquizform';
// import UsermngmtNewEditForm from './user-new-edit-form';




// ----------------------------------------------------------------------

type Props = {
  Heading?: string // optional
}


export default function ModuleQuizNewQuestionsCreateView({ Heading }: Props) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        // heading= "Create new module"
        heading={Heading === "Edit Quiz" ? "Edit Quiz" : "Create Quiz"}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Create Quiz',
            href: '',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ModuleCreateQuizForm Heading={Heading}/>
    </Container>
  );
}
