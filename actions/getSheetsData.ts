import { useState, useEffect } from "react";
import { sheetsData } from "@/types/types";
import axios from "axios";

const getSheetsData = () => {
  const [data, setData] = useState<sheetsData[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const range = "Sheet1!A1:J";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Add timestamp to prevent caching
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

    fetchData();
  }, [range]);

  // Add a refresh function to manually trigger data refresh
  const refreshData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    await fetchData();
  };

  return { data, error, loading, refreshData };
};

export default getSheetsData;
