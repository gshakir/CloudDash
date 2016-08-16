import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from './Loading'

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
            <ListGroup className="b-list-group-inside-panel">

                <ListGroupItem>
                    <span className="badge">{total}</span>
                    {'All Regions'}
                </ListGroupItem>

                {regions.map(function(data) {
                    return renderOneRegion(data, service) 
                })}
            </ListGroup>
        )
    }
}

function renderOneRegion(data, service) {
    const path = '/services/' + service.name + '/' + service.component
    const key = data.region + path
    return (
        <LinkContainer key={key} to={{ pathname: path, query: {region: data.region} }}>
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
