import React, { Component } from 'react';
import '../Styles/Header1.css';
import {Link} from 'react-router-dom';

class Header1 extends Component{
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                    
                        <div className="headerContainer">
                            <div className="col-xs-1 col-sm-3 col-md-4 col-lg-3">
                                <div className="logobg">
                                    <Link to="/">
                                        <div className="hlogo">
                                            e!
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xs-1 col-sm-4 col-md-4 col-lg-5"></div>
                            <div className="col-xs-3 col-sm-2 col-md-2 col-lg-1">
                                <div className="login">
                                    Login
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                                <div className="createAccountBox">
                                    <div className="createAccount">
                                         Create an account 
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> 
                    </div>
                </div>    
               
        )
    }
}
export default Header1;