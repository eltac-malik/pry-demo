'use client';
import React, { ReactNode, Suspense } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

type IProvider = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export const Provider: React.FC<IProvider> = ({ children }) => {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
};
