

import React from 'react';

interface Props {
    handleCreatePin: () => void;
    isLoading: boolean
}

export const CardProfileHeaderAction = ({ handleCreatePin, isLoading }: Props) => {
    return (
        <div className="bg-white">
            <button onClick={handleCreatePin} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generar Pin de Compra'}
            </button>
        </div>
    );
};
