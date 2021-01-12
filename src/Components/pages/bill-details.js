import React, {Component} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class BillDetails extends Component{

	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

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
	//alert(billdetails.btype)
	//alert(billdetails.ndays)
    
    fetch(`http://localhost:3000/upbill/${billdetails.inum}/${billdetails.idate}/${billdetails.oitem}/${billdetails.oqty}/${billdetails.oamount}/${billdetails.otot}/${billdetails.pitem}/${billdetails.pqty}/${billdetails.pamount}/${billdetails.ptot}/${billdetails.subtot}/${billdetails.dis}/${billdetails.tot}/${billdetails.btype}/${billdetails.ndays}/${billdetails.cname}/${billdetails.cadd}/${billdetails.cemail}`,{
      method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(json){
      
    }).catch(function(error){
      
    });
    
    
  }

	componentDidMount(){
		fetch(`http://localhost:3000/insbill/12`)
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
	const size = "A2"; // size of the page
	const orientation = "landscape"; // portrait or landscape
	const marginLeft = 40;
	const doc = new jsPDF( orientation, unit, size ); //create new doc for generate PDF

	const title = "Bill Details ";
	const headers = [["Inv No","Date","OPD Item","OPD Qty","OPD Amount","OPD Total","Pharmacy Item","Pharmacy Qty","Pharmacy Amount","Pharmacy Total","Sub Total","Discount","Total","Bill Type","Credit period","Customer Name","Customer Address","Customer Email"]];

	//get value in the appointment list table
	const billdetails =  this.state.items.map(
		billdetails =>[
			billdetails.invoice_no,
			billdetails.date,
			billdetails.OPD_item,
			billdetails.OPD_Qty,
			billdetails.OPD_amount,
			billdetails.OPD_total,
			billdetails.Pharmacy_item,
			billdetails.Pharmacy_Qty,
			billdetails.Pharmacy_amount,
			billdetails.Pharmacy_total,
			billdetails.sub_total,
			billdetails.discount,
			billdetails.total,
			billdetails.bill_type,
			billdetails.no_of_days,
			billdetails.cname,
			billdetails.cadd,
			billdetails.cemail,
			
		]
	);

	let contents = {
		startY: 50,
		head: headers,
		body: billdetails
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
	  
	  
		  <form action="" method=""> 
	  
		  <li className="search-box">
							  <input className ="search-txt" type="text" name="" placeholder="Type to search"/>
			  
							  <a className="search-btn" href="#">
								  <i className="fas fa-search"></i>
							  </a>
						  </li>
						  
		  <div className="bill-details">
			  <div className="inputfield">
				  <label className="invoice-date">Invoice Number</label>
				  {items.map(item =>(
					  <input type="number" min="0" className="input" name="inum"  defaultValue={item.invoice_no} onChange={this.handlerChange} />
				  ))}
				  
				  <label className="invoice-date">Date</label>
				  {items.map(item =>(
					<input type="date" className="date" id="txtDate" name="idate"  defaultValue={item.date}  onChange={this.handlerChange}/>
				  ))}
  
			  </div>
		  </div>
		  
		  <div className="customer-details">
			  <div className ="details-topic">
				  <h5>Client/Customer</h5><br/>
			  </div>
	  
			  <div className="inputfield" >
				  <label>Name</label>
				  {items.map(item =>(
				  <input type="text" className="input" name="cname" defaultValue={item.cname} onChange={this.handlerChange}/>
				  ))}
			  </div>
			  <div className="inputfield">
				  <label>Address</label>
				  {items.map(item =>(
				  <input type="text" className="input" name="cadd" defaultValue={item.cadd} onChange={this.handlerChange}/> 
				  ))}
			  </div>
			  <div className="inputfield">
				  <label>E-mail</label>
				  {items.map(item =>(
				  <input type="email" className="input" name="cemail" defaultValue={item.cemail} onChange={this.handlerChange}/>
				  ))} 
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
					  {items.map(item =>(
					  <tbody>
						  <tr>
							  <td className="no">1</td>
							  <td className="left strong">
								  <input type="text" name="oitem" className="input-des" defaultValue={item.OPD_item} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="oqty" className="input"  defaultValue={item.OPD_Qty} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" />
							  </td>
							  <td className="">
								  <input type="number" min="0" name="oamount" className="input" defaultValue={item.OPD_amount} onChange={this.handlerChange}/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">2</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">3</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">4</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">5</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td></td>
							  <td></td>
							  <td></td>
							  <th className="sub-tot">Total</th>
							  <td className="">
								  <input type="number" min="0" name="otot" className="input" defaultValue={item.OPD_total} onChange={this.handlerChange}/>
							  </td>
						  </tr>
					  </tbody>
	  					))}
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
					  {items.map(item =>(
					  <tbody>
						  <tr>
							  <td className="no">1</td>
							  <td className="left strong">
								  <input type="text" name="pitem" className="input-des" defaultValue={item.Pharmacy_item} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="pqty" className="input" defaultValue={item.Pharmacy_Qty} onChange={this.handlerChange}/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" />
							  </td>
							  <td className="">
								  <input type="number" min="0" name="pamount" className="input" defaultValue={item.Pharmacy_amount} onChange={this.handlerChange}/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">2</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">3</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">4</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td className="no">5</td>
							  <td className="left strong">
								  <input type="text" name="Item" className="input-des" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Qty" className="input" disabled/>
							  </td>
							  <td className="right">
								  <input type="number" min="0" name="Unit" className="input" disabled/>
							  </td>
							  <td className="">
								  <input type="number" min="0" name="Amount" className="input" disabled/>
							  </td>
						  </tr>
						  <tr>
							  <td></td>
							  <td></td>
							  <td></td>
							  <th className="sub-tot">Total</th>
							  <td className="">
								  <input type="number" min="0" name="ptot" defaultValue={item.Pharmacy_total} className="input" onChange={this.handlerChange}/>
							  </td>
						  </tr>
					  </tbody>
					  ))}
				  </table>
			  </div>
	  
			  <div className="table-responsive-sm">
				  <table className="bill-table">
				  {items.map(item =>(
					  <tbody>
						  <tr>
							  <th className="tot">
								  Subtotal
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="subtot" className="input" defaultValue={item.sub_total} onChange={this.handlerChange}/>
							  </td>
						  </tr>
						  <tr>
							  <th className="tot">
								  Discount
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="dis" className="input" defaultValue={item.discount} onChange={this.handlerChange}/>
							  </td>
						  </tr>
						  <tr>
							  <th className="tot">
								  Total
							  </th>
							  <td className="center">
								  <input type="number" min="0" name="tot" className="input" defaultValue={item.total} onChange={this.handlerChange}/>
							  </td>
						  </tr>
					  </tbody>
	  				))}
				  </table>
			  </div>
	  
		  </div>
	  
		  <div className="bill-custome-div">
			  <div className="inputfield-bill-type">
				  <label><b>Select Bill Type</b></label>
				  {items.map(item =>(
						<select name="btype" defaultValue={item.bill_type}  onChange={this.handlerChange} className="custom-select">
						  <option value="Cash" name="btype" defaultValue={item.bill_type}  onChange={this.handlerChange}>Cash</option>
						  <option value="Credit" name="btype" defaultValue={item.bill_type}  onChange={this.handlerChange}>Credit</option>
						</select>
					
				  ))}
			  </div>
	  
			  <div className="inputfield-bill-period">
				  <label><b>Payment is due withing </b></label> 
				  {items.map(item =>(
						<select name="ndays" defaultValue={item.no_of_days}  onChange={this.handlerChange}  className="custom-select">
						  <option name="ndays" value="0 " defaultValue={item.no_of_days}  onChange={this.handlerChange}>Non</option>
						  <option name="ndays" value="30" defaultValue={item.no_of_days}  onChange={this.handlerChange}>30 Days</option>
						  <option name="ndays" value="60" defaultValue={item.no_of_days}  onChange={this.handlerChange}>60 Days</option>
					  </select> 
	 
				  ))}
					  
					  <label className="days"><b>Days</b></label>
			  </div>
	  
		  </div>
	  
		  <div className="bill-btn">
			  
				  <div className="inputfield">
					  <input data-modal-target="#modal" className="Bill-details-btn-update" type="submit" value="Update Invoice" onClick={this.handlerSubmit}/>
					  <input data-modal-target="#modal" className="Bill-details-btn-print" type="submit" value="Print Invoice" onClick = {this.exportPDF}/>
				  </div>	
			  
		  </div>
	  
		  </form>
		  </div>
		);
		}
	  }

}
export default BillDetails;
