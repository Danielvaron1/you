import './App.css';
import ImageJs from "./components/ImageJS";
import TextFromApi from "./components/Motivation";
import {useState} from "react";

function App() {

    const getRandomImageId = () => `${Math.floor(Math.random() * 126) + 1}.jpg`;

    const [imageId, setImageId] = useState(getRandomImageId());

    const changeImageId = () => {
        // Lógica para cambiar el id de la imagen, puedes generar un nuevo id aquí
        const newId = getRandomImageId();
        setImageId(newId);
    };

      return (
        <div className="App">
          <header className="App-header">
            <h1 className="h1class">Your Daily Motivation</h1>
            <ImageJs id={imageId}/>
            <TextFromApi onGenerateNew={changeImageId}/>
          </header>
        </div>
      );
}

export default App;
