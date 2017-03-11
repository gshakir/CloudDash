import 'aws-sdk/dist/aws-sdk'
import { awsPromise } from '../utils/AwsHelpers'
const AWS = window.AWS;


const getMetrics = (region) => {
    const now = new Date();
    const st = new Date();
    const et = new Date();
    et.setDate(now.getDate() - 1);
    st.setDate(now.getDate() - 90);
    const cw = new AWS.CloudWatch({region: region});
    const request = cw.getMetricStatistics({
            MetricName: 'EstimatedCharges',
            Namespace: 'AWS/Billing',
            Period: 86400,
            StartTime: st,
            EndTime: et,
            Unit: 'None',
            Dimensions: [ {Name: 'Currency', Value: 'USD' }],
            Statistics: ['Average'],
    });
    return awsPromise(request)
            .then(function(response) {
                let count = 0
                return {region: region,
                        count: count,
                        data: response.data}
            });
}

let awsCloudWatchApis = new Map();
awsCloudWatchApis.set("GetMetrics", getMetrics);
awsCloudWatchApis.set("ListMetrics", getMetrics);

let computedPromises = new Map();

export function getCloudWatchApi (api, region) {
    if (awsCloudWatchApis.has(api)) {
        let computedPromiseKey = api+region
        if (computedPromises.has(computedPromiseKey)) {
            console.log("returning cached data for " + computedPromiseKey);
            return computedPromises.get(computedPromiseKey)
        }
        else {
            let computedPromise = awsCloudWatchApis.get(api)(region);
            computedPromises.set(computedPromiseKey, computedPromise);
            return computedPromise
        }
    }
    else {
        console.error("No api handler for CloudWatch service: " + api);
        const p =  Promise.reject(new Error(`No API handler for ${api}`));
        return p;
    }
}
