import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const useFetch = (url, options = {}) => {

  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const abortCont = new AbortController();

    const fetchData = async () => {
      const res = await apiFetch(url, { ...options, signal: abortCont.signal })
      setData(res)
      setIsPending(false)
      setError(null)
    }

    fetchData()
      .catch(err => {
        if (err.name !== "AbortError") {
          setError(err.message)
          setIsPending(false)
          if (err.name === "Unauthorized") {
            localStorage.removeItem("access_token")
            console.log("Unauthorized");
            
            navigate("/login")
          }
        }
      })
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error }
}

export default useFetch;