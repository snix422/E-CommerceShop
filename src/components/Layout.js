import { Container,Box } from "@mui/material"
import Footer from "./Footer/Footer"
import CategoriesNavBar from "./Header/CategoriesNavBar"
import MainNavBar from "./Header/MainNavBar"
import Polecane from "./MainContent/Polecane"
import Promocje from "./MainContent/Promocje"
import Bestsellers from "./MainContent/Bestsellers"
import VisitedComponent from "./MainContent/VisitedComponent"

const Layout = () => {

    const visitedItem = localStorage.getItem('visitedItem');
    
    return(
        <Box sx={{backgroundColor: 'rgb(240, 238, 238)'}}>
        <MainNavBar />
        <CategoriesNavBar />
        {visitedItem && <VisitedComponent></VisitedComponent>}
        <Polecane />
        <Promocje />
        <Bestsellers />
        <Footer />
        </Box>  
    )
}

export default Layout