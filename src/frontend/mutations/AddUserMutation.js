import Relay from 'react-relay';
import {
    toGlobalId
} from 'graphql-relay'

class AddUserMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addUser}`
    }

    getFatQuery() {

        return Relay.QL`
          fragment on AddUserPayload {
                viewer
          }
        `
    }
    getConfigs() {

        return [
            // {
            //     type: 'FIELDS_CHANGE',
            //     fieldIDs: {
            //         viewer: "1"
            //     }
            // }
        ]
    }
    getVariables() {
        return {
            login: this.props.login,
            password: this.props.password,
            email: this.props.email
        };
    }
}

export default AddUserMutation
