import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { AddEpfEtf } from './AddEpfEtf';

const EpfEtf = () => {
    const [epfEtf, setEpfEtf]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const loadEpfEtf=async()=>{
        const result=await axios.get("http://localhost:8080/epfetfGet");
        setEpfEtf(result.data);
        console.log(result.data);
    }

    useEffect(()=>{
      loadEpfEtf();
    },[]);

    const deleteEpfEtf = async(epf_etfId)=>{
        if (window.confirm("Are you sure you want to delete this?")) {
          try {
            await axios.delete(`http://localhost:8080/epfetfDelete/${epf_etfId}`);
            loadEpfEtf();
          } catch (error) {
            window.alert("The Epf and Etf detail cannot be deleted...!");
          }
        }
      };

      const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
      };
    
      const filteredEpfEtf = epfEtf.filter(EPFETF =>
        // (epfEtf.epf_etfId && epfEtf.epf_etfId.toLowerCase().includes(searchQuery.toLowerCase())) 
        (EPFETF.empId && EPFETF.empId.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        EPF and ETF
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ flex: 1, mr: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="EpfAndEtf table" size="small">
            <TableHead sx={{ backgroundColor: "#77DD77",alignContent:'center' }}>
                <TableRow>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell>Employee Contributed(EPF)</TableCell>
                    <TableCell>Employer Contributed(EPF)</TableCell>
                    <TableCell>Total EPF Amount</TableCell>
                    <TableCell>Employer Contributed(ETF)</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {filteredEpfEtf.map((EPFETF) => (
                <TableRow key={EPFETF.epf_etfId}>
                  {/* <TableCell>{EPFETF.epf_etfId}</TableCell> */}
                  <TableCell>{EPFETF.empId}</TableCell>
                  <TableCell>{EPFETF.date}</TableCell>
                  <TableCell>{EPFETF.basicSalary}</TableCell>
                  <TableCell>{EPFETF.employeeContributionEPF}</TableCell>
                  <TableCell>{EPFETF.employerContributionEPF}</TableCell>
                  <TableCell>{EPFETF.epfAmount}</TableCell>
                  <TableCell>{EPFETF.employerContributionETF}</TableCell>
                  <TableCell>
                  <Button variant="contained" style={{ backgroundColor: '#00AB66' }} onClick={() => deleteEpfEtf(EPFETF.epf_etfId)}>
                    <DeleteIcon />
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default EpfEtf