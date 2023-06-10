import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useMediaQuery from '@mui/material/useMediaQuery'

import {getOrganizationMembersExceptMe, setUserAsAdmin, unsetUserAsAdmin, setUserToActive, setUserToDeactivated} from "../../../../../../api/api"

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IOSSwitch from './Switch';

import Loading from "../../../../../../components/Loading"
import renderCellExpand from "./renderCellExpand"

export default function Dashboard() {

  const [pageSize, setPageSize] = React.useState(5);

  const [loading, setLoading] = React.useState(true);
  
  const [rows, setRows] = React.useState([]);

  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    getOrganizationMembersExceptMe().then(
      res => {
        console.log(res);
        const raw_rows = JSON.parse(JSON.stringify(res.data.data));
        raw_rows.forEach(item => item.id = item._id);
        raw_rows.forEach(item => item.state = (item.activeState) ? "Active" : "Inactive")
        setRows(raw_rows)
      }).catch((error) => console.error(error))
      .finally(() => setLoading(false));
      setRefresh(true);      
  }, [])

  React.useEffect(() => {refresh && setRefresh(false);
  }, [refresh])
  

  const changeState = (state) => {
    if (state === "Inactive") return "Active"
    else if (state === "Active") return "Inactive"
  }

  const changeActiveState = (activeState) => !activeState

  const ChangeBackStatus = React.useCallback(async (id)  => {
    let state = "";
    let change_row = rows.filter((row) => row.id === id);
    state = change_row[0].activeState;
    (!state)?(await setUserToActive(id)):(await setUserToDeactivated(id))
  }, [rows])

  const ToggleStatus = React.useCallback(
    
    (id) => async () => {

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, state: changeState(row.state), activeState: changeActiveState(row.activeState) } : row
        )
      );

      await ChangeBackStatus(id);   
    },[ChangeBackStatus]
  );


  const ChangeBackAdmin = React.useCallback(async (id)  => {
    let role = "";
    let change_row = rows.filter((row) => row.id === id);
    role = change_row[0].role;
    !(role === "admin") ? (await setUserAsAdmin(id)) : (await unsetUserAsAdmin(id))
  }, [rows])

  const changeRole = (role) => {
    if (role === "admin") {
      return "member";
    } else return "admin";
  }

  const toggleAdmin = React.useCallback(
    (id) => async () => {

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, role: changeRole(row.role) } : row
        )
      );

      await ChangeBackAdmin(id); 
    },
    [ChangeBackAdmin]
  );

  const breakpoint_1117 = useMediaQuery("(max-width: 1117px)");
  const breakpoint_1032 = useMediaQuery("(max-width: 1032px)");

  const columns = React.useMemo(
    () => [
      {
        field: "name",
        headerName: 'Name',
        type: "string",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "email",
        headerName: 'Email',
        type: "actions",
        renderCell: renderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
      {
        field: "role",
        headerName: 'Role',
        type: "string",
        // width: 130,
        headerAlign: "center",
        align: "center",
        flex: 0.75,
      },
      {
        field: "state",
        headerName: 'Status',
        type: "string",
        // width: 130,
        headerAlign: "center",
        align: "center",
        flex: 0.75,
      },
      {
        field: "actions",
        headerName: 'Change Status',
        type: "actions",
        // width: 80,
        getActions: (params) => [

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Inactive</Typography>
            <IOSSwitch
              checked={params.row.activeState}
              onChange={ToggleStatus(params.id)}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Active</Typography>
          </Stack>,
        ],
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
      {
        field: "actions2",
        headerName: 'Grant / Cancel Admin',
        type: "actions",
        getActions: (params) => [

          <FormControlLabel 
        control={<Checkbox 
        icon={<ManageAccountsIcon fontSize='large'/>}
        checkedIcon={<ManageAccountsIcon fontSize='large'/>}
        sx={{color: "#979aaa", left: "20%"}}
        color="info"
        checked={Boolean(params.row.role === "admin")}
        disabled = {!params.row.activeState}
        onChange={toggleAdmin(params.id)}

        />} 
        title="Admin Status"

         />
        ],
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
    ],

    [ToggleStatus, toggleAdmin]
  );

  let new_columns = columns.slice()
  new_columns.splice(3,1)
  const columns_under_1117 = new_columns.slice()
  new_columns.splice(2,1)
  const columns_under_1032 = new_columns.slice()

  if (loading) return <Loading />;
  return (
     <Box sx={{
      width:"100%", 
      display: "flex", 
      flexWrap: "wrap", 
      marginTop:0, 
      marginRight: "-0.75rem", 
      marginLeft: "-0.75rem",
      "& .super-app-theme--false": {
        color: "#9e9e9e",
        bgcolor: "#d8d8d8"
      }
      }}>
      <DataGrid
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={breakpoint_1032 ? columns_under_1032 : breakpoint_1117 ? columns_under_1117 :columns}
        rows={rows}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        getRowClassName={(params) => `super-app-theme--${params.row.activeState}`}
      />

    </Box>
    
  )
}
