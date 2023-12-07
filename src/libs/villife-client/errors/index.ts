class VillifeError extends Error {
    name: string;

    constructor(message: string) {
        super(message);
        this.name = new.target.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default VillifeError;
