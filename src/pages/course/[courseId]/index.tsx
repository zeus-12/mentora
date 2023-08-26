import { Badge, Blockquote, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { postRequestConfig, prettifyId } from "@/utils/helper";
import CommentCard from "@/components/Common/CommentCard";
import SubCommentCard from "@/components/Common/SubCommentCard";
import {
  errorNotification,
  notSignedInNotification,
  successNotification,
} from "@/utils/Notification";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { disableAutoRevalidate, getFetcher } from "@/lib/SWR";
import FilePreview from "@/components/Common/FilePreview";
import * as CourseMapping from "@/lib/COURSE_MAPPING.json";
import { UploadButton } from "@uploadthing/react";
import type { uploadRouter } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

// interface CourseResource {
//   course_id: string;
//   resources: ResourcesProps[];
// }

interface Comment {
  course_id: string;
  user: string;
  comment: string;
  date: Date;
  parent_id?: string;
  liked_users: string[];
  like_count: number;
  liked: boolean;
  _id: string;
  subComments?: Comment[];
}

interface ResourcesProps {
  file_name: string;
  file_url: string;
  file_type: string;
  date: Date;
  uploader: string;
}

const CourseDetails = () => {
  const router = useRouter();
  let { courseId } = router.query as { courseId: string };
  courseId = courseId?.toUpperCase();
  const { data: session } = useSession();

  const { data: comments, mutate } = useSwr<Comment[]>(
    courseId ? `/api/comment/${courseId}` : null,
    getFetcher
  );

  const { data: courseData } = useSwr(
    courseId ? `/api/course/${courseId}` : null,
    getFetcher,
    disableAutoRevalidate
  );

  const { data: courseResources, mutate: mutateCourseResources } = useSwr(
    courseId ? `/api/resource/${courseId}` : null,
    getFetcher
  );

  const form = useForm({
    initialValues: {
      comment: "",
    },
    validate: {
      comment: (value) => (value.length > 10 ? null : "Too short"),
    },
  });

  const addComment = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to comment");
      return;
    }
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }

    const res = await fetch(`/api/comment/${courseId}`, {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Something went wrong!");
    } else {
      mutate();
      form.reset();
    }
  };

  if (!(courseId in CourseMapping)) {
    return <div>course doesnt exist</div>;
  }

  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="">
            <p className="text-3xl text-gray-200 font-bold">
              {CourseMapping[courseId as keyof typeof CourseMapping]}
            </p>
            <p className="text-2xl text-gray-400 font-semibold">
              {courseId && prettifyId(courseId)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex-col sm:flex-row flex gap-2">
              <Badge color="green" size="lg">
                {courseData?.course_type || "Unknown"}
              </Badge>
              <Badge color="green" size="lg">
                Credits: {courseData?.credits}{" "}
              </Badge>
            </div>
          </div>
        </div>
        {courseData?.description && (
          <Blockquote color="green" className="text-gray-400 sm:w-[70vw]">
            {courseData?.description}
          </Blockquote>
        )}

        {/* course resources */}

        <div className="flex flex-wrap gap-2 my-2">
          <div
            onClick={(e) => {
              if (!session) {
                e.preventDefault();
                e.stopPropagation();
                notSignedInNotification("Please sign in to add resources");
                return;
              }
            }}
          >
            <UploadButton<uploadRouter>
              input={{
                courseId,
              }}
              endpoint="courseResourcesUploader"
              onClientUploadComplete={() => {
                successNotification("File Uploaded Successfully");
                mutateCourseResources();
              }}
              onUploadError={(error: any) => {
                errorNotification("Something went wrong!");
              }}
            />
          </div>

          {courseResources &&
            courseResources?.resources?.map(
              (resource: ResourcesProps, index: number) => (
                <a
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  <FilePreview file={resource} />
                </a>
              )
            )}
        </div>
      </div>

      {/* Comment section */}
      <div className="mb-6">
        <p className="text-xl font-semibold ">Comments</p>
        <Textarea
          placeholder="Add a comment..."
          className="my-2"
          {...form.getInputProps("comment")}
        />
        <Button onClick={addComment} className="btn-outline">
          Add Comment
        </Button>

        <div className="space-y-4 mt-4">
          {comments &&
            comments.length > 0 &&
            comments.map((comment: Comment, index: number) => (
              <div key={index}>
                <CommentCard
                  session={session}
                  like_count={comment.like_count}
                  liked={comment.liked}
                  _id={comment._id}
                  user={comment.user}
                  comment={comment.comment}
                  type="comment"
                  id={courseId}
                  parentId={comment._id}
                  mutate={mutate}
                />
                {comment.subComments &&
                  comment.subComments?.length > 0 &&
                  comment.subComments.map((subComment, index) => (
                    <SubCommentCard
                      like_count={subComment.like_count}
                      liked={subComment.liked}
                      mutate={mutate}
                      _id={subComment._id}
                      type="comment"
                      session={session}
                      key={index}
                      user={subComment.user}
                      comment={subComment.comment}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
