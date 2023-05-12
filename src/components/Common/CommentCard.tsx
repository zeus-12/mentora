import { Avatar, TextInput } from "@mantine/core";
import { useState } from "react";
import { generateAvatarText, postRequestConfig } from "@/utils/helper";
import { IconCornerUpLeft, IconHeart, IconSend } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  errorNotification,
  notSignedInNotification,
} from "@/utils/Notification";

interface CommentCardProps {
  like_count: number;
  _id: string;
  liked: boolean;
  user: string;
  comment: string;
  type: string;
  id: string;
  mutate: () => void;
  parentId: string;
  session: any;
}

const CommentCard: React.FC<CommentCardProps> = ({
  like_count,
  _id,
  liked,
  user,
  comment,
  type,
  id,
  mutate,
  parentId,
  session,
}) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const form = useForm({
    initialValues: {
      comment: "",
    },
    validate: {
      comment: (value) => (value.length > 10 ? null : "Too short"),
    },
  });

  const likeCommentHandler = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to like");
      return;
    }

    const res = await fetch(`/api/${type}/like/${_id}`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Something went wrong!");
      return;
    } else {
      mutate();
    }
  };

  const postSubComment = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to comment");
      return;
    }
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }

    let requestBody = { [type]: form.values.comment };

    const res = await fetch(`/api/${type}/${id}/${parentId}`, {
      ...postRequestConfig,
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Something went wrong");
    } else {
      mutate();
      form.reset();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center text-md px-1 py-2 rounded-md">
        <div className="flex items-center gap-4">
          <Avatar size={40} color="blue">
            {generateAvatarText(user)}
          </Avatar>
          <p>{comment}</p>
        </div>
        <div className="gap-2 flex">
          <div className="flex items-center gap-1">
            <IconHeart
              onClick={likeCommentHandler}
              className={
                liked
                  ? "fill-red-400 text-red-400"
                  : "" + " hover:cursor-pointer w-6 h-6"
              }
            />
            <p className="text-gray-400">{like_count}</p>
          </div>
          <IconCornerUpLeft
            className="hover:text-gray-100 hover:cursor-pointer w-6 h-6"
            onClick={() => setShowNewComment((prev) => !prev)}
          />
        </div>
      </div>
      {showNewComment && (
        <div className="flex items-center gap-2 px-2">
          <TextInput
            placeholder="Add a comment..."
            className="my-2 flex-1 ml-12"
            {...form.getInputProps("comment")}
          />
          <IconSend
            onClick={postSubComment}
            className="hover:text-gray-100 hover:cursor-pointer w-6 h-6"
          />
        </div>
      )}
    </div>
  );
};
export default CommentCard;
