// util.mjs

import { format } from 'util';

export const inHHMMSS = (date) => {
    const formattedTime = format('%s:%s:%s', date.getHours(), date.getMinutes(), date.getSeconds());
    return formattedTime
}
