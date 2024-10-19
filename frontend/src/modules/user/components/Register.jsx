import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Form, Field } from 'react-final-form';
import { FormattedMessage, useIntl } from "react-intl";

import { TextField, InputAdornment, Button } from "@mui/material";
import { EmailOutlined, KeyOutlined, PersonOutlineRounded } from '@mui/icons-material';

import formStyle from './form.module.css';

import { config } from "config/constants";

import user from 'modules/user';
import app from 'modules/app';


const Register = () => {

    const intl = useIntl();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const onSubmit = ( { email, password, username } ) => dispatch(user.actions.register(
        {
            email: email.trim(), 
            password,
            username: username.trim()
        },
        () => navigator('/'),
        errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message })),
        () => {
            navigator('/login');
            dispatch(user.actions.logout());
        }
    ));

    const validate = ( { email, password, username, repeatPassword } ) => {
        const errors = {};
        if (!email) {
            errors.email = intl.formatMessage({ id: 'stocks.user.form.error.email' });
        }

        if (!username) {
            errors.username = intl.formatMessage({ id: 'stocks.user.form.error.username' });
        }

        if (!password) {
            errors.password = intl.formatMessage({ id: 'stocks.user.form.error.password' });;
        }

        if (password !== repeatPassword) {
            errors.repeatPassword = intl.formatMessage({ id: 'stocks.user.form.error.different.repeatPassword' });
        }

        if (!repeatPassword) {
            errors.repeatPassword = intl.formatMessage({ id: 'stocks.user.form.error.repeatPassword' });
        }

        return errors;
    };

    return (
        <div className={ formStyle.container }>
            <Form
                onSubmit={ onSubmit }
                validate={ validate }
                render={({ handleSubmit }) => (
                    <form onSubmit={ handleSubmit }>
                        <Field
                            name="email"
                            render={({ input, meta }) => (
                                <div>
                                    <TextField 
                                        required
                                        fullWidth
                                        error={ meta.touched && meta.error }
                                        helperText={ meta.touched && meta.error  && meta.error }
                                        type="text" 
                                        {...input} 
                                        label={ <FormattedMessage id="stocks.user.form.email" /> } 
                                        variant="outlined" 
                                        sx={{
                                            color: "var(--text-white)",
                                            borderColor: "var(--terciary)",
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined sx={{ color: 'var(--text-white)' }} />
                                                    </InputAdornment>
                                                ),
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Field
                            name="username"
                            render={({ input, meta }) => (
                                <div>
                                    <TextField 
                                        required
                                        fullWidth
                                        error={ meta.touched && meta.error }
                                        helperText={ meta.touched && meta.error  && meta.error }
                                        type="text" 
                                        {...input} 
                                        label={ <FormattedMessage id="stocks.user.form.username" /> } 
                                        variant="outlined" 
                                        sx={{
                                            color: "var(--text-white)",
                                            borderColor: "var(--terciary)",
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonOutlineRounded sx={{ color: 'var(--text-white)' }} />
                                                    </InputAdornment>
                                                ),
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        required
                                        fullWidth
                                        error={ meta.touched && meta.error }
                                        helperText={ meta.touched && meta.error &&  meta.error }
                                        type="password" 
                                        {...input} 
                                        label={ <FormattedMessage id="stocks.user.form.password" /> } 
                                        variant="outlined"
                                        sx={{
                                            color: "var(--text-white)",
                                            borderColor: "var(--terciary)",
                                        }}
                                        slotProps={{
                                            input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyOutlined sx={{ color: 'var(--text-white)' }} />
                                                </InputAdornment>
                                            ),
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </Field>

                        <Field name="repeatPassword">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        required
                                        fullWidth
                                        error={ meta.touched && meta.error }
                                        helperText={ meta.touched && meta.error &&  meta.error }
                                        type="password" 
                                        {...input} 
                                        label={ <FormattedMessage id="stocks.user.form.repeatPassword" /> } 
                                        variant="outlined"
                                        sx={{
                                            color: "var(--text-white)",
                                            borderColor: "var(--terciary)",
                                        }}
                                        slotProps={{
                                            input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyOutlined sx={{ color: 'var(--text-white)' }} />
                                                </InputAdornment>
                                            ),
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </Field>

                        

                        <Button className={ formStyle.submit } variant="contained" type="submit" >
                            <FormattedMessage id='stocks.global.buttons.submit' />
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default Register;
