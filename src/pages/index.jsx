import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Resources",
      body: "Share previous year QP's, Reference Books, Class Notes.",
      href: "/course",
    },
    { title: "Q&A", body: "Ask and solve Doubts.", href: "/doubt" },
    {
      title: "Buddy",
      body: "Learn together, or get a senior to tutor you.",
      href: "/buddy",
    },
  ];

  return (
    <div className="md:p-4 p-2 flex-1 lg:p-6 xl:p-8">
      <Head>
        <title>Mentora</title>
        <meta name="description" content="All-In-One App for Acads!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p className="text-4xl font-bold md:text-5xl text-gray-100 tracking-tight lg:text-6xl block">
          👋 Hey Junta,
        </p>
        <p className="xl:ml-10 md:text-3xl tracking-tighter md:max-w-[40rem] text-2xl font-semibold text-gray-400 mt-4 font-mono">
          This is{" "}
          <span className="text-green-400 hover:underline underline-offset-4">
            Mentora
          </span>
          , a platform to help you ace your exams. 🚀
        </p>
      </div>

      <div className="flex md:mt-8 lg:mt-12 xl:mt-14 flex-col items-center md:flex-row-reverse justify-center gap-4 sm:gap-12 lg:gap-32">
        <div className="w-[50vw] sm:w-[35vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw]">
          <Image
            priority={true}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src="/logo.png"
            alt="Quiz"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          {features.map((feature) => (
            <Link passHref href={`${feature.href}`} key={feature.title}>
              <div className="hover:border-[1px] rounded-md hover:scale-[101%] transition transform duration-100 ease-out hover:border-green-500 p-3 hover:cursor-pointer">
                <p className="sm:text-4xl text-3xl font-semibold text-green-400 font-mono">
                  {feature.title}
                </p>
                <p className="font-medium text-gray-400 text-xl">
                  {feature.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
