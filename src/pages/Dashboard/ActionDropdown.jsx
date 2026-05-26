import { createPortal } from 'react-dom'

import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function ActionDropdown({ anchorEl, open, onInfo, onEdit, onDelete, onClose }) {
  const handleInfo = () => {
    onInfo()
    onClose()
  }
  const handleEdit = () => {
    onEdit()
    onClose()
  }
  const handleDelete = () => {
    onDelete()
    onClose()
  }

  return createPortal(
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={() => handleInfo()}>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Details</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleEdit()}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleDelete()}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>,
    document.body
  )
}

export default ActionDropdown