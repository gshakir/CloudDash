import React, { Component } from 'react'
import ServiceSnapshotContainer from '../containers/ServiceSnapshotContainer'
import MainContainer from '../components/MainContainer'
import { preferredAwsRegions, preferredAwsServices, enabledAwsServices } from '../utils/AwsHelpers'
import { callAwsService } from '../utils/AwsHelpers'

class DashboardContainer extends Component {
  constructor () {
    super()
    this.state = {
        enabledAwsServices: enabledAwsServices()
    }
  }

  componentDidMount() {
      // figure out the services and regions to display
  }

  render () {
    console.log("Dashboard AWS Render");

    const cwPromise = callAwsService('cloudWatch', 'GetMetrics', 'us-east-1')
    cwPromise.then(data => {
            console.log('Cloudwatch');
            console.log(data)
            console.log('Cloudwatch done');
    });

    let preferredServices = new Set(preferredAwsServices())
    const services = this.state.enabledAwsServices.filter(s => preferredServices.has(s.display))

    return (
       <MainContainer>
       <div className='col-sm-10 col-sm-offset-1'>
       {services.map(function(service) {
           
           return ( 
               <ServiceSnapshotContainer key={service.name+service.component} service={service} regions={preferredAwsRegions()} />
            )
       })}

       </div>
       </MainContainer>
    )
  }
}

DashboardContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default DashboardContainer
