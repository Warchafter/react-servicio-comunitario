import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
    TextField
} from '@material-ui/core';

import * as actions from '../../store/actions/index';
import { checkValidity, updateObject } from '../../shared/utility';

//
// paymentImage -
// paymentDatePayed -
// paymentBank -
// paymentAmount -
// paymentConcept-
// paymentType -
// paymentMethod -
// payingUser +
// payingUserId +
// paymentId +
//

const Payment = props => {
    // const classes = useStyles();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const [paymentForm, setPaymentForm] = useState({
        paymentImage: {
            elementType: 'file',
            elementConfig: {
                options: [
                    { value: 'Transferencia', displayValue: 'Transferencia' },
                    { value: 'Efectivo', displayValue: 'Efectivo' }
                ]
            },
            name: 'imagen',
            validation: {
                required: true,
            },
            valid: true
        },
        paymentDatePayed: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
                placeholder: 'Fecha del Pago'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        paymentBank: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Banco'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        paymentAmount: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Monto'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        paymentConcept: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Concepto de Pago'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        paymentType: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Bs.', displayValue: 'Bolívares' },
                    { value: 'Dólar', displayValue: 'Dólares' },
                    { value: 'Euro', displayValue: 'Euros' },
                ]
            },
            value: 'Bs.',
            validation: {},
            valid: true
        }
    })
    const [formIsValid, setFormIsValid] = useState(false);
    const [paymentId, setPaymentId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(true);

    const inputChangedHandler = (event, paymentFormName) => {
        const updatedPaymentForm = updateObject(paymentForm, {
            [paymentFormName]: updateObject(paymentForm, {
                value: event.target.value,
                valid: checkValidity(event.target.value, paymentForm[paymentFormName].validation),
                touched: true
            })
        });
        setPaymentForm(updatedPaymentForm);
    };

    const resetPaymentFormValuesHandler = () => {
        const updatedPaymentForm = updateObject(paymentForm, {
            paymentImage: updateObject(paymentForm.paymentImage, {
                value: '',
                valid: false,
                touched: false
            }),
            paymentDatePayed: updateObject(paymentForm.paymentDatePayed, {
                value: '',
                valid: false,
                touched: false
            }),
            paymentBank: updateObject(paymentForm.paymentBank, {
                value: '',
                valid: false,
                touched: false
            }),
            paymentAmount: updateObject(paymentForm.paymentAmount, {
                value: '',
                valid: false,
                touched: false
            }),
            paymentConcept: updateObject(paymentForm.paymentConcept, {
                value: '',
                valid: false,
                touched: false
            }),
            paymentType: updateObject(paymentForm.paymentType, {
                value: '',
                valid: false,
                touched: false
            })
        });
        setPaymentForm(updatedPaymentForm);
    }

    useEffect(() => {
        setPaymentId(uuidv4());
    }, []);

    const createUniquePaymentId = event => {
        let paymentId = uuidv4();
        setPaymentId(paymentId);
    }

    const [paymentData, setPaymentData] = useState({});

    const onPublishPost = useCallback((paymentData, token) => dispatch(actions.registerPayment(paymentData, token)), [dispatch, paymentData, token]);

    const paymentHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in paymentForm) {
            formData[formElementIdentifier] = paymentForm[formElementIdentifier].value;
        }
        setPaymentData({
            paymentData: formData,
            paymentUser: user,
            paymentUserId: userId,
            paymentId: paymentId
        })

        onPublishPost()
    }

    const fromElementsArray = [];
    for (let key in paymentForm) {
        fromElementsArray.push({
            id: key,
            config: paymentForm[key]
        });
    };
    let form_fields = fromElementsArray.map(formElement => {
        if (paymentMethod) {
            <TextField
                key={formElement.id}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name={formElement.id}
                label={formElement.config.elementConfig.placeholder}
                type={formElement.config.elementConfig.type}
                id={formElement.id}
                error={!formElement.config.valid && formElement.config.touched}
                onChange={(event) => inputChangedHandler(event, formElement.id)}
            />
        }
    }

    )

    return (
        <div className="root">

        </div>
    );
};

export default Payment;