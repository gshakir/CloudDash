import React, { Component } from 'react'
import MainContainer from '../components/MainContainer'
import { preferredAwsRegions, enabledAwsServices } from '../utils/AwsHelpers'
import { callAwsService } from '../utils/AwsHelpers'
import ServiceListContainer from '../containers/ServiceListContainer'
import ServiceDetailContainer from '../containers/ServiceDetailContainer'

class ServiceContainer extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      serviceData: {}
    }
  }

  componentDidMount() {
    const { service, component }  = this.props.routeParams
    const region =  this.props.location.query.region
    const selected = this.props.location.query.selected

    const p =  callAwsService(service, component, region)
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

    p.then(data => {
        console.log("Returned data");
        console.log(data);
        this.setState({
            loading: false,
            serviceData: data,
            selected: selected
        });
    });
  }

  handleSelectRow(row, isSelected, event) {
      console.log("Handle select row " + row + " selected: " + isSelected);
      const serviceData = this.state.serviceData;
      this.setState({
              loading: false,
              serviceData: serviceData,
              selected: row
      });
  }

  handlePageChange(page, sizePerPage) {
      console.log("Handle page change: " + page + " page size: " + sizePerPage);
      this.setState({
              loading: false,
              serviceData: this.state.serviceData,
              selected: this.state.selected,
              selectedIndex: ((page-1) * sizePerPage)
      });
      
  }

  render () {
    console.log("Service Container Render");
    const { service, component }  = this.props.routeParams
    const region =  this.props.location.query.region
    const selected = this.state.selected
    const serviceInfo = enabledAwsServices().filter(s => s.name === service && s.component === component)

    return (
       <MainContainer>
       <div className='col-sm-10 col-sm-offset-1'>
       <h2 className="text-left"> {service.toUpperCase()} {serviceInfo[0].display} <small>@{region}</small> </h2>
       <ServiceListContainer loading={this.state.loading} 
                           service={service}
                           component={component}
                           region={region}
                           selected={selected}
                           onSelectRow={(row, isSelected, event) => this.handleSelectRow(row, isSelected, event)}
                           onPageChange={(page, sizePerPage) => this.handlePageChange(page, sizePerPage)}
                           serviceData={this.state.serviceData} />

       <ServiceDetailContainer loading={this.state.loading} 
                               service={service}
                               component={component}
                               region={region}
                               selected={selected}
                               selectedIndex={this.state.selectedIndex}
                               serviceData={this.state.serviceData} />
       </div>
       </MainContainer>
    )
  }
}

ServiceContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default ServiceContainer
