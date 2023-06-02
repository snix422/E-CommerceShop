import  { Typography, AppBar, Stack, IconButton, Paper, InputBase, Dialog, Menu, MenuItem, Drawer, Box, Button, setRef, Badge } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { currentUser } from '../../Context/currentUser';
import CartContext from '../../Context/CartContext';
import axios from 'axios'

const MainNavBar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [isDrawerShopOpen, setIsDrawerShopOpen] = useState(false);
    const [isDrawerFavouriteOpen, setIsDrawerFavouriteOpen] = useState(false);
    const [changeAmount, setChangeAmount] = useState(false);
    const [sum, setSum] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [displaySearch, setDisplaySearch] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [arr,setArr] = useState([]);
 
    const {addToCart, removeFromCart, items, totalPrice, removeAllItemsCart, favItems, addToFav, removeFav} = useContext(CartContext);
    console.log(items,'context');
    console.log(totalPrice, 'totalPrice')

    if(items){
      localStorage.setItem('totalPrice', Number(totalPrice));
      localStorage.setItem('totalItems', JSON.stringify(items));
    }

    if(favItems){
      localStorage.setItem('favItems', JSON.stringify(favItems));
    }
   
    const navigate = useNavigate();
    const user = useContext(currentUser);

    async function fetch(){
      const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/Products.json`)
        setProducts([res.data]);
        console.log(products);
    }

    useEffect(()=>{
        fetch();
    },[])

    useEffect(()=>{
      if(products.length>0){
          setMyProducts(products.length > 0 ? Object.values(products[0]) : null);
      }
  },[products])



    const handleClose = () => {
        setOpen(!open);
    }


    const handleClick = (event) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
      };

      const moveToLogin = () => {
        navigate('/zaloguj')
      }

      const moveToRegister = () => {
        navigate('/rejestracja')
      }

      const moveToHome = () => {
        navigate('/')
      }

      const moveToHistoryPayment = () => {
        navigate('/historypayment')
      }

      const logOut = () => {
        user.auth = false;
        user.email = "";
        user.password = '';
        navigate('/');
      }

      const takeSearchTerm = (e) =>{
        setSearchTerm(e.target.value);
        console.log(searchResult);
      }

      const clickSearch = () => {
        setDisplaySearch(true);
      }

      const searchProduct = () => {
        console.log(myProducts);
       console.log('test');
       console.log(searchTerm);


       if(searchTerm.length === 0) {
        navigate('/')
       }else{
        const item = myProducts.filter(product=>product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(item);
        setSearchTerm('');
        localStorage.setItem('searchItem', JSON.stringify(item));
        console.log(localStorage.getItem('searchItem'));
        navigate('/search');
       }

      }
      
      /*useEffect(()=>{
        if(shoppingCart){
          setListProducts(shoppingCart);
        }
        console.log(listProducts,0);
      },[])*/

      /*useEffect(()=>{
        console.log(shoppingCart);
        const sumOfPrice = shoppingCart.map((product)=>{return product.price});
        console.log(sumOfPrice);
        setSumPrice(sumOfPrice);
      },[changeAmount])*/
   
    return (
        <AppBar position='static' color='primary' sx={{margin: '0', backgroundColor: 'white', color: 'black', minHeight: '10vh', display: 'flex', flexDirection:'column', justifyContent:  'center', alignItems: 'center', width:'100%'}}>
            <Box sx={{display:'flex', alignItems:'center'}}>
            <IconButton size='large'>
                <HomeIcon fontSize='200px' onClick={moveToHome} />
            </IconButton>
            <Paper component={'form'} sx={{marginRight: {
              xl: '400px',
              lg: '300px',
              md:'200px',
              sm:'80px',
              xs:'30px'
            }, marginLeft: {
              xl: '400px',
              lg: '300px',
              md:'200px',
              sm:'80px',
              xs:'30px'
            },display:{
              xl:'block',
              lg:'block',
              md:'block',
              sm:'block',
              xs:'none'
            }, borderRadius: '25px', maxHeight:'40px'}}>
                <InputBase onChange={takeSearchTerm} value={searchTerm} sx={{borderRadius: '50%', height:'100%', width: {
                  xl:'350px',
                  lg:'400px',
                  md:'300px',
                  sm:'230px',
                  xs:'120px'
                }, paddingLeft:'20px',}} placeholder='Search...' />
                <IconButton>
                    <SearchIcon onClick={searchProduct}/>
                </IconButton>
            </Paper>
            {displaySearch ? <IconButton sx={{display:{
              xl:'none',
              lg:'none',
              md:'none',
              sm:'none',
              xs:'block'
            }}}><CloseIcon onClick={()=>{setDisplaySearch(false)}}></CloseIcon></IconButton> : <IconButton sx={{display:{
              xl:'none',
              lg:'none',
              md:'none',
              sm:'none',
              xs:'block'
            }}}><SearchIcon onClick={()=>{setDisplaySearch(true)}}></SearchIcon></IconButton>}
            <Stack direction={'row'}>
            <IconButton size='large' sx={{display:'flex',flexDirection:'column'}}>
                    <AccountBoxIcon onClick={handleClick} fontSize='200px'/>
                    {user.auth == true ? <Box><Typography sx={{fontFamily:'Montserrat'}}>{user.email}</Typography><Menu
                     anchorEl={anchorEl}
            id="basic-menu"
            open={open}
            onClose={handleClose} >
        <MenuItem onClick={moveToHistoryPayment}>Historia Zamówień</MenuItem>
        <MenuItem onClick={logOut}>Wyloguj się</MenuItem>
        <MenuItem onClick={handleClose}>Zamknij</MenuItem>
        
      </Menu></Box> : <Menu
                     anchorEl={anchorEl}
            id="basic-menu"
            open={open}
            onClose={handleClose} >
        <MenuItem onClick={moveToLogin}>Zaloguj się</MenuItem>
        <MenuItem onClick={moveToRegister}>Załóż konto</MenuItem>
        <MenuItem onClick={handleClose}>Zamknij</MenuItem>
        
      </Menu>}
                    
            
            </IconButton>
            <IconButton size='large'>
                   <Badge badgeContent={items.length} color="secondary"><ShoppingCartIcon fontSize='200px' onClick={()=>{setIsDrawerShopOpen(!isDrawerShopOpen)}}/></Badge>
            </IconButton>
            </Stack>
            <Drawer anchor='right' open={isDrawerShopOpen} >
              <Box sx={{width:{
                xl:'30vw',
                lg:'30vw',
                md:'40vw',
                sm:'50vw',
                xs:'60vw'
              }}}>
                  <Box sx={{display:'flex', marginTop:'20px', marginLeft:'10px'}}>
                    <ArrowBackIcon sx={{marginTop:'5px'}} onClick={()=>{setIsDrawerShopOpen(false)}}></ArrowBackIcon>
                    <Typography  sx={{fontFamily:'Montserrat', fontSize:'25px', marginLeft:'5px'}}>Twój koszyk</Typography>
                  </Box>
                   {items ? items.map((product)=>{
                    console.log(product);
                      return(
                        <Box style={{marginTop:'50px', marginLeft:'10px'}}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                        <img src={product.image} style={{width:'75px', height:'75px'}}></img>
                        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'20px'}}>
                          <Typography sx={{fontFamily:'Montserrat'}}>{product.name}</Typography>
                          <Box sx={{display:'flex', gap:'5px'}}>
                            <RemoveIcon className="cursorEffect" color='error' onClick={()=>{removeFromCart(product.id)
                              setRefresh(!refresh)}}></RemoveIcon>
                            <Typography sx={{fontFamily:'Montserrat'}}>{product.quantity}</Typography>
                            <AddIcon className="cursorEffect" color="success" onClick={()=>{addToCart(product.id,product.name,product.price)
                            setRefresh(!refresh)
                            console.log('12')}}></AddIcon>
                          </Box>
                         
                        </Box>
                        <Typography sx={{marginLeft:'65px', fontFamily:'Montserrat'}}>Cena: {product.price} zł/szt</Typography>
                        <DeleteIcon sx={{marginLeft:'20px'}}></DeleteIcon>
                    </Box>
                    </Box>
                      )
                  }):null}
                  <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <Typography sx={{textAlign:'center', marginTop:'50px', fontSize:'25px', fontFamily:'Montserrat'}}>Do zapłaty: {totalPrice}zł </Typography>
                  <Link to='/acceptbuy'><Button variant="contained" color="success" sx={{marginTop:'20px', fontFamily:'Montserrat'}} onClick={()=>{removeAllItemsCart()
                   setRefresh(!refresh)
                  }}>Zapłać</Button></Link>
                  </Box>
              </Box>
            </Drawer>
            <IconButton size='large'>
                   <Badge badgeContent={favItems.length} color="secondary"><FavoriteBorderIcon fontSize='200px' onClick={()=>{setIsDrawerFavouriteOpen(!isDrawerFavouriteOpen)}} /></Badge>
            </IconButton>
            <Drawer anchor='right' open={isDrawerFavouriteOpen} >
              <Box sx={{width:{
                xl:'30vw',
                lg:'30vw',
                md:'40vw',
                sm:'50vw',
                xs:'60vw'
              }}}>
                <Box sx={{display:'flex', marginTop:'20px', marginLeft:'10px'}}>
                    <ArrowBackIcon sx={{marginTop:'5px'}} onClick={()=>{setIsDrawerFavouriteOpen(false)}}></ArrowBackIcon>
                    <Typography  sx={{fontFamily:'Montserrat', fontSize:'25px', marginLeft:'5px'}}>Twoje Ulubione</Typography>
                  </Box>
            </Box>
            {favItems ? favItems.map((product)=>{
                    console.log(product);
                      return(
                        <Box style={{marginTop:'50px', marginLeft:'10px'}}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                        <Link style={{textDecoration:'none', color:'black', display:' flex', flexDirection:'column', alignItems:'center'}} to={"product/" + product.id}>
                        <img src={product.image} style={{width:'75px', height:'75px'}}></img></Link>
                        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'20px'}}>
                          <Typography sx={{fontFamily:'Montserrat'}}>{product.name}</Typography>
                        </Box>
                        <Typography sx={{marginLeft:'65px', fontFamily:'Montserrat'}}>Cena: {product.price} zł/szt</Typography>
                        <DeleteIcon className="cursorEffect" onClick={()=>{removeFav(product.id)
                        setRefresh(!refresh)}} sx={{marginLeft:'20px'}}></DeleteIcon>
                    </Box>
                    </Box>
                      )
                  }):null}
            </Drawer>
            </Box>
            {displaySearch ? <Paper component={'form'} sx={{marginRight: {
              xl: '400px',
              lg: '300px',
              md:'200px',
              sm:'80px',
              xs:'30px'
            }, marginLeft: {
              xl: '400px',
              lg: '300px',
              md:'200px',
              sm:'80px',
              xs:'30px'
            },display:{
              xl:'none',
              lg:'none',
              md:'none',
              sm:'none',
              xs:'block'
            }, borderRadius: '25px', marginBottom:'5px'}}>
                <InputBase onChange={takeSearchTerm} value={searchTerm} sx={{borderRadius: '50%',maxHeight:'10px', width: {
                  xl:'550px',
                  lg:'400px',
                  md:'300px',
                  sm:'230px',
                  xs:'120px'
                }, paddingLeft:'20px'}} placeholder='Search...' />
               
                <IconButton>
                    <SearchIcon onClick={searchProduct}/>
                </IconButton>
            </Paper> : null }
           
        </AppBar>
    )
}

export default MainNavBar