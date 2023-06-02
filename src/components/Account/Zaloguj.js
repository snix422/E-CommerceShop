import { Typography, Box, Container,TextField, Button, Alert} from "@mui/material"
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { currentUser } from "../../Context/currentUser";

const useStyles = makeStyles({
    linkStyle: {
       fontFamily: 'Montserrat',
       fontSize:'25px'
    } 
})

const Zaloguj = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errors, setErrors] = useState({
        login:'',
        password:''
    });
 
    const [response, setResponse] = useState(null);

    const navigate = useNavigate();
    const user = useContext(currentUser);
    console.log(user);
    
    const checkValidate = () => {
        if(response == "INVALID_PASSWORD"){
            setErrorLogin('Nieprawidłowe hasło');
        }else if(response == "INVALID_EMAIL"){
            setErrorLogin('Nieprawidłowy e-mail');
        }
    }
 

    async function LogInUser(){ 
        if(login.length == 0){
            setErrors(prevState => {
               return{
                ...prevState, 
                login:'za mało liter',
               }})
               return
        }else{
            setErrors(prevState => {
                return{
                 ...prevState, 
                 login:'',
                }})
        }
        
        if(password.length < 5){
            setErrors(prevState => {
                return{
                 ...prevState, 
                 password:'Wymagane 4 znaki',
                }})
            return
        }else{
            setErrors(prevState => {
                return{
                 ...prevState, 
                 password:'',
                }})
        }

        try{
            const res =  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCUXA0GqA-e_jHQUUko5UaynHFNfYpOKg', {
            email: login,
            password: password,
            returnSecureToken: true
           })
           user.email = res.data.email;
           user.password = password;
           user.idUser = res.data.localId;
           user.auth = true;
           }catch(ex){
            setResponse(ex.response.data.error.message);
            if(response === 'INVALID_PASSWORD' || 'INVALID_EMAIL'){
                setPassword('');
                return
              }
           }

          setLogin('');
            setPassword('');
            setErrors(prevState => {
                return{
                 ...prevState, 
                 login:'',
                 password:''
                }})
            navigate('/');
    }

    const backtoHome = () => {
        navigate('/')
    }

    const backtoRegister = () => {
        navigate('/rejestracja');
    }

    return(
        <Container sx={{backgroundColor: 'rgb(240, 238, 238)', minWidth: '100vw', height: '100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{backgroundColor: 'white', width: {
                xl:'60vw',
                lg:'70vw',
                md:'80vw',
                sm:'90vw',
                xs:'95vw'
            }, minHeight: '40vh', borderRadius: '20px', display: 'flex', flexDirection:'column', alignItems:'center', boxShadow: '-6px 5px 21px -7px rgba(8,8,8,1)'}}>
            <Typography sx={{ fontFamily: 'Montserrat', fontSize: '25px', marginBottom: '30px', marginTop:'20px'}}>Logowanie</Typography>
            {errors.login.length > 0 ? <TextField  error helperText={errors.login} value={login} onChange={(e)=>setLogin(e.target.value)} variant="outlined" label="Login" color="warning" sx={{width:'300px', marginBottom:'10px'}}></TextField> 
            : <TextField  value={login} onChange={(e)=>setLogin(e.target.value)} variant="outlined" label="Login" color="warning" sx={{width:'300px', marginBottom:'10px'}}></TextField>}
            {errors.password ? <TextField type="password" error helperText={errors.password} value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined"  color="warning"   sx={{width:'300px', marginBottom:'30px'}}></TextField> 
            : <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined"  color="warning" label="Hasło" sx={{width:'300px', marginBottom:'30px'}}></TextField>}
             {response  ? <Alert severity="error"><Typography sx={{fontFamily:'Montserrat', fontSize:'15px', fontWeight:'bold'}}>Nieprawidłowe dane logowania!</Typography></Alert> : null }
            <Button color="warning" variant="contained" disableElevation sx={{width: '250px', marginTop:'20px'}} onClick={LogInUser}>Zaloguj się</Button>
            <Typography sx={{marginTop: '10px'}}>Nie masz konta ?</Typography>
            <Button variant="outlined" color="error" sx={{marginTop: '10px'}} onClick={backtoRegister}>Załóż konto</Button>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} sx={{marginTop: '50px', marginBottom: '20px' }} onClick={backtoHome}>
                Wróć
            </Button>
            </Box>
        </Container>
    )
}

export default Zaloguj