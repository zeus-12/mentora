import Link from "next/link";
import React from "react";
import { prettifyId } from "@/utils/helper";
import { IconFolder } from "@tabler/icons-react";

interface CourseCardProps {
  name: string;
  id: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, id }) => {
  return (
    <Link href={`/course/${id}`} passHref>
      <div className="border-[0.75px] h-full border-gray-500 rounded-lg p-3 w-25 text-gray-300 hover:scale-105 transition transform duration-100 ease-out hover:cursor-pointer ">
        <div className="flex gap-2">
          <IconFolder className="w-6 h-6 fill-gray-400 text-gray-400" />
          <p>{prettifyId(id)}</p>
        </div>
        <p className="text-gray-300">{name}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
