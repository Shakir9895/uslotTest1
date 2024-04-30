// @mui
import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _userList } from 'src/_mock';
import { getTeacherById } from '../../../../api/uslot/teacherManagent'; // Adjust the import path as necessary

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

//
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Iconify from 'src/components/iconify';
import { useEffect,useCallback, useState } from 'react';

import UserMgmtSingleViewForm from '../../usermanagement/UserManagementSingleView/user-new-edit-form';
import UserMngmtReport from '../../usermanagement/UserManagementSingleView/product-list-view';
import ProfileOverViewTeachermngmt from './invoice-list-view';
import TeacherMgmtSingleProfileForm from './user-new-edit-form';
import ProfileRevenueTeachermngmt from './teachermangmtrevenue';

// ----------------------------------------------------------------------
interface Teacher {
  id: string;
  email: string;
  password: string; // Ensure this is handled securely and consider not fetching/storing it client-side if not necessary
  full_name: string;
  phone_no: string;
  alternative_no: string;
  status: string; // If status has defined states, use union types
  avatar: string;
  date_of_birth: string | null;
  marital_status:string; // Use union types if there are defined states
  gender: string;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
  is_profile_completed: boolean;
  professional_details:string;

}
const TABS = [
  {
    value: 'overview',
    label: 'Overview',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: 'revenue',
    label: 'Revenue',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];




export default function TeacherMgmtProfileView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  // const currentUser = _userList.find((user) => user.id === id);
  const [currentTab, setCurrentTab] = useState('overview');

  const [currentUser, setCurrentUser] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {  // Ensure id is not undefined
      setLoading(true);
      getTeacherById(id,
        (data: Teacher) => {
          setCurrentUser(data);
          setLoading(false);
        },
        (error: any) => {
          console.error('Failed to fetch teacher details:', error);
          setError('Failed to load teacher details');
          setLoading(false);
        }
      );
    } else {
      setError('No teacher ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          {
            name: 'Dashboard',
            // href: paths.dashboard.root,
          },
          
          { name: 'Profile' },

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
      {currentTab === 'overview' && <ProfileOverViewTeachermngmt/>}

      {currentTab ==='profile' && <TeacherMgmtSingleProfileForm currentUser={currentUser}/>}

      {currentTab === 'revenue' && <ProfileRevenueTeachermngmt/>}


    </Container>
  );
}
