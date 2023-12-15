import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import MyCalendar from "../calendar/MyCalendar"


interface TLeague {
    ligaid: string,
    nombre: string,
    genero: string
}

export default function MainScreen(){
    const [selectedLeague, setSelectedLeague] = useState<string|null>(null)
    const [allLeagues, setAllLeagues] = useState<TLeague[] | null>(null)
    const [chosendate, setChosenDate] = useState(null)



    function handleSelectedLeagueOnDate(e: React.ChangeEvent<HTMLSelectElement>): void{
        fetch(`http://localhost:3000/teams/liga/`)
        .then(res => res.json)
        .then()
    }


    useEffect(() => {
        fetch("http://localhost:3000/ligas/all")
        .then(res => res.json())
        .then(res => setAllLeagues(res))
    }, [])

    return(
        allLeagues != null?
        <>
            <select name="" id="" onChange={(e) => setSelectedLeague(e.target.value)}>
                {allLeagues.map((league) => (
                    <option key={league.ligaid} value={league.ligaid}>{league.nombre}</option>
                ))}
            </select>
            <MyCalendar />
            <div>

            </div>
        </>
        :
        <span>
            Loading Data
        </span>
    )
}