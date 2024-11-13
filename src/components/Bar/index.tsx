"use client";

import { usePathname } from "next/navigation";
import HomeImg from "@/assets/images/home.svg";
import HelpImg from "@/assets/images/help.svg";
import PromoImg from "@/assets/images/promo.svg";
import OrderImg from "@/assets/images/order.svg";
import Link from "next/link";

type Props = {};

function BottomBar({}: Props) {
  const pathName = usePathname();
  const menu = [
    {
      key: "home",
      title: "Home",
      slug: "/",
      icon: <HomeImg />,
    },
    {
      key: "order",
      title: "Order",
      slug: "/order",
      icon: <OrderImg />,
    },
    {
      key: "promo",
      title: "Promo",
      slug: "/promo",
      icon: <PromoImg />,
    },
    {
      key: "help",
      title: "Help",
      slug: "/help",
      icon: <HelpImg />,
    },
  ];

  return (
    <div className="sticky bottom-4 px-4 z-50">
      <ul className="rounded-full flex justify-evenly gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3">
        {menu.map((item) => {
          let isActive = false;
          if (!!item.slug) {
            if (pathName === item.slug || (pathName.startsWith(item.slug) && pathName.charAt(item.slug.length) == "/")) {
              isActive = true;
            }
          }

          return (
            <li className="" key={item.key}>
              <Link href={item.slug} aria-current={isActive} className={["flex flex-col items-center rounded-full px-3 py-1 w-[70px]", isActive ? "bg-color1 text-white" : "text-gray2"].join(" ")}>
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BottomBar;
