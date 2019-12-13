
import { notification } from 'antd';

import {Application} from '@api/Application';

export default class NoticeUtils {

    static showSuccess(message) {
        notification["success"]({
            message: message,
            duration: Application.notice.duration,
        });
    }

    static showError(errorCode, message) {
        notification["error"]({
            message: errorCode,
            description: message,
            duration: Application.notice.duration,
        });
    }

    static showNotice(message) {
        notification["info"]({
            message: message,
            duration: Application.notice.duration,
        });
       
    }

    /**
     * 提醒框不会消失
     * @param {}} message 
     */
    static showInfo(message) {
        notification["info"]({
            message: message,
            duration: 0,
        });
    }

} 