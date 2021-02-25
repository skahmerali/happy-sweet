// import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// import { Alert, AlertTitle } from '@material-ui/lab';
import { BaseURL } from '../Url/BaseURL'
import { UseGlobalState, UseGlobalStateUpdate } from '../../context/context'




import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));






function Login() {

    const golobalState = UseGlobalState()
    const globalStateUpdate = UseGlobalStateUpdate()



    const history = useHistory();
    const classes = useStyles();
    // const [alertMessage, setAlertMessage] = useState("")
    function Login(event) {
        event.preventDefault()

        var loginEmail = document.getElementById('loginEmail').value
        var loginPassword = document.getElementById('loginPassword').value

        axios({
            method: 'post',
            url: BaseURL + '/login',
            data: {
                email: loginEmail,
                password: loginPassword
            },
            withCredentials: true
        })
            .then(function (response) {
                if (response.status === 200) {
                    alert(response.data.message)
                    // alert(response.status)
                    globalStateUpdate(prev => ({
                        ...prev,
                        loginStatus: true,
                    }))
                    history.push('/dashboard')
                } else if (response.status === 404) {

                    alert(response.data.message)

                    history.push('/login')
                }
            })
            .catch(function (error) {
                if (error.status === 403) {
                    alert(error.message)
                }
            });



        return false;

    }



    return (
        <>

            {/* {alertMessage ? <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {alertMessage}
            </Alert>: null} */}
            <Container maxWidth="sm">
                <h1 style={{ display: "inline", marginLeft: 100 }} >Login Now</h1>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={Login}>
                    <TextField id="loginEmail" label="Email" variant="outlined" /><br />
                    <TextField id="loginPassword" label="Password" variant="outlined" /><br />
                    <Button style={{backgroundColor:"pink"}}  type="submit" variant="contained" color="secondary"> LogIn </Button>
                </form>
            </Container>
        </>
    )

}

export default Login;