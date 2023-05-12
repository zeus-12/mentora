import * as CourseMapping from "@/lib/COURSE_MAPPING.json";

export const prettifyId = (id: string) => {
  if (!id) {
    return;
  }
  return id.slice(0, 2).toUpperCase() + " " + id.slice(2);
};

export const generateAvatarText = (name: string) => {
  if (!name) {
    return;
  }
  return name
    .split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase()
    ?.slice(0, 2);
};

export const getCourseNameFromId = (id: string) => {
  if (!id) {
    return;
  }
  id = id.toUpperCase();

  if (id in CourseMapping) {
    return CourseMapping[id as keyof typeof CourseMapping];
  } else {
    return;
  }
};

const branchFilteredCourses = (
  courses: {
    course_name: string;
    course_id: string;
  }[],
  branchFilter: string
) => {
  if (branchFilter === "all") {
    return courses;
  }

  return courses.filter((course) => {
    return course.course_id.startsWith(branchFilter);
  });
};

export const paginatedFilterCoursesOnSearch = (
  searchQuery: string,
  curPage: number,
  branchFilter: string
) => {
  if (searchQuery?.trim()?.length === 0) return { courses: [], totalPages: 0 };

  const results = Object.keys(CourseMapping).filter((courseId) => {
    return [
      courseId,
      CourseMapping[courseId?.toUpperCase() as keyof typeof CourseMapping],
    ].some((item) =>
      removeSpacesAndUppercase(item)?.includes(
        removeSpacesAndUppercase(searchQuery)
      )
    );
  });

  const resultsArray = results.map((courseId) => {
    return {
      course_id: courseId,
      course_name: CourseMapping[courseId as keyof typeof CourseMapping],
    };
  });

  const maxCoursesPerPage = 50;
  const totalPages = Math.ceil(results.length / maxCoursesPerPage);

  const slicedFilteredCourse = resultsArray.slice(
    (curPage - 1) * maxCoursesPerPage,
    curPage * maxCoursesPerPage
  );

  const filteredByBranch = branchFilteredCourses(
    slicedFilteredCourse,
    branchFilter
  );

  return { courses: filteredByBranch, totalPages };
};

export const filterOnSearch = (
  searchQuery: string,
  data: any,
  initial?: any
) => {
  if (searchQuery.trim()?.length === 0) {
    if (initial) return initial;
    return data;
  } else {
    return data?.filter((item: any) => {
      return [
        item.course_id,
        item.course_name ||
          CourseMapping[
            item?.course_id?.toUpperCase() as keyof typeof CourseMapping
          ],
      ].some((str) => {
        return removeSpacesAndUppercase(str)?.includes(
          removeSpacesAndUppercase(searchQuery)
        );
      });
    });
  }
};

const removeSpacesAndUppercase = (str: string) => {
  return str?.replaceAll(" ", "")?.toUpperCase();
};

export const postRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
