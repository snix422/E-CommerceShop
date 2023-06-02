import { Box, Container, IconButton,Stack, Typography } from "@mui/material"
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import StoreIcon from '@mui/icons-material/Store';
import { makeStyles } from "@material-ui/core/styles";
import {Link,useNavigate} from 'react-router-dom'

const useStyles = makeStyles({
    linkStyle: {
       textDecoration: 'none',
       fontFamily: 'Montserrat',
       fontSize: '20px',
    } 
})

const Footer = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const goToKlawiatury = () => {
        navigate('/klawiatury');
    }
    return (
        <Container sx={{display:'flex', flexDirection:'column',minWidth:'100vw', alignItems:'center'}}>
        <hr style={{width:'70vw', fontSize:'80px'}}></hr>
        <Container sx={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <Stack direction={{xl:'row', lg:'row', md:'row', sm:'row', xs:'column'}} sx={{display: 'flex', justifyContent:'space-evenly', marginTop: '50px', width: '50vw', gap:{
                xl:'200px',
                lg:'200px',
                md:'150px',
                sm:'40px',
                xs:'20px'
            }}}>
                <Box sx={{display:'flex', flexDirection: 'column', gap: '20px', alignItems:'center'}}>
                    <Typography className={classes.linkStyle}>Produkty</Typography>
                    <Link className={classes.linkStyle} to='/myszki'>Myszki</Link>
                    <Link className={classes.linkStyle} to='/sluchawki'>Słuchawki</Link>
                    <Link className={classes.linkStyle} to='/podkladki'>Podkładki</Link>
                    <Link className={classes.linkStyle} to='/klawiatury' onClick={goToKlawiatury}>Klawiatury</Link>
                </Box>
                <Box sx={{display:'flex', flexDirection: 'column', gap: '20px', alignItems:'center'}}>
                    <Typography className={classes.linkStyle}>Konto</Typography>
                    <Link to='zaloguj' style={{textDecoration:'none'}}>Zaloguj się</Link>
                    <Link to='rejestracja' style={{textDecoration:'none'}}>Zarejestruj się</Link>
                </Box>
                <Box sx={{display:'flex', flexDirection: 'column', gap:'20px'}}>
                    <Typography className={classes.linkStyle} sx={{textAlign:'center'}}>Kontakt</Typography>
                    <Box sx={{display: 'flex' , alignItems: 'flex-start'}}>
                        <IconButton>
                            <PhoneAndroidIcon></PhoneAndroidIcon>
                        </IconButton>
                        <Box>
                        <Typography className={classes.linkStyle}>555 555 555</Typography>
                        <Typography className={classes.linkStyle}>pon.-pt. 8:00 - 21:00</Typography>
                        <Typography className={classes.linkStyle}>sob.-niedz. 8:00 - 19:00</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <IconButton>
                            <EmailIcon></EmailIcon>
                        </IconButton>
                        <Typography className={classes.linkStyle}>players4players@gmail.com</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <IconButton>
                            <StoreIcon></StoreIcon>
                        </IconButton>
                        <Typography className={classes.linkStyle}>Warszawa, ul.Piłsudskiego 43</Typography>
                    </Box>
                </Box>
            </Stack>
            <Box sx={{marginTop: '20px'}}>
            <Typography className={classes.linkStyle}>Copywright 2023 ©</Typography>
            </Box>
        </Container>
        </Container>
    )
}

export default Footer