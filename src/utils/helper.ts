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

export const filterOnSearch = (
  searchQuery: string,
  data: any,
  initial?: any
) => {
  if (searchQuery.trim().length === 0) {
    if (initial) return initial;
    return data;
  } else {
    return data?.filter(
      (item: any) =>
        (
          item.course_name ||
          CourseMapping[
            item.course_id.toUpperCase() as keyof typeof CourseMapping
          ]
        )
          ?.replaceAll(" ", "")
          .toLowerCase()
          .includes(searchQuery.replaceAll(" ", "").toLowerCase()) ||
        item.course_id
          .replaceAll(" ", "")
          .toLowerCase()
          .includes(searchQuery.replaceAll(" ", "").toLowerCase())
    );
  }
};

export const postRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
