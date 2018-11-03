import * as React from 'react';
// @ts-ignore
import TextField, { Input } from '@material/react-text-field';
// @ts-ignore
import Icon from '@material/react-material-icon';

const clearIconStyle = {
    cursor: 'pointer',
    pointerEvents: 'all',
    padding: 8,
    transform: 'translate(8px, -8px)',
};

interface Props {
    label: string;
    value: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const Filter: React.SFC<Props> = ({ label, value, onChange, onClear }) => (
    <TextField
        outlined
        dense
        label={label}
        style={{ width: '100%' }}
        leadingIcon={<Icon icon="search" />}
        trailingIcon={
            value ? (
                <Icon icon="close" onClick={onClear} style={clearIconStyle} />
            ) : (
                undefined
            )
        }
    >
        <Input value={value} onChange={onChange} />
    </TextField>
);

export default Filter;
