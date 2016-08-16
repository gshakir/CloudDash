import React, { Component } from 'react'
import MainContainer from '../components/MainContainer'
import { preferredAwsRegions, enabledAwsServices } from '../utils/AwsHelpers'
import { callAwsService } from '../utils/AwsHelpers'
import ServiceList from '../components/ServiceList'

class ServiceListContainer extends Component {
  constructor () {
    super()
  }

  shouldComponentUpdate(nextProps, nextState) {
      //console.log("Service list should component update")
      //console.log(this.props.serviceData)
      //console.log(nextProps.serviceData)
      let update = false
      if(nextProps.serviceData == this.props.serviceData) {
          //console.log("Same data");
          update = false
      }
      else {
          //console.log("New Data");
          update = true
      }
      //console.log("Update returned as: " + update)
      return update
  }

  render () {
    console.log("Service List Container Render");
    return (
       <ServiceList loading={this.props.loading} 
                    service={this.props.service}
                    component={this.props.component}
                    region={this.props.region}
                    selected={this.props.selected}
                    onSelectRow={this.props.onSelectRow}
                    onPageChange={this.props.onPageChange}
                    serviceData={this.props.serviceData} />
    )
  }
}

ServiceListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default ServiceListContainer
