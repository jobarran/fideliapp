

export const ClientContentMovementsCancelConfirm = ({ onConfirm, onRevert }: { onConfirm: () => void; onRevert: () => void }) => (

    <div className="inset-0 flex w-full justify-center items-center h-16 text-white">
      <div className="p-4 rounded-lg flex items-center justify-center">
        <p className="text-sm sm:text-lg font-normal sm:font-medium text-center">¿Seguro que quieres cancelar?</p>
        <div className="flex space-x-2 ml-4">
          <button
            className="text-white py-1 px-4 border border-white rounded-lg text-sm hover:text-red-600 hover:bg-white"
            onClick={onConfirm}
          >
            Sí
          </button>
          <button
            className="text-white py-1 px-4 border border-white rounded-lg text-sm hover:text-red-600 hover:bg-white"
            onClick={onRevert}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
  