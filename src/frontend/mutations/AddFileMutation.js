import Relay from 'react-relay';

class AddFileMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addFile}`
    }

    getFatQuery() {

        return Relay.QL`
          fragment on AddFilePayload {
              viewer
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
            }
        ]
    }

    getFiles() {
        return {
            image: this.props.image,
        };
    }

    getVariables() {
        return {

        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id,
            }
        };
    }
}

export default AddFileMutation
