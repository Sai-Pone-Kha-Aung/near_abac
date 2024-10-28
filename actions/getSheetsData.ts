import { useState, useEffect } from "react";
import { sheetsData } from "@/types/types";
import axios from "axios";

const getSheetsData = () => {
  const [data, setData] = useState<sheetsData[]>();
  const [error, setError] = useState<string>();
  const range = "Sheet1!A1:J";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/postData?range=${encodeURIComponent(range)}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data: sheetsData[] = response.data;
        setData(data);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [range]);

  return { data, error };
};

export default getSheetsData;
