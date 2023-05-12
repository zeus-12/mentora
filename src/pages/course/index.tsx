import { Pagination, TextInput } from "@mantine/core";
import { useState } from "react";
import CourseCard from "@/components/Course/CourseCard";
import { IconNotebook } from "@tabler/icons-react";
import { paginatedFilterCoursesOnSearch } from "@/utils/helper";
import MenuComponent from "@/components/UI/MenuComponent";
import { availableBranches } from "@/lib/constants";

export default function Home() {
  const [branchFilter, setBranchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [curPage, setCurPage] = useState(1);

  const { courses, totalPages } = paginatedFilterCoursesOnSearch(
    searchQuery,
    curPage,
    branchFilter
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <div className="flex gap-4 items-center justify-center">
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
        </div>
        <div className="flex justify-center">
          {searchQuery.trim().length !== 0 && courses?.length === 0 && (
            <p className="text-gray-400 mt-2">No course found!</p>
          )}

          {searchQuery.trim().length === 0 && (
            <p className="text-gray-400 mt-2">
              Start typing the Course name/id ...{" "}
            </p>
          )}

          {courses?.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {courses?.map(
                (course: { course_name: string; course_id: string }) => (
                  <CourseCard
                    key={course.course_id}
                    name={course.course_name}
                    id={course.course_id}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mx-auto mt-4">
          <Pagination
            value={curPage}
            onChange={(page) => setCurPage(page)}
            withControls={false}
            total={totalPages}
          />
        </div>
      )}
    </div>
  );
}
