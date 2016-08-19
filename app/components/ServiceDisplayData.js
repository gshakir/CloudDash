import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const renderEc2SecurityGroups = (serviceData, region) => {
   let securityGroups = serviceData.data.SecurityGroups
   const vpc = (r,c) => renderVpcIdLink(r, c, region)
   return {
       tableData: securityGroups,
       keyIdFunction: (row) => row.GroupId,
       columnData: [ 
        { dataField: "GroupId", isKey: true, dataSort: true, dataFormat: undefined, display:"Group ID" },
        { dataField: "GroupName", isKey: false, dataSort: true, dataFormat: undefined, display:"Group Name" },
        { dataField: "VpcId", isKey: false, dataSort: true, dataFormat: vpc, display:"VPC ID" },
        { dataField: "Description", isKey: false, dataSort: false, dataFormat: undefined, display:"Description" },
    ]
   }
}

const renderEc2Vpcs = (serviceData, region) => {
   let vpcs = serviceData.data.Vpcs
   return {
       tableData: vpcs,
       keyIdFunction: (row) => row.VpcId,
       columnData: [ 
        { dataField: "VpcId", isKey: true, dataSort: true, dataFormat: undefined, display:"VPC ID" },
        { dataField: "CidrBlock", isKey: false, dataSort: true, dataFormat: undefined, display:"Cidr Block" },
        { dataField: "State", isKey: false, dataSort: true, dataFormat: undefined, display:"State" },
    ]
   }
}

const renderEc2Addresses = (serviceData, region) => {
   let addresses = serviceData.data.Addresses
   const instances = (r,c) => renderInstanceIdLink(r, c, region)
   return {
       tableData: addresses,
       keyIdFunction: (row) => row.InstanceId,
       columnData: [ 
        { dataField: "InstanceId", isKey: true, dataSort: true, dataFormat: instances, display:"Instance ID" },
        { dataField: "PublicIp", isKey: false, dataSort: true, dataFormat: undefined, display:"Public IP" },
        { dataField: "PrivateIpAddress", isKey: false, dataSort: true, dataFormat: undefined, display:"Private IP" },
        { dataField: "Domain", isKey: false, dataSort: true, dataFormat: undefined, display:"Domain" },
        { dataField: "NetworkInterfaceId", isKey: false, dataSort: true, dataFormat: undefined, display:"Network Interface Id" },
    ]
   }
}

const renderEc2Instances = (serviceData, region) => {
   const instances = serviceData.data.Reservations.reduce( ((p,c) => p.concat(c.Instances)), []) 
   const securityGroups = (r,c) => renderSecurityGroupLink(r, c, region)
   const vpc = (r,c) => renderVpcIdLink(r, c, region)

   return {
       tableData: instances,
       keyIdFunction: (row) => row.InstanceId,
       columnData: [ 
        { dataField: "InstanceId", width:"200", isKey: true, dataSort: true, dataFormat: undefined, display:"Instance ID" },
        { dataField: "InstanceType", width:"125", isKey: false, dataSort: true, dataFormat: undefined, display:"Instance Type" },
        { dataField: "VpcId", width:"120", isKey: false, dataSort: true, dataFormat: vpc, display:"VPC ID" },
        { dataField: "State", width:"120", isKey: false, dataSort: true, dataFormat: (r,c) => r.Name, display:"State" },
        { dataField: "PublicDnsName", width:"350", isKey: false, dataSort: true, dataFormat: undefined, display:"Public DNS" },
        { dataField: "PrivateDnsName", width:"250", isKey: false, dataSort: true, dataFormat: undefined, display:"Private DNS" },
        { dataField: "SecurityGroups", width:"300", isKey: false, dataSort: false, dataFormat: securityGroups, display:"Security Groups" },
        { dataField: "Tags", width:"200", isKey: false, dataSort: false, dataFormat: renderObjectCell, display:"Tags" },
    ]
   }
}

function renderVpcIdLink(row, cell, region) {
    const vpc = renderLinkFor('/services/ec2/Vpcs', row, {region: region, selected: row}, row)
    return (
        <span key={vpc}> {vpc} </span>
    )
}

function renderInstanceIdLink(row, cell, region) {
    const instance = renderLinkFor('/services/ec2/Instances', row, {region: region, selected: row}, row)
    return (
        <span key={instance}> {instance} </span>
    )
}

function renderSecurityGroupLink(row, cell, region) {
    const names = row.map((g, index) => renderLinkFor('/services/ec2/SecurityGroups', g.GroupName, {region: region, selected: g.GroupId}, index+g.GroupName ))
    return (
        <div className="security-groups">
        {names.map((n, idx) => {
                    return (
                        <span key={n+idx}> {n} </span>
                    )
        })}
        </div>
    )
}

function renderObjectCell(cell, row) {
    return (
        JSON.stringify(cell)
    )
}

function renderLinkFor(pathname, text, query, key) {
    return (
        <LinkContainer key={key} to={{ pathname: pathname, query: query}}>
        <Button bsClass="link">{text}</Button>
        </LinkContainer>
    )
}

// eslint-disable-next-line
function renderLinkForCell(cell, row) {
    return (
        <LinkContainer to={{ pathname: '/dashboard' }}>
        <Button bsClass="link">{cell}</Button>
        </LinkContainer>
    )
}

let awsEc2Apis = new Map();
awsEc2Apis.set("ec2Instances", renderEc2Instances);
awsEc2Apis.set("ec2Addresses", renderEc2Addresses);
awsEc2Apis.set("ec2SecurityGroups", renderEc2SecurityGroups);
awsEc2Apis.set("ec2Vpcs", renderEc2Vpcs);

export function getServiceDisplayData(mapKey) {
    if(awsEc2Apis.has(mapKey)) {
        return awsEc2Apis.get(mapKey)
    }
    else {
        return null
    }
}

