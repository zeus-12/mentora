import { errorNotification } from "@/utils/Notification";

export const getFetcher = (...args: any) =>
  // @ts-expect-error any
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => errorNotification(err.message));

export const options = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export const disableAutoRevalidate = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
