import React, { PropTypes } from 'react'
import Loading from './Loading'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getServiceDisplayData } from './ServiceDisplayData'

function ServiceDetail ({loading, service, component, region, serviceData, selected, selectedIndex}) {
    if (loading) {
        return (
            <Loading/>
        )
    }
    else {
        const mapKey = service + component
        const dataFunction = getServiceDisplayData(mapKey)
        if (dataFunction) {
            return renderTable(dataFunction, serviceData, region, selected, selectedIndex)
        }
        else {
            return []
        }
    }
}

function renderTable(dataFunction, serviceData, region, selected, selectedIndex) {

   const data = dataFunction(serviceData, region);
   const tableData = data.tableData
   
   const SizePerPageOption = 'SizePerPageOption'
   const sizePerPage =  parseInt(localStorage.getItem(SizePerPageOption), 10) || 5 
   let index = 0

   if (selected) {
       index = tableData.findIndex(row => (selected === data.keyIdFunction(row)))
   }

   console.log("Selected Index is: " + selectedIndex);
   // Override what is highlighted
   // Check for undefined as 'selectedIndex' could be 0
   //
   if (typeof selectedIndex !== 'undefined') {
       if (selected) {
           const selectedPage = parseInt((selectedIndex / sizePerPage) + 1, 10)
           const highlightedPage = parseInt((index / sizePerPage) + 1, 10)
           console.log("Selected page: " + selectedPage);
           console.log("Highlighted page: " + highlightedPage);
           if (selectedPage !== highlightedPage) {
               index = selectedIndex
           }
       }
       else {
           index = selectedIndex
       }
   }

   let displayData = []
   if (tableData.length > 0) {
       const selectedObject = tableData[index]
       displayData = Object.getOwnPropertyNames(selectedObject)
                             .map(key => {
                                     return {property: key, value: selectedObject[key]}
                             })
   }

  //console.log("display data")
  //console.log(displayData)
  return (
       <BootstrapTable data={displayData} striped={true} 
                       hover={true}>

            <TableHeaderColumn isKey={true} dataSort={true} dataField="property"> Property </TableHeaderColumn>
            <TableHeaderColumn dataField="value" dataFormat={(r,c) => JSON.stringify(r)} > Value </TableHeaderColumn>

       </BootstrapTable>
 )
  
}

ServiceDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  serviceData: PropTypes.object.isRequired,
  service: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  selected: PropTypes.any,
}

export default ServiceDetail
