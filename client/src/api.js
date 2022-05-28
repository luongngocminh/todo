const URL = 'http://localhost:8000/api/todo';

export function getTodo() {
  return fetch(URL);
}

export function addTodo(description) {
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ description: description }),
    headers: {
      "content-type": "application/json"
    }
  })
}

export function updateTodo(id, status) {
  return fetch(URL, {
    method: 'PATCH',
    body: JSON.stringify({ id: id, status: status }),
    headers: {
      "content-type": "application/json"
    }
  })
}

export function deleteTodo(id) {
  return fetch(URL, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: {
      "content-type": "application/json"
    }
  })
}