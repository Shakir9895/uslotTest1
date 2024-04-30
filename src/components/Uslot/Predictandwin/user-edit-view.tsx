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
import CourseMgmtSingleViewForm from '../academics/Coursemanagement/SingleViewCourseManagement/user-new-edit-form';
import CourseMngmtQuiz from '../academics/Coursemanagement/SingleViewCourseManagement/CourseMangmtQuiz';
import CourseMngmtModules from '../academics/Coursemanagement/SingleViewCourseManagement/product-list-view';
import SslcClass from './product-list-view';
import PlustwoClass from './CourseMangmtQuiz';

// ----------------------------------------------------------------------

const TABS = [

  {
    value: 'sslc',
    label: 'SSLC',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: 'plustwo',
    label: 'Plus Two',
    icon: <Iconify icon="material-symbols:book-sharp" width={24} />,
  },
];




export default function PredictAndWin() {
  
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentUser = _userList.find((user) => user.id === id);
  const [currentTab, setCurrentTab] = useState('sslc');


  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Predict And Win"
        links={[
          {
            name: 'Dashboard',
            // href: paths.dashboard.root,
          },

          { name: 'Predictandwin' },

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

      {currentTab ==='sslc' && <SslcClass/>}

      {/* {currentTab === 'plustwo' && <PlustwoClass/>} */}


    </Container>
  );
}
