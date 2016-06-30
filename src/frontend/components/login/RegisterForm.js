'use strict'

import React from 'react'
import Relay from 'react-relay'

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
        let confirmEmail = this.refs.registerFormConfirmPassword.value;

        if(password !== confirmPassword || email !== confirmEmail) {

            this.setState()

        } else {

            let addUserMutation = new AddUserMutation({
                login: login,
                password: password,
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
                    <form data-toggle="validator" role="form" className="form-horizontal" name="registerForm">
                        <div className="form-group">
                                <input ref="registerFormEventName" id="registerFormEventName" type="text"
                                       className="form-control" placeholder="login" required />
                        </div>
                        <div className="form-group">
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
                            <button className="btn btn-default btn-block" type="submit" onClick={this.onAddEvent.bind(this)}>Register</button>
                        </div>
                    </form>
                </div>
    }
}

export default RegisterForm
