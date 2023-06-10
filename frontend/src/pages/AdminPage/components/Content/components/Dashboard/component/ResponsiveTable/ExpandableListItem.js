import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import Stack from "@mui/material/Stack";
import IOSSwitch from '../../Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {setUserAsAdmin, unsetUserAsAdmin, setUserToActive, setUserToDeactivated} from "../../../../../../../../api/api"



// const styles = {
//   summaryText: {
//     width: '100%',
//   },
//   detailsText: {
//     opacity: 0.5,
//     width: '100%',
//   },
// };

/**
 * Expandable component with header text (summary) and expandable description text (details)
 */
class ExpandableListItem extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  componentDidUpdate(nextProps) {
    if (nextProps.selected && nextProps.scrollToSelected) {
      // @material-ui/core encourages ReactDOM until React find better way
      // https://@material-ui/core.com/getting-started/frequently-asked-questions/#how-can-i-access-the-dom-element-
      ReactDOM.findDOMNode(this).scrollIntoView(nextProps.scrollOptions || { behavior: 'smooth', block: 'center' })
    }
  }

  render() {
    const {
    //   classes,
      panelClass,
      details,
      selected,
      summary,
      ExpansionPanelDetailsProps,
      ExpansionPanelDetailsTypographyProps,
      ExpansionPanelMoreIconProps,
      ExpansionPanelProps,
      ExpansionPanelSummaryProps,
      ExpansionPanelSummaryTypographyProps,
      SelectedExpansionPanelProps,
      rowId,
      rowState,
      rowRole,

      setRows,
      rows
    } = this.props;

    const rootProps = selected
      ? { ...ExpansionPanelProps, ...SelectedExpansionPanelProps }
      : ExpansionPanelProps;
    
    const changeState = (state) => {
      if (state === "Inactive") return "Active"
      else if (state === "Active") return "Inactive"
    }

    const changeActiveState = (activeState) => !activeState

    const ChangeBackStatus = async (id)  => {
      let state = "";
      let change_row = rows.filter((row) => row.id === id);
      state = change_row[0].activeState;
      (!state)?(await setUserToActive(id)):(await setUserToDeactivated(id))
    }

    const ToggleStatus = (id) => async () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, state: changeState(row.state), activeState: changeActiveState(row.activeState) } : row
          )
        );
        await ChangeBackStatus(id);
    }
    
    const changeRole = (role) => {
      if (role === "admin") {
        return "member";
      } else return "admin";
    }

    const ChangeBackAdmin = async (id)  => {
      let role = "";
      let change_row = rows.filter((row) => row.id === id);
      role = change_row[0].role;
      !(role === "admin") ? (await setUserAsAdmin(id)) : (await unsetUserAsAdmin(id))
    }
    
    const toggleAdmin = (id) => async () => {
  
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, role: changeRole(row.role) } : row
          )
        );
  
        await ChangeBackAdmin(id); 
      }

      console.log(rowId, rowState, rowRole)

    return (
      <Accordion className={panelClass && panelClass} {...rootProps}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon {...ExpansionPanelMoreIconProps} />}
          {...ExpansionPanelSummaryProps}
        >
          <div
            style={{
              width: "50%",
              alignSelf: "center",
            }}
          >
            <Typography
              sx={{
                width: "100%",
              }}
              gutterBottom
              variant="subtitle1"
              {...ExpansionPanelSummaryTypographyProps}
            >
              {summary}
            </Typography>
          </div>
          <div
            style={{
              width: "30%",
              alignSelf: "center",
              marginLeft: "10%"
            }}
          >
            <div
              style={{ display: "flex", width: "100%", justifyContent: "space-between" }}
            >
            <FormControlLabel
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                sx={{marginRight:"20%"}}
                control={
              <Stack
                // sx={{ marginRight: "10px" }}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <IOSSwitch
                  checked={rowState}
                  onChange={ToggleStatus(rowId)}
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   ToggleStatus(rowId);
                  // }}
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
              } 
            />
            <FormControlLabel
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                // sx={{marginLeft:"0%"}}
                control={
                  <Checkbox
                    icon={<ManageAccountsIcon fontSize="large" />}
                    checkedIcon={<ManageAccountsIcon fontSize="large" />}
                    sx={{ color: "#979aaa", left: "20%", marginRight: "20px" }}
                    color="info"
                    checked={Boolean(rowRole === "admin")}
                    disabled={!rowState}
                    onChange={toggleAdmin(rowId)}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    // }}
                  />
                }
            />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails {...ExpansionPanelDetailsProps}>
          <Typography
            sx={{
              opacity: 0.5,
              width: "100%",
            }}
            gutterBottom
            component="div"
            {...ExpansionPanelDetailsTypographyProps}
          >
            {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default ExpandableListItem