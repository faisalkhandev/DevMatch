
import { toast } from 'react-toastify';


// Helper function to show toast
export const showToast = (message, status = 'info') => {
    switch (status) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'warn':
        case 'warning':
            toast.warn(message);
            break;
        case 'info':
        default:
            toast.info(message);
            break;
    }
};

