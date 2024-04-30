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
import Typography from '@mui/material/Typography';
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

export default function CoursemgmtQuizTableRow({
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
        price,
        publish,
        coverUrl,
        category,
        quantity,
        createdAt,
        available,
        inventoryType,
        question,
        options,
        correct_answer
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
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{question}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', display: "flex", flexDirection: "column" }}

                >

                    <Typography variant='subtitle2'>
                        A : {options[0]}
                    </Typography>
                    <Typography variant='subtitle2'>
                        B : {options[1]}
                    </Typography>
                    <Typography variant='subtitle2'>
                        C : {options[2]}
                    </Typography>
                    <Typography variant='subtitle2'>
                        D : {options[3]}
                    </Typography>


                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{correct_answer}</TableCell>


                <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
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
