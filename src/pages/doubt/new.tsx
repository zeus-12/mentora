import { Button, FileInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { postRequestConfig } from "@/utils/helper";
import { errorNotification } from "@/utils/Notification";

const NewDoubt = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerHandler = async () => {
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/doubt`, {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    setLoading(false);
    if (data.error) {
      errorNotification("Something went wrong!");
      return;
    }
    router.push("/doubt");
  };

  const form = useForm({
    initialValues: {
      course_id: "",
      doubt: "",
      title: "",
    },
    validate: {
      doubt: (value) => (value.length > 10 ? null : "Too short"),
      title: (value) => (value.length > 4 ? null : "Too short"),
      course_id: (value) => (value?.length === 6 ? null : "Invalid Course ID"),
    },
  });

  return (
    <div className="flex-1 flex justify-center sm:items-center ">
      <div>
        <p className="text-3xl font-bold tracking-tighter mb-4">Ask a Doubt!</p>

        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course ID"
          placeholder="Course ID"
          {...form.getInputProps("course_id")}
        />

        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Doubt Title"
          placeholder="Doubt Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Doubt"
          placeholder="Enter your doubt"
          {...form.getInputProps("doubt")}
        />

        {/* <div className="flex justify-start">
          <FileInput
            placeholder="Pick file"
            label="Attach Files"
            withAsterisk
          /> 
        </div>*/}
        <Button
          loading={loading}
          onClick={registerHandler}
          className="btn-outline mt-4"
        >
          Post your question
        </Button>
      </div>
    </div>
  );
};
export default NewDoubt;
