import React, {Component} from 'react';

class Appointment extends Component{

  state = {
		fname : '',
		lname : '',
		mobil : '',
		email : '',
		dname : '',
		date : ''
	}

	handlerChange = (e) => {
		this.setState({[e.target.name]:e.target.value})

	}

	handlerSubmit = async (event) =>{
		//alert("pppp")
		event.preventDefault();
    //alert("aaaa")
    
    
    //-------Validation-------
    if(!this.state.fname || !this.state.lname || !this.state.mobil || !this.state.email || !this.state.dname || !this.state.date){
      alert("Cannot be empty!");
      return;
    }

    else if(!this.state.fname.match(/[a-zA-Z]/) || !this.state.lname.match(/[a-zA-Z]/)) {
      alert("Please Enter letters only!");
      return;
    }

    else if(!this.state.mobil.match(/[0-9]/) || this.state.mobil.length !== 10){
      alert("Enter Numbers!");
      return;
    }

    else if(!this.state.email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/)){
      alert("Enter valid Email!");
      return;
    }

   

    else{

    

		const appoDetails = {
			fname : this.state.fname,
			lname : this.state.lname,
			mobil : this.state.mobil,
			email : this.state.email,
			dname : this.state.dname,
			date : this.state.date
		}
    //alert(appoDetails.fname)
    
    fetch(`http://localhost:3000/addappo/${appoDetails.fname}/${appoDetails.lname}/${appoDetails.mobil}/${appoDetails.email}/${appoDetails.dname}/${appoDetails.date}`,{
      method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(json){
      
    }).catch(function(error){
      
    });
    this.props.history.push('/AppointmentDetails');
  }
    
  }

  render() {
    return (
      <div className="appointment">
  
  
  <div className="wrapper">
      <div className="title">
        Appointment Form
      </div>
  
      <div className="form">
        <form method="GET" action="/AppointmentDetails">
  
         <div className="inputfield">
            <label className="label">First Name</label>
            <input type="text" className="input" name="fname" onChange={this.handlerChange} required/>
         </div>  
  
         <div className="inputfield">
          <label  className="label">Last Name</label>
          <input type="text" className="input" name="lname" onChange={this.handlerChange} required/>
       </div>  
  
         <div className="inputfield">
            <label  className="label">Mobile</label>
            <input type="text" className="input" name="mobil" onChange={this.handlerChange} maxLength="10"  onkeyPress="onlyNumberKey(event)"  required/>
         </div>  
  
        <div className="inputfield">
            <label  className="label">E-mail</label>
            <input type="email" className="input" name="email" onChange={this.handlerChange} />
         </div> 
  
          <div className="inputfield">
            <label className="label-dt">Doctor Name</label>
            <div className="custom_select">
              <select name="dname" onChange={this.handlerChange} required>
                <option value="" >Select</option>
                <option value="adc" name="dname" onChange={this.handlerChange} >adc</option>
                <option value="def" name="dname" onChange={this.handlerChange} >def</option>
              </select>
            </div>
         </div> 
  
         <div className="inputfield">
           <label className="label-dt">Date</label>
           <input type="date" className="date-select"  id="txtDate" name="date" onChange={this.handlerChange} required/>
         </div>
  
        
         
        <div className="inputfield">
          
          <input class="appointment-btn" type="submit" value="Make An Appointment" onClick={this.handlerSubmit} />
          
        </div>
        </form>
  
      </div>
  </div>
       
      </div>
    );
  }

}
export default Appointment;