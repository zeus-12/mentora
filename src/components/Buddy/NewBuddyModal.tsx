import { Button, Modal, Radio, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { postRequestConfig } from "@/utils/helper";
import { errorNotification, successNotification } from "@/utils/Notification";

interface NewBuddyModalProps {
  newBuddyModal: boolean;
  closeNewBuddyModal: () => void;
}

const NewBuddyModal: React.FC<NewBuddyModalProps> = ({
  newBuddyModal,
  closeNewBuddyModal,
}) => {
  const { mutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      course_id: "",
      message: "",
      buddyType: "",
      money: "",
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      buddyType: (value) =>
        ["peer", "tutor"].includes(value) ? null : "Choose a Buddy Type",
      course_id: (value) => (value.length === 6 ? null : "Invalid Course ID"),
      money: (value) =>
        /^\d+$/.test(value) || value === "" ? null : "Invalid Money",
    },
  });

  const registerHandler = async () => {
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/buddy`, {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();

    if (data.error) {
      errorNotification("Something went wrong");
      setLoading(false);
      return;
    }
    mutate("/api/buddy");

    successNotification("Buddy request sent");
    setLoading(false);
    form.reset();

    closeNewBuddyModal();
  };

  return (
    <Modal
      withCloseButton={false}
      transitionProps={{
        transition: "fade",
        duration: 600,
        timingFunction: "ease",
      }}
      opened={newBuddyModal}
      onClose={closeNewBuddyModal}
      centered={true}
      classNames={{
        content: "bg-black flex flex-col justify-center items-center",
      }}
      size="lg"
      radius="md"
    >
      <div className="flex flex-col ">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-green-200 font-bold">Request a Buddy</p>
          <IconX
            onClick={closeNewBuddyModal}
            className="hover:cursor-pointer"
          />
        </div>
        <Radio.Group
          label="Buddy Type"
          withAsterisk
          {...form.getInputProps("buddyType")}
        >
          <div className="flex gap-4 py-4">
            <Radio value="tutor" label="Tutor" />
            <Radio value="peer" label="Peer" />
          </div>
        </Radio.Group>

        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course ID"
          placeholder="Course ID"
          {...form.getInputProps("course_id")}
        />
        {form.values.buddyType === "tutor" && (
          <TextInput
            required={true}
            className="w-[90vw] max-w-[30rem]"
            label="Offer Money"
            placeholder="Offer Money"
            {...form.getInputProps("money")}
          />
        )}
        <Textarea
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Message for your buddy"
          placeholder="Explain why you would be a perfect buddy!"
          {...form.getInputProps("message")}
        />

        <Button
          onClick={registerHandler}
          loading={loading}
          className="hover:text-white text-orange-600 border-orange-600 hover:bg-orange-600 mt-3"
          variant="outline"
        >
          Request
        </Button>
      </div>
    </Modal>
  );
};
export default NewBuddyModal;
