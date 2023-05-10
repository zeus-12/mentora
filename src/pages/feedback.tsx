import { Button, Select, Switch, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { postRequestConfig } from "@/utils/helper";
import {
  errorNotification,
  notSignedInNotification,
  successNotification,
} from "@/utils/Notification";

const Feedback = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      message: "",
      feedbackType: "",
      anonymous: false,
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      anonymous: (value) =>
        [true, false].includes(value) ? null : "Invalid value",
      feedbackType: (value) =>
        ["bug", "suggestion", "other", "appreciate"].includes(value)
          ? null
          : "Invalid value",
    },
  });

  const submitFeedbackHandler = async () => {
    if (!session && !form.values.anonymous) {
      notSignedInNotification("Please sign in or check Anonymous");
      return;
    }
    const validationResult = form.validate();

    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch("/api/feedback", {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    setLoading(false);
    if (data.error) {
      errorNotification("Something went wrong!");
      return;
    }
    successNotification("Feedback submitted successfully!");
    form.reset();
  };

  return (
    <div className="gap-2 flex-1 flex items-center sm:justify-center h-full flex-col">
      <p className="text-3xl font-bold pt-4">
        Submit <span className="text-green-400 ">Feedback</span>!
      </p>
      <p className="-mt-4 text-gray-400">
        Help us make the site even better🥳{" "}
      </p>

      <Select
        className="w-[90vw] max-w-[30rem]"
        label="Feedback Type"
        placeholder="Feedback Type"
        data={[
          { value: "bug", label: "Bug" },
          { value: "suggestion", label: "Suggestion" },
          { value: "other", label: "Other" },
          { value: "appreciate", label: "Appreciate" },
        ]}
        {...form.getInputProps("feedbackType")}
      />
      <Textarea
        required={true}
        className="w-[90vw] max-w-[30rem]"
        label="Feedback"
        placeholder="Tell us on how to improve."
        {...form.getInputProps("message")}
      />
      <Switch
        label="Prefer anonymous?"
        {...form.getInputProps("anonymous", { type: "checkbox" })}
      />

      <Button
        loading={loading}
        onClick={submitFeedbackHandler}
        className="btn-outline"
      >
        Submit
      </Button>
    </div>
  );
};
export default Feedback;
