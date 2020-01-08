const httpGetWithCallback = (url, handleResponse) => {
    const request = new XMLHttpRequest()
    request.open("GET", url)
    request.onload = () => {
        if (request.status === 200) {
          const data = JSON.parse(request.responseText)
          handleResponse(data)  
        } else {
          throw new Error(request.statusText)
        }
    }

    request.onerror = e => console.error(e) 
    request.send()
}

const httpGetWithFetch = (url, handleResponse) => {
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
  try {
    let response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    let json = await response.json()
    handleResponse(json)
  } catch (error) {
    console.error(error)
  }
}
*/

/*
const httpGetWithCallbackSync = (url, handleResponse) => {
  const request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.onload = () => {
      if (request.status === 200) {
        const data = JSON.parse(request.responseText)
        handleResponse(data)  
      } else {
          throw new Error(request.statusText)
      }
  }

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