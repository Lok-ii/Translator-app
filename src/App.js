import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import languageData from "./languageData.json";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [sourceLanguage, setSource] = useState("en");
  const [targetLanguage, setTarget] = useState("hi");
  const [textToTranslate, setText] = useState("Hello World!");
  const [translatedText, setTranslation] = useState("");
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const encodedParams = new URLSearchParams();
      encodedParams.set("source_language", sourceLanguage);
      encodedParams.set("target_language", targetLanguage);
      encodedParams.set("text", textToTranslate);

      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "1ba0191d68msh3d1efc79f1832ebp1a30f2jsn6404aad36d17",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        setTranslation(response.data.data.translatedText);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [clicked, sourceLanguage, targetLanguage]);

  const handleTranslation = ()=>{
    setClicked(prev => prev + 1);
  }  
return (
    <div className="App">
      <h1 className="heading">Translator App</h1>
      <div className="mainContainer">
        <div className="textToTranslate">
          <textarea
            className="inputBox"
            placeholder="Enter Text to Translate..."
            onChange={(e) => setText(e.target.value)}
            value={textToTranslate}
          />
          <div className="source">
            <select
              value={sourceLanguage}
              id="fromLang"
              onChange={(e) => {
                setSource(e.target.value);
              }}
            >
              {languageData.data.languages.map((lang) => {
                const keyId = uuidv4();
                return (
                  <option key={keyId} value={lang.code}>
                    {lang.name} ({lang.code})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* <p className="to">to</p> */}
        <div className="translated">
          <p className="translatedText">{translatedText}</p>
          <div className="target">
            <select
              id="toLang"
              value={targetLanguage}
              onChange={(e) => setTarget(e.target.value)}
            >
              {languageData.data.languages.map((lang) => {
                const keyId = uuidv4();
                return (
                  <option key={keyId} value={lang.code}>
                    {lang.name} ({lang.code})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <button className="translateBtn" onClick={handleTranslation}>Translate!</button>
    </div>
  );
}

export default App;
