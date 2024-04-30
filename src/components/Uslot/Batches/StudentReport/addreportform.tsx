import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createEvent, updateEvent, deleteEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch, RHFAutocomplete } from 'src/components/hook-form';
// types
import { ICalendarEvent, ICalendarDate } from 'src/types/calendar';
import { board } from 'src/assets/data/board';

// ----------------------------------------------------------------------

type Props = {
  onClick: () => void;
  dialogTitle: string
}


export default function AddReportForm({ onClick, dialogTitle }: Props) {


  const [startDate, setStartDate] = useState(null);



  const EventSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
  });

  const currentEvent = {
    title: ""
  }

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });


  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  // console.log(values)

  const onSubmit = handleSubmit(async (data,buttonLabel) => {
    console.log(data,buttonLabel?.target.name)
  });


  //handleFilterStartDate
  const handleFilterStartDate = () => {

  }


  return (


    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFAutocomplete name="module" label="Module"
          options={board.map((country) => country.label)}
          getOptionLabel={(option) => option}

        />

        <DatePicker
          label="Date of Birth"
          value={startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <RHFTextField name="description" label="Description" />
      </Stack>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="inherit" onClick={onClick}>
          Cancel
        </Button>

        <LoadingButton
          // name="addreport"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={false}
        >
          {dialogTitle === "Add Report" ? "Add Report" : dialogTitle === "Edit Report" ? "Save change" : ""}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
