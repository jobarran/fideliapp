

interface Props {
    manualPoints: number;
    setManualPoints: (value: number) => void;
    manualTransactionType: 'Otorgar' | 'Quitar';
    setManualTransactionType: (value: 'Otorgar' | 'Quitar') => void;
    availablePoints: number;
    manualDescription: string;
    setManualDescription: (value: string) => void;
}

export const ClientContentTransactionManual = ({
    manualPoints,
    setManualPoints,
    manualTransactionType,
    setManualTransactionType,
    availablePoints,
    manualDescription,
    setManualDescription
}: Props) => {

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setManualPoints(value);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setManualDescription(value);
        }
    };

    const isExceedingPoints = manualPoints > availablePoints;

    return (
        <div className="mt-4 space-y-1">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col w-full">
                    <label className="text-xs font-medium text-slate-800">Puntos:</label>
                    <input
                        type="number"
                        className={`mt-1 text-xs w-full border rounded-lg px-3 py-2 ${isExceedingPoints && manualTransactionType === 'Quitar' ? 'border-red-500' : 'border-gray-200'
                            }`}
                        value={manualPoints}
                        onChange={handlePointsChange}
                        min={0}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-xs font-medium text-slate-800">Tipo de Transacción:</label>
                    <select
                        className="mt-1 text-xs w-full border border-gray-200 rounded-lg px-3 py-2"
                        value={manualTransactionType}
                        onChange={(e) =>
                            setManualTransactionType(e.target.value as 'Otorgar' | 'Quitar')
                        }
                    >
                        <option value="Otorgar">Otorgar</option>
                        <option value="Quitar">Quitar</option>
                    </select>
                </div>
            </div>
            <div>
                {isExceedingPoints && manualTransactionType === 'Quitar' && (
                    <p className="text-xs text-red-500">
                        Puntos insuficientes
                    </p>
                )}
            </div>
            <div className="flex flex-col w-full">
                <label className="text-xs font-medium text-slate-800">Descripción</label>
                <input
                    type="text"
                    className="mt-1 text-xs w-full border rounded-lg px-3 py-2"
                    value={manualDescription}
                    onChange={handleDescriptionChange}
                    maxLength={50}
                />
                <p className="text-xs text-gray-500">{manualDescription.length}/50</p>
            </div>
        </div>
    );
};
