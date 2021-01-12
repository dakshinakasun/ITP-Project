import React, {Component} from 'react';

class Bill extends Component{

	state = {
		inum : '',
		idate : '',
		oitem : '',
		oqty : '',
		pitem : '',
		pqty : '',
		subtot : '',
		dis : '',
		tot : '',
		btype : '',
		ndays : '',
		cname : '',
		cadd : '',
		cemail : '',
		oamount : '',
		pamount : '',
		otot : '',
		ptot : ''
	}

	handlerChange = (e) => {
		this.setState({[e.target.name]:e.target.value})

	}

	handlerSubmit = async (event) =>{
		//alert("pppp")
		event.preventDefault();
	//alert("aaaa")
	
	 //-------Validation-------
	 if(!this.state.cname || !this.state.cadd || !this.state.idate || !this.state.btype || !this.state.ndays) {
		alert("Cannot be empty!");
		return;
	 }

	 else if(!this.state.cname.match(/[a-zA-Z]/)) {
		alert("Please Enter letters only!");
		return;
	  }

	else if(!this.state.cemail.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/)){
		alert("Enter valid Email!");
		return;
	}
    
		const billdetails = {
			inum : this.state.inum,
			idate : this.state.idate,
			oitem : this.state.oitem,
			oqty : this.state.oqty,
			pitem : this.state.pitem,
			pqty : this.state.pqty,
			subtot : this.state.subtot,
			dis : this.state.dis,
			tot : this.state.tot,
			btype : this.state.btype,
			ndays : this.state.ndays,
			cname : this.state.cname,
			cadd : this.state.cadd,
			cemail : this.state.cemail,
			oamount : this.state.oamount,
			pamount : this.state.pamount,
			otot : this.state.otot,
			ptot : this.state.ptot
		}
	//alert(billdetails.cname)
    
    fetch(`http://localhost:3000/addbill/${billdetails.idate}/${billdetails.oitem}/${billdetails.oqty}/${billdetails.oamount}/${billdetails.otot}/${billdetails.pitem}/${billdetails.pqty}/${billdetails.pamount}/${billdetails.ptot}/${billdetails.subtot}/${billdetails.dis}/${billdetails.tot}/${billdetails.btype}/${billdetails.ndays}/${billdetails.cname}/${billdetails.cadd}/${billdetails.cemail}`,{
      method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(json){
      
    }).catch(function(error){
      
    });
    this.props.history.push('/BillDetails');
  }

	render() {
		return (
		  <div className="bill">
			  
			  <div className="topic">
			  <h1>Pharmacy Invoice</h1>
		  	  </div>
	  
		  <div className="company-details">
			  <div className ="details-topic">
				  <h5>Hanarakada Nurshin Home</h5><br/>
			  </div>
			  <label>Habarakada, Homagama</label><br/>
			  <label>+9477 3147059</label><br/>
			  <label>hanarakadanurshinhome@gmail.com</label><br/>
		  </div>
	  
	  
		  <form action="/Appointment" method=""> 
		  <div className="bill-details">
			  <div className="inputfield">
				  <label className="invoice-date">Invoice Number</label>
				  <input type="number" name="inum" min="0" className="input" disabled/>
			  
				  <label className="invoice-date">Date</label>
				  <input type="date" name="idate" className="date" id="txtDate" onChange={this.handlerChange} required/>
			  </div>
		  </div>
		  
		  <div className="customer-details">
			  <div className ="details-topic">
				  <h5>Client/Customer</h5><br/>
			  </div>
	  
			  <div className="inputfield" >
				  <label>Name</label>
				  <input type="text" name="cname" className="input" onChange={this.handlerChange} required/>
			  </div>
			  <div className="inputfield">
				  <label>Address</label>
				  <input type="text" name="cadd" className="input" onChange={this.handlerChange} required/> 
			  </div>
			  <div className="inputfield">
				  <label>E-mail</label>
				  <input type="email" name="cemail" className="input" onChange={this.handlerChange} /> 
			  </div>	
		  </div>
	  
		  <div className="bill-bg">
	  
			  <h3 className="bill-title"> Doctor & OPD Fee </h3>
	  
	  
			  <div className="table-responsive">
				  <table className="bill-table">
					  <thead className="table-topic">
						  <tr>
							  <th className="no">#</th>
							  <th className="">Item</th>
							  <th className="qty">Qty</th>
							  <th className="unit">Unit</th>
							  <th className="amount">Amount</th>
						  </tr>
					  </thead>
					  <tbody>
						  <tr>
							  <td className="no">1</td>
							  <td className="left strong">
								  <input type="text" name="oitem" onChange={this.handlerChange} className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" onChange={this.handlerChange} className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">2</td>
							  <td className="left strong">
								  <input type="text" name="oitem" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">3</td>
							  <td className="left strong">
								  <input type="text" name="oitem" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">4</td>
							  <td className="left strong">
								  <input type="text" name="oitem" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">5</td>
							  <td className="left strong">
								  <input type="text" name="oitem" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td></td>
							  <td></td>
							  <td></td>
							  <th className="sub-tot">Total</th>
							  <td className="">
								  <input type="number" min="0" name="otot" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
					  </tbody>
	  
				  </table>
			  </div>
	  
			  <h3 className="bill-title"> Pharmacy Fee </h3>
	  
			  <div className="table-responsive">
				  <table className="bill-table">
					  <thead className="table-topic">
						  <tr>
							  <th className="no">#</th>
							  <th className="">Item</th>
							  <th className="qty">Qty</th>
							  <th className="unit">Unit</th>
							  <th className="amount">Amount</th>
						  </tr>
					  </thead>
					  <tbody>
						  <tr>
							  <td className="no">1</td>
							  <td className="left strong">
								  <input type="text" name="pitem" onChange={this.handlerChange} className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="pqty" onChange={this.handlerChange} className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">2</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">3</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">4</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">5</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input"/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input"/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <td></td>
							  <td></td>
							  <td></td>
							  <th className="sub-tot">Total</th>
							  <td className="">
								  <input type="number" min="0" name="ptot" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
					  </tbody>
				  </table>
			  </div>
	  
			  <div className="table-responsive-sm">
				  <table className="bill-table">
					  <tbody>
						  <tr>
							  <th className="tot">
								  Subtotal
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="subtot" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
						  <tr>
							  <th className="tot">
								  Discount
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="dis" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
						  
						  <tr>
							  <th className="tot">
								  Total
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="tot" onChange={this.handlerChange} className="input"/>
							  </td>
						  </tr>
					  </tbody>
	  
				  </table>
			  </div>
	  
		  </div>
	  
		  <div className="bill-custome-div">
			  <div className="inputfield-bill-type">
				  <label><b>Select Bill Type</b></label>
						<select required className="custom-select" name="btype" onChange={this.handlerChange}>
						<option >Select</option>
						  <option value="Cash" name="btype" onChange={this.handlerChange}>Cash</option>
						  <option value="Credit" name="btype" onChange={this.handlerChange}>Credit</option>
						</select>
			  </div>
	  
			  <div className="inputfield-bill-period">
				  <label><b>Payment is due withing </b></label> 
					  <select className="custom-select" name="ndays" onChange={this.handlerChange}>
					  <option >Select</option>
						  <option value="Non" name="ndays" onChange={this.handlerChange}>Non</option>
						  <option value="30 Days" name="ndays" onChange={this.handlerChange}>30 Days</option>
						  <option value="60 Days" name="ndays" onChange={this.handlerChange}>60 Days</option>
					  </select> 
				  <label className="days"><b>Days</b></label>
			  </div>
	  
		  </div>
	  
		  <div className="bill-btn">
			  
				  <div className="inputfield">
					  <input data-modal-target="#modal" className="Bill-btn-save" type="submit" value="Save Invoice" onClick={this.handlerSubmit}/>
					  <input data-modal-target="#modal" className="Bill-btn-clear" type="reset" value="Clear Invoice"/>
					  <input data-modal-target="#modal" className="Bill-btn-print" type="submit" value="Print Invoice"/>
				  </div>	
			  
		  </div>
	  
		  </form>
		  </div>
		);
	  }

}
export default Bill;
