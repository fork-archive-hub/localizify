const isPlainObject = (val: unknown): val is Record<string, Value> =>
    val !== null && Object.prototype.toString.call(val) === '[object Object]';
const isString = (val: unknown) => typeof val === 'string';

type Value = object | string;

/**
 * Normalize not flatten object to one-level object
 */
export const normalize = (
    object: Value,
    acc: string[] = [],
    results: Record<string, Value> = {},
) => {
    if (isString(object)) {
        // eslint-disable-next-line no-param-reassign
        results[acc.join('.')] = object;
    } else if (isPlainObject(object)) {
        Object.keys(object).forEach(key => {
            normalize(object[key], [...acc, key], results);
        });
    }

    return results;
};

/**
 * Detect, where is script running
 */
export const isBrowser = () =>
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement;
