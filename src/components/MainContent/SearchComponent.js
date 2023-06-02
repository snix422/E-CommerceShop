import { Container, Typography, Box, Image, Rating } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import MainNavBar from "../Header/MainNavBar";
import CategoriesNavBar from "../Header/CategoriesNavBar";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";

const SearchComponent = () => {

    const [searchItems, setSearchItems] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate();
    const items = JSON.parse(localStorage.getItem('searchItem'));
      
    const moveToProductPage = (product) => {
        return <ProductPage product={product} />
    }

    const searchProduct = () => {
       const item = myProducts.filter(product=>product.name.toLowerCase().includes(searchTerm.toLowerCase()));
       setSearchTerm('');
       localStorage.setItem('searchItem', JSON.stringify(item));
       navigate('/search');
      }

    return(
            <>
            <MainNavBar sx={{minWidth:'100vw'}}/>
            <CategoriesNavBar />
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'50vh', gap:'50px'}}>
                {items.length>0 ? items.map((product)=>{
                    return(
                        <Box  className="product" onClick={() =>moveToProductPage(product)} sx={{display:'flex', flexDirection: 'column', alignItems:'center', border: '2px solid rgb(240, 238, 238)', borderRadius:'10px', marginBottom:'20px', width:{
                            xl:'15vw',
                            lg:'20vw',
                            md:'25vw',
                            sm:'45vw',
                            xs:'80vw'
                          }}}>
                            <Link style={{textDecoration:'none', color:'black', display:' flex', flexDirection:'column', alignItems:'center'}} to={"product/" + product.id}>
                          <img className="product-img" style={{width: '200px', height: '200px'}} src={product.image}></img>
                          <Typography  sx={{paddingBottom: '10px', textDecoration:'none', fontFamily:'Montserrat'}}>{product.name}</Typography>
                          <Rating name="read-only" value={5} readOnly></Rating>
                          <Typography sx={{fontFamily:'Montserrat'}}>{product.price} zł</Typography>
                          </Link>
                          </Box>
                    )
                }): <Typography>Nie znaleziono produktu</Typography>}
            </Box>
            <Footer />
            </>
        
    )
}

export default SearchComponent