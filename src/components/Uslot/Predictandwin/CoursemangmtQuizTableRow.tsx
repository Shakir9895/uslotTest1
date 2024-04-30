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

export default function PlusTwoTableRow({
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
        reg_no,school, dob, mobile_no, paper_1, paper_2, accountancy, biology, economics, maths, stream,
        chemistry, physics, business_studies, computer_science, gandhian_studies, anthropology, malayalam, sanskrit_sahitya
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
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{stream}</TableCell>


                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={paper_1}
                    secondary={"paper_1"}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={paper_2}
                    secondary={"paper_2"}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={biology || business_studies || computer_science || gandhian_studies}
                    secondary={biology ? "biology" : business_studies ? "business_studies" : computer_science ? "computer_science" : gandhian_studies ? "gandhian_studies" : ""}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={chemistry || accountancy || anthropology}
                    secondary={chemistry ? "chemistry" : accountancy ? "accountancy" : anthropology ? "anthropology" : ""}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={physics || economics || malayalam}
                    secondary={physics ? "physics" : economics ? "economics" : malayalam ? "malayalam" : ""}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>


                <TableCell sx={{ whiteSpace: 'nowrap' }}><ListItemText
                    primary={maths || sanskrit_sahitya}
                    secondary={maths ? "maths" : sanskrit_sahitya ? "sanskrit_sahitya" : ""}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
                /> </TableCell>



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
