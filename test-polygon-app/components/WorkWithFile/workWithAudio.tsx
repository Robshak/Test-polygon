import { API_URL } from "@/utils/api";
import { useEffect, useRef, useState } from "react";

const WorkWithAudio = ({ audio }: { audio?: string }) => {
    const [file, setFile] = useState<File | null>(null);
    const [track, setTrack] = useState("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const audioPlayer = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audio) {
            getTrack();
        }
    }, []);

    useEffect(() => {
        console.log(track);
        if (audioPlayer.current) {
            audioPlayer.current.src = track;
            audioPlayer.current.play();
        }
    }, [audioPlayer, track]);

    const toggleState = async () => {
        if (audioPlayer.current) {
            if (isPlaying) {
                audioPlayer.current.pause();
                setIsPlaying(false);
            }
            else {
                audioPlayer.current.play();
                setIsPlaying(true);
            }
        }
    };

    const getTrack = async () => {
        const response = await fetch(`${API_URL}/api/wwf/get/audio`, {
            method: "POST",
            body: JSON.stringify({
                audioId: audio ?? ""
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        setTrack(result.audio.path);
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", localStorage.getItem("userId") as string);
        formData.append("custonName", "testName");

        const response = await fetch(`${API_URL}/api/wwf/upload/audio`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        setTrack(result.audioPath);
    };

    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div>
                <audio src={track} ref={audioPlayer}></audio>
                <button onClick={getTrack}>Set track</button>
                <button onClick={toggleState}>set status</button>
            </div>
        </div>
    );
};

export default WorkWithAudio;
