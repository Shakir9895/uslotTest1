import { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import FormProvider, { RHFTextField, RHFSwitch, RHFUploadAvatar, RHFAutocomplete } from 'src/components/hook-form';
// types
import { fData } from 'src/utils/format-number';
import { AddNewCategoryApiCall, EditCategoryApiCall } from 'src/api/uslot/academics';
import { useSnackbar } from 'src/components/snackbar';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { board, type } from 'src/assets/data/board';
import { uslotBaseURL } from 'src/config-global';


// ----------------------------------------------------------------------

type Props = {
  onClick: () => void;
  dialogTitle: string,
  setNewCategory: any,
}


export default function AddCategoryForm({ onClick, dialogTitle, setNewCategory }: Props) {

  const IMGBaseUrl = uslotBaseURL;

  const { SingleCategory } = useSelector((state: RootState) => state.app);

  console.log(SingleCategory)

  const DummyPic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXzoYdO9tqmkjlVHmpgXnOsQb9DWkz_Mfi1Jc7zNzaw&s'


  const { enqueueSnackbar } = useSnackbar();
  const fd = new FormData();


  const EventSchema = Yup.object().shape({
    categoryname: Yup.string().required('Category is required'),
    avatarUrl: Yup.mixed<any>().nullable().required('Avatar is required'),
    type: Yup.string().required('Type is required'),
  });

  const currentEvent = {
    categoryname: "",
    avatarUrl: null,
    type: ""
  }

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
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
  // console.log(values)


  // handleDrop --->>
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


  const CreateCategorySuccessfun = () => {
    enqueueSnackbar(dialogTitle === "Add Category" ? 'Create success!' : 'Edit success!');
    // setNewCategory(false)
    onClick()
  }



  //onSubmit

  const onSubmit = handleSubmit(async (data) => {

    // console.log(data)

    fd.append('name', data.categoryname)
    fd.append('type', data.type)

    // const pic = fd.get('image');
    // const name = fd.get('name');
    // console.log(pic,name)

    if (dialogTitle === "Add Category") {
      fd.append('image', data.avatarUrl);
      AddNewCategoryApiCall(fd, CreateCategorySuccessfun)
    }

    else if (dialogTitle === "Edit Category") {
      if(data.avatarUrl.type){
        fd.append('image', data.avatarUrl);
      }
      EditCategoryApiCall(SingleCategory?.id, fd, CreateCategorySuccessfun)
    }


  });

  

  // useEffect 
  useEffect(() => {
    setValue('categoryname', SingleCategory?.name);
    // setValue('avatarUrl',IMGBaseUrl + SingleCategory?.image)
    setValue('avatarUrl',SingleCategory?.image ? IMGBaseUrl + SingleCategory?.image : null)
    setValue('type', SingleCategory?.type)

  }, [setValue, SingleCategory])



  return (


    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>

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
        <RHFTextField name="categoryname" label="CategoryName" />


        <RHFAutocomplete name="type" label="Type"
          options={type.map((_type) => _type.label)}
          getOptionLabel={(option) => option}
        />

        {/* <h4>{SingleCategory?.name}</h4> */}


      </Stack>
      <DialogActions>

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClick}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={false}
        >
          {dialogTitle === "Add Category" ? "Add Category" : dialogTitle === "Edit Category" ? "Save change" : ""}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
