import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
// utils
import { fCurrency } from 'src/utils/format-number';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  row: IProductItem;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: number;
};

export default function SslcModuleTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
  index
}: Props) {
  const {
    name,
    syllabus,
    duration,
    price,
    publish,
    coverUrl,
    category,
    quantity,
    createdAt,
    available,
    inventoryType,
    reg_no,school,dob,mobile_no,paper_1,paper_2,english,hindi,social_science,physics,chemistry,biology,
    maths,information_technology
  } = row;
  console.log(row)

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{reg_no}</TableCell>
        <Tooltip title={school} placement="top">
    <TableCell sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '150px',  // Adjust this based on your design needs
    }}>
        {school}
    </TableCell>
</Tooltip>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dob}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{mobile_no}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.class}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{paper_1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{paper_2}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{english}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{hindi}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{social_science}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{physics}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{chemistry}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{biology}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{maths}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{information_technology}</TableCell>
        
      </TableRow>


      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >


        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
