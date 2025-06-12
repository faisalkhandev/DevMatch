import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
/>;

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

export default Toast;
