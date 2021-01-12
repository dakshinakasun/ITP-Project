import React from 'react';
import{
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from './Components/headerComponent/header';
import Footer from './Components/footerComponent/footer';
import Appointment from './Components/pages/appointment';
import AppointmentDetails from './Components/pages/appointment-details';
import AllAppointmentDetails from './Components/pages/appointment-details-all.js';
import Bill from './Components/pages/bill'
import BillDetails from './Components/pages/bill-details';

function App() {
  return (
    <Router>
    <div className="App">

      <Header />

        <Route exact path = '/Appointment' component={Appointment} />
        <Route exact path = '/AppointmentDetails' component={AppointmentDetails} />
        <Route exact path = '/AllAppointmentDetails' component={AllAppointmentDetails} />
        <Route exact path = '/Bill' component={Bill} />
        <Route exact path = '/BillDetails' component={BillDetails} />

      <Footer />
     
    </div>
    </Router>
  );
}

export default App;

