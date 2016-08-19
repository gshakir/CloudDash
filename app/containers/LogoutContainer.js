import React, { Component } from 'react'
import { logout } from '../utils/AwsHelpers'

class LogoutContainer extends Component {

  componentDidMount() {

      logout()
      // clear cached data
      //
      
      // figure out the services and regions to display
      this.context.router.push({
              pathname: '/login'
      })
  }

  render () {
    console.log("Logout Container");
    return null
  }
}

LogoutContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default LogoutContainer
