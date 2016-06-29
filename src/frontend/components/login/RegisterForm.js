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
        let confirmmEmail = this.refs.registerFormConfirmPassword.value;
        

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
    
    render() {
        return  <div>
                    <form className="form-horizontal" name="registerForm">
                        <div className="form-group">
                            <label htmlFor="registerFormEventName" className="col-md-3 control-label">login</label>
                            <div className="col-md-9">
                                <input ref="registerFormEventName" id="registerFormEventName" type="text" className="form-control" placeholder="name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerFormPassword" className="col-md-3 control-label">password</label>
                            <div className="col-md-9">
                                <input ref="registerFormPassword" id="registerFormPassword" type="text" className="form-control" placeholder="password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerFormEventDescription" className="col-md-3 control-label">confirm password</label>
                            <div className="col-md-9">
                                <input ref="registerFormConfirmPassword" id="registerFormConfirmPassword" className="form-control" placeholder="confirm password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerFormEmail" className="col-md-3 control-label">email</label>
                            <div className="col-md-9">
                                <input ref="registerFormEmail" id="registerFormEmail" className="form-control" placeholder="confirm email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerFormConfirmEmail" className="col-md-3 control-label">confirm email</label>
                            <div className="col-md-9">
                                <input ref="registerFormConfirmEmail" id="registerFormConfirmEmail" className="form-control" placeholder="confirm email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-default" type="submit" onClick={this.onAddEvent.bind(this)}>OK</button>
                        </div>
                    </form>
                </div>
    }
}

export default RegisterForm
