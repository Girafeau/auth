async function authorize(object) {
    const response = await fetch('/authorization', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    return await response.json();
}

async function create(object) {
    const response = await fetch('/user', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    return await response.json();
}

export {
    authorize,
    create
}
