import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    MenuItem,
    Menu,
    Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import apollo from '../../assets/apollo.jpg';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        varian="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        <img
                            src={apollo}
                            alt="E-Commerce"
                            height="25px"
                            className={classes.image}
                        />
                        Apollo
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && ( // React logic
                        <div className={classes.button}>
                            <IconButton
                                component={Link}
                                to="/cart"
                                aria-label="Show cart items"
                                color="inherit"
                            >
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;
