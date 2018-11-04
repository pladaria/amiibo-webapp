import * as React from 'react';
// @ts-ignore
import Icon from '@material/react-material-icon';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    padding: 8px 40px;
    height: 40px;
    border-radius: 4px;
`;

const LeadingIcon = styled(Icon)`
    position: absolute;
    left: 8px;
    top: 8px;
`;

const TrailingIcon = styled(Icon)`
    padding: 8px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
`;

const InputWrapper = styled.div`
    position: relative;
`;

interface Props {
    label: string;
    value: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const Filter: React.SFC<Props> = ({ label, value, onChange, onClear }) => (
    <InputWrapper>
        <Input
            placeholder={label}
            value={value}
            onChange={onChange}
            onKeyDown={e => {
                if (e.keyCode === 27) {
                    onClear();
                }
            }}
        />
        <LeadingIcon icon="search" />
        {value && <TrailingIcon icon="close" onClick={onClear} />}
    </InputWrapper>
);

export const useFilter = (
    initialValue: string
): [string, React.ReactElement<any>] => {
    const [value, setValue] = React.useState(initialValue);

    const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };
    const handleFilterClear = () => {
        setValue('');
    };

    return [
        value,
        <Filter
            label="Filter"
            onChange={handleFilterChange}
            onClear={handleFilterClear}
            value={value}
        />,
    ];
};
