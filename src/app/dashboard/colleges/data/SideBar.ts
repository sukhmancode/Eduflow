export interface LinkArray {
  href: string;
  value: string;
}

export const SideBarData: LinkArray[] = [
  {
    href: "/dashboard/colleges/",
    value: "Home",
  },
  {
    href: "/dashboard/colleges/addteacher",
    value: "Add Teacher",
  },
  {
    href: "/dashboard/colleges/addstudent",
    value: "Add Student",
  },
  {
    href: "/dashboard/colleges/viewclasses",
    value: "View Classes",
  },
  {
    href: "/dashboard/colleges/viewdetails",
    value: "View Details",
  },
  {
    href: "/dashboard/colleges/viewteachers",
    value: "View Teachers",
  },
  {
    href: "/dashboard/colleges/noticeposting",
    value: "Post Notice",
  },
  // {
  //   href: "/dashboard/college/enroll",
  //   value: "Enroll Students",
  // },
];
