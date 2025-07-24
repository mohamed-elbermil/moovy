import Btn from '../Button/Button'
import CNC from "../CNC/CNC"

export default function Header() {
    return(
        <div>
            <h1>Lorem ipsum</h1>
            <div className="categorieList">
                <CNC>12 +</CNC>
                <p>Action</p> 
            </div>
            <p>Ceci est une description de film Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor </p>
            <Btn variant='play'>Lecture</Btn>
        </div>
        
    )
}