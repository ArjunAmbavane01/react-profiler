import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const fetchData = async (url) => {
        setisLoading(true);
        const response = await fetch(url);
        const respData = await response.json();
        setData(respData);
        setisLoading(false);
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return { data, isLoading };
}

export default useFetch;

