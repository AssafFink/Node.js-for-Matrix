class ClientError {
    public message: string;
    public status: number;

    public constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(_id: string) {
        super(`_id ${_id} not found`, 404);
    }
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(`route ${route} not found`, 404);
    }
}

export class ValidationError extends ClientError {
    public constructor(error: string) {
        super(error, 400);
    }
}

