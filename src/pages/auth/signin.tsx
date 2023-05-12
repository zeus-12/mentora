import { Button, Image } from "@mantine/core";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/UI/NavbarComponents";
import getServerSession from "@/utils/getServerSession";

export default function SignIn() {
  // CHANGE WHEN ADDING MORE PROVIDERS
  const providers = { google: { id: "google", name: "Google" } };

  return (
    <div className="gap-2 flex-col flex flex-1 justify-center items-center">
      {Object.values(providers).map((provider) => (
        <div
          className="flex flex-col items-center gap-4 justify-center"
          key={provider.name}
        >
          <Logo textSize="text-6xl" />

          <div>
            <p className="text-xl -mt-2 font-semibold">
              The all-in-one place for Acads!
            </p>
            <p className="text-gray-400">
              Use only your smail account to sign in.
            </p>
          </div>

          <div>
            <Button
              className="bg-[#0b5893] flex justify-between px-2"
              onClick={() => signIn(provider.id)}
            >
              <Image
                width={25}
                height={25}
                src="/google-logo.png"
                alt="google"
              />
              <p className="pl-2">Sign in with {provider.name}</p>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
