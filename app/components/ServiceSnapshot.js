import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from './Loading'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

function ServiceSnapshot ({loading, regions, service}) {
    if (loading) {
        return (
            <Loading/>
        )
    }
    else {
        const total = regions.reduce( ((p, c) => p + c.count), 0 );
        console.log("Total for " + service.name + service.component + " is " + total);
        return (

			<BarChart width={350} height={300} data={regions} barSize={30}
			margin={{top: 15, right: 10, left: 0, bottom: 5}}>
			<XAxis dataKey="region"/>
			<YAxis/>
			<CartesianGrid strokeDasharray="2 2"/>
			<Tooltip/>
			<Legend />
			<Bar dataKey="count" fill="#8884d8" />
			</BarChart>


        )
    }
}

function renderOneRegion(data, service) {
    const path = '/services/' + service.name + '/' + service.component
    const key = data.region + path
    return (
        <LinkContainer key={key} to={{ pathname: path, query: {region: data.region} }}>
			<BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			<XAxis dataKey="region"/>
			<YAxis dataKey="count"/>
			<CartesianGrid strokeDasharray="3 3"/>
			<Tooltip/>
			<Legend />
			<Bar dataKey="pv" fill="#8884d8" />
			<Bar dataKey="uv" fill="#82ca9d" />
			</BarChart>
            <ListGroupItem>
            <span className="badge">{data.count}</span>
            {data.region}
            </ListGroupItem>
        </LinkContainer>
    )
}

ServiceSnapshot.propTypes = {
  loading: PropTypes.bool.isRequired,
  regions: PropTypes.array.isRequired,
  service: PropTypes.object.isRequired,
}

export default ServiceSnapshot
