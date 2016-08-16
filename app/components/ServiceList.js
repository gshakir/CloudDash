import React, { PropTypes } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loading from './Loading'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getServiceDisplayData } from './ServiceDisplayData'

const SizePerPageOption = 'SizePerPageOption'

function ServiceList ({loading, service, component, region, serviceData, selected, onSelectRow, onPageChange}) {
    if (loading) {
        return (
            <Loading/>
        )
    }
    else {
        const mapKey = service + component
        const dataFunction = getServiceDisplayData(mapKey)
        if (dataFunction) {
            return renderTable(dataFunction, serviceData, region, selected, onSelectRow, onPageChange)
        }
        else {
            return []
        }
    }
}

function renderTable(dataFunction, serviceData, region, selected, onSelectRow, onPageChange) {

   const data = dataFunction(serviceData, region);
   const columnData = data.columnData
   const tableData = data.tableData

   const sizePerPage =  parseInt(localStorage.getItem(SizePerPageOption)) || 5 
   let startPage = 1
   if(selected) {
       const selectedIndex = tableData.findIndex(row => (selected === data.keyIdFunction(row)))
       startPage = parseInt((selectedIndex / sizePerPage) + 1)
   }
   console.log("selected and startpage: " + selected + " -> " + startPage)

   const options = { page: startPage, 
                     sizePerPageList: [5, 10, 25, 100], 
                     sizePerPage: sizePerPage,
                     onSizePerPageList: (sizePerPage) => localStorage.setItem(SizePerPageOption, sizePerPage),
                     onPageChange: onPageChange
    }

   //const options = { sizePerPageList: [5, 10, 25, 100], sizePerPage: 5, }
   const selectRow = {
       mode: 'radio',
       clickToSelect: true,
       className: 'success',
       hideSelectColumn: true,
       onSelect: (r, s, e) => onSelectRow(data.keyIdFunction(r), s, e),
       selected: [selected]
   }

   return (
       <BootstrapTable data={tableData} striped={true} 
                       hover={true} search={true} 
                       pagination={true} 
                       selectRow={selectRow}
                       options={options}>

       {columnData.map(function(column) {
           return (
               <TableHeaderColumn key={column.dataField} width={column.width} dataField={column.dataField} 
                                  isKey={column.isKey} dataSort={column.dataSort} 
                                  dataFormat={column.dataFormat}
                                  >
                    {column.display}
               </TableHeaderColumn>
           )
         })}

       </BootstrapTable>
   )
}

ServiceList.propTypes = {
  loading: PropTypes.bool.isRequired,
  serviceData: PropTypes.object.isRequired,
  service: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  selected: PropTypes.any,
}

export default ServiceList
