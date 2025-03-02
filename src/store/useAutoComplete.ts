import { create } from 'zustand';
import { IAutoComplete } from '../hooks/useGetAutoComplete';

type AutoComplete = {
  autoCompletes: IAutoComplete[] | null;
  setAutoCompletes: (val: IAutoComplete[]) => void;
};

export const useAutoComplete = create<AutoComplete>((set) => ({
  autoCompletes: null,
  setAutoCompletes: (val: IAutoComplete[]) => set({ autoCompletes: val }),
}));
