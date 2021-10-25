import React, { useState, useEffect } from 'react';
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
    CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const genarateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart',
                });

                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        };

        genarateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((preActiveStep) => preActiveStep + 1);
    const backStep = () => setActiveStep((preActiveStep) => preActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    };

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    };

    let Confirmation = () =>
        order.customer ? (
            <React.Fragment>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstname}{' '}
                        {order.customer.lastname}!
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">
                    Back to Home
                </Button>
            </React.Fragment>
        ) : isFinished ? (
            <React.Fragment>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase!
                    </Typography>
                    <Divider className={classes.divider} />
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">
                    Back to Home
                </Button>
            </React.Fragment>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (error) {
        <React.Fragment>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">
                Back to Home
            </Button>
        </React.Fragment>;
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
                timeout={timeout}
            />
        );
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Confirmation />
                    ) : (
                        checkoutToken && <Form />
                    )}
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Checkout;
