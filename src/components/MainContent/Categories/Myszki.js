import { Box, Container, Typography,FormGroup, FormControlLabel, Checkbox, InputBase, Rating, Button} from "@mui/material"
import MainNavBar from "../../Header/MainNavBar"
import CategoriesNavBar from "../../Header/CategoriesNavBar"
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';






const Myszki = () => {

    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [startFilteredProducts, setStartFilteredProducts] = useState([]);

    const [producent, setProducent] = useState({
        Stealseries:false,
        HyperX:false,
        Razer:false
    })
    const [priceOd, setPriceOd] = useState(0);
    const [priceDo, setPriceDo] = useState(0);
    const [status, setStatus] = useState({
        Promocje:false,
        Polecane:false,
        Bestsellers:false,
    })
    const ProducentStealseries = useRef();
    const ProducentHyperX = useRef();
    const ProducentRazer = useRef();
    const StatusPromocje = useRef();
    const StatusPolecane = useRef();
    const StatusBestsellers = useRef();


    
    
    async function fetch(){
      const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/Products.json`)
        setProducts([res.data]);
        console.log(products)
        console.log('fetching');
    }

    useEffect(()=>{
        fetch();
    },[])

    useEffect(()=>{
        if(products.length>0){
            setMyProducts(products.length > 0 ? Object.values(products[0]) : null);
            console.log(myProducts);
            const arr = myProducts.filter((product)=>product.categories === 'mousepad');
            setFilteredProducts(arr);
            setStartFilteredProducts(arr);
            console.log(filteredProducts);
        }
    },[products])

    const searchProducts = (e) => {
        let arr = [...startFilteredProducts];
        console.log(arr);
        console.log(producent.Stealseries);
        console.log(producent.HyperX);
        console.log(producent.Razer);
        
        if(producent.Stealseries == true && producent.HyperX == true){
            const newArr = arr.filter((product) => product.company == 'Steelseries' || product.company == "HyperX");
            console.log(newArr);
            arr = [...newArr];
        }else if(producent.Stealseries == true && producent.Razer == true){
            const newArr = arr.filter((product) => product.company == 'Steelseries' || product.company == "Razer");
            console.log(newArr);
            arr = [...newArr];
        }else if(producent.HyperX == true && producent.Razer == true){
            const newArr = arr.filter((product) => product.company == 'HyperX' || product.company == "Razer");
            console.log(newArr);
            arr = [...newArr];
        }else if(producent.Stealseries == true){
            const newArr = arr.filter((product) => product.company == 'Steelseries');
            console.log(newArr);
            arr = [...newArr];
        }else if(producent.HyperX == true){
            const newArr = arr.filter((product)=>product.company == 'HyperX');
            console.log(newArr);
            arr = [...newArr];
        }else if(producent.Razer == true){
            const newArr = arr.filter((product)=>product.company == 'Razer');
            console.log(newArr);
            arr = [...newArr];
        }
        console.log(arr);
        console.log(status.Promocje);
        console.log(status.Polecane);
        console.log(status.Bestsellers);

        if(status.Promocje && status.Polecane){
            const newArr = arr.filter((product) => product.promocje == true || product.polecane == true);
            console.log(newArr);
            arr = [...newArr];
        }else if(status.Promocje && status.Bestsellers){
            const newArr = arr.filter((product) => product.promocje == true || product.bestseller == true);
            console.log(newArr);
            arr = [...newArr];
        }else if(status.Polecane && status.Bestsellers){
            const newArr = arr.filter((product) => product.polecane == true || product.bestseller == true);
            console.log(newArr);
            arr = [...newArr];
        }else if(status.Promocje == true){
            const newArr = arr.filter((product) => product.promocje == true);
            console.log(newArr);
            arr = [...newArr];
        }else if(status.Polecane == true){
            const newArr = arr.filter((product) => product.polecane == true);
            console.log(newArr);
            arr = [...newArr];
        }else if(status.Bestsellers == true){
            const newArr = arr.filter((product) => product.polecane == true);
            console.log(newArr);
            arr = [...newArr];
        }
        console.log(arr);
        console.log(priceOd,priceDo);
        if(priceOd && priceDo){
            const newArr = arr.filter((product) => product.price > priceOd && product.price < priceDo);
            console.log(newArr);
            arr = [...newArr];
        }

        if(priceOd){
            const newArr = arr.filter((product) => product.price > priceOd);
            console.log(newArr);
            arr = [...newArr];
        }

        if(priceDo){
            const newArr = arr.filter((product) => product.price < priceDo);
            console.log(newArr);
            arr = [...newArr];
        }

        
        setFilteredProducts([...arr]);
        console.log(filteredProducts);
        setPriceOd(0);
        setPriceDo(0);
        e.preventDefault();
    }

    return(
        <>
        <MainNavBar sx={{minWidth: '100%'}}/>
        <CategoriesNavBar />
        <Container sx={{minWidth: '100%', minHeight:'100vh', backgroundColor: 'rgb(240, 238, 238)'}}>
            <Typography sx={{fontFamily: 'Montserrat', color:'black', fontSize:'30px', fontStyle:'italic', paddingTop:'30px', textAlign:'center'}}>Myszki</Typography>
            <Box sx={{display:'flex', flexDirection:{
                xl:'row',
                lg:'row',
                md:'row',
                sm:'column',
                xs:'column'
            }, alignItems:{
                sm:'center',
                xs:'center'}}}>
            <Box sx={{height:'70vh', width:{
                xl:'25vw',
                lg:'30vw',
                md:'45vw',
                sm:'75vw',
                xs:'95vw'
            }, backgroundColor: 'white', borderRadius:'10px', marginLeft:{
                xl:'50px',
                lg:'40px',
                md:'30px',
                sm:'10px',
                xs:'2px'
            }, display:'flex', flexDirection:'column', alignItems:"flex-start", paddingLeft:'20px',paddingTop:'30px', marginTop:'20px'}}>
                <Typography sx={{fontSize: '25px', fontFamily: 'Montserrat'}}>Filtry</Typography>
                <Box>
                    <Typography sx={{fontSize: '15px', fontFamily: 'Montserrat', marginTop:'20px'}} >Producent</Typography>
                    <FormGroup>
                    <FormControlLabel  control={<Checkbox onClick={()=>{setProducent(prevState=>{return{...prevState, Stealseries:!producent.Stealseries}})}}/>}  label="Steelseries" />
                        <FormControlLabel  control={<Checkbox onClick={()=>{setProducent(prevState=>{return{...prevState, HyperX:!producent.HyperX}})}} color="secondary"/>} ref={ProducentHyperX} label="HyperX" />
                        <FormControlLabel  control={<Checkbox onClick={()=>{setProducent(prevState=>{return{...prevState, Razer:!producent.Razer}})}} color="error" />} ref={ProducentRazer} label="Razer" />
                    </FormGroup>
                </Box>
                <Box>
                    <Typography>Cena(zł)</Typography>
                    <Box sx={{display:'flex', marginTop:'5px'}}>
                    <InputBase sx={{border:'1px solid black', borderRadius:'20px', paddingLeft:'10px', width:'150px'}} value={priceOd} onChange={(e)=>{setPriceOd(e.target.value)}} placeholder="od"/>
                    <HorizontalRuleIcon sx={{fontSize:'15px', marginTop:'10px'}} />
                    <InputBase sx={{border:'1px solid black', borderRadius:'20px', paddingLeft:'10px', width:'150px'}} value={priceDo} onChange={(e)=>{setPriceDo(e.target.value)}}placeholder="do"/>
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{fontSize: '15px', fontFamily: 'Montserrat', marginTop:'20px'}} >Status</Typography>
                    <FormGroup>
                        <FormControlLabel  control={<Checkbox onClick={()=>{setStatus(prevState=>{return{...prevState, Promocje:!status.Promocje}})}}/>}  label="Promocje" />
                        <FormControlLabel  control={<Checkbox onClick={()=>{setStatus(prevState=>{return{...prevState, Polecane:!status.Polecane}})}} color="secondary"/>} ref={StatusPolecane} label="Polecane" />
                        <FormControlLabel  control={<Checkbox onClick={()=>{setStatus(prevState=>{return{...prevState, Bestsellers:!status.Bestsellers}})}} color="error" />} ref={StatusBestsellers} label="Bestseller" />
                    </FormGroup>
                </Box>
                <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                <Button variant="contained" color="secondary" sx={{marginBottom:'20px', textAlign:'center', width:'50%'}} onClick={searchProducts}>Szukaj</Button>
                </Box>
            </Box>
            <Box sx={{width:{
                xl:'60vw',
                lg:'60vw',
                md:'50vw',
                sm:'70vw',
                xs:'75vw'
            }, minHeight:{
                xl:'50vh',
                lg:'50vh',
                md:'50vh',
                sm:'40vh',
                xs:'30vh'
            },justifyContent:{
                xl:'center',
                lg:'center',
                md:'center',
                sm:'center',
                xs:'center'
            }, flexDirection:{
                xl:'row',
                lg:'row',
                md:'column',
                sm:'column',
                xs:'column'
            },alignItems:'center',gap:'20px', backgroundColor:'white', borderRadius:'10px', marginTop:'20px', marginLeft:'30px', display:'flex', paddingTop:'20px', paddingBottom:'20px',}}>
               {filteredProducts ? filteredProducts.map((product)=>{
                    return(
                       <Box  className="product" sx={{display:'flex', flexDirection: 'column', alignItems:'center', border: '2px solid rgb(240, 238, 238)', width:{
                        xl:'25vw',
                        lg:'25vw',
                        md:'40vw',
                        sm:'50vw',
                        xs:'60vw'
                    }, height:'40vh', borderRadius:'15px'}}>
                        <Link style={{textDecoration:'none', color:'black', display:' flex', flexDirection:'column', alignItems:'center'}} to={"product/" + product.id}>
                       <img className="product-img" style={{width: '200px', height: '200px'}} src={product.image}></img>
                       <Typography  sx={{paddingBottom: '10px'}}>{product.name}</Typography>
                       <Rating name="read-only" value={5} readOnly></Rating>
                       <Typography >{product.price} zł</Typography>
                       <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:'20px', marginBottom:'20px', marginTop:'10px'}}>
                        <AddShoppingCartIcon sx={{height:'40px', width:'100px'}} />
                        <FavoriteBorderIcon sx={{height:'40px', width:'100px'}} />
                     </Box>
                       </Link>
                   </Box>)
               }): null }
            </Box>
            </Box>

        </Container>
        </>
    )
}

export default Myszki