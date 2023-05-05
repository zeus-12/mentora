import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex-1 items-center flex justify-center">
      <p className="text-4xl text-center">
        <span className="font-bold">You have been banned!</span>
        <br />
        Please let us know through{" "}
        <Link href="/feedback">
          <span className="text-green-400 hover:cursor-pointer hover:underline underline-offset-4">
            Feedback{" "}
          </span>
        </Link>
        if you think this is a mistake.
      </p>
    </div>
  );
};
export default Unauthorized;
