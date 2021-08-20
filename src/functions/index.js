import { NotificationManager } from 'react-notifications';
import FormData from 'form-data'

const createNotification = (type, text) => {
  switch (type) {
      case 'info':
        NotificationManager.info(text);
      break;
      case 'success':
        NotificationManager.success(text);
      break;
      case 'warning':
        NotificationManager.warning(text);
      break;
      case 'error':
        NotificationManager.error(text);
      break;
    }
}

const assign = args => {
    let res = new FormData();
    for(const [key, val] of Object.entries(args)){
        res.append(key, val);
    }
    return res;
}

export {
    createNotification,
    assign
}