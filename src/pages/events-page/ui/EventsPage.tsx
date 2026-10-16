import {Navbar} from "@/widgets/Navbar";
import styles from './EventsPage.module.scss';


export function EventsPage() {

    return (
        <div>
            <Navbar />
            <div className={styles.cardContainer}>
                <div className={styles.mainCard}>
                    <ul className={styles.eventContainer}>

                        <h2 className={styles.eventTitle}>У нас открылся IMAX зал</h2>
                        <div className={styles.eventContent}>
                        <img
                            src="https://images.ctfassets.net/c4ucztjx9pmu/7Kbdc5cgeH8GxSTxcaKaIg/fcb67c1d6c9c1de6c8dbfbe8e585589e/PM1110_GlobalNav_Images_V1_IMAXTheatres_300dpi.png"
                            alt="imax"
                            className={styles.eventImg}
                        />
                        <li className={styles.eventInf}>У нас появился зал с технологией IMAX! Зал вмещает в себя
                            150 человек и дает незабываемые впечатления от просмотра кино.</li>
                        </div>
                    </ul>


                        <ul className={styles.eventContainer}>
                            <h2 className={styles.eventTitle}>Попкорн-комбо для двоих!</h2>
                            <div className={styles.eventContent}>
                                <img
                                    src="https://offloadmedia.feverup.com/secretatlanta.co/wp-content/uploads/2025/01/09095000/shutterstock_2347856967-1024x683.jpg"
                                    alt="popcorn"
                                    className={styles.eventImg}
                                />
                                <li className={styles.eventInf}> Покупайте большой соленый попкорн и два напитка по
                                    цене одного. Наслаждайтесь просмотром любимых фильмов вместе с друзьями
                                    со скидкой 30% весь октябрь!</li>
                            </div>
                        </ul>

                    <ul className={styles.eventContainer}>
                        <h2 className={styles.eventTitle}>Обновленные VIP места</h2>
                        <div className={styles.eventContent}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhp6oqMpwN7J71S3ofrnMDwL7aHWR5soipWBrOeC2Zc02a1h69duta5lI&s=10"
                                alt="vip seats"
                                className={styles.eventImg}
                            />
                            <li className={styles.eventInf}>
                                Открыли новые VIP-места с огромными раскладными диванами и личными столиками.
                                Бронируй комфорт, которого ты заслуживаешь.
                            </li>
                        </div>
                    </ul>

                    <ul className={styles.eventContainer}>
                        <h2 className={styles.eventTitle}>Новая аудио-система!</h2>
                        <div className={styles.eventContent}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPu0Vsyx7rlKyADS6j0Zd6QQ2JnFWZli5ZYJrdquiA-IOadYBH16AMrEs&s=10"
                                alt="audio system"
                                className={styles.eventImg}
                            />
                            <li className={styles.eventInf}>
                                Мы полностью обновили аудиосистему в третьем и четвертом залах.
                                Кристально чистый трехмерный звук окружит вас со всех сторон — вы буквально
                                услышите каждое движение на экране.
                            </li>
                        </div>
                    </ul>

                </div>

            </div>
        </div>
    )
}