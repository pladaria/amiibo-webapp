import * as React from 'react';
import Carousel from './carousel';
import { getAmiibosGroupedByCollection } from '../data/amiibos';
import { cut } from '../utils/string';
import { Link } from 'react-router-dom';

const styleAmiiboContainer: React.CSSProperties = {
    width: 150,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
};

const styleImg: React.CSSProperties = {
    display: 'block',
    height: 150,
};

const styleName: React.CSSProperties = {
    fontSize: 12,
    padding: '8px 8px 0 8px',
    textAlign: 'center',
};

interface AmiiboProps {
    figureImageUrl: string;
    name: string;
    id: string;
}

const Amiibo: React.StatelessComponent<AmiiboProps> = ({
    figureImageUrl,
    name,
    id,
}) => (
    <div style={styleAmiiboContainer} key={figureImageUrl}>
        <Link style={{ display: 'block' }} to={`/amiibos/${id}`}>
            <img src={figureImageUrl} style={styleImg} />
            <div style={styleName}>{cut(name, 40)}</div>
        </Link>
    </div>
);

const getTitle = (text: string, count: number) =>
    `${text || 'Other'} (${count})`;

const AmiibosGallery: React.StatelessComponent = () => (
    <>
        {getAmiibosGroupedByCollection().map(([group, amiibos]) => (
            <Carousel key={group} title={getTitle(group, amiibos.length)}>
                {amiibos.map(Amiibo)}
            </Carousel>
        ))}
    </>
);

export default AmiibosGallery;
