import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useParams, useRouter } from 'src/routes/hook';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
// types
import { IProductItem } from 'src/types/product';
import { Radio, RadioGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { CreateQuizbyCourseId, CreateQuizbyModuleId, UpdateQuizByIdApiCall, getSingleQuizById } from 'src/api/uslot/academics';
import { useDispatch } from 'react-redux';
import { SingleQuizById } from 'src/redux/slices/app';



// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
  Heading?: string;
};

export default function ModuleCreateQuizForm({ currentProduct, Heading }: Props) {

  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;

  const [selectedOption, setSelectedOption] = useState('optionA');

  console.log(selectedOption)


  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const NewProductSchema = Yup.object().shape({

    question: Yup.string().transform(value => value.replace(/<[^>]+>/g, '')).required('Question is required'),
    option_a: Yup.string().transform(value => value.replace(/<[^>]+>/g, '')).required('Option A is required'),
    option_b: Yup.string().transform(value => value.replace(/<[^>]+>/g, '')).required('Option B is required'),
    option_c: Yup.string().transform(value => value.replace(/<[^>]+>/g, '')).required('Option C is required'),
    option_d: Yup.string().transform(value => value.replace(/<[^>]+>/g, '')).required('Option D is required'),

  });

  const defaultValues = {
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    // options: ""
  }

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log(Heading)

  const onSubmit = handleSubmit(async (data) => {
    try {
     
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.product.root);

      //-----------------------------------------------------//

      console.info('DATA', data);
      const body = {
        question: data?.question,
        options: [data.option_a, data.option_b, data.option_c, data.option_d],
        correct_answer: selectedOption
      }

      console.log("BODY>>>>", body)

        //success
        CreateQuizbyModuleId(id, body, enqueueSnackbar, reset)


    } catch (error) {
      enqueueSnackbar('Something Went Wrong !!', { variant: 'error' })
    }
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };



  const renderDetails = (
    <>

      <Grid xs={12}  >

        <Card>

          {!mdUp && <CardHeader title="Details" />}
          <Stack spacing={1.5} mb={1}>
            <Typography variant="subtitle2">Question</Typography>
            <RHFEditor simple name="question" />
          </Stack>


          <Stack direction={'row'} spacing={1} width={"100%"} flexWrap={'wrap'}>
            <Stack spacing={1.5} width={"49%"}>
              <Typography variant="subtitle2">Option A</Typography>
              <RHFEditor simple name="option_a" />
            </Stack>

            <Stack spacing={1.5} width={"49%"} >
              <Typography variant="subtitle2">Option B</Typography>
              <RHFEditor simple name="option_b" />
            </Stack>


            <Stack spacing={1.5} width={"49%"}>
              <Typography variant="subtitle2">Option C</Typography>
              <RHFEditor simple name="option_c" />
            </Stack>

            <Stack spacing={1.5} width={"49%"}>
              <Typography variant="subtitle2">Option D</Typography>
              <RHFEditor simple name="option_d" />
            </Stack>
          </Stack>
        </Card>


        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'column'}>
            <Typography>Correct Answer</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>

              <RadioGroup
                row
                aria-label="options"
                // name="options"
                value={selectedOption}
                onChange={handleChange}
              >
                <FormControlLabel value="optionA" control={<Radio />} label="A" />
                <FormControlLabel value="optionB" control={<Radio />} label="B" />
                <FormControlLabel value="optionC" control={<Radio />} label="C" />
                <FormControlLabel value="optionD" control={<Radio />} label="D" />
              </RadioGroup>


            </Stack>
          </Stack>


          <Button variant="outlined" type='submit' color="inherit" sx={{ mr: 2 }}>
            {Heading === 'Edit Quiz' ? 'Save Changes' : 'Add Question'}
          </Button>
        </Stack>
      </Grid>

    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
      </Grid>
    </FormProvider>
  );
}
