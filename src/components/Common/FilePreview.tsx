import { Image } from "@mantine/core";
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";

interface FilePreviewType {
  file: any;
}

const FilePreview: React.FC<FilePreviewType> = ({ file }) => {
  if (file.file_type === "image") {
    const imageUrl = file.file_url || URL.createObjectURL(file);

    return (
      <div className="w-[30vh] h-[30vh]">
        <Image
          alt={file.file_name || file.name}
          src={imageUrl}
          // props={file.file_name || file.name}
        />
        <p>{file.file_name}</p>
      </div>
    );
  } else if (file.file_type === "pdf") {
    const fileUrl = file.file_url || URL.createObjectURL(file);
    return (
      <div className="max-w-[25vw] flex flex-col items-center justify-center">
        <IconPhoto size={40} />
        {/* <embed className="w-50 h-[50vh]" src={fileUrl} /> */}
        <p>{file.file_name || file.name}</p>
      </div>
    );
  } else {
    return <div className="bg-gray-800 p-4 rounded-md">Course resource</div>;
  }
};
export default FilePreview;
