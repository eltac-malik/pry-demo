import { AutocompleteGetTagProps, styled } from '@mui/material';

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

export const Root = styled('div')`
  font-size: 14px;
  width: 100%;
`;

export const InputWrapper = styled('div')`
  width: 100%;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 0.2);
  }

  & input {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
    height: 40px;
    padding: 4px 6px;
    flex-grow: 1;
    border: 0;
    outline: 0;
  }
`;

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <div onClick={onDelete} className="cursor-pointer ml-3">
        X
      </div>
    </div>
  );
}

export const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  padding: 0 4px 0 10px;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

export const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }
`;
