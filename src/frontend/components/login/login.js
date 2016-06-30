import React from 'react'
import ReactDOM from 'react-dom'
import RegisterForm from './RegisterForm'
import AuthService from '../utils/AuthService.js'

class LoginBox extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return  <div className="login-container">
                    <div className="col-sm-2 col-sm-offset-5 col-md-4 col-md-offset-4">
                        <div className="well">
                            <center>
                                <h1>Relay Authenticated App</h1>
                            </center>
                            <br />
                            <div className="panel-body">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>

    }
}

class Header extends React.Component {

    render() {
        return <div>{this.props.label}</div>
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {error: false}
    }

    handleSubmit(e) {

        e.preventDefault();

        var email = ReactDOM.findDOMNode(this.refs.loginField).value
        var password = ReactDOM.findDOMNode(this.refs.passwordField).value

        AuthService.login(email, password)
            .then((loggedIn) => {

                if (!loggedIn) return this.setState({error: true});
                const { location } = this.props;

                if (location && location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname)
                } else {
                    this.context.router.replace('/')
                }
            });
    }

    render() {
        return  <div>
                    <form data-toggle="validator" role="form" className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                <input type="text" className="form-control" ref="loginField" placeholder="login"
                                       aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">
                                        <i className="fa fa-key" aria-hidden="true"></i>
                                    </span>
                                <input type="password" className="form-control" ref="passwordField" placeholder="password"
                                       aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-default primary btn-block">Login</button>
                        <div>
                            {this.state.error && (
                                <p>Bad login information</p>
                            )}
                        </div>
                    </form>
            
                    <hr/>
            
                    <RegisterForm />
                </div>
        
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LoginBox
