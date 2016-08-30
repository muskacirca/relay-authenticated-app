import React from 'react'
import Relay from 'react-relay'

import UserService from '../utils/AuthService'

import AddFileMutation from '../../mutations/AddFileMutation'


class StockComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        let fileToAttach = this.refs.fileInput.files.item(0);
        let addFileMutation = new AddFileMutation({
            viewer: this.props.viewer,
            image: fileToAttach
        });

        let onSuccess = (response) => console.log("success");

        let onFailure = (transaction) => console.log("Error");

        Relay.Store.commitUpdate(addFileMutation, {onSuccess, onFailure})
    }
    

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input ref="fileInput" type="file" />
                    <button type="submit">ADD</button>
                </form>
            </div>
        )
    }


}

StockComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Relay.createContainer(StockComponent, {
    
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
             id
             shops(first: 100) {
                edges {
                    node {
                        name
                        description
                    }   
                }
             }
          }
        `
    }
});


