import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


export const ThemeInput = styled(TextField)({
    input:{
        color: "white",
    },
    root:{
        background: "red",
    },
    '& label': {
      color: 'white',

      fontWeight: "600"
    },
    '& label.Mui-focused': {
        color: 'white',
      },
    
    '& .MuiInput-underline:after': {
      borderBottomColor: '#red',

    },
    '& .MuiOutlinedInput-root': {
        background: "#2c2c2a",
      '& fieldset': {
        borderColor: '9c5328',

      },
      '&:hover fieldset': {
        borderColor: '#9c5328',

      },
      '&.Mui-focused fieldset': {
        borderColor: '#9c5328',

      },
    },
  });