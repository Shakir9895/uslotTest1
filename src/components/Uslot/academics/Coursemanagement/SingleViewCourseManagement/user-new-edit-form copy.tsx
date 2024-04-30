import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
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
import { useParams, useRouter } from 'src/routes/hook';
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
import { CreateModuleApiCall, GetSingleModuleApiCall, UpdateModuleApiCall } from 'src/api/uslot/academics';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { SingleModuleLists } from 'src/redux/slices/app';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
  Heading?: string;
};

export default function NewModuleSingleViewForm({ currentUser, Heading }: Props) {

  console.log("HEADING>>>", Heading)

  const { SingleModuleList } = useSelector((state: RootState) => state.app);
  console.log(SingleModuleList)

  const router = useRouter();
  const dispatch = useDispatch();

  const params = useParams();

  const { id } = params;

  const { SingleCourse } = useSelector((state: RootState) => state.app);

  const course_id = SingleCourse?.id;

  console.log(course_id)

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('modulename is required'),
    syllabus: Yup.string().required('syllabus is required'),
    duration: Yup.string().required('duration is required'),
  });

  const defaultValues = {
    name: '',
    syllabus: '',
    duration: '',
  }
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
  


      if (Heading === 'Edit Module') {
        UpdateModuleApiCall(id,data,enqueueSnackbar);
      } else {
        CreateModuleApiCall(course_id, data, enqueueSnackbar, reset)
      }

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ooops!!');
    }
  });

  // useEffect

  useEffect(() => {
    if (id !== undefined) {
      GetSingleModuleApiCall(id);
    } else {
      dispatch(SingleModuleLists({ data: "" }))
    }
  }, [id])



  //useEffect
  useEffect(() => {
    setValue('name', SingleModuleList?.name)
    setValue('syllabus', SingleModuleList?.syllabus)
    setValue('duration', SingleModuleList?.duration)
  }, [setValue, SingleModuleList])





  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>


        <Grid xs={12} md={8}>

          <Card sx={{ p: 3, }}>
            <Stack
              spacing={2}
            >

              <RHFTextField name="name" label="Module Name" />

              <RHFTextField name="syllabus" label="Syllabus" />
              {/* <RHFAutocomplete name="duration" label="Duration"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
              /> */}
              <RHFTextField name="duration" label="Duration" />

            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {/* {!currentUser ? 'Create Module' : 'Save Changes'} */}
                {Heading === "Edit Module" ? "Save Changes" : "Create Module"}

              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
