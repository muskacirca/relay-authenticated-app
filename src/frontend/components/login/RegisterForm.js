'use strict'

import React from 'react'
import Relay from 'react-relay'
import crypto from 'crypto';

import AddUserMutation from '../../mutations/AddUserMutation'

class RegisterForm extends React.Component {

    constructor(props) {
        super(props)
    }

    onAddEvent(e) {
        
        e.preventDefault()
        

        let login =  this.refs.registerFormEventName.value;
        let password =  this.refs.registerFormPassword.value;
        let confirmPassword =  this.refs.registerFormConfirmPassword.value;
        let email =  this.refs.registerFormEmail.value;
        let confirmEmail = this.refs.registerFormConfirmEmail.value;
        
        console.log("login : " + JSON.stringify(login));
        console.log("password : " + JSON.stringify(password));
        console.log("confirmPassword : " + JSON.stringify(confirmPassword));
        console.log("email : " + JSON.stringify(email));
        console.log("confirmEmail : " + JSON.stringify(confirmEmail));

        if(login && password && email && (password == confirmPassword && email == confirmEmail)) {

            let addUserMutation = new AddUserMutation({
                viewer: null,
                login: login,
                password: crypto.createHash("sha256").update(password).digest("base64"),
                email: email
            });

            var onSuccess = (response) => {
                console.log('user added successfully')
            }

            var onFailure = (transaction) => console.log("error adding user");

            Relay.Store.commitUpdate(addUserMutation, {onSuccess, onFailure})
        }

    }
    
    render() {
        return  <div>
                    <form data-toggle="validator" role="form" className="form-horizontal" name="registerForm" onSubmit={this.onAddEvent.bind(this)}>
                        <div className="form-group">
                                <label for="registerFormEventName" class="control-label">Login</label>
                                <input ref="registerFormEventName" id="registerFormEventName" type="text"
                                       className="form-control" placeholder="login" required />
                        </div>
                        <div className="form-group">
                            <label for="registerFormPassword" class="control-label">Password</label>
                            <input ref="registerFormPassword" id="registerFormPassword" type="password"
                                   className="form-control" placeholder="password" required />
                        </div>
                        <div className="form-group">
                            <input ref="registerFormConfirmPassword" id="registerFormConfirmPassword" type="password"
                                   className="form-control" placeholder="confirm password"
                                   data-match="#registerFormPassword" data-match-error="Whoops, these don't match" required />
                            <div className="help-block with-errors"></div>
                        </div>
                        <div className="form-group">
                            <label for="registerFormEmail" class="control-label">Email</label>
                            <input ref="registerFormEmail" id="registerFormEmail" className="form-control"
                                       placeholder="confirm email" required/>
                        </div>
                        <div className="form-group">
                                <input ref="registerFormConfirmEmail" id="registerFormConfirmEmail"
                                       className="form-control" placeholder="confirm email"
                                       data-match="#registerFormEmail" data-match-error="Whoops, these don't match" />
                                <div className="help-block with-errors"></div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-default btn-block" type="submit">Register</button>
                        </div>
                    </form>
                </div>
    }
}

export default RegisterForm
