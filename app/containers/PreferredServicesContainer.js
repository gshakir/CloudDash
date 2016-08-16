import React, { Component } from 'react'
import PreferredRegions from '../components/PreferredRegions'
import { saveAwsPreferredServices, preferredAwsServices, enabledAwsServices } from '../utils/AwsHelpers'


class PreferredServicesContainer extends Component {
  constructor () {
    super()
    let preferredServices = new Set(preferredAwsServices())
    let allServices = enabledAwsServices().map((s) => s.display)
      this.state = {
          preferredRegions: preferredServices,
          allRegions: allServices.sort()
      }
  }

  handleSelectService(e) {
      e.preventDefault();
      let selected = (e.currentTarget.dataset.selected === 'true')
      let region = e.currentTarget.dataset.region
      console.log(region)
      console.log(selected)

      let preferredServices = this.state.preferredRegions;
      (selected) ?  preferredServices.delete(region) :  preferredServices.add(region);
      saveAwsPreferredServices(preferredServices)
      this.setState({
          preferredRegions: preferredServices,
          allRegions: this.state.allRegions
      })
  }

  componentDidMount() {
    
  }

  render () {
    console.log("Preferred Regions Container Render");
    console.log(this.state)
    return (
        <PreferredRegions
            allRegions={this.state.allRegions}
            preferredRegions={this.state.preferredRegions}
            onSelectRegion={(event) => this.handleSelectService(event)}
        />
    )
  }
}

PreferredServicesContainer .contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default PreferredServicesContainer 
