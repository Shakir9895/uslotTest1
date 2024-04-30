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
import TextField from '@mui/material/TextField';
// routes
import { paths, uslotPath } from 'src/routes/paths';
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
import { board, grade, medium } from 'src/assets/data/board';
import { CreateNewCourseApiCall, GetCourseCategoryApiCall } from 'src/api/uslot/academics';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export default function CoursemngmtNewEditForm({ currentUser }: Props) {


  const { CategoryList } = useSelector((state: RootState) => state.app);
  console.log("CategoryList>>>", CategoryList)

  const fd = new FormData();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    avatarUrl: Yup.mixed<any>().nullable().required('Avatar is required'),
    category: Yup.object().required('Category is required'),
    // category: Yup.string().required('Category is required'),
    grade: Yup.string().required('Grade is required'),
    board: Yup.string().required('Board is required'),
    duration: Yup.string().required('Duration is required'),
    discription: Yup.string().required('Discription is required'),
    // price: Yup.string().required('Price is required'),

    price: Yup.number<any>().required('Price is required').typeError('Price must be a number'),
    offerprice: Yup.number<any>().required('Offerprice is required').typeError('Offerprice must be a number'),

    // offerprice: Yup.string().required('Offerprice is required'),
    title: Yup.string().required('Title is required'),
    medium: Yup.string().required('Medium is required'),

  });

  const defaultValues = {
    avatarUrl: null,

    category: '',
    grade: '',
    board: '',
    duration: '',
    discription: '',
    price: '',
    offerprice: '',
    title: "",
    medium: ""
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


  const SucssFun = () => {
    reset();
    router.push(uslotPath.coursemanagement);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);

      console.info('DATA', data);


      // fd.append('title', data?.title)
      // fd.append('description', data.discription)
      // fd.append('image', data.avatarUrl)
      // fd.append('categoryId', (data.category as any).id)
      // fd.append('grade', data.grade)
      // fd.append('board', data.board)
      // fd.append('duration', data.duration)
      // fd.append('price', data.price)
      // fd.append('offer_price', data.offerprice)
      // fd.append('medium', data.medium)



      // OR---------//

      const fd = {
        title:data?.title,
        description:data.discription,
        image:data.avatarUrl,
        categoryId: (data.category as any).id,
        grade:data.grade,
        board:data.board,
        duration:data.duration,
        price: data.price,
        offer_price: data.offerprice,
        medium:data.medium,
      }
      


      CreateNewCourseApiCall(fd, enqueueSnackbar, SucssFun)
    } catch (error) {
      // console.error(error);
      enqueueSnackbar('Oops!');
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




  //UseEffect
  useEffect(() => {
    GetCourseCategoryApiCall();

  }, [])


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

          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="title" label="Title" />

              <RHFAutocomplete name="category" label="Category"
                // options={CategoryList.map((_CategoryList: any) => _CategoryList?.name)}
                options={CategoryList}
                getOptionLabel={(option?: string | any) => option?.name || []}
              />

              <RHFAutocomplete name="grade" label="Grade"
                options={grade.map((_grade) => _grade.label)}
                getOptionLabel={(option) => option}

              />

              <RHFAutocomplete name="board" label="Board"
                options={board.map((_board) => _board.label)}
                getOptionLabel={(option) => option}

              />

              <RHFTextField name="duration" label="Duration" />
              <RHFTextField name="discription" label="Discription" />
              <RHFTextField name="price" label="Price" />
              <RHFTextField name="offerprice" label="OfferPrice" />
              <RHFAutocomplete name="medium" label="Medium"
                options={medium.map((_medium) => _medium.label)}
                getOptionLabel={(option) => option}
              />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Course' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
