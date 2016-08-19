import 'aws-sdk/dist/aws-sdk'
import { awsPromise } from '../utils/AwsHelpers'
const AWS = window.AWS;

const describeInstances = (region) => {
    const ec2 = new AWS.EC2({region: region});
    const request = ec2.describeInstances({});
    return awsPromise(request)
            .then(function(response) {
                let count = response.data.Reservations.reduce(((p,c) => p + c.Instances.length), 0)
                return {region: region,
                        count: count,
                        data: response.data}
            });
}

const describeAddresses = (region) => {
    const ec2 = new AWS.EC2({region: region});
    const request = ec2.describeAddresses({});
    return awsPromise(request)
            .then(function(response) {
                let count = response.data.Addresses.length
                return {region: region,
                        count: count,
                        data: response.data}
            });
}

const describeSecurityGroups = (region) => {
    const ec2 = new AWS.EC2({region: region});
    const request = ec2.describeSecurityGroups({});
    return awsPromise(request)
            .then(function(response) {
                let count = response.data.SecurityGroups.length
                return {region: region,
                        count: count,
                        data: response.data}
            });
}

const describeVpcs = (region) => {
    const ec2 = new AWS.EC2({region: region});
    const request = ec2.describeVpcs({});
    return awsPromise(request)
            .then(function(response) {
                let count = response.data.Vpcs.length
                return {region: region,
                        count: count,
                        data: response.data}
            });
}

let awsEc2Apis = new Map();
awsEc2Apis.set("Instances", describeInstances);
awsEc2Apis.set("Addresses", describeAddresses);
awsEc2Apis.set("SecurityGroups", describeSecurityGroups);
awsEc2Apis.set("Vpcs", describeVpcs);

let computedPromises = new Map();

export function getEc2Api (api, region) {
    if (awsEc2Apis.has(api)) {
        let computedPromiseKey = api+region
        if (computedPromises.has(computedPromiseKey)) {
            console.log("returning cached data for " + computedPromiseKey);
            return computedPromises.get(computedPromiseKey)
        }
        else {
            let computedPromise = awsEc2Apis.get(api)(region);
            computedPromises.set(computedPromiseKey, computedPromise);
            return computedPromise
        }
    }
    else {
        console.error("No api handler for EC2 service: " + api);
        const p =  Promise.reject(new Error(`No API handler for ${api}`));
        //const p =  Promise.resolve("No API handler for resolved");
        return p;
        //return null;
    }
}

