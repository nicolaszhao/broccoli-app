/* eslint-disable import/prefer-default-export */
import { useEffect, useReducer } from 'react';
import * as api from './api';

const initialInviteState = {
  inviting: false,
  ok: false,
  error: null,
};

function inviteReducer(state, { type, payload }) {
  switch (type) {
    case 'INVITE':
      return {
        inviting: true,
        ok: false,
        error: null,
      };
    case 'INVITE_SUCCESS':
      return {
        inviting: false,
        ok: true,
      };
    case 'INVITE_FAILURE':
      return {
        inviting: false,
        error: payload,
      };
    case 'INVITE_CANCEL':
      return { ...initialInviteState };
    default:
      return state;
  }
}

export const useInvite = (formData) => {
  const [state, dispatch] = useReducer(inviteReducer, { ...initialInviteState });

  useEffect(() => {
    let didCancel = false;

    const invite = async ({ name, email }) => {
      dispatch({ type: 'INVITE' });
      try {
        await api.invite({ name, email });
        !didCancel && dispatch({ type: 'INVITE_SUCCESS' });
      } catch (err) {
        !didCancel && dispatch({ type: 'INVITE_FAILURE', payload: err });
      }
    };

    if (!formData) {
      dispatch({ type: 'INVITE_CANCEL' });
    } else {
      invite(formData);
    }

    return () => {
      didCancel = true;
    };
  }, [formData]);

  return state;
};
