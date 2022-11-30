import { Notyf } from "notyf";

class NotifyService {

    private notification = new Notyf({ duration: 3000, position: { x: "right", y: "bottom" } });

    public success(message: string): void {
        this.notification.success(message);
    }
    
    public error(err: any): void {
        const message = this.getErrorMessage(err);
        this.notification.error(message);
    }

    private getErrorMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response.data;
        if (typeof err.message === "string") return err.message;
        return "Some error occurred, please try again.";
    }
}

const notifyService = new NotifyService();

export default notifyService;