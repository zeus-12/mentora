const Other = () => {
  const sites = [
    {
      title: "Mess Menu",
      link: "https://foodentha.vercel.app",
      description:
        "Website which automatically updates the menu based on the day!",
    },
    {
      title: "Slots & Course Fundae",
      link: "https://map.coursepanel.in",
      description: "Tool to help plan course decisions",
    },
  ];
  return (
    <div>
      <p className="text-3xl mb-4 font-semibold tracking-tight">
        Other <span className="text-green-200"> cool </span>
        sites for IITM students!
      </p>
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {sites.map((site) => (
          <div
            key={site.link}
            className="p-4 hover:scale-[102%] transition transform duration-100 ease-out  bg-gray-900 flex flex-col justify-center space-y-4"
          >
            <a href={site.link}>
              <div className="flex items-center gap-2 justify-between ">
                <p className="text-2xl font-semibold">{site.title}</p>
                <p className="text-green-300 hover:underline hover:cursor-pointer underline-offset-4">
                  {site.link}
                </p>
              </div>
              <p className="text-md text-start text-gray-400">
                {site.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Other;
