import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useCallback } from "react";

export const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const displayMessage = useCallback((type: NoticeType, content: string) => {
        messageApi.open({
            type,
            content
        })
    }, [])

    return { contextHolder, displayMessage }
};