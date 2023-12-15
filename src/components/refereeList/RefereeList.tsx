import { useState } from "react"

interface TReferee {
    usuarioid: string,
    nombre: string,
    apellidos: string,
    email: string,
    genero: string,
    usuarioImg: null | string,
    isActive: boolean
}



export default function RefereeLists(){

    const [referees, setReferees] = useState<TReferee[] | null>(null)

    function getReferees() : void{
        fetch('http://localhost:3000/users/role/arbitro')
        .then(res => res.json())
        .then(res => console.log(res))
    }

    return(
        <></>
    )
}