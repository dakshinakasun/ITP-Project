import React, {Component} from 'react';
import{
	Link
  } from 'react-router-dom';

class Header extends Component{

	render() {
		return (
		  <header>
	  
	  <div className="wrapper-main">
		  
	  
		  <div className="top-bar">
			  <div className="container">
				  <div className="row">
					  <div className="col-lg-6">
						  <div className="social-media">
							  <ul>
								  <li><Link to=""><i className="fab fa-facebook-f"></i></Link></li>
								  <li><Link to=""><i className="fab fa-twitter"></i></Link></li>
								  <li><Link to=""><i className="fab fa-google-plus-g"></i></Link></li>
								  <li><Link to=""><i className="fab fa-linkedin-in"></i></Link></li>
								  <li><Link to=""><i className="fab fa-instagram"></i></Link></li>
							  </ul>
						  </div>
					  </div>
					  <div className="col-lg-6">
						  <div className="contact-details">
							  <ul>
								  <li><i className="fas fa-phone fa-rotate-90"></i> +9477 3147059</li>
								  <li><i className="fas fa-map-marker-alt"></i> Habarakada Nursing Home,Habarakada,Homagama</li>
							  </ul>
						  </div>
					  </div>
				  </div>
			  </div>
		  </div>
		  
	  
	  
		  <nav className="navbar navbar-expand-lg navbar-dark bg-light top-nav">
			  <div className="container">
				  <Link className="navbar-brand" to="index.html">
					  <img src="images/logo.png" alt="logo" />
				  </Link>
				  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					  <span className="fas fa-bars"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarResponsive">
					  <ul className="navbar-nav ml-auto">
						  <li className="nav-item">
							  <Link className="nav-link active" to="/Appointment">Appointment</Link>
						  </li>
						  <li className="nav-item dropdown">
							  <Link className="nav-link" to="/" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Appointment Details <i className="fas fa-sort-down"></i></Link>
							  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
								  <Link className="dropdown-item" to="/AppointmentDetails">One Customer</Link>
								  <Link className="dropdown-item" to="/AllAppointmentDetails">All Customer</Link>
							  </div>
						  </li> 
						  <li className="nav-item">
							  <Link className="nav-link"  to="/Bill">Bill</Link>
						  </li>
						  <li className="nav-item">
							  <Link className="nav-link"  to="/BillDetails">Bill Details</Link>
						  </li>
						  <li className="nav-item dropdown">
							  <Link className="nav-link" to="/" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login <i className="fas fa-sort-down"></i></Link>
							  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
								  <Link className="dropdown-item" to="/">Login Customer</Link>
								  <Link className="dropdown-item" to="/">Register Customer</Link>
							  </div>
						  </li> 
	  
	  
					  </ul>
				  </div>
			  </div>
		  </nav>
		  
		  <hr/>
		  </div>
	  
		  </header>
		);
	  }
	
}
export default Header;