// frontend/src/utils/api.js
export const compileCode = async (code) => {
    const response = await fetch('http://127.0.0.1:8080/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });
    const result = await response.json();
    return result;
  };
  