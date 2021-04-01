/**
 * Returns a string representation of the path for a property.
 */
function pathToString(path: Path): string {
  return path
    .map((k, index) => {
      const key = k.toString();

      if (!isNaN(Number(key))) {
        return `[${key}]`;
      } else if (!validIdentifier.test(key)) {
        return `['${key}']`;
      } else if (index === 0) {
        return key;
      } else {
        return '.' + key;
      }
    })
    .join('');
}

/**
 * Represents a path for a property inside nested objects.
 */
type Path = Array<string | number | symbol>;

const validIdentifier = /^[$A-Z_][0-9A-Z_$]*$/i;


export { Path, pathToString };
