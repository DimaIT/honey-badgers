export function submitLog(data) {
    if (window.__surfly_client_log) {
        __surfly_client_log(data);
    } else {
        console.log('Session seems to be not available, data:', data)
        // const message = {
        //     type: 'session_log',
        //     params: {
        //         type: 'honey-badgers',
        //         details: data,
        //     },
        // };
        // _surfly_parent.postMessage(message, '*');
    }
}
