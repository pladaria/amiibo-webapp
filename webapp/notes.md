## Some styles need to be casted

```typescript
import { TextTransformProperty, AppearanceProperty } from 'csstype';

const styleTab = {
    color: 'white',
    border: 'none',
    ...
    appearance: 'none' as AppearanceProperty,
    textTransform: 'uppercase' as TextTransformProperty,
};
```
