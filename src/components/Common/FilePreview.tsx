import { Image } from "@mantine/core";
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons";

interface FilePreviewType {
  file: any;
}

const FilePreview: React.FC<FilePreviewType> = ({ file }) => {
  if (IMAGE_MIME_TYPE.includes(file.type || file.file_type)) {
    const imageUrl = file.file_url || URL.createObjectURL(file);

    return (
      <div className="w-[30vh] h-[30vh] ">
        <Image
          alt={file.file_name || file.name}
          src={imageUrl}
          // @ts-ignore
          props={file.file_name || file.name}
        />
      </div>
    );
  } else if (PDF_MIME_TYPE.includes(file.type || file.file_type)) {
    const fileUrl = file.file_url || URL.createObjectURL(file);
    return (
      <div className="w-[30vh] h-[30vh]  flex flex-col items-center justify-center">
        <IconPhoto size={40} />
        {/* <embed className="w-50 h-[50vh]" src={fileUrl} /> */}
        <p>{file.file_name || file.name}</p>
      </div>
    );
  } else {
    return <></>;
  }
};
export default FilePreview;
