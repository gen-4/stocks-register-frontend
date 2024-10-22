import React from "react";

import { useDispatch } from "react-redux";

import { useIntl, FormattedMessage } from "react-intl";

import { Form, Field } from 'react-final-form';

import { TextField, Button } from "@mui/material";

import { config } from "config/constants";

import stocks from 'modules/stocks';
import app from 'modules/app';


const CreateStock = () => {

    const dispatch = useDispatch();
    const intl = useIntl();

    const onSubmit = stockRequest => dispatch(stocks.actions.requestStock(
        stockRequest,
        () => dispatch(app.actions.showInfo({ 
            severity: config.SEVERITY_SUCCESS, 
            message: intl.formatMessage({ id: 'stocks.stocks.CreateStock.success' })
        })),
        error => dispatch(app.actions.showInfo({ serverity: config.SEVERITY_ERROR, message: error }))
    ));

    const validate = ( { name } ) => {
        const errors = {};
        if (!name) {
            errors.name = intl.formatMessage({ id: 'stocks.stocks.form.error.name' });
        }

        return errors;
    };

    return (
        <div className="form-container">
            <Form
                onSubmit={ onSubmit }
                validate={ validate }
                render={({ handleSubmit }) => (
                    <form onSubmit={ handleSubmit }>
                        <Field
                            name="name"
                            render={({ input, meta }) => (
                                <div>
                                    <TextField 
                                        required
                                        fullWidth
                                        error={ meta.touched && meta.error }
                                        helperText={ meta.touched && meta.error  && meta.error }
                                        type="text" 
                                        {...input} 
                                        label={ <FormattedMessage id="stocks.stocks.form.name" /> } 
                                        variant="outlined" 
                                        sx={{
                                            color: "var(--text-white)",
                                            borderColor: "var(--terciary)",
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Button className="submit-button" variant="contained" type="submit" >
                            <FormattedMessage id='stocks.global.buttons.submit' />
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CreateStock;
