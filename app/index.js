import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import { isLoggedIn, loadCredentialsIntoAwsConfig } from './utils/AwsHelpers'

console.log("Main ====================");
console.log("Loaded credentials from storage")
loadCredentialsIntoAwsConfig()
console.log("End main ====================");
ReactDOM.render(routes, document.getElementById('app'))
