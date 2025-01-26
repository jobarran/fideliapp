// src/hooks/useModal.ts

import { useState } from "react";

export const useLoginModal = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [newAccountModal, setNewAccountModal] = useState(false);

    const toggleLoginModal = () => setLoginModal((prev) => !prev);
    const toggleNewAccountModal = () => setNewAccountModal((prev) => !prev);

    return {
        loginModal,
        toggleLoginModal,
        newAccountModal,
        toggleNewAccountModal,
    };
};
