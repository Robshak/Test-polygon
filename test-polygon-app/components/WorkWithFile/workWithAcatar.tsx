import { API_URL } from "@/utils/api";
import { useEffect, useState } from "react";
import Image from "next/image";

const WorkWithAvatar = () => {
    const [file, setFile] = useState<File | null>(null);
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        getTrack();
    }, []);

    const getTrack = async () => {
        const response = await fetch(`${API_URL}/api/wwf/get/avatar`, {
            method: "POST",
            body: JSON.stringify({
                itemType: "users",
                itemId: localStorage.getItem("userId") as string
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        if (result?.avatarPath) {
            setAvatar(result.avatarPath);
        }
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
        formData.append("itemType", "users");
        formData.append("itemId", localStorage.getItem("userId") as string);

        const response = await fetch(`${API_URL}/api/wwf/upload/avatar`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        setAvatar(result.avatarPath);
    };

    return (
        <div>
            <h1>Upload Avatar</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload avatar</button>
            {
                avatar && <Image
                    src={avatar}
                    alt={""}
                    width={100}
                    height={100}
                />
            }
        </div>
    );
};

export default WorkWithAvatar;
