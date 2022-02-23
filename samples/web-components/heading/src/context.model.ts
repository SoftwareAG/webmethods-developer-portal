export class ContextModel {
    getData: () => any;
    navigate: (path: string) => void;
    getLocaleString: (key: string) => string;
}
