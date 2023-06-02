import { Container, Typography,} from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductPage from "./ProductPage"
import ProductItem from "../ProductItem/ProductItem"

const Bestsellers = () => {

    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    async function fetch(){
      const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/Products.json`)
        setProducts([res.data]);
        console.log(products)
    }

    useEffect(()=>{
        fetch();
    },[])

    useEffect(()=>{
        if(products.length>0){
            setMyProducts(products.length > 0 ? Object.values(products[0]) : null);
            if(myProducts){
            const arr = myProducts.filter((product)=>product.bestseller === true);
            setFilteredProducts(arr);
            }
           
        }
    },[products])

    return(
        
        <Container sx={{display: 'flex', flexDirection:'column', justifyContent: 'flex-start',alignItems:'center', width:'80vw', backgroundColor:'white', borderRadius:'10px', marginTop:'10px', width:{
            xl:'80vw',
            lg:'80vw',
            md:'80vw',
            sm:'90vw',
            xs:'95vw'
        }}}>
            <Typography sx={{marginBottom:'20px', marginTop:'10px', fontFamily:'Montserrat', fontSize:'30px'}}>Bestsellery</Typography>
            <Container sx={{display:'flex', justifyContent: 'center', gap:'20px', flexWrap: 'wrap'}}>
            { filteredProducts !== null ? filteredProducts.map((product)=>{
                return(
                  <ProductItem product={product} />)
            })
            : null}
            </Container>
        </Container>
        
    )
}

export default Bestsellers