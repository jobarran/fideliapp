"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
    setConfirmLoading: Dispatch<SetStateAction<boolean>>;
}

export const ClientAdminTransactionLoading = ({
    setConfirmLoading
}: Props) => {
    useEffect(() => {
        const loadingTimeout = setTimeout(() => setConfirmLoading(false), 2000);
        return () => clearTimeout(loadingTimeout);
    }, [setConfirmLoading]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full transition-opacity duration-500 ease-in-out opacity-100">
            <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-t-transparent border-slate-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};
