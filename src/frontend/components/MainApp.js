import React from 'react'
import Relay from 'react-relay'

import NavBarBox from './navbar'

import {
    toggleClassInBody
} from '../../utils/utils'

class MainApp extends React.Component{

    constructor(props) {
        super(props);
    }

    onHiddenSiteCLick() {
        var className = 'with--sidebar'
        toggleClassInBody(className)

    }

    render() {        
        
        return (
            <div className="site-pusher">
                <NavBarBox user={this.props.viewer.user}/>
               
                <div className="site-content">
                    {this.props.children}
                </div>
                <div className="site-cache" onClick={this.onHiddenSiteCLick.bind(this)}></div>
            </div>
        );
    }
}

export default Relay.createContainer(MainApp, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            user {
                login
            }
          }
        `
    }
})

