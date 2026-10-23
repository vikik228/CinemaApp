import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Button, Modal} from "antd";
import {useHallStore} from "@/entities/Hall";
import {useSeanceStore} from "@/entities/Seance";
import QRCode from 'react-qr-code';
import styles from "./SeatMap.module.scss";


export function SeatMap() {

    const { halls, fetchHalls } = useHallStore();
    useEffect(() => {
        fetchHalls();
    }, [fetchHalls]);

    const { seances, fetchSeances } = useSeanceStore();
    useEffect(() => {
        fetchSeances();
    }, [fetchSeances]);

    const [pendingSeat, setPendingSeat] = useState<number | null>(null);
    const [isPurchased, setIsPurchased] = useState<boolean>(false);
    const [occupied, setOccupied] = useState<number[]>([]);

    const { id } = useParams();
    const seanceId = Number(id);

    useEffect(() => {
        if (!seanceId) return;
        fetch(`/api/seances/${seanceId}/seats`)
            .then((res) => res.json())
            .then((data: { occupied: number[] }) => setOccupied(data.occupied))
            .catch(console.error);
    }, [seanceId]);

    const seance = seances.find((seance) => seance.id === seanceId);
    const hall = halls.find((hall) => hall.id === seance?.hallId);

    if (!seance || !hall) {
        return <div>Загрузка зала...</div>;
    }

    const seats = Array.from({ length: hall.totalSeats }, (_, i) => i + 1);

    const handleConfirm = async () => {
        if (pendingSeat === null) return;

        const res = await fetch(`/api/seances/${seanceId}/seats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seat: pendingSeat }),
        });

        if (!res.ok) {
            const data = await res.json();
            alert(data.message ?? 'Место уже занято');
            setPendingSeat(null);
            return;
        }

        setOccupied((prev) => [...prev, pendingSeat]);
        setPendingSeat(null);
        setIsPurchased(true);
    };

    return (
        <div className={styles.pageContainer}>
            <h1>{hall.name}</h1>
            <h3>{hall.totalSeats} всего мест</h3>
            <div className={styles.wrapper}>
                <div className={styles.mainCard}>
                    {seats.map((seat) => {
                        const isOccupied = occupied.includes(seat);

                        return (
                            <button
                                key={seat}
                                disabled={isOccupied}
                                className={`${styles.seatButton}${isOccupied ? ` ${styles.occupiedSeat}` : ''}`}
                                onClick={() => setPendingSeat(seat)}
                            >
                                {seat}
                                <br />
                                <div>{isOccupied ? 'занято' : `${seance.price} руб.`}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Modal
                title="Вы уверены в покупке?"
                open={pendingSeat !== null}
                onCancel={() => setPendingSeat(null)}
                footer={[
                    <Button key="no" onClick={() => setPendingSeat(null)}>
                        Нет
                    </Button>,
                    <Button key="yes" type="primary" onClick={handleConfirm}>
                        Да
                    </Button>,
                ]}
            >
                <div>Место {pendingSeat}</div>
            </Modal>

            <Modal
                title="Покупка"
                open={isPurchased}
                onCancel={() => setIsPurchased(false)}
                footer={null}
            >
                <h2>Ваш билет:</h2>
                <QRCode value={`id:${seance.id.toString()} 
                         id фильма:${seance.id.toString()}
                         Зал:${seance.id.toString()}
                         Время:${seance.time.toString()}
                                `}
                />
            </Modal>
        </div>
    )

}
