import { useContext, useEffect, useState } from "react"
import {currentUser} from '../../../Context/currentUser';
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProductComments = (props) => {

    const [termComment, setTermComment] = useState('');
    const [comments, setComments] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [isAddComment, setIsAddComment] = useState(0);

    const user = useContext(currentUser);
   
    async function fetch(){
        const res = await axios.get(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/ProductsComment.json`)
            setComments([res.data]);
      }

    fetch();

    useEffect(()=>{
        if(comments.length){
            const myComms = Object.values(comments[0]);
            const arr = myComms.filter((product)=>product.productId === props.productId);
            setMyComments(arr);
        }
    },[comments])

    const addOpinie = () => {
        if(termComment){
            axios.post(`https://gamingshop-4b668-default-rtdb.europe-west1.firebasedatabase.app/ProductsComment.json`,{
                productId: props.productId,
                userId: user.idUser,
                userEmail: user.email,
                opinion: termComment  
            })
            setTermComment('');
            setIsAddComment(isAddComment+1);
            fetch();
        }
    }

    

    return(
        <Container sx={{marginBottom:'50px', marginTop:'30px'}}>{user.auth === true ?  <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}><TextField
            id="outlined-multiline-flexible"
            label="Wpisz swój komentarz"
            multiline
            minRows={4}
            maxRows={8}
            sx={{width:'500px'}}
            onChange={(e)=>{setTermComment(e.target.value)}}
            value={termComment}
          /><Button variant="contained" sx={{marginTop:'10px', width:'300px'}} onClick={addOpinie}>Dodaj opinie</Button></Box> : <Typography sx={{fontFamily:'Montserrat', fontSize:'30px', marginBottom:'30px'}}>Aby dodać opinię musisz być zalogowany</Typography>}
          {myComments ? myComments.map((comm)=>{
            return(
            <Box sx={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'50px'}}><Box sx={{display:'flex', gap: '10px'}}><AccountCircleIcon></AccountCircleIcon><Typography sx={{fontFamily:'Montserrat', fontWeight:'bold'}}>{comm.userEmail}</Typography></Box><Typography sx={{fontFamily:'Montserrat'}}>{comm.opinion}</Typography><hr></hr></Box>)
          }): null}
          </Container>
        
    )
}

export default ProductComments