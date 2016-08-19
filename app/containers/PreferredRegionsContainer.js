import React, { Component } from 'react'
import PreferredRegions from '../components/PreferredRegions'
import { allAwsRegions, saveAwsPreferredRegions, preferredAwsRegions } from '../utils/AwsHelpers'


class PreferredRegionsContainer extends Component {
  constructor () {
    super()
    console.log("preferredRegions constructor");
    let preferredRegions = new Set(preferredAwsRegions())
    let allRegions = allAwsRegions()
      this.state = {
          preferredRegions: preferredRegions,
          allRegions: allRegions.sort()
      }
  }

  handleSelectRegion(e) {
      e.preventDefault();
      let selected = (e.currentTarget.dataset.selected === 'true')
      let region = e.currentTarget.dataset.region
      console.log(region)
      console.log(selected)

      let preferredRegions = this.state.preferredRegions;
      // eslint-disable-next-line
      (selected) ?  preferredRegions.delete(region) :  preferredRegions.add(region);
      saveAwsPreferredRegions(preferredRegions)
      this.setState({
          preferredRegions: preferredRegions,
          allRegions: this.state.allRegions
      })
  }

  componentDidMount() {
    
  }

  render () {
    console.log("Preferred Regions Container Render");
    console.log(this.state)
    return (
        <div className="preferredRegions">
        <PreferredRegions
            allRegions={this.state.allRegions}
            preferredRegions={this.state.preferredRegions}
            onSelectRegion={(event) => this.handleSelectRegion(event)}
        />
        </div>
    )
  }
}

PreferredRegionsContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default PreferredRegionsContainer
