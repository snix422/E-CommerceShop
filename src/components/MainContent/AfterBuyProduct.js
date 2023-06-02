import { Link } from "react-router-dom"

const AfterBuyProduct = () => {
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh', width:'100vw'}}>
        <h3 style={{fontFamily:'Montserrat', fontSize:'30px', color:'green'}}>Dziękujemy za zaufanie.</h3>
        <Link style={{marginTop:'20px', color:'red', fontFamily:'Montserrat', fontSize:'20px'}} to='/'>Powrót na stronę główną</Link>
        </div>
    )
}

export default AfterBuyProduct