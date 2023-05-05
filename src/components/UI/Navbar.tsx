import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Logo,
  NavbarDrawer,
  LoginUserComponent,
  NavbarMiddleSection,
  BurgerComponent,
} from "./NavbarComponents";

export default function Navbar() {
  //for the burger & drawer
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <div className="lg:px-8 xl:px-10 px-4 min-h-[60px] border-b-[1px] border-gray-800 h-[8vh] bg-[#000000] relative top-0 flex justify-between items-center z-40 ">
        <Logo setOpened={setOpened} />
        <div className="sm:hidden">
          <BurgerComponent opened={opened} setOpened={setOpened} />
        </div>
        <div className="hidden sm:flex">
          <NavbarMiddleSection />
        </div>

        {/* so that the burger icon remains in the case --- you open the burger icon then increases the size */}
        {/* NOT REALLY REQUIRED */}
        {opened && (
          <div className="hidden sm:flex">
            <BurgerComponent opened={opened} setOpened={setOpened} />
          </div>
        )}
        {!opened && (
          <div className="text-gray-300 text-lg font-medium hidden gap-8 sm:flex">
            <LoginUserComponent session={session} />
          </div>
        )}
      </div>

      <div className="absolute top-10">
        <NavbarDrawer session={session} setOpened={setOpened} opened={opened} />
      </div>
    </div>
  );
}
