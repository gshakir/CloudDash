import ReactDOM from 'react-dom'
import routes from './config/routes'
import { loadCredentialsIntoAwsConfig } from './utils/AwsHelpers'

console.log("App init")
loadCredentialsIntoAwsConfig()
console.log("App init done");
ReactDOM.render(routes, document.getElementById('app'))
