import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import './styles/index.scss';

async function enableMocking() {
    if (import.meta.env.MODE !== 'development') return
        const { worker } = await import('../shared/api/mock/browser')
    return worker.start({
        onUnhandledFrame: 'bypass',
    });
}
enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
})


