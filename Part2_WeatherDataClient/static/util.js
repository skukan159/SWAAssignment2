const httpGetWithCallback = (url, handleResponse) => {
    console.log(`[${new Date().toISOString()}]: XMLHttpRequest at endpoint ${url}`)
    const request = new XMLHttpRequest()
    request.open("GET", url)
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            const data = JSON.parse(request.responseText)
            handleResponse(data)  
          } else {
            throw new Error(`[${new Date().toISOString()}]: HTTP response: ${request.status} ${request.statusText}`)
          }
        }
    }
    request.ontimeout = () => console.log(`[${new Date().toISOString()}]: HTTP request timed out`)
    request.onerror = e => console.error(`[${new Date().toDateString()}]: ${e}`)
    request.send()
}

const httpGetWithFetch = (url, handleResponse) => {
  console.log(`[${new Date().toISOString()}]: Promise at endpoint ${url}`)
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error(response.statusText)
  })
  .then(handleResponse)
  .catch(error => console.error(error))
}

/*
async function httpGetWithFetch(url, handleResponse) {
  console.log(`[${new Date().toISOString()}]: Promise at endpoint ${url}`)
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const json = await response.json()
    handleResponse(json)
  } catch (error) {
    console.error(error)
    console.log("error")
  }
}
*/

/*
const httpGetWithCallbackSync = (url, handleResponse) => {
  console.log(`[${new Date().toISOString()}]: XMLHttpRequest at endpoint ${url}`)
  const request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.onload = () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText)
        handleResponse(data)  
      } else {
          throw new Error(`Ready state: ${request.readyState} HTTP response: ${request.status} ${request.statusText}`)
      }
  }
  request.ontimeout = () => console.log("HTTP request timed out")
  request.onerror = e => console.error(e) 
  request.send()
}
*/

const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

export { httpGetWithCallback, httpGetWithFetch, groupBy }
