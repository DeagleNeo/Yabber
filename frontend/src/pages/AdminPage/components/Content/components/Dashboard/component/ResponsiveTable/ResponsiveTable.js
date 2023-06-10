import React, { Component } from 'react'
// import { withStyles } from '@mui/styles'

import DataList from './DataList'

// const styles = {
//   root: {},
// }

/**
 * Responsive read-only table (desktop devices) <-> read-only expandable list (tablet/mobile devices) for material-ui 1.0-beta.
 */

 class ResponsiveTable extends Component {
    handleChangePage = (event, page) => this.props.onChangePage(event, page);
  
    render() {
      const {
        columns,
        count,
        data,
        rowsClassArray,
        excludePrimaryFromDetails,
        noContentText,
        page,
        rowsPerPage,
        showPagination,
        ExpansionPanelDetailsProps,
        ExpansionPanelDetailsTypographyProps,
        ExpansionPanelMoreIconProps,
        ExpansionPanelProps,
        ExpansionPanelSummaryProps,
        ExpansionPanelSummaryTypographyProps,
        TablePaginationProps,
        enableShouldComponentUpdate,

        setRows,
        rows
      } = this.props;
  
      return (
        <div>
          {/* DESKTOP BIG TABLE */}
  
          {/* <Hidden only={tableBreakpoints || ['xs', 'sm', 'md']} implementation={implementation || 'js'}>
            <DataTable
              enableShouldComponentUpdate={enableShouldComponentUpdate}
              columns={columns}
              count={count}
              data={data}
              rowsClassArray={rowsClassArray}
              noContentText={noContentText}
              page={page}
              rowsPerPage={rowsPerPage}
              showPagination={showPagination}
              TableBodyCellProps={TableBodyCellProps}
              TableBodyProps={TableBodyProps}
              TableBodyRowProps={TableBodyRowProps}
              TableHeadCellProps={TableHeadCellProps}
              TableHeadProps={TableHeadProps}
              TableHeadRowProps={TableHeadRowProps}
              TablePaginationProps={TablePaginationProps}
              TableProps={TableProps}
              onChangePage={this.handleChangePage}
            />
          </Hidden> */}
  
          {/* MOBILE EXPANDABLE LIST OF CARDS */}
  
          {/* <Hidden only={listBreakpoints || ['lg', 'xl']} implementation={implementation || 'js'}> */}
            <DataList
              enableShouldComponentUpdate={enableShouldComponentUpdate}
              columns={columns}
              count={count}
              data={data}
              rowsClassArray={rowsClassArray}
              excludePrimaryFromDetails={excludePrimaryFromDetails}
              noContentText={noContentText}
              page={page}
              rowsPerPage={rowsPerPage}
              showPagination={showPagination}
              ExpansionPanelDetailsProps={ExpansionPanelDetailsProps}
              ExpansionPanelDetailsTypographyProps={
                ExpansionPanelDetailsTypographyProps
              }
              ExpansionPanelMoreIconProps={ExpansionPanelMoreIconProps}
              ExpansionPanelProps={ExpansionPanelProps}
              ExpansionPanelSummaryProps={ExpansionPanelSummaryProps}
              ExpansionPanelSummaryTypographyProps={
                ExpansionPanelSummaryTypographyProps
              }
              TablePaginationProps={TablePaginationProps}
              onChangePage={this.handleChangePage}
              setRows={setRows}
              rows={rows}
            />
          {/* </Hidden> */}
        </div>
      )
    }
  }
  
  export default ResponsiveTable