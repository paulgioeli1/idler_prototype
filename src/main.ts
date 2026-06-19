import StartGame from './game/main';

window.addEventListener('error', (e) => {
    console.error('[GLOBAL ERROR]', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('[UNHANDLED PROMISE]', e.reason);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('[main] DOMContentLoaded, starting game');
    StartGame('game-container');
    console.log('[main] StartGame called');
});
