import Relay from 'react-relay';

class AddShopMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addShop}`
    }

    getFatQuery() {

        return Relay.QL`
          fragment on AddShopPayload {
              shopEdge,
              viewer {
                shops
              }
          }
        `
    }
    getConfigs() {

        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    viewer: this.props.viewer.id
                }
            },
            {
                type: 'RANGE_ADD',
                parentName: 'viewer',
                parentID: this.props.viewer.id,
                connectionName: 'shops',
                edgeName: 'shopEdge',
                rangeBehaviors: {
                    '': 'append',
                    // Prepend the ship, wherever the connection is sorted by age
                    'first(100)': 'prepend'
                }
            }
        ]
    }
    getVariables() {
        return {
            name: this.props.name,
            description: this.props.description,
        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id,
            },
            shopEdge: {
                node: {
                    name: this.props.name,
                    description: this.props.description,
                }
            }
        };
    }
}

export default AddShopMutation
