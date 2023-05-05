import { Loader } from "@mantine/core";
import { GREEN_400 } from "@/lib/constants";

const LoaderComponent = () => {
  return (
    <div className="flex-grow flex-1 flex items-center justify-center">
      <Loader color={GREEN_400} size="md" variant="bars" />
    </div>
  );
};
export default LoaderComponent;
