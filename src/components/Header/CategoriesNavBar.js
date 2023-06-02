import { Container, Stack } from "@mui/material"
import {Link} from "@mui/material"
import { useNavigate } from "react-router-dom";

const CategoriesNavBar = () => {

    const navigate = useNavigate();
   
    const goToSluchawki = () => {
        navigate('/sluchawki');
    }

    const goToMyszki = () => {
        navigate('/myszki');
    }

    const goToPodkladki = () => {
        navigate('/podkladki');
    }

    const goToKlawiatury = () => {
        navigate('/klawiatury');
    }

    const goToMonitory = () => {
        navigate('/monitory');
    }

    const goToFotele = () => {
        navigate('/fotele');
    }
    

    return (

        <Container position="static" sx={{minWidth: '100%', height: '5vh', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px'}}>
            <Stack direction={'row'} sx={{gap: {
                xl:'200px',
                lg:'150px',
                md:'100px',
                sm:'50px',
                xs:'20px'
            }, color:'white'}}>
              <Link className='link' sx={{color:'white', textDecoration: 'none'}} onClick={goToSluchawki}>Słuchawki</Link>
              <Link className='link' sx={{color:'white', textDecoration: 'none'}} onClick={goToMyszki}>Myszki</Link>
              <Link className='link' sx={{color:'white', textDecoration: 'none'}} onClick={goToPodkladki}>Podkładki</Link>
              <Link className='link' sx={{color:'white', textDecoration: 'none'}} onClick={goToKlawiatury}>Klawiatury</Link>
            </Stack>
        </Container>
    )
}

export default CategoriesNavBar