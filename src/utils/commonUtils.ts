enum alertType {
    'alert',
    'success',
    'warning',
    'info',
}

type Alert = keyof typeof alertType;

interface IToastNotification {
    message: string;
    type: Alert;
    showIcon: boolean;
    dismiss: {
        manually: boolean;
        automatically: boolean;
    };
    duration: number;
    showDurationProgress: boolean;
    appearance: string;
}

export function returnNotificationObject(message: string, type: Alert): IToastNotification {
    return {
        message: message,
        type,
        showIcon: false,
        dismiss: {
            manually: true,
            automatically: true,
        },
        duration: 5000,
        showDurationProgress: true,
        appearance: 'light',
    };
}
