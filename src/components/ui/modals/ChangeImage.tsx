"use client";

import React, { useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ActionButton } from "../buttons/ActionButton";
import { Avatar, CompanyLinkImage } from "@/components";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateLogo } from '../../../actions/company/update-logo';

interface Props {
    acceptButton: string;
    cancelButton: string;
    modalLabel: string;
    content: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    imgUrl?: string;
    name: string;
    backgroundColor: string;
    slug: string;
}

type FormInputs = {
    logo?: FileList | undefined;
};

export const ChangeImage = ({
    acceptButton,
    cancelButton,
    content,
    openModal,
    setOpenModal,
    imgUrl,
    name,
    backgroundColor,
    slug,
}: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
        const { logo } = data;

        formData.append("slug", slug);
        if (logo && logo.length > 0) {
            formData.append("logo", logo[0]);
        }

        const response = await updateLogo(formData);
        if (response.ok) {
            setOpenModal(false)
        } else {
            // Handle error case here (e.g., show a message)
            console.error(response.message);
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === "new-modal") {
            setOpenModal(false); // Close modal if overlay is clicked
        }
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${openModal ? "opacity-100" : "opacity-0"}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}`;

    return (
        <div>
            <div className={blurEffectClasses}></div>

            <div
                id="new-modal"
                tabIndex={-1}
                aria-hidden={!openModal}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setOpenModal(false)}
                    >
                        <IoCloseSharp />
                    </button>

                    <div className="flex flex-col p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-base text-slate-800">{content}</h3>

                        <div className="flex flex-col items-center justify-center mb-2 gap-4">
                            <div className="relative w-44 h-44 rounded-full overflow-hidden flex items-center justify-center bg-white">
                                {imgUrl ? (
                                    <CompanyLinkImage
                                        src={imgUrl}
                                        width={0}
                                        height={0}
                                        alt={name}
                                        className="object-cover"
                                        priority
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                ) : (
                                    <Avatar name={name} backgroundColor={backgroundColor} size={"44"} />
                                )}
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col">
                                    <input
                                        type="file"
                                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        accept="image/png, image/jpeg"
                                        {...register('logo')} // Pass registration to the input
                                    />
                                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">PNG or JPG</p>
                                </div>
                                <div className="text-center p-4">
                                    <ActionButton
                                        slug={acceptButton}
                                        bgColor={"bg-slate-600 mx-2"}
                                        textColor={"text-white"}
                                        hoverColor={"hover:bg-slate-800"}
                                        icon={undefined}
                                        action={handleSubmit(onSubmit)}
                                    />
                                    <ActionButton
                                        slug={cancelButton}
                                        bgColor={"mx-2"}
                                        textColor={""}
                                        hoverColor={""}
                                        icon={undefined}
                                        action={() => setOpenModal(false)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
