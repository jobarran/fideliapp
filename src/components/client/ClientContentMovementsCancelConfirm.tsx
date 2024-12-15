
export const ClientContentMovementsCancelConfirm = ({ onConfirm, onRevert }: { onConfirm: () => void; onRevert: () => void }) => (
    <div className="absolute inset-0 flex justify-center items-center">
        <p className="text-lg font-semibold text-center">¿Seguro que quieres cancelar?</p>
        <div className="flex space-x-2 ml-4">
            <button
                className="bg-red-500 text-white border border-white py-1 px-2 rounded-lg text-sm hover:bg-white hover:text-red-500"
                onClick={onConfirm}
            >
                Sí
            </button>
            <button
                className="bg-red-500 text-white border border-white py-1 px-2 rounded-lg text-sm hover:bg-white hover:text-red-500"
                onClick={onRevert}
            >
                No
            </button>
        </div>
    </div>
);