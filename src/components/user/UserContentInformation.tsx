'use client';

import React, { useCallback, useState } from 'react';
import { TextField } from '..'; // Import custom fields
import { updateUser } from '@/actions';
import { UserProfileData } from '@/interfaces';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';

interface EditedUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  active: boolean;
  role?: string;
}

interface Props {
  user: UserProfileData;
}

export const UserContentInformation = ({ user }: Props) => {
  const [editedUser, setEditedUser] = useState<EditedUser>({ ...user });
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEditClick = useCallback(async () => {
    // Clear previous errors
    setErrors([]);

    // Perform client-side validation
    const newErrors: string[] = [];

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
      };

      try {
        // Call the updateUser action and handle the response
        const response = await updateUser(userToUpdate);
        if (!response.ok) {
          setErrors([response.message]); // Set server error message if any
        } else {
          setErrors([]); // Clear errors on success
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setErrors(["Hubo un error al actualizar el usuario."]);
      }
    }

    setIsEditing((prev) => !prev);
  }, [isEditing, editedUser, user]);

  return (
    <div>

      <div className="grid grid-cols-1 gap-2 text-sm">
        {/* Editable Fields */}
        <TextField
          label="Nombre"
          value={editedUser.name}
          onChange={(e) => handleInputChange(e, "name")}
          disabled={!isEditing}
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 rounded w-full"
        />

        <TextField
          label="Apellido"
          value={editedUser.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
          disabled={!isEditing}
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 rounded w-full"
        />

        <TextField
          label="Correo"
          value={editedUser.email}
          disabled
          divClassName="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2"
          labelClassName="font-medium hidden sm:flex"
          inputClassName="border p-1 rounded w-full"
          onChange={() => { }}
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

      <div className='flex flex-row space-x-2 mt-4'>
        <div className='flex justify-start'>
          <button
            onClick={() => handleEditClick()}
            className={` text-xs py-1 px-2 rounded-lg border border-slate-200 ${isEditing ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <span className='flex gap-2 p-1'>
              <p className='text-sm'>{isEditing ? 'Guardar' : 'Editar'}</p><span className='text-base'>{isEditing ? <FaRegSave /> : <FaRegEdit />}</span>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
