import Tabe from "./components/Tabe";
import "./App.css";
import SymptomSideBar from "./components/SymptomSideBar";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [responseData, setResponseData] = useState<string[]>([]);
  const [responseDataFiltered, setResponseDataFiltered] = useState<{
    [key: string]: string[];
  }>({});
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/getSymptoms/");
      const responseFiltered = await axios.get(
        "http://127.0.0.1:8000/getFiltredData/"
      );
      const dataFromDb = responseFiltered?.data;
      setResponseData(response.data);
      setResponseDataFiltered(dataFromDb);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataFromBackend();
  }, []);
  return (
    <div className="App">
      <SymptomSideBar
        symptomsFilterd={responseDataFiltered}
        symptoms={[...JSON.parse(JSON.stringify(responseData))]}
      />
      <Tabe symptoms={[...JSON.parse(JSON.stringify(responseData))]} />
    </div>
  );
}
export default App;
