import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  getOrganizationMembersExceptMe,
  setUserAsAdmin,
  unsetUserAsAdmin,
  setUserToActive,
  setUserToDeactivated,
} from "../../../../../../api/api";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import Loading from "../../../../../../components/Loading";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IOSSwitch from "./Switch";

import RenderCellExpand from "./renderCellExpand"

import ResponsiveTable from "./component/ResponsiveTable"

import PerfectScrollbar from 'react-perfect-scrollbar'
import "react-perfect-scrollbar/dist/css/styles.css";

export default function Dashboard() {
  const [pageSize, setPageSize] = React.useState(5);

  const [loading, setLoading] = React.useState(true);

  const [rows, setRows] = React.useState([]);

  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    getOrganizationMembersExceptMe()
      .then((res) => {
        const raw_rows = JSON.parse(JSON.stringify(res.data.data));
        raw_rows.forEach((item) => (item.id = item._id));
        raw_rows.forEach(
          (item) => (item.state = item.activeState ? "Active" : "Inactive")
        );
        setRows(raw_rows);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    setRefresh(true);
  }, []);

  React.useEffect(() => {
    refresh && setRefresh(false);
  }, [refresh]);

  const changeState = (state) => {
    if (state === "Inactive") return "Active";
    else if (state === "Active") return "Inactive";
  };

  const changeActiveState = (activeState) => !activeState;

  const ChangeBackStatus = React.useCallback(
    async (id) => {
      let state = "";
      let change_row = rows.filter((row) => row.id === id);
      state = change_row[0].activeState;
      !state ? await setUserToActive(id) : await setUserToDeactivated(id);
    },
    [rows]
  );

  const ToggleStatus = React.useCallback(
    (id) => async () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id
            ? {
                ...row,
                state: changeState(row.state),
                activeState: changeActiveState(row.activeState),
              }
            : row
        )
      );

      await ChangeBackStatus(id);
    },
    [ChangeBackStatus]
  );

  const ChangeBackAdmin = React.useCallback(
    async (id) => {
      let role = "";
      let change_row = rows.filter((row) => row.id === id);
      role = change_row[0].role;
      !(role === "admin")
        ? await setUserAsAdmin(id)
        : await unsetUserAsAdmin(id);
    },
    [rows]
  );

  const changeRole = (role) => {
    if (role === "admin") {
      return "member";
    } else return "admin";
  };

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
  const breakpoint_943 = useMediaQuery("(max-width: 943px)");
  const breakpoint_925 = useMediaQuery("(max-width: 925px)");
  const breakpoint_767 = useMediaQuery("(max-width: 767px)");
  const breakpoint_660 = useMediaQuery("(max-width: 660px)");

  const columns = [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        renderCell: RenderCellExpand,
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
    ]

  const columns_under_1117 = [
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
        renderCell: RenderCellExpand,
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
        field: "actions",
        headerName: "Change Status",
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
        headerName: "Grant / Cancel Admin",
        type: "actions",
        getActions: (params) => [
          <FormControlLabel
            control={
              <Checkbox
                icon={<ManageAccountsIcon fontSize="large" />}
                checkedIcon={<ManageAccountsIcon fontSize="large" />}
                sx={{ color: "#979aaa", left: "20%" }}
                color="info"
                checked={Boolean(params.row.role === "admin")}
                disabled={!params.row.activeState}
                onChange={toggleAdmin(params.id)}
              />
            }
            title="Admin Status"
          />,
        ],
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
    ]
  const columns_under_1032 = [
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
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
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
    ]

  const columns_under_943 = [
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
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
      {
        field: "actions",
        headerName: 'Status',
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
        headerName: 'Admin',
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
        flex: 0.75,
      },
    ]

  const columns_under_925 = [
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
        type: "string",
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
      {
        field: "actions",
        headerName: 'Status',
        type: "actions",
        // width: 80,
        getActions: (params) => [

          <Stack direction="row" spacing={1} alignItems="center">
            <IOSSwitch
              checked={params.row.activeState}
              onChange={ToggleStatus(params.id)}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>{params.row.state}</Typography>
          </Stack>,
        ],
        headerAlign: "center",
        align: "center",
        flex: 1.25,
      },
      {
        field: "actions2",
        headerName: 'Admin',
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
        flex: 0.75,
      },
    ]

    const columns_under_767 = [
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
        type: "string",
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1.5,
      },
      {
        field: "actions",
        headerName: 'Status',
        type: "actions",
        // width: 80,
        getActions: (params) => [

          <Stack direction="row" spacing={1} alignItems="center">
            <IOSSwitch
              checked={params.row.activeState}
              onChange={ToggleStatus(params.id)}
              inputProps={{ "aria-label": "ant design" }}
            />
          </Stack>,
        ],
        headerAlign: "center",
        align: "center",
        flex: 0.75,
      },
      {
        field: "actions2",
        headerName: 'Admin',
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
        flex: 0.75,
      },
    ]

    const mobile_columns = [
      {
        key: "name",
        label: "Name",
        primary: true
      },
      {
        key: "email",
        label: "Email"
      },
      {
        key: "state",
        label: "Status"
      },
      {
        key: "role",
        label: "Role"
      }

    ]



    const mobile_data = rows.map((row) => {
      var RowObj = {
        id: row.id,
        name: (
          <div style={{"display": "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{marginLeft:"10px", fontSize: "20px", fontWeight: "400"}}>
            {row.name}
          </div>
          {/* <div style={{"display": "flex", "width":"100px", justifyContent: "end"}}>
          <Stack
          sx={{marginRight: "10px"}}
          direction="row" spacing={1} alignItems="center">
             <IOSSwitch
              checked={row.activeState}
              // onChange={()=>{
              //   ToggleStatus(row.id)
              //   }}
              onClick={(e)=>{
                e.stopPropagation();
                ToggleStatus(row.id)
              }}
              inputProps={{ "aria-label": "ant design" }}
            />
        </Stack>
        <FormControlLabel 
        control={<Checkbox 
        icon={<ManageAccountsIcon fontSize='large'/>}
        checkedIcon={<ManageAccountsIcon fontSize='large'/>}
        sx={{color: "#979aaa", left: "20%", marginRight:"20px"}}
        color="info"
        checked={Boolean(row.role === "admin")}
        disabled = {row.activeState}
        onChange={()=>{
          toggleAdmin(row.id)
          }}
        onClick={(e)=>{
          e.stopPropagation();}}
        />}
        />
        </div> */}
        </div>
        ),
        email: row.email,
        state: row.state,
        role: row.role,
        activeState: row.activeState
      }
      return RowObj
    })

    let style_prop = {
      "sx": {
        marginLeft: "10px",
        fontSize: "1rem",
        "& .MuiGrid-container": {
          justifyContent: "space-between"
        }
      }
    }

    // let sum_style = {
    //   "sx": {
    //     pointerEvents: "none",
    //   }
    // }

    // let expand_icon_style = {
    //   "sx": {
    //     pointerEvents: "auto"
    //   }
    // }



    let class_rows = rows.map((row) => row.activeState? '' : 'super-app-theme--false')

    React.useEffect(() => {
      document.body.style.overflow = 'hidden'
    },[])

  if (loading) return <Loading />;
  return (
    <>
      {breakpoint_660 ? (
        <PerfectScrollbar style={{
          width: "100%",
          height: "100vh"
        }}>
          <Box sx={{
          "& .super-app-theme--false": {
            color: "#9e9e9e",
            bgcolor: "#d8d8d8"
          }
          }}>
          <ResponsiveTable
            columns={mobile_columns}
            data={mobile_data}
            // ExpansionPanelSummaryProps={sum_style}
            // ExpansionPanelMoreIconProps={expand_icon_style}
            excludePrimaryFromDetails={true}
            ExpansionPanelDetailsTypographyProps={style_prop}
            rowsClassArray={class_rows}
            setRows={setRows}
            rows={rows}
          />
          </Box>
        </PerfectScrollbar>
      ) : (
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
        columns={breakpoint_767? columns_under_767 : breakpoint_925? columns_under_925 : breakpoint_943 ? columns_under_943 : breakpoint_1032 ? columns_under_1032 : breakpoint_1117 ? columns_under_1117 :columns}
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
        getRowClassName={(params) =>
          `super-app-theme--${params.row.activeState}`
        }
      />
      </Box>
      )}
    </>
  )
}
