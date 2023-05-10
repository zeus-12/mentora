import { Button, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { availableBranches } from "@/lib/constants";
import DoubtCard from "@/components/Doubt/DoubtCard";
import LoaderComponent from "@/components/UI/LoaderComponent";
import { notSignedInNotification } from "@/utils/Notification";
import { filterOnSearch } from "@/utils/helper";
import MenuComponent from "@/components/UI/MenuComponent";
import { IconNotebook } from "@tabler/icons-react";
import { getFetcher } from "@/lib/SWR";

import useSWR from "swr";

const Doubts = () => {
  const { data: session } = useSession();
  const [branchFilter, setBranchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: doubts, error } = useSWR("/api/doubt", getFetcher);

  const filterOnBranch = (doubts: any) => {
    if (branchFilter === "all") {
      return doubts;
    }

    return doubts.filter((doubt: any) => {
      return doubt.course_id.startsWith(branchFilter);
    });
  };

  const filteredDoubts = filterOnSearch(searchQuery, filterOnBranch(doubts));

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-center gap-2 mb-4">
        <div className="max-w-[40rem] flex-1 ">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>

        <MenuComponent
          state={branchFilter}
          setState={setBranchFilter}
          Icon={IconNotebook}
          availableFilters={availableBranches}
          title={"Course Branch"}
        />
        <Link passHref href={session ? "/doubt/new" : ""}>
          <Button
            variant="outline"
            onClick={() =>
              !session
                ? notSignedInNotification("Please sign in to ask a doubt!")
                : () => {}
            }
            className="btn-outline"
          >
            Ask Question
          </Button>
        </Link>
      </div>

      {!doubts && <LoaderComponent />}

      <div className="space-y-4">
        {filteredDoubts?.length > 0 &&
          filteredDoubts.map((item: any) => (
            <DoubtCard doubt={item} key={item._id} />
          ))}

        {doubts?.length > 0 && filteredDoubts?.length === 0 && (
          <div className="text-center text-gray-500">
            No doubts found for the given search query
          </div>
        )}

        {error && (
          <div className="text-center text-gray-500">
            Error fetching doubts. Please try again later.
          </div>
        )}

        {!error && doubts?.length === 0 && (
          <div className="text-center text-gray-500">
            No doubts found. Be the first one to ask a doubt!
          </div>
        )}
      </div>
    </div>
  );
};

export default Doubts;
