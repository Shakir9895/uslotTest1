// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

//
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from 'react';
import UserMngmtReport from 'src/components/Uslot/usermanagement/UserManagementSingleView/product-list-view';
import CourseMgmtSingleViewForm from './user-new-edit-form';
import CourseMngmtModules from './product-list-view';
import CourseMngmtQuiz from './CourseMangmtQuiz';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'overview',
    label: 'Overview',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'modules',
    label: 'Modules',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: 'quiz',
    label: 'Quiz',
    icon: <Iconify icon="material-symbols:book-sharp" width={24} />,
  },
];




export default function CourseMgmtSingleView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentUser = _userList.find((user) => user.id === id);
  const [currentTab, setCurrentTab] = useState('overview');


  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Course Details>>"
        links={[
          {
            name: 'Dashboard',
            // href: paths.dashboard.root,
          },
          
          { name: 'CourseDetails' },

        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>


      {/* profileTab */}
      {currentTab === 'overview' && <CourseMgmtSingleViewForm currentUser={currentUser} />}

      {currentTab ==='modules' && <CourseMngmtModules/>}

      {currentTab === 'quiz' && <CourseMngmtQuiz/>}


    </Container>
  );
}
