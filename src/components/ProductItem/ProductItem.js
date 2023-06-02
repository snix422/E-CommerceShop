import { Box,Typography,Rating } from "@mui/material"
import {Link} from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext } from "react";
import CartContext from "../../Context/CartContext";

const ProductItem = (props) => {
  
    const {addToCart,addToFav} = useContext(CartContext);
    
    return(
        <Box className="product" sx={{display:'flex', flexDirection: 'column', alignItems:'center',border: '2px solid rgb(240, 238, 238)', borderRadius:'10px', marginBottom:'20px', width:{
            xl:'25vw',
            lg:'25vw',
            md:'25vw',
            sm:'45vw',
            xs:'80vw'
          }}}>
        <Link style={{textDecoration:'none', color:'black', display:' flex', flexDirection:'column', alignItems:'center'}} to={"product/" + props.product.id}>
          <img className='product-img' style={{width: '200px', height: '200px'}} src={props.product.image}></img>
          <Typography  sx={{paddingBottom: '10px', textDecoration:'none', fontFamily:'Montserrat'}}>{props.product.name}</Typography>
          <Rating name="read-only" value={Number(props.product.rating)} readOnly></Rating>
          <Typography sx={{fontFamily:'Montserrat'}}>{props.product.price} zł</Typography>
          </Link>
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:'20px', marginBottom:'20px', marginTop:'10px'}}>
            <AddShoppingCartIcon className="cursorEffect" onClick={()=>addToCart(props.product.id,props.product.name,props.product.price, props.product.image)}sx={{height:'40px', width:'100px'}} />
            <FavoriteBorderIcon className="cursorEffect" onClick={()=>addToFav(props.product.id,props.product.name,props.product.price, props.product.image)}sx={{height:'40px', width:'100px'}} />
          </Box>
      </Box>)
}

export default ProductItem