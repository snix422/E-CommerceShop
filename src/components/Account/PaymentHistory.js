
import { useContext } from "react";
import { currentUser } from "../../Context/currentUser";
import { Container, Typography, TableContainer, TableHead, TableBody, TableCell, TableRow, useStepContext } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"

const PaymentHistory = () => {

    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const user = useContext(currentUser);

    async function fetch(){
      const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/Orders.json`)
        setProducts([res.data]);
    }

    useEffect(()=>{
        fetch();
    },[])


    useEffect(()=>{
        if(products.length>0){
            setMyProducts(products.length > 0 ? Object.values(products[0]) : null);
            if(myProducts){
            const arr = myProducts.filter((product)=>product.id === user.id);
            setFilteredProducts(arr);
            }  
        }
    },[products])


    return(
        <>
        <Container sx={{width:'100vw',height:'100vh',display:'flex',flexDirection:'column', alignItems:'center'}}>
        <Typography>Historia zakupów</Typography>
        <TableContainer alignItems="center" sx={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
                    <TableHead>
                        <TableRow >
                        <TableCell sx={{width:'10vw'}}>Numer płatności</TableCell>
                        <TableCell sx={{width:'10vw'}}>Nazwa przedmiotu</TableCell>
                        <TableCell sx={{width:'10vw'}}>Cena przedmiotu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
        {filteredProducts !== undefined ? filteredProducts.map((item)=>{
            console.log(item);
            return(
    
                        <TableRow>
                            <TableCell sx={{width:{
                                xl:'10vw',
                                lg:'10vw',
                                md:'10vw',
                                sm:'15vw',
                                xs:'20vw'
                            }}}>{item.idOrder}</TableCell>
                            {item.content ? item.content.map((content)=>{
                                console.log(content)
                                return(
                                    <>
                                    <TableCell sx={{width:{
                                xl:'10vw',
                                lg:'10vw',
                                md:'10vw',
                                sm:'15vw',
                                xs:'20vw'}}}>{content.name}</TableCell>
                                    <TableCell sx={{width:{
                                xl:'10vw',
                                lg:'10vw',
                                md:'10vw',
                                sm:'15vw',
                                xs:'20vw'}}}>{content.price}</TableCell>
                                    </>
                                )
                            }):null}
                        </TableRow>
                    
            )
        }):<Typography>Brak zamówień</Typography>}
        </TableHead>
        </TableContainer>
        </Container>
        </>
    )
}

export default PaymentHistory