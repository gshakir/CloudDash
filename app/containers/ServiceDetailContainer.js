import React, { Component } from 'react'
import MainContainer from '../components/MainContainer'
import { preferredAwsRegions, enabledAwsServices } from '../utils/AwsHelpers'
import { callAwsService } from '../utils/AwsHelpers'
import ServiceDetail from '../components/ServiceDetail'

class ServiceDetailContainer extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      serviceData: {}
    }
  }

  componentDidMount() {
  }

  render () {
    console.log("Service Details Container Render");
    return (
       <ServiceDetail loading={this.props.loading} 
                      service={this.props.service}
                      component={this.props.component}
                      region={this.props.region}
                      selected={this.props.selected}
                      selectedIndex={this.props.selectedIndex}
                      serviceData={this.props.serviceData} />
    )
  }
}

ServiceDetailContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default ServiceDetailContainer
