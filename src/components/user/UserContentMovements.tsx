import { UserProfileData } from '@/interfaces'
import React from 'react'

interface Props {
    user: UserProfileData
}

export const UserContentMovements = ({user}:Props) => {
  return (
    <div>Movements</div>
  )
}
