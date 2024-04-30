// @mui
import Container from '@mui/material/Container';
// routes
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
import { useTheme } from '@mui/material/styles';
// _mock
import { RouterLink } from 'src/routes/components';
import Button from '@mui/material/Button';
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from 'react';
import UserMngmtReport from '../../usermanagement/UserManagementSingleView/product-list-view';
import UserMgmtSingleViewForm from '../../usermanagement/UserManagementSingleView/user-new-edit-form';
import StudentReport from './product-list-view';
import AddCategoryForm from '../../academics/CourseCategory/addcategoryform';
import AddReportForm from './addreportform';


// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'reports',
    label: 'Reports',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];




export default function StudentReportSingleView() {
  const theme = useTheme();
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentUser = _userList.find((user) => user.id === id);
  const [currentTab, setCurrentTab] = useState('profile');
  const [dialogTitle, setDialogTitle] = useState('Add Report')
  const [newReport, setNewReport] = useState(false);
  const [editReportId, setEditReportId] = useState('');
  console.log(dialogTitle)


  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


  const onCloseForm = () => {
    setNewReport(false)
  }

  //NewReportDialog
  const NewReportDialog = (value?: string) => {
    console.log("ID>>>>>>", value)
    setNewReport(true);
    if (value === 'newreport') {
      setDialogTitle('Add Report')
    }
    else if (value === 'editreport') {
      setDialogTitle('Edit Report')
    }

  }

  return (
    <>


      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Reports"
          links={[
            {
              name: 'Dashboard',
              // href: paths.dashboard.root,
            },

            { name: 'Reports' },

          ]}

          action={
            <Button
              component={RouterLink}
              onClick={() => NewReportDialog("newreport")}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Reports
            </Button>
          }

          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <StudentReport onEditRow={() => NewReportDialog('editreport',)} setEditReportId={setEditReportId} />

      </Container>

      {/* Dialog */}


      <Dialog
        fullWidth
        maxWidth="xs"
        open={newReport}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>
          {dialogTitle}
        </DialogTitle>

        <AddReportForm dialogTitle={dialogTitle} onClick={onCloseForm} />

      </Dialog>



    </>
  );
}
