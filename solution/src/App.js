import { Container, Box, TextField, Autocomplete, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import * as api from './mock-api/apis'
import Table from './components/Table'

function App() {
  const [inputName, setInputName] = useState('')
  const [inputNameError, setInputNameError] = useState('')
  const [locationOptions, setLocationOptions] = useState([])
  const [location, setLocation] = useState('')
  const [rows, setRows] = useState([])

  useEffect(() => {
    getLocations()
  }, [])

  const getLocations = async () => {
    const fetchedLocations = await api.getLocations()
    setLocationOptions(fetchedLocations)
  }

  const handleLocationChange = (e, value) => {
    setLocation(value)
  }

  useEffect(() => {
    const startValidation = setTimeout(() => {
      validate(inputName)
    }, 500)

    return () => clearTimeout(startValidation)
  }, [inputName])

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  }

  const validate = async (value) => {
    const isValid = await api.isNameValid(value)
    setInputNameError('')

    if (!isValid) {
      setInputNameError('This name has already been taken.')
      return false
    }
  }

  const addRow = async () => {
    if (inputName.length < 1){
      setInputNameError('Name is required.')
      return;
    }

    const isValid = await api.isNameValid(inputName)

    if (!isValid) {
      return;
    }

    const oldRows = [...rows]
    oldRows.push({ inputName, location })
    setRows(oldRows)
    clearForm()
  }

  const clearForm = () => {
    setInputName('')
    setLocation('')
  }

  return (
    <Box padding='2rem' height='100%' overflow='hidden'>
      <Container sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Box>
          <Box sx={{mb: '2rem'}}>
            <TextField fullWidth error={!!inputNameError} helperText={inputNameError} variant='outlined' label='Name' value={inputName} onChange={handleNameChange} />
          </Box>
          <Box sx={{mb: '2rem'}}>
            {/* Using this combination select and text search input for users to more easily find their location for longer lists */}
            <Autocomplete
              options={locationOptions}
              fullWidth
              value={location}
              renderInput={(params) => <TextField {...params} label="Location" fullWidth />}
              onChange={handleLocationChange}
            />
          </Box>
          <Box display='flex' flexDirection='row' justifyContent='flex-end'>
            <Box sx={{ width: { xs: '100%', md: "25%" } }} display='flex' flexDirection='row' justifyContent='space-evenly'>
              <Button variant='contained' sx={{minWidth: '40%'}} onClick={clearForm}>Clear</Button>
              <Button variant='contained' sx={{minWidth: '40%'}} disabled={inputNameError} onClick={addRow}>Add</Button>
            </Box>
          </Box>
        </Box>
        <Box flex='1' overflow='auto' paddingBottom='4rem'>
          {/* Build the table as a reusable component, could probably handle row creation better in that component */}
          <Table headers={['Name', 'Location']} rows={rows} />
        </Box>
      </Container>
    </Box>
  )
}

export default App
