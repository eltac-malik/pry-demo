/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import useAutocomplete from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import { useAutoComplete } from '@/src/store/useAutoComplete';
import { InputWrapper, Listbox, Root, StyledTag } from './style';
import { IAutoComplete } from '@/src/hooks/useGetAutoComplete';
import { MATH_OPERATORS } from '@/src/constants';
import { useHistory } from '@/src/store/useHistory';

export const AutoComplete = () => {
  const { autoCompletes } = useAutoComplete();
  const { autoCompleteHistory, setAutoCompleteHistory } = useHistory();
  const [fullInput, setFullInput] = React.useState('');
  const [currentWord, setCurrentWord] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState<IAutoComplete[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1); // 🔹 Klavye ile seçim için state

  const mergeOperatorsWithData = (data: IAutoComplete[]) => {
    const operatorEntries: IAutoComplete[] = MATH_OPERATORS.map(
      (op, index) => ({
        name: op,
        category: 'operator',
        value: op,
        id: `op-${index + 1}`,
      })
    );

    return [...data, ...operatorEntries];
  };

  const handleInputChange = (_: any, newValue: string) => {
    setFullInput(newValue);

    const lastChar = newValue.slice(-1);
    if (MATH_OPERATORS.includes(lastChar)) {
      setCurrentWord(lastChar);
    } else {
      const words = newValue.split(/[\s+\-*/()]/).filter(Boolean);
      setCurrentWord(words[words.length - 1] || '');
    }

    setHighlightedIndex(-1); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (groupedOptions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev < groupedOptions.length - 1 ? prev + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : groupedOptions.length - 1));
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      const selectedOption = groupedOptions[highlightedIndex];
      setSelectedValues((prev) => [...prev, selectedOption]);
      setFullInput('');
      setCurrentWord('');
      setHighlightedIndex(-1);
    }
  };

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: mergeOperatorsWithData(autoCompletes ?? []),
    getOptionLabel: (option) => option.name,
    filterOptions: (options) =>
      currentWord.length >= 1
        ? options.filter(
            (option) =>
              (MATH_OPERATORS.includes(currentWord) &&
                option.name === currentWord) ||
              (!MATH_OPERATORS.includes(currentWord) &&
                option.name.toLowerCase().includes(currentWord.toLowerCase()) &&
                currentWord.length >= 2)
          )
        : [],
    inputValue: currentWord,
    onInputChange: handleInputChange,
    value: selectedValues,
    onChange: (_event, newValue) => setSelectedValues(newValue),
  });

  const handleAdd = () => {
    try {
      const operations = selectedValues.map((item) => item.value).join('');
      const result = new Function(`return ${operations}`)();

      setAutoCompleteHistory([
        ...autoCompleteHistory,
        { operations: selectedValues, result: +result },
      ]);

      setFullInput('');
      setCurrentWord('');
      setSelectedValues([]);
    } catch (err) {
      console.error('ERROR:', err);
    }
  };

  const resultSum = React.useMemo(() => {
    try {
      const operations = selectedValues.map((item) => item.value).join('');
      return new Function(`return ${operations}`)();
    } catch (err) {
      console.log(err);
      return 0;
    }
  }, [selectedValues]);

  return (
    <div className="w-full flex items-center justify-between h-10 mt-5">
      <div className="h-full w-28 border-1 border-gray-200 text-xs rounded-lg flex items-center justify-center mr-1">
        {resultSum}
      </div>
      <Root>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {selectedValues.map((option: IAutoComplete, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <StyledTag key={key} {...tagProps} label={option.name} />;
            })}
            <input {...getInputProps()} value={fullInput} onKeyDown={handleKeyDown} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 && currentWord.length >= 1 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <li
                  key={`${key}`}
                  {...optionProps}
                  className={highlightedIndex === index ? 'bg-gray-200' : ''}
                >
                  <span>
                    {option.name}{' '}
                    {option?.category !== 'operator' ? `- ${option.value}` : ''}
                  </span>
                  <CheckIcon fontSize="small" />
                </li>
              );
            })}
          </Listbox>
        ) : null}
      </Root>
      <button
        className="h-full w-35 bg-black ml-1 rounded-lg text-white cursor-pointer"
        onClick={handleAdd}
      >
        Add formula
      </button>
    </div>
  );
};
