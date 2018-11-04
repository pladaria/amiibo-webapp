import * as React from 'react';
// @ts-ignore
import Icon from '@material/react-material-icon';

interface Props {
    label: string;
    value: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const Filter: React.SFC<Props> = ({ label, value, onChange, onClear }) => (
    <div style={{ position: 'relative' }}>
        <input
            style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '8px 40px',
                height: 40,
                borderRadius: 4,
                flexGrow: 1,
            }}
            placeholder={label}
            value={value}
            onChange={onChange}
            onKeyDown={e => {
                console.log(e.keyCode);
                if (e.keyCode === 27) {
                    onClear();
                }
            }}
        />
        <Icon icon="search" style={{ position: 'absolute', left: 8, top: 8 }} />
        {value && (
            <Icon
                icon="close"
                style={{
                    padding: 8,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    cursor: 'pointer',
                }}
                onClick={onClear}
            />
        )}
    </div>
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
