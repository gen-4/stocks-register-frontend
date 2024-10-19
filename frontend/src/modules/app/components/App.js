import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import user from 'modules/user';





const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      typography: {
        fontFamily: "'Exo 2', sans-serif",
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': 'var(--secondary)',
              '--TextField-brandBorderHoverColor': 'var(--terciary)',
              '--TextField-brandBorderFocusedColor': 'var(--terciary)',
              '& label.Mui-focused': {
                color: 'var(--text-white)',
              },
              '& label': {
                color: 'var(--text-white)',
              }
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
              '& input': {
                color: 'var(--text-white)',
              }
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&::before, &::after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });


const App = () => {

    const outerTheme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(user.actions.tryLoginFromServiceToken(
            () => dispatch(user.actions.logout())
        ));
    });

    return (
        <div>
            <Router>
                <div>
                    <Header />
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <Body />
                    </ThemeProvider>
                </div>
            </Router>
            <Footer />
        </div>
    );

};

export default App;
