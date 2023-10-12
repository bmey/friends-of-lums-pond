interface Route {
  icon: string;
  name: string;
  path: string;
}

export const ROUTES: Route[] = [
  {
    icon: "fa-house",
    name: "Home",
    path: "",
  },
  {
    icon: "fa-newspaper",
    name: "News",
    path: "blog",
  },
  {
    icon: "fa-circle-info",
    name: "About",
    path: "about",
  },
  {
    icon: "fa-book",
    name: "Resources",
    path: "resources",
  },
];
