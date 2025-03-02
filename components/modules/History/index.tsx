import { useHistory } from '@/src/store/useHistory';
import React from 'react';

export const History = () => {
  const { autoCompleteHistory } = useHistory();
  
  if (autoCompleteHistory?.length <= 0) {
    return (
      <div className="w-full flex items-center justify-start flex-col mt-5 font-semibold text-xs">
        No history
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-start flex-col mt-10">
      {autoCompleteHistory?.map((item) => {
        return (
          <div
            key={item?.result}
            className="w-full flex items-start justify-start flex-col mt-2 rounded-lg overflow-hidden border-1 border-[#f3f1f1]"
          >
            <div className="w-full h-8 bg-[#d8d8d8] px-1 flex items-center justify-start">
              Result : {Math.floor(item?.result)}
            </div>
            <div className="w-full flex items-center justify-start h-10 py-2 px-1">
              {item?.operations?.map((operation) => {
                return <div key={operation?.id} className='bg-[#b9b8b8] mx-0.5 p-1 min-w-12 rounded-lg flex items-center justify-center'>{operation?.value}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
