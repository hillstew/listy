const fetchData = async (path, data = '', method) => {
  const response = await fetch(`http://localhost:3001/api/v1/${path}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.statusText}`);
  }
}

export default {
  fetchData,
}