export const cut = (s: string, n: number) => {
    if (s.length <= n) {
        return s;
    }
    return s.slice(0, n).trimRight() + '...';
};
