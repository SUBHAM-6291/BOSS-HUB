'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Investment, initialInvestments } from './data/investments';

type ApprovalState = {
  investments: Investment[];
};

type Action =
  | { type: 'APPROVE'; id: number }
  | { type: 'REJECT'; id: number }
  | { type: 'DELETE'; id: number }
  | { type: 'RESET' };

const initialState: ApprovalState = {
  investments: initialInvestments,
};

const approvalReducer = (state: ApprovalState, action: Action): ApprovalState => {
  switch (action.type) {
    case 'APPROVE':
    case 'REJECT':
      return {
        ...state,
        investments: state.investments.map((inv) =>
          inv.id === action.id ? { ...inv, status: action.type === 'APPROVE' ? 'Approved' : 'Rejected' } : inv
        ),
      };
    case 'DELETE':
      return {
        ...state,
        investments: state.investments.filter((inv) => inv.id !== action.id),
      };
    case 'RESET':
      return {
        ...state,
        investments: state.investments.map((inv) => ({ ...inv, status: 'Pending' })),
      };
    default:
      return state;
  }
};

const ApprovalContext = createContext<{
  state: ApprovalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ApprovalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(approvalReducer, initialState);
  return (
    <ApprovalContext.Provider value={{ state, dispatch }}>
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApprovalStore = () => {
  const context = useContext(ApprovalContext);
  if (!context) {
    throw new Error('useApprovalStore must be used within ApprovalProvider');
  }
  return context;
};