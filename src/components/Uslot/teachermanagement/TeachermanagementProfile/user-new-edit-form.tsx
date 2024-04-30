import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'src/routes/hook';
// types
import { Divider } from '@mui/material';
import { IUserItem } from 'src/types/user';
// assets
import { countries } from 'src/assets/data';
// API
import { deleteTeacher } from '../../../../api/uslot/teacherManagent'; // Adjust the import path

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
import { gender, martial_Status, qualify } from 'src/assets/data/board';


// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export default function TeacherMgmtSingleProfileForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(null);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed<any>().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.full_name || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      state: currentUser?.state || '',
      status: currentUser?.status || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phone_no || '',
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  );

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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );


  const handleFilterStartDate = () => {

  }


  const handleDelete = () => {
    if (currentUser && currentUser.id) {
      deleteTeacher(currentUser.id, 
        () => {
          console.log("Delete successful");
          // handleCloseDialog();
          // Optionally navigate away or refresh the list
        }, 
        (error) => {
          console.error("Delete failed:", error);
          // handleCloseDialog();
          // Optionally display an error message or notification
        }
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>



            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>


            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button onClick={handleDelete} variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' mb={2}>Personal Info</Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFAutocomplete name="gender" label="Gender"
                options={gender.map((gender) => gender.label)}
                getOptionLabel={(option) => option}
              />

              <DatePicker
                label="Date of Birth"
                value={startDate}
                onChange={handleFilterStartDate}
                slotProps={{ textField: { fullWidth: true } }}
                sx={{
                  maxWidth: { md: 200 },
                }}
              />

              <RHFAutocomplete name="martialstatus" label="Marital Status"
                options={martial_Status.map((martial_Status) => martial_Status.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="address" label="Address" />

              <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />

              <RHFTextField name="zipCode" label="Zip/Code" />
              
            </Box>


            <Divider sx={{mt:2}}/>
            
            <Typography variant='h6' mt={2}>Professional Info</Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}

            >


              <RHFTextField name="qualification" label="Qualification" />

              <RHFAutocomplete name="course" label="Course"
                options={qualify.map((gender) => gender.label)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete name="subject" label="Subject"
                options={qualify.map((gender) => gender.label)}
                getOptionLabel={(option) => option}
              />


              <RHFTextField name="yrofpassing" label="Year of Passing" />

              <RHFTextField name="academicremarks" label="Academic Remarks" />



             

              <RHFAutocomplete name="syllabus" label="Syllabus"
                options={martial_Status.map((martial_Status) => martial_Status.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="yearsofexperience" label="Years of Experience" />
              <RHFAutocomplete name="classtime" label="Class Time"
                options={martial_Status.map((martial_Status) => martial_Status.label)}
                getOptionLabel={(option) => option}
              />

            </Box>





            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
