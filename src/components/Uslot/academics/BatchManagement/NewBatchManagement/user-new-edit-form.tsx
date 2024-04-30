import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// types
import { IUserItem } from 'src/types/user';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { board } from 'src/assets/data/board';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateNewBatchApiCall, getAllCoursesAPiCall } from 'src/api/uslot/academics';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
  title?: string
};

export default function BatchmngmtNewEditForm({ currentUser, title }: Props) {
  const { CourseList } = useSelector((state: RootState) => state.app);
  console.log(CourseList)


  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({

    // startdate: Yup.string().required('startdate is required'),


    name: Yup.string().required('Batchname is required'),
    courseId: Yup.object().required('Course is required'),

    capacity: Yup.string()
      .matches(/^[0-9]+$/, 'Capacity must be a number')
      .required('Capacity number is required'),


    teacherId: Yup.string().required('Teacher is required'),
    master_counsellorId: Yup.string().optional(),
  });

  const defaultValues = {

    // startdate: '',
    name: '',
    courseId: '',
    capacity: '',
    teacherId: '',
    master_counsellorId: '',  // optional value
  }



  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      //---------------------------------------------------//

      console.info('DATA', data);

      const body: any = {
        name: data?.name,
        courseId: (data?.courseId as any).id,
        capacity: data?.capacity,
        teacherId: data?.teacherId,
      }
      if (data?.master_counsellorId) {
        //push to body
        body.master_counsellorId = data?.master_counsellorId;
      }
      //CreateNewBatchApiCall
      console.log(body)
      CreateNewBatchApiCall(body)



    } catch (error) {
      console.error(error);
    }
  });


  //handleFilterStartDate
  const handleFilterStartDate = () => {

  }

  //useEffect
  useEffect(() => {
    getAllCoursesAPiCall()
  }, [])



  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} direction={'column'}>
        <Grid xs={12} md={8} >
          <Card sx={{ p: 3, width: "150%" }}>

            {title === "BatchDetails" && <Stack direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            // border={'2px solid orange'}
            >
              <Typography variant='h5'>
                Batch details
              </Typography>

              <Button variant="soft" color="error">
                Delete User
              </Button>
            </Stack>}


            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                // xs: 'repeat(1, 1fr)',
                // sm: 'repeat(2, 1fr)',
                xs: 'repeat(3, 1fr)',
              }}
              width={"100%"}
            >
              <RHFTextField name="name" label="Batch Name" />
              <RHFAutocomplete name="courseId" label="Course"
                options={CourseList}
                getOptionLabel={(option?: string | any) => option?.title || []}
              />

              <RHFTextField name="capacity" label="Capacity" />

              {/* <DatePicker
                // name='startdate'
                label="Start Date"
                value={startDate}
                onChange={handleFilterStartDate}
                slotProps={{ textField: { fullWidth: true } }}
                sx={{
                  maxWidth: { md: 400 },
                }}
              /> */}


              {/* <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleFilterStartDate}
                slotProps={{ textField: { fullWidth: true } }}
                sx={{
                  maxWidth: { md: 400 },
                }}
              /> */}


              <RHFTextField name="teacherId" label="Teacher" />

              {/* <RHFTextField name="councillor" label="Councillor" /> */}

              <RHFTextField name="master_counsellorId" label="Master Councillor" />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {title ? 'Save Changes' : 'Create Batch'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
