import { create } from 'zustand';
import { IAutoComplete } from '../hooks/useGetAutoComplete';

export type TCompleteHistory = {
  operations: IAutoComplete[];
  result: number;
};

type AutoComplete = {
  autoCompleteHistory: TCompleteHistory[];
  setAutoCompleteHistory: (val: TCompleteHistory[]) => void;
};

export const useHistory = create<AutoComplete>((set) => ({
  autoCompleteHistory: [],
  setAutoCompleteHistory: (val: TCompleteHistory[]) =>
    set({ autoCompleteHistory: val }),
}));
