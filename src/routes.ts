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
        icon: "fa-magnifying-glass",
        name: "About",
        path: "about",
    }
];
