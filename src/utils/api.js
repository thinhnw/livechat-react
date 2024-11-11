/**
 * Fetch API abstraction with token and proper redirect using React Router's useNavigate
 * @param {string} endpoint - API endpoint (e.g., '/data')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} - Returns a promise with the API response
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? options.body : undefined,
    });
    let data = await response.json();

    if (response.status === 401) {
      throw new UnauthorizedError(data.detail);
    }

    if (!response.ok) {
      console.log(data)
      throw new Error(data.detail);
    }

    return data
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}
