declare class DataStore<T extends number | string | boolean> {
    data: T[];
    addItem(item: T): void;
    removeItem(item: T): void;
    getData(): T[];
}
declare const numberDataStore: DataStore<number>;
