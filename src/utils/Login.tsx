import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import { loginTC } from '../state/auth-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import { Navigate } from 'react-router-dom';

const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
        errors.email = 'Field can\'t be empty';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Field can\'t be empty' ;
    } else if (values.password.length > 20 ) {
        errors.password = 'Must be 20 characters or less';
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }

    return errors;
};

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(loginTC(values));
            formik.resetForm();
        },
        validate,

    })

    if(isLoggedIn) {
       return <Navigate to={"/"} />
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField id="email"
                                   name="email"
                                   type="email"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.email}
                                   label="Email"
                                   margin="normal"/>
                        {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField id="password"
                                   name="password"
                                   type="password"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.password}
                                   label="Password"
                                   margin="normal"
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: "red"}}>{formik.errors.password}</div> }
                        <FormControlLabel id="rememberMe"
                                          name="rememberMe"
                                          checked={formik.values.rememberMe}
                                          onChange={formik.handleChange}
                                          value={formik.values.rememberMe}
                                          label={'Remember me'}
                                          control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
