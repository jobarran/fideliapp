import { FaPlusCircle } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import clsx from 'clsx';

export const ClientAdminProductTableHeader = () => {
    return (
        <thead>
            <tr className="bg-slate-50 text-slate-800 rounded-md">
                {/* State Column */}
                <th className="w-16 text-center text-sm font-semibold p-2">Estado</th>

                {/* Image Column */}
                <th className="w-16 text-center text-sm font-semibold p-2">Imagen</th>

                {/* Name Column */}
                <th className="min-w-[150px] text-left text-sm font-semibold p-2">Nombre</th>

                {/* Description Column */}
                <th className="min-w-[200px] text-left text-sm font-semibold p-2">Descripción</th>

                {/* Buy Points Column */}
                <th className="w-20 text-center text-sm font-semibold p-2">
                    <div className="flex items-center justify-center text-green-600">
                        <FaPlusCircle className="mr-1 text-sm" />
                        Premio
                    </div>
                </th>

                {/* Reward Points Column */}
                <th className="w-20 text-center text-sm font-semibold p-2">
                    <div className="flex items-center justify-center text-amber-600">
                        <IoTicketOutline className="mr-1 text-sm" />
                        Valor
                    </div>
                </th>

                {/* Edit Column */}
                <th className="w-16 text-center text-sm font-semibold p-2">Editar</th>
            </tr>
        </thead>
    );
};
