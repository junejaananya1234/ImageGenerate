import axios from 'axios';
import { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const HeroSection = () => {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [generate, setGenerate] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!generate) {
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true); 
                const response = await axios.post(
                    "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                    { inputs: prompt },
                    {
                        headers: {
                            Authorization: "Bearer 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",
                            'Content-Type': 'application/json'
                        },
                        responseType: 'blob' 
                    }
                );
                const imageObjectURL = URL.createObjectURL(response.data);
                setImage(imageObjectURL);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false); 
                setGenerate(false);
            }
        };

        fetchData();
    }, [generate, prompt]);

    return (
        <div className="relative w-[90%] rounded-lg p-2 -mt-8 overflow-hidden">
            <div className="relative p-10 rounded-lg bg-slate-700 backdrop-blur-xl bg-opacity-20 flex flex-col gap-2 w-full">
                <span className="relative z-10 text-3xl text-gray-300">AI Image Generator</span>
                <p className="text-sm text-gray-200">Generate an image using Generative AI by describing what you want to see. All images are published publicly by default.</p>
                <div className="w-full p-4 rounded-lg border border-solid border-white mt-6 border-opacity-30">
                    <input
                        type="text"
                        value={prompt}
                        className="w-full bg-transparent h-10 text-white p-2"
                        placeholder="What do you want to see?"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                <button
                    className="w-24 bg-slate-600 text-white p-4 rounded-lg hover:bg-slate-700 transition-all"
                    onClick={() => setGenerate(true)}
                >
                    Generate
                </button>
                {loading && ( 
                    <ClipLoader
                        color="#ffffff"
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
                {image && (
                    <div className="mt-4 w-[20%]">
                        <img src={image} alt="Generated result" className="w-full rounded-lg" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSection;