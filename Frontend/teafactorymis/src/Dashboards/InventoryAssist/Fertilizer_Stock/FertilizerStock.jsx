import React, { useState, useEffect } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,InputAdornment,Dialog,DialogActions,DialogTitle,DialogContent} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Add_Fertilizer from './Add_Fertilizer';
import Edit_Fertilizer from './Edit_Fertilizer';
import Deleted_Fertilizer_History from './Deleted_Fertilizer_History';


function FertilizerStock() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm,setOpenForm] =useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editItem,setEditItem] = useState(null);
  const [openEditForm,setOpenEditForm] =useState(false);
  const [deleteHistoryData, setDeleteHistoryData] = useState([]); // New state for delete history data
  const [openDeleteHistory, setOpenDeleteHistory] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/fertilizer/all')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data!');
      });
  }, []);

  const fetchDeleteHistory = () => {
    axios.get('http://localhost:8080/fertilizer/deleted_fertilizer_history')
      .then(response => setDeleteHistoryData(response.data))
      .catch(error => setError('There was an error fetching the delete history!'));
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.fer_id.toString().includes(searchTerm) 
  );
  
  //open forum
  const handleOpenForm=()=>{
    setOpenForm(true);
  }

  //close forum
  const handleCloseForm =()=>{
    setOpenForm(false);
  }

  const handleOpenEditForm = (item) => {
    setEditItem(item);
    setOpenEditForm(true);
  };

  //close edit inventory 
  const handleCloseEditForm = () => {
    setEditItem(null);
    setOpenEditForm(false);
  };


    // Open the delete confirmation dialog
    const handleOpenDeleteDialog = (item) => {
      console.log('Delete icon clicked', item); // Debug log
      setItemToDelete(item);
      setOpenDeleteDialog(true);
    };
  
    // Close the delete confirmation dialog
    const handleCloseDeleteDialog = () => {
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    };

    const handleDeleteItem = () => {
      if (itemToDelete) {
        axios.delete(`http://localhost:8080/fertilizer/delete/${itemToDelete.fer_id}`)
          .then(response => {
            // Remove the deleted item from the local state
            setRows(rows.filter(row => row.fer_id !== itemToDelete.fer_id));
            // Close the dialog
            handleCloseDeleteDialog();
          })
          .catch(error => {
            console.error('There was an error deleting the item.', error);
            setError('There was an error deleting the item!');
          });
      }
    };
  
    const handleRefreshData = () => {
      axios.get('http://localhost:8080/fertilizer/all')
        .then(response => {
          setRows(response.data);
        })
        .catch(error => {
          console.error('There was an error refreshing the data!', error);
        });
    };
  
    const handleOpenDeleteHistory = () => {
      fetchDeleteHistory();  // Fetch delete history when modal opens
      setOpenDeleteHistory(true);
    };
  
    const handleCloseDeleteHistory = () =>
       setOpenDeleteHistory(false);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
      <TextField
        fullWidth
        placeholder="Search items..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '600px',  
          height: '70px'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" sx={{ ml: 32, height: '50px',width:'200px',fontWeight:'bold',backgroundColor:'#77DD77',alignItems:'spacebetween' }} onClick={handleOpenForm}>Add Fertilizer Stock  </Button>
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#77DD77' }}>
              <TableCell>Fertilizer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Available Quantity(kg)</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {filteredRows.map((row, index) => (
              <TableRow key={row.fer_id || index}>
                <TableCell>{row.fer_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}kg</TableCell>
                <TableCell >
                <Button variant="contained" sx={{ ml:1,fontWeight:'bold',backgroundColor:'#77DD77'}} onClick={() => handleOpenEditForm(row)}> 
                <EditIcon style={{color:"black"}}/></Button>
                <Button variant="contained" sx={{ ml:1,fontWeight:'bold',backgroundColor:'#77DD77'}} onClick={() => handleOpenDeleteDialog(row)}> 
                  <DeleteIcon style={{color:"black"}}/></Button> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginTop={'40px'} >
      <Button variant="contained" sx={{ ml:4,fontWeight:'bold',backgroundColor:'#77DD77'}}onClick={handleOpenDeleteHistory}>
              Watch delete history
            </Button>
      </Box>

      <Add_Fertilizer 
          openForm={openForm} 
          handleCloseForm={handleCloseForm} 
          onFormSubmit={handleRefreshData}/>

      <Edit_Fertilizer 
           openEditForm={openEditForm} // Make sure this matches the prop name in Edit_Fertilizer
           handleCloseEditForm={handleCloseEditForm}
           onFormSubmit={handleRefreshData}
          editItem={editItem}
        />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this inventory item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItem} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Deleted_Fertilizer_History 
        open={openDeleteHistory} 
        handleClose={handleCloseDeleteHistory} 
        deleteHistoryData={deleteHistoryData} 
      />
    </Box>
  );
}

export default FertilizerStock