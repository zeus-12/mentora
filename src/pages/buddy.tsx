import { Button, Input, TextInput } from "@mantine/core";
import MenuComponent from "@/components/UI/MenuComponent";
import { useState } from "react";
import BuddyCard from "@/components/Buddy/BuddyCard";
import { availableBranches } from "@/lib/constants";
import { IconAdjustmentsHorizontal, IconNotebook } from "@tabler/icons-react";
import LoaderComponent from "@/components/UI/LoaderComponent";
import NewBuddyModal from "@/components/Buddy/NewBuddyModal";
import { notSignedInNotification } from "@/utils/Notification";
import { useSession } from "next-auth/react";
import { filterOnSearch } from "@/utils/helper";
import BuddyDetailsModal from "@/components/Buddy/BuddyDetailsModal";
import useSWR from "swr";
import { getFetcher } from "@/lib/SWR";

interface BuddyType {
  course_id: string;
  user: string;
  date: Date;
  message: string;
  buddyType: string;
  money: string;
  applied_users: string[];
  _id: string;
}

const Buddy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newBuddyModal, setNewBuddyModal] = useState(false);
  const { data: session } = useSession();
  const [buddyTypeFilter, setBuddyTypeFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  const [cur, setCur] = useState<BuddyType>();

  const closeDetailsModal = () => {
    setCur(undefined);
  };

  const closeNewBuddyModal = () => {
    setNewBuddyModal(false);
  };

  const { data: buddies } = useSWR("/api/buddy", getFetcher);

  const applyBuddyBtnHandler = () => {
    if (!session) {
      notSignedInNotification("Please sign in to apply for buddy");
      return;
    }
    setNewBuddyModal(true);
  };

  const availableBuddyTypeFilters = ["all", "tutor", "peer"];

  const filterCourseBranches = (data: BuddyType[]) => {
    if (branchFilter === "all") return data;
    return data.filter((buddy) =>
      buddy.course_id.toUpperCase().startsWith(branchFilter)
    );
  };

  const filterBuddyRequests = (data: BuddyType[]) => {
    switch (buddyTypeFilter) {
      case "all":
        return data;
      case "tutor":
        return data.filter((buddy) => buddy.buddyType === "tutor");
      case "peer":
        return data.filter((buddy) => buddy.buddyType === "peer");
      default:
        return data;
    }
  };

  const filteredBuddies = filterOnSearch(
    searchQuery,
    filterBuddyRequests(filterCourseBranches(buddies))
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex sm:gap-4 gap-2 items-center mb-4 justify-center">
        <div className="max-w-[40rem] flex-1">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>

        <MenuComponent
          state={buddyTypeFilter}
          setState={setBuddyTypeFilter}
          availableFilters={availableBuddyTypeFilters}
          title={"Buddy Type"}
          Icon={IconAdjustmentsHorizontal}
        />
        <MenuComponent
          state={branchFilter}
          setState={setBranchFilter}
          Icon={IconNotebook}
          availableFilters={availableBranches}
          title={"Course Branch"}
        />

        <Button
          variant="outline"
          className="btn-outline"
          onClick={() => applyBuddyBtnHandler()}
        >
          Apply Now!
        </Button>
      </div>

      {!buddies && <LoaderComponent />}
      {buddies && buddies?.length === 0 && <p>No results found!</p>}
      {filteredBuddies?.length > 0 && (
        <div className="grid auto-rows-max justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3">
          {filteredBuddies.map((buddy: BuddyType) => (
            <BuddyCard
              onClick={() => setCur(buddy)}
              buddy={buddy}
              key={buddy._id}
            />
          ))}
        </div>
      )}
      {buddies?.length > 0 && filteredBuddies.length === 0 && (
        <p>No results found!</p>
      )}

      <NewBuddyModal
        newBuddyModal={newBuddyModal}
        closeNewBuddyModal={closeNewBuddyModal}
      />
      <BuddyDetailsModal
        buddyData={cur}
        closeDetailsModal={closeDetailsModal}
      />
    </div>
  );
};
export default Buddy;
