import { TableContainer, TableRow, TableCell } from "@mui/material"

const TableSpecification = (props) => {
    return(
        <TableContainer sx={{marginTop:'30px'}}>
         {props.product.categories === 'mousepad' ?   
            <TableContainer>
            <TableRow sx={{border:'2px solid black'}}>
            <TableCell >Typ myszy</TableCell>
            <TableCell>{props.product.specyfikacja.typmyszy}</TableCell>
            </TableRow> <TableRow sx={{border:'2px solid black'}}>
            <TableCell >Liczba przycisków</TableCell>
            <TableCell>{props.product.specyfikacja.liczbaprzyciskow}</TableCell>
        </TableRow><TableRow sx={{border:'2px solid black'}}>
            <TableCell >Interfejs</TableCell>
            <TableCell>{props.product.specyfikacja.interfejs}</TableCell>
        </TableRow>
        <TableRow sx={{border:'2px solid black'}}>
            <TableCell >Długość przewodu</TableCell>
            <TableCell>{props.product.specyfikacja.dlprzewodu}</TableCell>
        </TableRow>
        <TableRow sx={{border:'2px solid black'}}>
            <TableCell >Łączność</TableCell>
            <TableCell>{props.product.specyfikacja.łączność}</TableCell>
        </TableRow>
        <TableRow sx={{border:'2px solid black'}}>
            <TableCell >Sensor</TableCell>
            <TableCell>{props.product.specyfikacja.sensor}</TableCell>
        </TableRow>
        </TableContainer> : null}
        {props.product.categories === "keyboard" ? <TableContainer><TableRow><TableCell>Typ</TableCell><TableCell>{props.product.specyfikacja.typ}</TableCell></TableRow>
        <TableRow><TableCell>Długość przewodu</TableCell><TableCell>{props.product.specyfikacja.dłprzewodu}</TableCell></TableRow>
        <TableRow><TableCell>Długość</TableCell><TableCell>{props.product.specyfikacja.długość}</TableCell></TableRow>
        <TableRow><TableCell>Interfejs</TableCell><TableCell>{props.product.specyfikacja.interfejs}</TableCell></TableRow>
        <TableRow><TableCell>Klawisze multifunkcyjne</TableCell><TableCell>{props.product.specyfikacja.klawiszemultifunkcyjne}</TableCell></TableRow>
        <TableRow><TableCell>Podświetlenie klawiszy</TableCell><TableCell>{props.product.specyfikacja.podświetlenieklawiszy}</TableCell></TableRow>
        <TableRow><TableCell>Szerokość</TableCell><TableCell>{props.product.specyfikacja.szerokość}</TableCell></TableRow>
        <TableRow><TableCell>Wysokość</TableCell><TableCell>{props.product.specyfikacja.wysokość}</TableCell></TableRow>
        <TableRow><TableCell>Łączność</TableCell><TableCell>{props.product.specyfikacja.łączność}</TableCell></TableRow>
        </TableContainer> : null}
        {props.product.categories === "podkładka"  ? <TableContainer><TableRow><TableCell>Grubość</TableCell><TableCell>{props.product.specyfikacja.grubość}</TableCell></TableRow>
        <TableRow><TableCell>Materiał</TableCell><TableCell>{props.product.specyfikacja.materiał}</TableCell></TableRow>
        <TableRow><TableCell>Szerokość</TableCell><TableCell>{props.product.specyfikacja.szerokość}</TableCell></TableRow>
        <TableRow><TableCell>Wysokość</TableCell><TableCell>{props.product.specyfikacja.wysokość}</TableCell></TableRow>
        </TableContainer> : null}
        {props.product.categories === "headphones"  ? <TableContainer>
        <TableRow><TableCell>Częstotliwość słychawek</TableCell><TableCell>{props.product.specyfikacja.czsłuchawek}</TableCell></TableRow>
        {props.product.specyfikacja.odłącznymikrofon ? <TableRow><TableCell>Odłączany mikrofon</TableCell><TableCell>{props.product.specyfikacja.odłącznymikrofon}</TableCell></TableRow> : null}
        {props.product.specyfikacja.pasmoprzenoszeniasluchawek ? <TableRow><TableCell>Pasmo przenoszenia słuchawek</TableCell><TableCell>{props.product.specyfikacja.pasmoprzenoszeniasłuchawek}</TableCell></TableRow> : null }
        <TableRow><TableCell>Wbudowany mikrofon</TableCell><TableCell>{props.product.specyfikacja.wbudowanymikrofon}</TableCell></TableRow>
        <TableRow><TableCell>Łączność</TableCell><TableCell>{props.product.specyfikacja.łączność}</TableCell></TableRow>
        <TableRow><TableCell>Średnica membrany</TableCell><TableCell>{props.product.specyfikacja.śrmembrany}</TableCell></TableRow>
        </TableContainer> : null}
       </TableContainer>
    )

}

export default TableSpecification