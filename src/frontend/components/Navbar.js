import React from 'react'
import {Link} from 'react-router'


import {
    toggleClassInBody
} from '../../utils/utils'

class NavBarBox extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isUserMenuOpened: false
        }
    }

    handleClick(e) {
        e.preventDefault()
        var className = 'with--sidebar'
        toggleClassInBody(className)
        
    }

    safehandleClick() {
        var className = 'with--sidebar'
        toggleClassInBody(className)

    }

    toggleUserMenuOpening() {
        this.setState({isUserMenuOpened: !this.state.isUserMenuOpened})
    }

    render() {

        var cart = this.props.shoppingCart
        
        var userMenuStyle = this.state.isUserMenuOpened ? {display: "block"} : {}
        
        return  <header className="header">
                    <a href="#" className="header__icon" id="header__icon"
                       onClick={this.handleClick.bind(this)} href="#">
                    </a>

                    <a href="#" className="header__logo link-active" href="#">
                        Hello
                    </a>
                    <nav className="menu">
                        <Link to="/shops" activeClassName="link-active" onClick={this.safehandleClick.bind(this)}>
                            Stock
                        </Link>
                    </nav>
                   
                    <div className="menu-right">
                        <div onClick={this.toggleUserMenuOpening.bind(this)} className="pointer navbar-dropdown">
                            <div>
                                <i className="fa fa-2x fa-user" aria-hidden="true" />
                                {' '}hello{' '}{this.props.user.login}{' '}!
                            </div>
                        </div>
                    </div>
                    <div style={userMenuStyle} className="navbar-dropdown-content">
                        <div className="navbar-dropdown-group">
                            <Link to="/admin/create" onClick={this.toggleUserMenuOpening.bind(this)}
                                  activeClassName="link-active">
                                
                                <div className="navbar-dropdown-list">
                                    <div className="__logo__">
                                        <i className="fa fa-2x fa-cog" aria-hidden="true"/>
                                    </div>
                                    <div className="__text__">Settings</div>
                                </div>
                            </Link>
                            <Link to="/logout" onClick={this.toggleUserMenuOpening.bind(this)}
                                  activeClassName="link-active">

                                <div className="navbar-dropdown-list">
                                    <div className="__logo__">
                                        <i className="fa fa-2x fa-power-off" />
                                    </div>
                                    <div className="__text__">Logout</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <nav className="menu-right">
                        {cart}
                    </nav>
                </header>


    }
}

export default NavBarBox
