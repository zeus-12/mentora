import { Button, Group, SimpleGrid, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { postRequestConfig, prettifyId } from "@/utils/helper";
import { errorNotification } from "@/utils/Notification";
import FilePreview from "@/components/Common/FilePreview";

const NewSubmission = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleUpload = (file: any) => {
    // @ts-ignore
    setFiles((prevState) => [...prevState, ...file]);
  };

  // @ts-ignore
  const addFileToDb = async (newFileName: string, file) => {
    const res = await fetch(`/api/resource/${courseId}`, {
      ...postRequestConfig,
      body: JSON.stringify({
        file_name: newFileName,
        file_url: `https://mentora.blob.core.windows.net/course/${newFileName}`,
        file_type: file.type,
      }),
    });
    const data = await res.json();
    return data;
  };

  const submitHandler = async () => {
    files.map(async (file) => {
      // @ts-ignore
      const newFileName = `${courseId}/${file.name}`;
      // uploadFileToBlob(file, newFileName);
    });
  };

  return (
    <div className="px-1 flex-1 sm:px-2 md:px-4 lg:px-6 xl:px-32">
      <p className="text-3xl font-bold text-green-300">
        {prettifyId(courseId)}
      </p>
      <div className="flex justify-between">
        <p className="text-3xl font-semibold tracking-tighter mb-2">
          Add Materials!
        </p>
        <Button
          loading={loading}
          className="btn-outline"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>

      <Dropzone
        onDrop={(file) => handleUpload(file)}
        onReject={(files) =>
          errorNotification("File rejected, check file size and format!")
        }
        maxSize={15 * 1024 ** 2}
        accept={[...PDF_MIME_TYPE, ...IMAGE_MIME_TYPE]}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} color={"blue"} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} stroke={1.5} color={"blue"} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like.
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        className="gap-8"
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={files.length > 0 ? "xl" : 0}
      >
        {files.map((file, index) => (
          <FilePreview file={file} key={index} />
        ))}
      </SimpleGrid>
    </div>
  );
};
export default NewSubmission;
