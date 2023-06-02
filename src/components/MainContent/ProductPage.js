import { Container, Typography,Box, Button, BottomNavigation, BottomNavigationAction, } from "@mui/material"
import {useState,useEffect, useContext} from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import MainNavBar from "../Header/MainNavBar";
import CategoriesNavBar from "../Header/CategoriesNavBar";
import { ShoppingCart } from "../../Context/ShoppingCart";
import TableSpecification from "./Categories/TableSpecification";
import ProductComments from "./Categories/ProductComments";
import CartContext from "../../Context/CartContext";

const ProductPage = () => {
    
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [value, setValue] = useState('Opis');
    const [open, setOpen] = useState({
        opis:true,
        specyfikacja:false,
        opinie:false
    })

    const shoppingCart = useContext(ShoppingCart);

    const {addToCart} = useContext(CartContext);

    let {id}  = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
      }

    async function fetch(){
        const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/Products.json`)
          setProducts([res.data]);
      }
  
      useEffect(()=>{
          fetch();
      },[])
  
      useEffect(()=>{
              setMyProducts(products.length > 0 ? Object.values(products[0]) : null);
              if(myProducts){
                const arr = myProducts.filter((product)=>product.id == id);
                const product = arr[0];
                setProduct(product);
                }
      },[products])

     
      if(product){
        const visitedItem = localStorage.getItem('visitedItem');
        if(visitedItem){
            localStorage.removeItem('visitedItem');
            localStorage.setItem('visitedItem', product.categories);
        }else{
            localStorage.setItem('visitedItem', product.categories);
        }
      }
     
    return(
        <>
        <MainNavBar sx={{minWidth: '100%'}}/>
        <CategoriesNavBar />
        <Container sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            {product ?<Box sx={{display:'flex', flexDirection:{
                xl:'row',
                lg:'row',
                md:'row',
                sm:'column',
                xs:'column'
            }, gap:{xl:'150px', lg:'50px', md:'10px',sm:'10px',xs:'10px'}, minWidth:'99vw', justifyContent:'center', alignItems:{lg:'center',md:'center',sm:'center', xs:'center'}, maxWidth:'100vw'}}>
                <Box component='img' sx={{width:{
                    xl:'500px',
                    lg:'400px',
                    md:'400px',
                    sm:'500px',
                    xs:'350px'
                },height:{
                    xl:'500px',
                    lg:'400px',
                    md:'400px',
                    sm:'500px',
                    xs:'350px'
                }
                , marginTop:'70px', border:'2px solid rgb(240, 238, 238)', borderRadius:'10px'}} src={product.image}></Box>
                <Box>
                    <Typography sx={{marginTop:'150px', fontFamily:'Montserrat', fontSize:'40px', minWidth:'300px', textAlign:'center'}}>{product.name}</Typography>
                    <Typography sx={{marginTop:'10px', fontFamily:'Montserrat', fontSize:'25px',textAlign:'center'}}>Od: {product.company}</Typography>
                </Box>
                <Box sx={{ borderRadius:'10px', width:{
                    xl:'300px',
                    lg:'250px',
                    md:'200px',
                    sm:'300px',
                    xs:'400px'
                }, height:'150px', marginTop:'130px', display:'flex', flexDirection:'column', alignItems:'flex-end', border:'2px solid rgb(240, 238, 238)', paddingRight:'20px', paddingTop:'30px'}}>
                    <Typography sx={{fontFamily:'Montserrat', fontSize:'30px'}}>{product.price} zł</Typography>
                    <Button variant="contained" color="success" sx={{marginTop:'10px'}} onClick={()=>addToCart(product.id,product.name,product.price,product.image)}>Dodaj do koszyka</Button>
                </Box>
            </Box> : null }
            {product ? <BottomNavigation
                showLabels
                sx={{marginTop:'100px', width:'100vw', height:'100px', border:'2px solid rgb(240, 238, 238)', display:'flex', justifyContent:'center'}}
                value={value}
                size="large"
                onChange={(event, newValue) => {
                setValue(newValue);
                }}>
            <BottomNavigationAction sx={{fontWeight:'bold', fontFamily:'Montserrat'}} label="Opis" value="Opis" onClick={()=>{
                setOpen(previousState => {return{...previousState, opis:true, specyfikacja:false, opinie:false} })
            }}/>
            <BottomNavigationAction label="Specyfikacja" value="Specyfikacja" onClick={()=>{
                 setOpen(previousState => {return{...previousState, opis:false, specyfikacja:true, opinie:false} })
            }} />
            <BottomNavigationAction label="Opinie" value="Opinie"  onClick={()=>{
                 setOpen(previousState => {return{...previousState, opis:false, specyfikacja:false, opinie:true} })
            }}/>
            </BottomNavigation>
            : null}
            {product && open.opis == true ? <Box>
                <Typography sx={{fontFamily:'Montserrat', fontSize:'20px', marginTop:'30px', marginBottom:'30px'}}>{product.description}</Typography>
            </Box> : null}
            {product && open.specyfikacja == true ? 
            <Box>
                <TableSpecification product={product} />
            </Box>
            : null}
            
            {product && open.opinie == true ? <Box>
                <ProductComments productId={product.id} />
            </Box> : null}
            
        </Container>

        </>
    )
}

export default ProductPage