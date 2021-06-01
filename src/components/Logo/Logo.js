import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import condominioLogo from '../../assets/images/condominio-logo.png';

const useStyles = makeStyles(theme => ({
    Logo: {
        padding: "8px",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "5px",
        "& img": {
            height: "50px"
        }
    }
}));

const Logo = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.Logo} >
            <img src={condominioLogo} alt="Condominio_Santa_Rita" />
        </div>
    );
};


export default Logo;