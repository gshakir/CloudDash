import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

function ServiceSnapshotWrapper ({header, children}) {
  return (
    <div className='col-sm-4 text-center'>
        <Panel className="b-panel-body-no-padding" bsStyle="primary" header={header}>
            {children}
        </Panel>
    </div>
  )
}

ServiceSnapshotWrapper.header = {
  header: PropTypes.string.isRequired,
}

export default ServiceSnapshotWrapper
