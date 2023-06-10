import React, { Component } from 'react'
import Box from '@mui/material/Box';

/**
 * Used for default text if no content found for table/list
 */
class NoContent extends Component {
  render() {
    const { text } = this.props
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <span>{text || 'No Content'}</span>
      </Box>
    )
  }
}

export default NoContent