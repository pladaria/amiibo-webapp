import * as React from 'react';
import Carousel from './carousel';
import { getAmiibosDataGroupedByCollection } from '../data/amiibos';
import { cut } from '../utils/string';

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
}

const Amiibo: React.StatelessComponent<AmiiboProps> = ({
    figureImageUrl,
    name,
}) => (
    <div style={styleAmiiboContainer} key={figureImageUrl}>
        <img src={figureImageUrl} style={styleImg} />
        <div style={styleName}>{cut(name, 40)}</div>
    </div>
);

const AmiibosGallery: React.StatelessComponent = () => (
    <>
        {getAmiibosDataGroupedByCollection().map(([collection, amiibos]) => {
            return (
                <Carousel
                    key={collection}
                    title={`${collection || 'Other'} (${amiibos.length})`}
                >
                    {amiibos.map(Amiibo)}
                </Carousel>
            );
        })}
    </>
);

export default AmiibosGallery;
