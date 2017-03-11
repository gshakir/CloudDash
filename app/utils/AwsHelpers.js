import 'aws-sdk/dist/aws-sdk'
import 'babel-polyfill'
import { getEc2Api } from '../utils/AwsEc2Helpers'
import { getCloudWatchApi } from '../utils/AwsCloudWatchHelpers'

const AWS = window.AWS;

export const defaultAwsRegions = [ 'us-east-1', 'us-west-1', 'us-west-2' ]
export const LsAwsPreferredRegions = 'AwsPreferredRegions'
export const LsAwsPreferredServices = 'AwsPreferredServices'
export const LsAwsRegions = 'AwsRegions'
export const LsAwsAccessKeyId = 'AwsAccessKeyId'
export const LsAwsSecretAccessKey = 'AwsSecretAccessKey'

let awsServices = new Map();
awsServices.set("ec2", getEc2Api);
awsServices.set("cloudWatch", getCloudWatchApi);
const services = [
    {name: 'ec2', component: 'Instances', display: 'Instances', enabled: true},
    {name: 'ec2', component: 'Addresses', display: 'Elastic IPs', enabled: true},
    {name: 'ec2', component: 'KeyPairs', display: 'Key Pairs', enabled: false},
    {name: 'ec2', component: 'SecurityGroups', display: 'Security Groups', enabled: true},
    {name: 'ec2', component: 'Volumes', display: 'Volumes', enabled: false},
    {name: 'ec2', component: 'LoadBalancers', display: 'Load Balancers', enabled: false},
    {name: 'ec2', component: 'Vpcs', display: 'VPCs', enabled: true},
]


function checkCredentials(awsKey, awsSecret) {
    AWS.config.update({credentials: new AWS.Credentials(awsKey, awsSecret) });
    const ec2 = new AWS.EC2({region: 'us-east-1'});
    const request = ec2.describeRegions({});
    return awsPromise(request);
}


function awsKeyCheck (awsKey, awsSecret) {
    let p = checkCredentials(awsKey, awsSecret)
                .then(response => { 
                    console.log("AWS key check, caching regions");
                    let regions = response.data.Regions.map(region => region.RegionName);
                    console.log(regions);
                    localStorage.setItem(LsAwsRegions, JSON.stringify(regions));
                    return true;
                })
                .catch( error => {
                    console.log("clearing keys")
                    AWS.config.update({credentials: new AWS.Credentials(undefined, undefined) });
                    return null
                })
    return p;
}

export function loadCredentialsIntoAwsConfig() {
    const awsKey = localStorage.getItem(LsAwsAccessKeyId)
    const awsSecret = localStorage.getItem(LsAwsSecretAccessKey)
    AWS.config.update({credentials: new AWS.Credentials(awsKey, awsSecret) });
}

export function preferredAwsServices() {
    //let preferredServices = JSON.parse(localStorage.getItem(LsAwsPreferredServices)) || enabledAwsServices
    let preferredServices = JSON.parse(localStorage.getItem(LsAwsPreferredServices)) || enabledAwsServices().map(s => s.display)
    return preferredServices
}

export function enabledAwsServices() {
    let enabledServices =  services.filter(s => s.enabled)
    console.log("enabled services");
    console.log(enabledServices);
    return enabledServices
}

export function isLoggedIn() {
    console.log("Checking AWS credentials object")
    let loggedIn = false
    loggedIn = AWS.config.credentials && AWS.config.credentials.accessKeyId && AWS.config.credentials.secretAccessKey
    console.log("Logged in is: " + loggedIn)
    return loggedIn
}

export function allAwsRegions() {
    let allRegions = JSON.parse(localStorage.getItem(LsAwsRegions)) || defaultAwsRegions
    return allRegions;
}

export function saveAwsPreferredRegions(preferredRegions) {
    localStorage.setItem(LsAwsPreferredRegions, JSON.stringify(preferredRegions))
}

export function saveAwsPreferredServices(preferredServices) {
    localStorage.setItem(LsAwsPreferredServices, JSON.stringify(preferredServices))
}

export function preferredAwsRegions() {
    let preferredRegions = JSON.parse(localStorage.getItem(LsAwsPreferredRegions)) || defaultAwsRegions
   return preferredRegions;

}

export function logout() {
    AWS.config.update({credentials: new AWS.Credentials(undefined, undefined) });
    localStorage.removeItem(LsAwsAccessKeyId)
    localStorage.removeItem(LsAwsSecretAccessKey)
}

export function loginFromUI(awsKey, awsSecret, saveCredentials) {
    let p = awsKeyCheck(awsKey, awsSecret)
                .then(response => {
                    if (saveCredentials) {
                        localStorage.setItem(LsAwsAccessKeyId, AWS.config.credentials.accessKeyId);
                        localStorage.setItem(LsAwsSecretAccessKey, AWS.config.credentials.secretAccessKey);
                    }
                    return response
                });
    return p;
}


export function awsPromise(request) {
    return new Promise(
        function (resolve, reject) {
            request
                .on('success', function(response) {
                    console.log("success complete");
                    console.log(response);
                    resolve(response);
                })
                .on('error', function(response) {
                    console.log("error complete");
                    console.log(response);
                    reject(response);
                })
                .on('complete', function(response) {
                    //console.log("Request complete");
                    //console.log(response);
                })
                .send();
        });
}

export function callAwsService(service, component, region) {
    if (awsServices.has(service)) {
        return awsServices.get(service)(component, region);
    }
    else {
        console.error("No service handler for " + service);
        return null;
    }
}

