import React from 'react'
import Relay from 'react-relay'

import UserService from '../utils/AuthService'

import AddShopMutation from '../../mutations/AddShopMutation'


class StockComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    addItemToCart(name, description) {
        
        var addShopMutation = new AddShopMutation({
            viewerId: UserService.getUserId(),
            name: name,
            description: description
        });

        var onSuccess = (response) => console.log("Item shop successfully");

        var onFailure = (transaction) => console.log("Error adding shop");

        Relay.Store.commitUpdate(addShopMutation, {onSuccess, onFailure})
    }
    

    render() {

        let shops = this.props.viewer.shops.edges;
        console.log("shops : " + JSON.stringify(shops));
        
        return (
            <div>
                Shops
            </div>
        )
    }


}

StockComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

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


