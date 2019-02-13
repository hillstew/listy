const fetchData = async (path, method, data = null) => {
  let params = data ? 
    { 
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    } :
    data;
  
  const response = await fetch(`http://localhost:3001/api/v1/${path}`, params);

  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.statusText}`);
  }
}

export default {
  fetchData,
}