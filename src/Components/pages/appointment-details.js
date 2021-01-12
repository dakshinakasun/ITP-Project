import React, {Component} from 'react';
import{
	Link
  } from 'react-router-dom';

class AppointmentDetails extends Component{

	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	state = {
		id : '',
		fname : '',
		lname : '',
		mobil : '',
		email : '',
		dname : '',
		date : '',
	}

	handlerChange = (e) => {
		this.setState({[e.target.name]:e.target.value})

	}

	handlerSubmit = async (event) =>{
	//alert("pppp")
	event.preventDefault();
    //alert("aaaa")
    
		const appo = {
			id : this.state.id,
			fname : this.state.fname,
			lname : this.state.lname,
			mobil : this.state.mobil,
			email : this.state.email,
			dname : this.state.dname,
			date : this.state.date,
		}
		//alert(appo.id)
	//alert(appo.fname)
	//alert(appo.lname)
	
	fetch(`http://localhost:3000/updateappo/${appo.id}/${appo.fname}/${appo.lname}/${appo.mobil}/${appo.email}/${appo.dname}/${appo.date}`,{
		method: 'GET'
	  }).then(function(response){
		  return response.json();
	  }).then(function(json){
		
	  }).catch(function(error){
		
	  });
	  
	  
	}

	handlerDelete(e){
		alert(e)

		fetch(`http://localhost:3000/deleteappo/${e}`,{
			method: 'GET'
		}).then(function(response){
			return response.json();
		}).then(function(json){
		  
		}).catch(function(error){
		  
		});
		this.props.history.push('/Appointment');
	}

	componentDidMount(){
		fetch(`http://localhost:3000/insappo/80`)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result.data
				});
				console.log(result.data)
			},
			(error) => {
				this.setState({
					isLoaded: true,
					items:[],
					error: error
				});
			}
		)
	}	

	render() {
	
	const{ error,isLoaded,items} = this.state;
	if(error){

		return <div>Error: {error.message} </div>;

	}else if(!isLoaded){

		return<div></div>;

	}else{

		return (
		  <div className="appointment-details">
	  
			  <div className="wrapper">
			  <div className="title">
				Appointment Details
			  </div>
		  
			  <div className="form">
				  <form>

				  <li className="search-box">
							  <input className ="search-txt" type="text" name="" placeholder="Type to search"/>
			  
							  <Link className="search-btn" to="#">
								  <i className="fas fa-search"></i>
							  </Link>
						  </li>

				 

					  {/* ........................................................ */}
					  <table>
						{items.map(item =>(
							<tbody>

				<div className="inputfield-num">
				   <label className="form-app-num">Appointment No</label>
				   <input type="text" className="input" name="id"  defaultValue={item.app_id} onChange={this.handlerChange} />
				</div>

				<div className="inputfield-date">
				   <label className="form-app-date">Date</label>
				   <input type="date" className="input"  name="date"  defaultValue={item.date}  onChange={this.handlerChange}/>
				  </div>

				  <div className="inputfield">
					<label className="dlabel">First Name</label>
					<input type="text" className="input"  name="fname"  defaultValue={item.fname} onChange={this.handlerChange} />
				 </div>

				 <div className="inputfield">
				  <label className="dlabel">Last Name</label>
				  <input type="text" className="input"  name="lname"  defaultValue={item.lname}  onChange={this.handlerChange}/>
			   </div> 

			   <div className="inputfield">
					<label className="dlabel">Mobile</label>
					<input type="text" className="input"  name="mobil"  defaultValue={item.p_phone}  onChange={this.handlerChange}/>
				 </div>

				 <div className="inputfield">
					<label className="dlabel">E-mail</label>
					<input type="text" className="input"  name="email"  defaultValue={item.email}  onChange={this.handlerChange}/>
				 </div> 
		  
				 <div className="inputfield">
            		<label className="dlabel">Doctor Name</label>
           			<div className="custom_selectd">
              			<select name="dname" defaultValue={item.doctor_name} onChange={this.handlerChange} required>
                			<option value="adc" name="dname" defaultValue={item.doctor_name} onChange={this.handlerChange} >adc</option>
                			<option value="def" name="dname" defaultValue={item.doctor_name} onChange={this.handlerChange} >def</option>
              			</select>
            		</div>
         		</div> 			
							
				 <div className="inputfield">
				  
				  <input className="appointment-edit-btn" type="submit" value="Edit Appointment" onClick={this.handlerSubmit}/>
				  <input className="appointment-delete-btn" type="submit" value="Delete Appointment" onClick={()=>this.handlerDelete(item.app_id)} />
			  
		 		 </div>			

						
					</tbody>
				))}
			</table>
 
			  </form>
			  </div>
		  </div>

		  
			  
			  
		  
	  
		  </div>
	  
		  );
		}
	  }

}
export default AppointmentDetails;