import React, { Component } from 'react'
import ServiceSnapshotWrapper from '../components/ServiceSnapshotWrapper'
import ServiceSnapshot from '../components/ServiceSnapshot'
import { callAwsService } from '../utils/AwsHelpers'
import { awsRegions } from '../utils/AwsHelpers'

class ServiceSnapshotContainer extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      regions: [] 
    }
  }

  componentDidMount() {
      console.log('regions');
      console.log(this.props.regions);
      const promises = this.props.regions.map(region => {
        console.log("Calling for region: " + region);
        return callAwsService(this.props.service.name, this.props.service.component, region)
                        .then(function(data) {
                            console.log("aws response, data is: ");
                            console.log(data);
                            return data;
                        })
                        .catch(function(error) { 
                            console.error("Service Container: Exception from AWS")
                            console.error(error)
                            return { region: region, count: 0, data: null}
                        });
      });

      Promise.all(promises).then(data => {
          this.setState({
                  loading: false,
                  regions: data
          });
      });
    
  }

  render () {
    console.log("ServiceSnapshotContainer Render");
    return (
        //header={this.props.service.name + this.props.service.component}
        <ServiceSnapshotWrapper header={this.props.service.display}>
         <ServiceSnapshot loading={this.state.loading} regions={this.state.regions} service={this.props.service} />
        </ServiceSnapshotWrapper>
    )
  }
}

ServiceSnapshotContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
}


export default ServiceSnapshotContainer
