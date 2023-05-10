import { Blockquote, Button, Modal } from "@mantine/core";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { prettifyId } from "@/utils/helper";
import * as CourseMapping from "@/lib/COURSE_MAPPING.json";
import { useSWRConfig } from "swr";
import {
  errorNotification,
  notSignedInNotification,
  successNotification,
} from "@/utils/Notification";
import { useSession } from "next-auth/react";

interface BuddyDetailsProps {
  buddyData: any;
  closeDetailsModal: () => void;
}

const BuddyDetailsModal: React.FC<BuddyDetailsProps> = ({
  buddyData,
  closeDetailsModal,
}) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const applyBuddyHandler = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to apply for buddy");
      return;
    }

    const res = await fetch(`/api/buddy/${buddyData._id}/apply`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Error applying buddy");
      return;
    }
    successNotification("Applied Successfully!");
    closeDetailsModal();
    mutate("/api/buddy");
  };

  return (
    <div>
      <Modal
        withCloseButton={false}
        transitionProps={{
          transition: "fade",
          timingFunction: "ease",
        }}
        opened={!!buddyData}
        onClose={closeDetailsModal}
        centered={true}
        classNames={{
          content: "bg-black md:p-4 lg:p-8",
        }}
        size="lg"
        radius="md"
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <p className="text-xl sm:text-2xl">
              {prettifyId(buddyData?.course_id)}
            </p>
            <p className="bg-green-700 text-gray-300 text-base sm:text-base inline-flex px-1 sm:px-2 py-[2px] rounded-2xl capitalize">
              {buddyData?.buddyType}
            </p>
          </div>
          <p className="text-gray-500 flex">
            {
              CourseMapping[
                buddyData?.course_id?.toUpperCase() as keyof typeof CourseMapping
              ]
            }
          </p>

          <Blockquote color="green">
            <p>{buddyData?.message}</p>
          </Blockquote>

          <div className="flex gap-2 text-lg">
            {buddyData?.buddyType === "tutor" && (
              <div className="flex items-center">
                <IconCurrencyRupee className="w-5 h-5" />
                {buddyData?.money}
              </div>
            )}
          </div>

          {buddyData && !buddyData?.self && !buddyData?.applied && (
            <Button onClick={applyBuddyHandler} className="btn-outline">
              Apply!
            </Button>
          )}

          {buddyData?.applied && (
            <p className="text-gray-400 text-center">
              <span className="font-semibold">Already Applied!</span>
              <br />
              Your email has been shared. Kindly wait for the response.
            </p>
          )}

          {buddyData?.self && (
            <p className="text-gray-400 text-center">
              You cant apply for your own request!
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default BuddyDetailsModal;
