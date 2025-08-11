export function getErrorMessage(error) {
    return alert(error.response.data.status_message)
}

export function getResultData(response) {
    return response.data.result
}