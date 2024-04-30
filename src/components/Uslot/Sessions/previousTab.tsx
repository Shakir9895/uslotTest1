import React from 'react'
import Container from '@mui/material/Container';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
/////-----------------------------------

const PreviousTab = () => {

  
  return (
    <Stack direction={'row'} p={1}>


      <Stack  direction={'column'} spacing={1} p={1} m={1} borderRadius={1} border={1} width={"25%"}>
        <Typography variant='h5'>BatchName</Typography>
        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="ri:user-fill" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>Drawing</Typography>
        </Stack>

        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="tdesign:time-filled" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>21 Feb  2024  |  10:30 am</Typography>
        </Stack>

        <Button sx={{
          background: "#FFAB00"
        }} >
          Join Now
        </Button>
      </Stack>


      <Stack  direction={'column'} m={1} spacing={1} p={1} borderRadius={1} border={1} width={"25%"}>
        <Typography variant='h5'>BatchName</Typography>
        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="ri:user-fill" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>Drawing</Typography>
        </Stack>

        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="tdesign:time-filled" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>21 Feb  2024  |  10:30 am</Typography>
        </Stack>

        <Button sx={{
          background: "#FFAB00"
        }} >
          Join Now
        </Button>
      </Stack>

      <Stack  direction={'column'} m={1} spacing={1} p={1} borderRadius={1} border={1} width={"25%"}>
        <Typography variant='h5'>BatchName</Typography>
        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="ri:user-fill" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>Drawing</Typography>
        </Stack>

        <Stack direction={'row'}  mb={1} spacing={1}>
          <Iconify icon="tdesign:time-filled" style={{ color: '#279a18' }} />
          <Typography variant='subtitle2' color={'gray'}>21 Feb  2024  |  10:30 am</Typography>
        </Stack>

        <Button sx={{
          background: "#FFAB00"
        }} >
          Join Now
        </Button>
      </Stack>
    </Stack>
  )
}

export default PreviousTab