import { confirmDialog } from './ConfirmDialog';
import ConfirmDialogx from './ConfirmDialog';

import Button from '@mui/material/Button';

// ...
import React, { useState } from 'react'


export default function Test() {
    const [first, setfirst] = useState([
        {
            "id":1
        },
        {
            "id":2
        },
        {
            "id":3
        },
        {
            "id":4
        },
        {
            "id":5
        }
    ]);
  return (
    <>
      <Button
        onClick={() => {
          confirmDialog("Remove this user ?", "Do you really want to delete all the data?", () =>
            {console.log("deleting all the data!");
             console.log(first);
             let newfirst = [...first];
             newfirst.shift();
             setfirst(newfirst);
             }
          );
        }}
      >
        Delete All The Data
      </Button>
      <ConfirmDialogx />
    </>
  );
}

{/* <Button
  onClick={() => {
    confirmDialog('Do you really want to delete all the data?', () =>
      console.log('deleting all the data!')
    );
  }}
>
  Delete All The Data
</Button>; */}