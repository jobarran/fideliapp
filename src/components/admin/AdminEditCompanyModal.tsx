"use client"

import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp, IoCheckmarkCircleOutline, IoBan } from 'react-icons/io5';
import { Company } from '@/interfaces';
import { Avatar, CompanyLinkImage } from '@/components';
import { updateCompanyValidationAdmin } from '@/actions';

interface Props {
    setOpenCompanyModal: (open: boolean) => void;
    openCompanyModal: boolean;
    companyToEdit: Company | null;
    setCompanyToEdit: React.Dispatch<React.SetStateAction<Company | null>>;
}

export const AdminEditCompanyModal = ({
    setOpenCompanyModal,
    openCompanyModal,
    setCompanyToEdit,
    companyToEdit,
}: Props) => {
    const [editedCompany, setEditedCompany] = useState<Company | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openCompanyModal && companyToEdit) {
            setEditedCompany(companyToEdit);
        } else {
            setEditedCompany(null);
        }
    }, [openCompanyModal, companyToEdit]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-modal') {
            setOpenCompanyModal(false);
            setCompanyToEdit(null);
        }
    };

    const handleCloseModal = () => {
        setOpenCompanyModal(false);
        setCompanyToEdit(null);
    };

    const handleValidateBusiness = () => {
        if (editedCompany) {
            updateCompanyValidationAdmin({ validate: !editedCompany.validated, companyId: editedCompany.id });
            setOpenCompanyModal(false);
        }
    };

    if (!openCompanyModal || !editedCompany) {
        return null;
    }

    return (
        <div>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>

            {/* Modal */}
            <div
                id="new-modal"
                className="fixed inset-0 flex justify-center items-center z-50"
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className="relative bg-white rounded-lg w-full max-w-lg p-6 h-screen sm:h-auto shadow-lg">
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={handleCloseModal}
                    >
                        <IoCloseSharp size={24} />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 mb-2 rounded-full overflow-hidden">
                            {editedCompany.CompanyLogo ? (
                                <CompanyLinkImage
                                    src={editedCompany.CompanyLogo.url}
                                    alt={editedCompany.name}
                                    className="object-cover w-full h-full"
                                    priority width={0} height={0} />
                            ) : (
                                <Avatar name={editedCompany.name} backgroundColor={'#FFFFFF'} size={'24'} />
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-center text-slate-800">{editedCompany.name}</h3>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-2 text-slate-800">
                        <p><strong>Actividad:</strong> {editedCompany.activityType.name}</p>
                        <p><strong>Dirección:</strong> {editedCompany.address || 'No proporcionada'}</p>
                        <p><strong>Slug:</strong> {editedCompany.slug}</p>
                        <p><strong>Estado:</strong> {editedCompany.active ? 'Activo' : 'Inactivo'}</p>
                        <p><strong>Validado:</strong> {editedCompany.validated ? 'Sí' : 'No'}</p>
                        <p><strong>Cliente:</strong> {editedCompany.user.name} {editedCompany.user.lastName}</p>
                        <p><strong>Instagram:</strong> <a href={`https://instagram.com/${editedCompany.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">{editedCompany.instagram || '-'}</a></p>
                        <p><strong>Facebook:</strong> <a href={`https://facebook.com/${editedCompany.facebook}`} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">{editedCompany.facebook || '-'}</a></p>
                        <p><strong>Twitter:</strong> <a href={`https://twitter.com/${editedCompany.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">{editedCompany.twitter || '-'}</a></p>
                        <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${editedCompany.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">{editedCompany.whatsapp || '-'}</a></p>
                        <p><strong>Teléfono:</strong> {editedCompany.phone || '-'}</p>
                        <p><strong>Web:</strong> {editedCompany.site || '-'}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center mt-6 w-full gap-2 justify-center">
                        <button
                            onClick={handleValidateBusiness}
                            className={`text-md py-1 px-3 rounded-lg text-white flex items-center justify-center w-full ${editedCompany.validated ? 'bg-red-800 hover:bg-red-900' : 'bg-green-800 hover:bg-green-900'}`}
                        >
                            {editedCompany.validated ? (
                                <IoBan className="mr-2" />
                            ) : (
                                <IoCheckmarkCircleOutline className="mr-2" />
                            )}
                            {editedCompany.validated ? 'Deshabilitar' : 'Habilitar'}
                        </button>

                        <button
                            onClick={handleCloseModal}
                            className="text-sm py-1 px-3 rounded-lg border w-full border-slate-200 text-slate-500 hover:bg-slate-100"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
