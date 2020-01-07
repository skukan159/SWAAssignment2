const httpRequestWithCallback = (url, httpMethod, handleResponse) => {
    const request = new XMLHttpRequest()
    request.open(httpMethod, url)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }

        const data = JSON.parse(request.responseText)
        handleResponse(data)
    }

    request.onerror = e => console.error(e) 
    request.send()
}

const httpRequestWithFetch = (url, handleResponse) => {
  fetch(url)
    .then(response => response.json())
    .then(data => handleResponse(data))
    .catch(console.error)
}

const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

export { httpRequestWithCallback, httpRequestWithFetch, groupBy }