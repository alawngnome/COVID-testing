import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import firebase from '../Firebase/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitCollector = (e) => {
    e.preventDefault();

    if (!email.includes('@labuser.com')) {
      alert('Not a valid lab employee! Please login through the other page.');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = '/testcollection';
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
      });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (!email.includes('@labuser.com')) {
      alert('Not a valid lab employee! Please login through the other page.');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = '/labhome';
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/*<LockOutlinedIcon /> */}</Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleLogin}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handlePassword}
          />
          <div>
            <Link to='/testcollection'>
              <Button
                type='collector'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleSubmitCollector}
              >
                Login Collector
              </Button>
            </Link>
            <Link to='/labhome'>
              <Button
                type='lab'
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleSubmitLogin}
              >
                Lab Login
              </Button>
            </Link>
            <Link to='/eelogin'>
              <Button
                type='lab'
                fullWidth
                variant='contained'
                color='secondary'
                className={classes.submit}
              >
                Employee Login
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
