import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import './App.css'
import getMasterDB from './database/getMasterDB'
import InvoiceForm from './invoiceForm'
import { FormProvider } from 'react-hook-form'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBuyer from './AddBuyer'

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Routes>
          <Route exact path="/" element={<FormProvider><InvoiceForm/></FormProvider>} />
          <Route exact path="/addBuyer" element={<AddBuyer />} />          
        </Routes>
        {/* <ToastContainer /> */}
      </Router>
    </LocalizationProvider>
  )
}

export default App
