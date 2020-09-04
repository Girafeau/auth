async function authorize(object) {
    const response = await fetch('/request/authorize', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    return await response.json();
}

export {
    authorize
}
