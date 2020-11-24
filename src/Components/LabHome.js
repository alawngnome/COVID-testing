import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Navbar';

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

  //Navbar CSS
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerOptions: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
  },
}));

export default function LabHome() {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Lab Home
          </Typography>
          <form className={classes.form} noValidate>
            <div>
              <Link to='/poolmapping'>
                <Button
                  type='collector'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Pool Mapping
                </Button>
              </Link>

              <Link to='/welltesting'>
                <Button
                  type='lab'
                  fullWidth
                  variant='contained'
                  color='primary'
                  handleClick=''
                >
                  Well Testing
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
