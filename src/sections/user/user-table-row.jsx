import { useState } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  name,
  avatarURL,
  email,
  date_joined,
  // isVerified,
  // status,
  selected,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  // const [userData, setUserData] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const options = { month: 'short', day: 'numeric', year: 'numeric' };

  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
    const dayWithOrdinal = day + (/[0,4-9]/.test(day) ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1]);
    return formattedDate.replace(day, dayWithOrdinal);
  };

  return (
    <>
      {/* {true ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
            float: 'right',
          }}
        >
          <BarLoader color="#36d7b7" height={10} />
        </div>
      ) : (
        userData.map((data) => ( */}
      <TableRow key={id} hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={name}
              src={avatarURL || '../../../public/assets/images/avatars/avatar_1.jpg'}
            />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{formatDate(date_joined)}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* ))
      )} */}

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        // PaperProps={{
        //   sx: { width: 140 },
        // }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  selected: PropTypes.any,
  avatarURL: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  // isVerified: PropTypes.any,
  name: PropTypes.any,
  date_joined: PropTypes.any,
};
