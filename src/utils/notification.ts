// @ts-nocheck
import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

export const errorNotificationProps = {
  // @ts-ignore
  // eslint-disable-next-line
  // icon: <IconX size={18} />,
  color: "red",
};

// @ts-ignore
export const notSignedInNotification = (message: string) => {
  showNotification({
    title: "Please Sign In",
    message,
    ...errorNotificationProps,
  });
};

export const errorNotification = (message: string) => {
  showNotification({
    title: "Error",
    message,
    ...errorNotificationProps,
  });
};

export const successNotification = (message: string) => {
  showNotification({
    title: "Success",
    message,
    color: "green",
    // icon: <IconCheck size={18} />,
  });
};
