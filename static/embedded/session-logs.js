export function submitLog(data) {
    const message = {
        type: 'session_log',
        params: {
            type: 'honey-badgers',
            details: data,
        },
    };
    _surfly_parent.postMessage(message, '*');
}
