'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { History } from '@/components/modules/History';
import { useGetAutoComplete } from '@/src/hooks/useGetAutoComplete';
import { useEffect } from 'react';
import { AutoComplete } from '@/components/common/AutoComplete';

export default function Home() {
  const { getAutoComplete } = useGetAutoComplete();

  useEffect(() => {
    getAutoComplete();
  }, []);

  return (
    <div className="w-full flex items-start justify-center">
      <div className="w-8/12 flex items-center justify-start flex-col">
        <AutoComplete />
        <History />
      </div>
    </div>
  );
}
