async function authorize(object) {
    const response = await fetch('http://localhost:8000/request/authorize', {
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