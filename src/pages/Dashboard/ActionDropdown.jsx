import { forwardRef } from 'react'

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionDropdown = forwardRef(function ActionDropdown(
  { onInfo, onEdit, onDelete, onClose },
  ref
) {
  const handleInfo = () => {
    onInfo?.()
    onClose?.()
  }

  const handleEdit = () => {
    onEdit?.()
    onClose?.()
  }

  const handleDelete = () => {
    onDelete?.()
    onClose?.()
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: 'translateY(100%)',
        zIndex: 1,
        width: 'fit-content',
      }}
    >
      <Paper sx={{ width: 'fit-content' }}>
        <MenuList>
          <MenuItem onClick={handleInfo}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  )
})

export default ActionDropdown