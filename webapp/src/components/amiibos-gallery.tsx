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
import { useFilter } from './filter';
import styled from 'styled-components';
import Panel from './panel';

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

const AmiiboItem: React.SFC<Amiibo> = ({ name, id }) => (
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
    const [filter, filterElement] = useFilter('');

    return (
        <>
            <Panel>{filterElement}</Panel>
            {getAmiibosGroupedByCollection(filter).map(([group, amiibos]) => (
                <Carousel key={group} title={getTitle(group, amiibos.length)}>
                    {amiibos.map(AmiiboItem)}
                </Carousel>
            ))}
        </>
    );
};

export default AmiibosGallery;
