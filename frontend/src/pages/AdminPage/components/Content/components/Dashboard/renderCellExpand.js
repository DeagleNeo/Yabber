import * as React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

import { useSnackbar } from 'notistack';

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
    
    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };
    
    const handleMouseLeave = () => {
        setShowFullCell(false);
    };
    
    React.useEffect(() => {
        if (!showFullCell) {
          return undefined;
        }
        
        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
              setShowFullCell(false);
            }
        }
        
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = async () => {
        await navigator.clipboard.writeText(`${value}`);
        enqueueSnackbar('Email copied to clipboard.', { variant: 'info', autoHideDuration: 3000 });
    }

    return (
        <Box
          ref={wrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpen}
          sx={{
            alignItems: 'center',
            lineHeight: '24px',
            width: 1,
            height: 1,
            position: 'relative',
            display: 'flex',
            align: "center",
            cursor: "pointer",
            justifyContent: 'center',
            "&:hover": {
                backgroundColor:"#cabeed",//e4dcfa
                color:"#000"
            }
          }}
        >
          <Box
            ref={cellDiv}
            sx={{
              height: 1,
              width,
              display: 'block',
              position: 'absolute',
              top: 0,
            }}
          />
          <Box
            ref={cellValue}
            sx={{alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {value}
          </Box>
          {showPopper && (
            <Popper
              open={showFullCell && anchorEl !== null}
              anchorEl={anchorEl}
              style={{ 
                width: width*1.25
            }}
            >
              <Paper
                elevation={1}
                sx={{
                    backgroundColor:"#e0efff",
                    color: "#000"
                }}
              >
                    <Typography variant="body2" style={{padding: 8, textAlign: 'center'}}>
                        {value}
                    </Typography>
                
              </Paper>
            </Popper>
          )}
        </Box>
      );
})

export default function RenderCellExpand(params) {

    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth}/>
    );
}