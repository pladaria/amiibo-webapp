import * as React from 'react';
import Carousel from './carousel';
import {
    getAmiibosGroupedByCollection,
    getAmiiboImage,
    Amiibo,
} from '../data/amiibos';
import { cut } from '../utils/string';
import { Link } from 'react-router-dom';
import Img from 'react-lazy-img';
// @ts-ignore
import TextField, { Input } from '@material/react-text-field';
// @ts-ignore
import Icon from '@material/react-material-icon';

const styleAmiiboContainer: React.CSSProperties = {
    width: 150,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
};

const styleImg: React.CSSProperties = {
    display: 'block',
    width: 134,
    height: 150,
};

const styleName: React.CSSProperties = {
    fontSize: 12,
    padding: '8px 8px 0 8px',
    textAlign: 'center',
};

const Amiibo: React.SFC<Amiibo> = ({ name, id }) => (
    <div style={styleAmiiboContainer} key={id}>
        <Link style={{ display: 'block' }} to={`/amiibos/${id}`}>
            <Img src={getAmiiboImage(id)} style={styleImg} alt={name} />
            <div style={styleName}>{cut(name, 40)}</div>
        </Link>
    </div>
);

const getTitle = (text: string, count: number) =>
    `${text || 'Other'} (${count})`;

const AmiibosGallery: React.SFC = () => {
    const [filter, setFilter] = React.useState('');
    const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
        setFilter(event.currentTarget.value);
    };
    const handleFilterClear = () => {
        setFilter('');
    };

    return (
        <>
            <div style={{ padding: 8 }}>
                <TextField
                    label="Quick search"
                    style={{ width: '100%' }}
                    leadingIcon={<Icon icon="search" />}
                    trailingIcon={
                        filter ? (
                            <Icon
                                icon="close"
                                style={{
                                    cursor: 'pointer',
                                    pointerEvents: 'all',
                                    padding: 8,
                                    transform: 'translate(8px, 8px)',
                                }}
                                onClick={handleFilterClear}
                            />
                        ) : (
                            undefined
                        )
                    }
                >
                    <Input value={filter} onChange={handleFilterChange} />
                </TextField>
            </div>
            {getAmiibosGroupedByCollection(filter).map(([group, amiibos]) => (
                <Carousel key={group} title={getTitle(group, amiibos.length)}>
                    {amiibos.map(Amiibo)}
                </Carousel>
            ))}
        </>
    );
};

export default AmiibosGallery;
