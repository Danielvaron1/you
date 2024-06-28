import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "@nextui-org/react";
import './texto.css';

const TextFromApi = ({onGenerateNew}) => {
    const [text, setText] = useState('');
    const [texto, setTexto] = useState('');
    const [autor, setAutor] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchText = () => {
        setLoading(true);
        setError(null);
        setTexto('');

        fetch('https://zenquotes.io/api/random')
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    setText(`${data[0].q}`);
                    setAutor(`~ ${data[0].a}`);
                } else {
                    throw new Error('Respuesta de la API no válida');
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchText(); // Llama a la API cuando el componente se monta
    }, []);

    const translateText = () => {

        const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';
        const API_KEY = 'AIzaSyAoWS4KtDJ67CoXGPKMgYVJ9uHx4ojkbg8';

        fetch(`${TRANSLATE_API_URL}?key=${API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                target: 'es'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API de Traducción');
                }
                return response.json();
            })
            .then(data => {
                setTexto(data.data.translations[0].translatedText);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleGenerateNew = () => {
        fetchText();
        onGenerateNew(); // Llama a la función para cambiar el id de la imagen
    };

    return (
        <div className="container">
            <div className="content">
                {loading && <Spinner color="primary" labelColor="primary" />}
                {error && <p className="texto">Error: {error.message}</p>}
                {!loading && !error && (
                    <p className="texto">
                        "{text}"<br />{autor}
                    </p>
                )}
                <Button color="primary" radius="full" variant="shadow" onClick={translateText}>
                    Translate
                </Button>
                {texto && (
                    <p className="texto">
                        "{texto}"<br />{autor}
                    </p>
                )}
            </div>
            <div className="button-container">
                <Button className="generate" color="primary" radius="full" variant="shadow" onClick={handleGenerateNew}>
                    Generate Another One
                </Button>
            </div>
        </div>
    );
};

export default TextFromApi;