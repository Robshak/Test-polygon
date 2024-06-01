// components/Dialog.tsx
import React, { useState } from "react";
import styles from "./Dialog.module.scss";

interface Replica {
    id: number;
    hero: string;
    text: string;
    isEditing: boolean;
}

const Dialog: React.FC = () => {
    const [replicas, setReplicas] = useState<Replica[]>([]);
    const [currentReplica, setCurrentReplica] = useState<Replica | null>(null);

    const handleAddReplica = () => {
        if (currentReplica) {
            setReplicas([...replicas, { ...currentReplica, isEditing: false }]);
            setCurrentReplica(null);
        } else {
            setCurrentReplica({ id: Date.now(), hero: "", text: "", isEditing: true });
        }
    };

    const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentReplica) {
            setCurrentReplica({ ...currentReplica, hero: e.target.value });
        } else {
            const index = replicas.findIndex(replica => replica.isEditing);
            const updatedReplicas = [...replicas];
            updatedReplicas[index] = { ...updatedReplicas[index], hero: e.target.value };
            setReplicas(updatedReplicas);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentReplica) {
            setCurrentReplica({ ...currentReplica, text: e.target.value });
        } else {
            const index = replicas.findIndex(replica => replica.isEditing);
            const updatedReplicas = [...replicas];
            updatedReplicas[index] = { ...updatedReplicas[index], text: e.target.value };
            setReplicas(updatedReplicas);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault();
            if (currentReplica) {
                if (!currentReplica.hero) {
                    document.getElementById("heroInput")?.focus();
                } else if (currentReplica.hero && !currentReplica.text) {
                    document.getElementById("textInput")?.focus();
                } else {
                    handleAddReplica();
                }
            } else {
                const index = replicas.findIndex(replica => replica.isEditing);
                if (index !== -1) {
                    const updatedReplicas = [...replicas];
                    updatedReplicas[index].isEditing = false;
                    setReplicas(updatedReplicas);
                }
            }
        }
    };

    const handleEditReplica = (id: number) => {
        const updatedReplicas = replicas.map(replica =>
            replica.id === id ? { ...replica, isEditing: true } : { ...replica, isEditing: false }
        );
        setReplicas(updatedReplicas);
    };

    const handleDeleteReplica = (id: number) => {
        setReplicas(replicas.filter(replica => replica.id !== id));
    };

    return (
        <div className={styles.dialog}>
            {replicas.map((replica) =>
                replica.isEditing ? (
                    <div key={replica.id} className={styles.editing}>
                        <input
                            id="heroInput"
                            type="text"
                            value={replica.hero}
                            onChange={handleHeroChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Введите имя героя"
                            autoFocus
                        />
                        {replica.hero && (
                            <input
                                id="textInput"
                                type="text"
                                value={replica.text}
                                onChange={handleTextChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Введите реплику"
                            />
                        )}
                    </div>
                ) : (
                    <div key={replica.id} className={styles.replica}>
                        <strong>{replica.hero}:</strong> {replica.text}
                        <button onClick={() => handleEditReplica(replica.id)}>Редактировать</button>
                        <button onClick={() => handleDeleteReplica(replica.id)}>Удалить</button>
                    </div>
                )
            )}
            {currentReplica && (
                <div className={styles.editing}>
                    <input
                        id="heroInput"
                        type="text"
                        value={currentReplica.hero}
                        onChange={handleHeroChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Введите имя героя"
                        autoFocus
                    />
                    {currentReplica.hero && (
                        <input
                            id="textInput"
                            type="text"
                            value={currentReplica.text}
                            onChange={handleTextChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Введите реплику"
                        />
                    )}
                </div>
            )}
            <button onClick={handleAddReplica}>Реплика</button>
        </div>
    );
};

export default Dialog;
