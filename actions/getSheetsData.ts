// in actions/getSheetsData.ts
import { useState, useEffect } from "react";
import { sheetsData } from "@/types/types";
import axios from "axios";

const getSheetsData = (pollingInterval = 60000) => {
  // Default 1 minute
  const [data, setData] = useState<sheetsData[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const range = "Sheet1!A1:J";

  const fetchData = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `/api/postData?range=${encodeURIComponent(range)}&t=${timestamp}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data: sheetsData[] = response.data;
      setData(data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [range]);

  // Setup polling
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, [range, pollingInterval]);

  // Manual refresh function
  const refreshData = async () => {
    await fetchData();
  };

  return { data, error, loading, refreshData };
};

export default getSheetsData;
