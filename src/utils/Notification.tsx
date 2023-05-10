import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export const errorNotificationProps = {
  icon: <IconX size={18} />,
  color: "red",
};

export const notSignedInNotification = (message: string) => {
  notifications.show({
    title: "Please Sign In",
    message,
    ...errorNotificationProps,
  });
};

export const errorNotification = (message: string) => {
  notifications.show({
    title: "Error",
    message,
    ...errorNotificationProps,
  });
};

export const successNotification = (message: string) => {
  notifications.show({
    title: "Success",
    message,
    icon: <IconCheck size={18} />,
    color: "green",
  });
};
