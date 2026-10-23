import { http, HttpResponse } from "msw";
import { STORAGE_KEYS } from '@/shared/config';
import {mockHall, mockMovie, mockSeance} from "./data";
import type { MockUser } from "./types";

export const handlers = [

    http.get('/api/halls', () => {
        return HttpResponse.json(mockHall);
    }),

    http.get('/api/seances', () => {
        return HttpResponse.json(mockSeance);
    }),

    http.get('/api/seances/:id/seats', ({ params }) => {
        const seanceId = Number(params.id);
        const raw = localStorage.getItem(STORAGE_KEYS.OCCUPIED_SEATS);
        const occupied: Record<string, number[]> = raw ? JSON.parse(raw) : {};
        return HttpResponse.json({ occupied: occupied[seanceId] ?? [] });
    }),

    http.post('/api/seances/:id/seats', async ({ params, request }) => {
        const seanceId = Number(params.id);
        const { seat } = await request.json() as { seat: number };
        const raw = localStorage.getItem(STORAGE_KEYS.OCCUPIED_SEATS);
        const occupied: Record<string, number[]> = raw ? JSON.parse(raw) : {};
        const seatsForSeance = occupied[seanceId] ?? [];

        if (seatsForSeance.includes(seat)) {
            return new HttpResponse(
                JSON.stringify({ message: "Место уже занято" }),
                { status: 409 },
            );
        }

        seatsForSeance.push(seat);
        occupied[seanceId] = seatsForSeance;
        localStorage.setItem(STORAGE_KEYS.OCCUPIED_SEATS, JSON.stringify(occupied));

        return HttpResponse.json({ success: true, seat }, { status: 201 });
    }),

    http.get('/api/movies', () => {
       return HttpResponse.json(mockMovie);
    }),

    http.get('/api/movie/:id', ({ params }) => {
        const { id } = params;

        const movie = mockMovie.find((item) => item.id === Number(id));

        if (!movie) {
            return new HttpResponse(
                JSON.stringify({ message: "Фильм не найден" }),
                {status: 404},
            );
        }
        return HttpResponse.json(movie);
    }),
    http.post('/register', async ({ request }) => {
        const newUser = await request.json() as Omit<MockUser, 'id'>;
        const rawData = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        const users: MockUser[] = rawData ? JSON.parse(rawData) : [];

        const isEmailTaken = users.some((user) =>
            user.email?.toLowerCase() === newUser.email?.toLowerCase());
        const isLoginTaken = users.some((user) =>
            user.login?.toLowerCase() === newUser.login?.toLowerCase());

        if (isEmailTaken) {
            return new HttpResponse(
                JSON.stringify({ message: "Пользователь с такой почтой уже существует!" }),
                { status: 400 },
            );
        }
        if (isLoginTaken) {
            return new HttpResponse(
                JSON.stringify({ message: "Пользователь с таким логином уже сущесвтует"}),
                { status: 400 },
            );
        }
        const userToSave: MockUser = {
            id: Date.now(),
            ...newUser,
        };

        users.push(userToSave);
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));

        return HttpResponse.json({
            success: true,
            message: "Успешная регистрация",
            user: {
                id: userToSave.id,
                login: userToSave.login,
                email: userToSave.email,
            }
        }, { status: 201});

}),
    http.post('/cart', async ({ request }) => {
        const { movieId } = await request.json() as { movieId: number };
        const rawCart = localStorage.getItem(STORAGE_KEYS.TEMPORARY_CART);
        const cart = rawCart ? JSON.parse(rawCart) : [];
        cart.push(movieId);
        localStorage.setItem(STORAGE_KEYS.TEMPORARY_CART, JSON.stringify(cart));
        return HttpResponse.json({success: true, message: "Успешное добавление в корзину"});
    }),
    http.post('/login', async ({ request }) => {
        const { email, password } = await request.json() as Pick<MockUser, 'email' | 'password'>;
        const rawData = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        const users: MockUser[] = rawData ? JSON.parse(rawData) : [];
        const foundUser = users.find((user) => user.email === email && user.password === password);
        if (!foundUser) {
            return new HttpResponse(
                JSON.stringify({ message: "Неверный логин или пароль!" }),
                { status: 400 },
            );
        }
        const Token = `Token ${foundUser.email}`;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, Token);

        return HttpResponse.json({
            success: true,
            token: Token,
            user: {
                id: foundUser.id,
                login: foundUser.login,
                email: foundUser.email,
            }
        })

    })
];
