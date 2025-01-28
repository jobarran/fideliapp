'use client';

import React, { useCallback, useState } from 'react';
import { TextField, PasswordField, DeleteWarningModal } from '..'; // Import custom fields
import { FaRegTrashCan } from 'react-icons/fa6';
import { updateUser } from '@/actions';
import { UserProfileData } from '@/interfaces';

interface EditedUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  active: boolean;
  role?: string;
}

interface Props {
  user: UserProfileData;
}

export const UserContentInformation = ({ user }: Props) => {
  const [editedUser, setEditedUser] = useState<EditedUser>({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>(undefined); // Set as undefined
  const [newPassword, setNewPassword] = useState<string | undefined>(undefined); // Set as undefined
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined); // Set as undefined
  const [errors, setErrors] = useState<string[]>([]); // Track errors for validation

  // Handle changes in editable fields
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: keyof EditedUser) => {
      setEditedUser((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleDeleteCompany = () => {
    console.log('delete');
  }

  const handleEditClick = useCallback(async () => {
    // Clear previous errors
    setErrors([]);

    // Perform client-side validation
    const newErrors: string[] = [];

    if (newPassword !== confirmPassword) {
      newErrors.push("La nueva contraseña y la confirmación no coinciden.");
    }

    if (newPassword && newPassword.length < 6) {
      newErrors.push("La nueva contraseña debe tener al menos 6 caracteres.");
    }

    if (oldPassword && !newPassword) {
      newErrors.push("Debes ingresar una nueva contraseña si deseas cambiarla.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return; // Prevent form submission if there are validation errors
    }

    // If no errors, proceed to update user
    if (isEditing) {
      const userToUpdate = {
        ...editedUser,
        id: user.id,
        role: user.role || 'user',
        oldPassword: oldPassword,  // Corrected to oldPassword
        password: newPassword === confirmPassword ? newPassword : undefined,
      };

      try {
        // Call the updateUser action and handle the response
        const response = await updateUser(userToUpdate);
        console.log(response)
        if (!response.ok) {
          setErrors([response.message]); // Set server error message if any
        } else {
          setErrors([]); // Clear errors on success
          setOldPassword(undefined)
          setNewPassword(undefined)
          setConfirmPassword(undefined)
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setErrors(["Hubo un error al actualizar el usuario."]);
      }
    }

    setIsEditing((prev) => !prev);
  }, [isEditing, editedUser, user, newPassword, confirmPassword, oldPassword]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Información del Usuario</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-1 bg-white text-slate-800 border border-slate-800 rounded hover:bg-slate-800 hover:text-white"
        >
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>

      <hr className="w-full h-px border-neutral-200 my-4" />

      <div className="grid grid-cols-1 gap-2">
        {/* Editable Fields */}
        <TextField
          label="Nombre"
          value={editedUser.name}
          onChange={(e) => handleInputChange(e, 'name')}
          disabled={!isEditing}
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
        />

        <TextField
          label="Apellido"
          value={editedUser.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          disabled={!isEditing}
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
        />

        <TextField
          label="Correo"
          value={editedUser.email}
          disabled
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
          onChange={() => { }}
        />

        <PasswordField
          label="Old Password"
          value={oldPassword ?? ""}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={!isEditing}
          placeholder="********"
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
        />

        <PasswordField
          label="New Password"
          value={newPassword ?? ""}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={!isEditing}
          placeholder="********"
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
        />

        <PasswordField
          label="Confirm Password"
          value={confirmPassword ?? ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={!isEditing}
          placeholder="********"
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 col-span-2 rounded"
        />

        {/* Display errors */}
        {errors.length > 0 && (
          <div className="text-red-500 mt-2">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <DeleteWarningModal
        buttonLabel={'Eliminar usuario'}
        buttonBgColor={''}
        buttonTextColor={'text-red-600'}
        buttonHoverColor={'hover:bg-red-100'}
        buttonIcon={<FaRegTrashCan />}
        buttonPossition="justify-end"
        modalLabel="Atención!"
        content="Atención! Una vez que elimines tu negocio ya no podrás acceder a toda tu información."
        contentAction={handleDeleteCompany}
        acceptButton={'Eliminar'}
        cancelButton={'Cancelar'}
      />
    </div>
  );
};
