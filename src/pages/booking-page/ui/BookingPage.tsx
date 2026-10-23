import {useParams} from "react-router";
import {useSeanceStore} from "@/entities/Seance";
import {useEffect} from "react";
import {Navbar} from "@/widgets/Navbar";
import {SeatMap} from "@/features/seatMap";


export function BookingPage() {

    const { id } = useParams();
    const seanceId = Number(id);

    const { seances, isLoading, fetchSeances } = useSeanceStore();
    useEffect(() => {
        fetchSeances();
    }, [fetchSeances]);

    const seance = seances.find((seance) => seance.id === seanceId);

    if (!seance) {
        return <div>Сеансы не найдены...</div>
    }

    return (
        <div>
            {isLoading ? <div>Загрузка...</div> :
                <div>
                    <Navbar />
                    <SeatMap />
                </div>
            }
        </div>
    )
}