import React from 'react';

export const CompanyCardsByUserAdd = () => {
    const backgroundColor = '#f0f0f0'; // Light gray background
    const borderColor = '#333'; // Darker gray for the border

    return (
        <div 
            className="w-70 h-32 rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2,
                borderStyle: 'dotted',
            }}
        >
            <div className="text-base font-medium" style={{ color: borderColor }}>
                Agregar Tarjeta
            </div>
        </div>
    );
};
