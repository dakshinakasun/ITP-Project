import React, {Component} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class AllAppointmentDetails extends Component{

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
		//alert(e)
		alert("Appointment Deleted")
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
		fetch(`http://localhost:3000/selectappo`)
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
	
//Generate download the PDF-------------------------------------------------------------------------------------- 
exportPDF = () => {
	console.log("SSSSSSSS")

	const unit = "pt";
	const size = "A4"; // size of the page
	const orientation = "landscape"; // portrait or landscape
	const marginLeft = 40;
	const doc = new jsPDF( orientation, unit, size ); //create new doc for generate PDF

	const title = "Appointment Details ";
	const headers = [["ID","First Name","Last Name","Mobile Number","Email","Doctor Name","Data"]];

	//get value in the appointment list table
	const appo =  this.state.items.map(
		appo =>[
			
			appo.app_id,
			appo.fname,
			appo.lname,
			appo.p_phone,
			appo.email,
			appo.doctor_name,
			appo.date,
			
			
		]
	);

	let contents = {
		startY: 50,
		head: headers,
		body: appo
	};

	doc.setFontSize( 20 );
	doc.text( title, marginLeft, 40 );
	require('jspdf-autotable');
	doc.autoTable( contents );
	doc.save( "AppointmentReport.pdf" ) //save the pdf

}
    
    render() {

    const{ error,isLoaded,items} = this.state;
	if(error){

		return <div>Error: {error.message} </div>;

	}else if(!isLoaded){

		return<div></div>;

	}else{
        return (
          <div className="appointment-details-all">
                
                <div className="appo-topic">
			  <h1>Appointment Details</h1>
		 	 </div>

			  
			  

		  		<div className="appo-table-responsive">
				  <table className="appo-table">
					  <thead className="table-topic">
						  <tr>
							  <th className="id">ID</th>
							  <th className="fname">First Name</th>
							  <th className="fname">Last Name</th>
							  <th className="fname">Mobile</th>
							  <th className="fname">Email</th>
							  <th className="fname">Doctor</th>
							  <th className="fname">Date</th>
							  <th className="fname">Update</th>
							  <th className="fname">Delete</th>
						  </tr>
					  </thead>
					  {items.map(item =>(	  
					<tbody>
						<tr>							
		
							  <td className="left strong">
								  <input type="text" name="id" className="input-des" defaultValue={item.app_id} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="text" min="0" name="fname" className="input"  defaultValue={item.fname} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="text" min="0" name="lname" defaultValue={item.lname} onChange={this.handlerChange} className="input" />
							  </td>
							  <td className="right">
								  <input type="text" min="0" name="mobil" defaultValue={item.p_phone} onChange={this.handlerChange} className="input" />
							  </td>
							  <td className="right">
								  <input type="text" min="0" name="email" defaultValue={item.email} onChange={this.handlerChange} className="input" />
							  </td>
							  <td className="right">
								  <input type="text" min="0" name="dname" defaultValue={item.doctor_name} onChange={this.handlerChange} className="input" />
							  </td>
							  <td className="">
								  <input type="text" min="0" name="date" className="input" defaultValue={item.date} onChange={this.handlerChange}/>
							  </td>
							  <td><input className="appo-btn-update" type="submit" value="Update" name="submit" onClick={this.handlerSubmit} /></td>
							  <td><input className="appo-btn-delete" type="submit" value="Delete" onClick={()=>this.handlerDelete(item.app_id)} /></td>
							  
				
						</tr>
					</tbody>
				))}
					</table>
				</div>
                
				<input className = "appo-btn-download" type="submit" value="Download Report" onClick = {this.exportPDF}/><br/><br/>

          </div>
    );
    }
  }

}
export default AllAppointmentDetails;