import React from 'react'
import { Button } from '@mui/material';

export enum ActionType{
  ERROR = 'error',
  SUCCESS = 'success',
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface ActionButtonProps{
  buttonLabel: string,
  disabled?: boolean,
  actionType: ActionType
  onCLick?: () => void
}

export const ActionButton = ({buttonLabel, actionType, disabled, onCLick}: ActionButtonProps) => {
  return (
    <Button color={actionType} onClick={onCLick} variant='contained' disabled={disabled}>{buttonLabel}</Button>
  )
}
