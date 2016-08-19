import React, { Component } from 'react'
import PreferredRegions from '../components/PreferredRegions'
import { saveAwsPreferredServices, preferredAwsServices, enabledAwsServices } from '../utils/AwsHelpers'


class PreferredServicesContainer extends Component {
  constructor () {
    super()
    console.log("preferredServices constructor")
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
      // eslint-disable-next-line
      (selected) ?  preferredServices.delete(region) :  preferredServices.add(region);
      saveAwsPreferredServices(preferredServices)
      this.setState({
          preferredRegions: preferredServices,
          allRegions: this.state.allRegions
      })
  }

  componentDidMount() {
      console.log("preferredServices componentDidMount");
    
  }

  render () {
    console.log("Preferred Services Container Render");
    console.log(this.state)
    return (
        <div className="preferredServices">
        <PreferredRegions
            allRegions={this.state.allRegions}
            preferredRegions={this.state.preferredRegions}
            onSelectRegion={(event) => this.handleSelectService(event)}
        />
        </div>
    )
  }
}

PreferredServicesContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default PreferredServicesContainer 
