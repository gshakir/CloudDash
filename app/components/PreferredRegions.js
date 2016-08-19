import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import MainContainer from '../components/MainContainer'

function PreferredRegions (props) {
    const preferredRegions = props.preferredRegions
        console.log("Rendering list");
    return (
        <MainContainer>
            <div className='col-sm-4 col-sm-offset-4 text-left'>
            <ListGroup className="b-list-group-inside-panel">
                {(props.allRegions).map(function(region) {
                    const selected = preferredRegions.has(region)
                    const glyphOk = renderGlyphicon(selected)
                    return (
                        <ListGroupItem data-region={region} data-selected={selected} key={region} onClick={props.onSelectRegion}>
                            { region }
                            { glyphOk }
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
            </div>
       </MainContainer>
  )
}

function renderGlyphicon(selected) {
    if(selected) {
        return (
             <Glyphicon glyph="ok" aria-hidden="true" className="pull-right" />
        )
    }
}

PreferredRegions.propTypes = {
  allRegions: PropTypes.array.isRequired,
  preferredRegions: PropTypes.object.isRequired,
  onSelectRegion: PropTypes.func.isRequired,
}

export default PreferredRegions
