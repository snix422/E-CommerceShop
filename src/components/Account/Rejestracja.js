import { Typography, Box, Container, TextField, Button, Alert } from "@mui/material"
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { registerUsers } from "../../Context/registerUsers";


const Rejestracja =  () => {
   
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        login:'',
        password:''
    })
    const [response, setResponse] = useState(null);

    const navigate = useNavigate();
    const registers = useContext(registerUsers);
  
    const RegisterUser = async () => {
        
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
            const res =  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCUXA0GqA-e_jHQUUko5UaynHFNfYpOKg', {
            email: login,
            password: password,
            returnSecureToken: true,
           })
           console.log(res);
           registers.push({
            email:res.data.email,
            password:password,
            idUser:res.data.localId
           });
            }catch(ex){
            setResponse(ex.response.data.error.message);
            if(response !== null){
                setLogin('');
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

    const backToLogin = () => {
        navigate('/zaloguj')
    }

    return(
        <Container sx={{backgroundColor: 'rgb(240, 238, 238)', minWidth: '100vw', height: '100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{backgroundColor: 'white', width: '50vw', minHeight: '40vh', borderRadius: '20px', display: 'flex', flexDirection:'column', alignItems:'center', boxShadow: '-6px 5px 21px -7px rgba(8,8,8,1)'}}>
            <Typography sx={{ fontFamily: 'Montserrat', fontSize: '25px', marginBottom: '30px', marginTop:'20px'}}>Rejestracja</Typography>
            {errors.login.length > 0 ? <TextField  error helperText={errors.login} value={login} onChange={(e)=>setLogin(e.target.value)} variant="outlined" label="Login" color="warning" sx={{width:'300px', marginBottom:'10px'}}></TextField> 
            : <TextField  value={login} onChange={(e)=>setLogin(e.target.value)} variant="outlined" label="Login" color="warning" sx={{width:'300px', marginBottom:'10px'}}></TextField>}
            {errors.password ? <TextField type="password" error helperText={errors.password} value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined"  color="warning"   sx={{width:'300px', marginBottom:'30px'}}></TextField> 
            : <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined"  color="warning" label="Hasło" sx={{width:'300px', marginBottom:'30px'}}></TextField>}
             {response  ? <Alert severity="error"><Typography sx={{fontFamily:'Montserrat', fontSize:'15px', fontWeight:'bold'}}>Ten mail jest już używany!</Typography></Alert> : null }
            <Button color="warning" variant="contained" disableElevation sx={{width: '250px', marginTop:'20px'}} onClick={RegisterUser}>Zarejestruj się</Button>
            <Typography sx={{marginTop: '10px'}}>Masz konto ?</Typography>
            <Button variant="outlined" color="success" sx={{marginTop: '10px'}} onClick={backToLogin}>Zaloguj się</Button>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} sx={{marginTop: '50px', marginBottom:'20px' }} onClick={backtoHome}>
                Wróć
            </Button>
            </Box>
        </Container>
    )
}

export default Rejestracja
