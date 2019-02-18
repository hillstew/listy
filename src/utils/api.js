const fetchData = async (path, method, data = null) => {
  let params;
  switch (method) {
    case 'DELETE':
      params = { method };
      break
    case 'GET':
      params = data;
      break
    default:
      params = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      };
  }
  
  const response = await fetch(`http://localhost:3001/api/v1/${path}`, params);

  if (response.status === 204) {
    return
  } else if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.statusText}`);
  }
}

export default {
  fetchData,
}