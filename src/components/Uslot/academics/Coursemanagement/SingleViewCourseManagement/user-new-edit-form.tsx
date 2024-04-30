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
import { paths, uslotPath } from 'src/routes/paths';
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
import { DeleteUserApiCall, GetCourseCategoryApiCall, GetSingleCourseApiCall, UpdateCourseApiCall } from 'src/api/uslot/academics';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { uslotBaseURL } from 'src/config-global';
import { board, grade, medium } from 'src/assets/data/board';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export default function CourseMgmtSingleViewForm({ currentUser }: Props) {
  const router = useRouter();
  const fd = new FormData();

  const params = useParams();

  const { id } = params;
  const IMGBaseUrl = uslotBaseURL;

  const { SingleCourse, CategoryList } = useSelector((state: RootState) => state.app);

  // console.log(SingleCourse)

  console.log(CategoryList)

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
  };

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
      // console.info('DATA', data);

      //---------------------------------------------//

      fd.append('title', data?.title)
      fd.append('description', data.discription)

      fd.append('categoryId', (data.category as any).id)
      fd.append('grade', data.grade)
      fd.append('board', data.board)
      fd.append('duration', data.duration)
      fd.append('price', data.price)
      fd.append('offer_price', data.offerprice)
      fd.append('medium', data.medium)

      //---------------------------------------------//

      console.log(data)
      const { id } = params;


      if (data.avatarUrl.type) {
        fd.append('image', data.avatarUrl)
      }
      UpdateCourseApiCall(fd, id,enqueueSnackbar);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Oops!',{variant:'error'})
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


  //DeleteSUccessFun
  const DeleteSucssFun = () => {
    router.push(uslotPath?.coursemanagement);
  }


  //DeleteUserBtn
  const DeleteUserBtn = () => {
    const { id } = params;
    DeleteUserApiCall(id, enqueueSnackbar, DeleteSucssFun)
  }


  // UseEffect
  useEffect(() => {
    //GetSingleCourseApiCall
    GetSingleCourseApiCall(id);
    GetCourseCategoryApiCall();
  }, [])


  const filteredCategory = CategoryList.find((item: any) => item?.id === SingleCourse?.category?.id);
  console.log("filteredCategory>>>", filteredCategory)



  useEffect(() => {
    setValue('avatarUrl', SingleCourse?.image ? IMGBaseUrl + SingleCourse?.image : null);
    setValue('title', SingleCourse?.title)
    setValue('category', filteredCategory)
    setValue('grade', SingleCourse?.grade)
    setValue('board', SingleCourse?.board)
    setValue('duration', SingleCourse?.duration);
    setValue('discription', SingleCourse?.description);
    setValue('price', SingleCourse?.price)
    setValue('offerprice', SingleCourse?.offer_price)
    setValue('medium', SingleCourse?.medium)

  }, [setValue, SingleCourse, filteredCategory])










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



            <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
              <Button variant="soft" color="error" onClick={DeleteUserBtn}>
                Delete User
              </Button>
            </Stack>

          </Card>
        </Grid>

        <Grid xs={12} md={8}>

          <Typography variant='h5'>
            Course details
          </Typography>

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

              {/* <RHFAutocomplete name="category" label="Category"
                options={CategoryList}
                getOptionLabel={(option?: string | any) => option?.name || []}
              /> */}


              {/* <RHFAutocomplete
                name="category"
                label="Category"
                options={CategoryList}
                value={filteredCategory} // Set the default category object as the value
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  // Handle the change in selected category
                  console.log(value);
                  // setValue('category', value);
                }}
              /> */}

              <RHFAutocomplete name="category" label="Category"
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
              <RHFTextField name="offerprice" label="Offerprice" />

              <RHFAutocomplete name="medium" label="Medium"
                options={medium.map((_medium) => _medium.label)}
                getOptionLabel={(option) => option}
              />


            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Save Changes' : 'Create User'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
