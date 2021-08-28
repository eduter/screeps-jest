/**
 * Returns a string representation of the path for a property.
 */
declare function pathToString(path: Path): string;
/**
 * Represents a path for a property inside nested objects.
 */
declare type Path = Array<string | number | symbol>;
export { Path, pathToString };
