import React, { useState, useEffect } from 'react';
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Account(){

    return (
        <div className='Account-container'>

            <div className='Account-entire-box'>

                <img src="https://www.univio.com/wp-content/uploads/2020/08/transport_industry-1024x614.jpg" />
                
                <div className='Account-login-box'>
                    <form className='Account-login-form'>
                        <h1 className='Account-login-title'>Login</h1>
                        <input type='text' placeholder='Username' className='Account-login-username-input'/>
                        <input type='password' placeholder='Password' className='Account-login-password-input'/>
                        <input type='submit' value='Login' className='Account-login-submit-button'/>
                    </form>
                </div>

           </div>

        </div>
    );
}

export default Account;