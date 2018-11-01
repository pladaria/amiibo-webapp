import * as React from 'react';
import Card from './card';

const styleTitle: React.CSSProperties = {
    fontSize: 14,
    padding: '16px 0 8px 16px',
};

const styleCarousel: React.CSSProperties = {
    display: 'flex',
    paddingBottom: 16,
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
};

interface Props {
    title: string;
}

const Carousel: React.SFC<Props> = ({ title, children }) => (
    <Card>
        <h2 style={styleTitle}>{title}</h2>
        <div style={styleCarousel}>{children}</div>
    </Card>
);
export default Carousel;
