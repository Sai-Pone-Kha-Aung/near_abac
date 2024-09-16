import { useState, useEffect } from 'react';
import { sheetsData } from '@/types/types';
import { getData } from '@/app/api/postData/route';


const useFetchData = () => {

    const [data, setData] = useState<sheetsData[]>([]);
    const [error, setError] = useState<string>();
    const range = 'Sheet1!A1:K';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/postData?range=${encodeURIComponent(range)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: sheetsData[] = await response.json();
                setData(data);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, [])

    return { data, error };
}

export default useFetchData;