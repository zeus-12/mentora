import Link from "next/link";
import { getCourseNameFromId, prettifyId } from "../../utils/helper";
import { addHours, formatRelative } from "date-fns";

const DoubtCard = ({ doubt }) => {
  const { course_id, title, doubt: doubtDescription, date } = doubt;

  const formatedDate = formatRelative(
    addHours(new Date(date), 0.5),
    new Date()
  );

  return (
    <Link passHref href={`/doubt/${doubt._id}`}>
      <div className="hover:cursor-pointer bg-gray-900 px-8 py-3 space-y-1 rounded-xl flex justify-between">
        <div>
          <p className="font-bold text-xl">
            {prettifyId(course_id)}:{" "}
            <span className="text-gray-400 font-semibold">
              {getCourseNameFromId(course_id)}
            </span>
          </p>
          <p className="text-gray-400 text-lg truncate">{title}</p>
        </div>
        <p>{formatedDate}</p>
      </div>
    </Link>
  );
};
export default DoubtCard;
