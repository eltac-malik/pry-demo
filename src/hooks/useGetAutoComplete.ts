import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { ENDPOINTS } from '../api/routing';
import { useAutoComplete } from '../store/useAutoComplete';

export interface IAutoComplete {
  name: string;
  category: string;
  value: number | string;
  id: string;
}

export const useGetAutoComplete = () => {
  const { setAutoCompletes } = useAutoComplete();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => axios.get<IAutoComplete[]>(ENDPOINTS.AUTO_COMPOLETE()),
    onSuccess: (response: AxiosResponse<IAutoComplete[]>) => {
      setAutoCompletes(response?.data);
    },
  });

  return { isLoading, getAutoComplete: mutate };
};
