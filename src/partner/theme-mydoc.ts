import { IAppConfig, PageStyleContainerEnum, PageStyleContentEnum } from "@app/interfaces";

export const MyDoc: IAppConfig = {
    providerId: 0,
    theme: {
        // body
        "--theme-font-family": "'Roboto', sans-serif",
        "--theme-font-primary-color": "#0E194E",
        "--theme-font-secondary-color": "#828FB7",
        "--theme-font-inactive-color": "#C7D2E1",
        "--theme-box-border-color": "#DBDBDB",

        // header/footer
        "--theme-header-background-color": "#ffffff",
        "--theme-footer-background-color": "#ffffff",

        // background
        "--theme-primary-background-color": "#ffffff",
        "--theme-secondary-background-color": "#ffffff", // applies to pageStyle.container

        // errors and warnings
        "--theme-error-background-color": "#ED0225",
        "--theme-error-foreground-color": "#FAFAFA",

        // buttons
        "--theme-button-border-radius": "5px",

        "--theme-button-primary-border-color": "#4F85F1",
        "--theme-button-primary-background-color": "#4F85F1",
        "--theme-button-primary-foreground-color": "#ffffff",

        "--theme-button-secondary-border-color": "#DBDBDB",
        "--theme-button-secondary-background-color": "rgb(239, 239, 239)",
        "--theme-button-secondary-foreground-color": "#000000",

        "--theme-button-primary-inactive-border-color": "#DBDBDB",
        "--theme-button-primary-inactive-background-color": "#DBDBDB",
        "--theme-button-primary-inactive-foreground-color": "#EFEFEF",

        "--theme-button-secondary-inactive-border-color": "#DBDBDB",
        "--theme-button-secondary-inactive-background-color": "#FAFAFA",
        "--theme-button-secondary-inactive-foreground-color": "#EFEFEF",
    },
    logoUrl: "https://my-doc.com/wp-content/uploads/2019/12/logo-mydoc-1.png",
    menuItems: [
        { "text": "Home", "routerLink": "/home", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        // { "text": "Explore", "routerLink": "/home", "icon": ["fas", "globe-asia"], "display": { "public": true, "private": true } },
        { "text": "MyDoc Tour", "routerLink": "/public/tour", "icon": ["fas", "route"], "display": { "public": true, "private": false } },
        { "text": "Care Network", "routerLink": "/care-network", "icon": ["fas", "heart"], "display": { "public": true, "private": true } },
        { "text": "Appointment", "routerLink": "/waiting-room", "icon": ["fas", "calendar-alt"], "display": { "public": false, "private": true } },
        { "text": "Feeds", "routerLink": "/feeds", "icon": ["fas", "newspaper"], "display": { "public": true, "private": true } },
        { "text": "Settings", "routerLink": "/profile", "icon": ["fas", "user"], "display": { "public": false, "private": true } }
    ],
    pageStyle: { container: PageStyleContainerEnum.container, content: PageStyleContentEnum.contentCenter },
    header: { component: "HeaderComponent", "config": { } },
    footer: { component: "FooterComponent", "config": { } },
    sections: [
        {
            component: "BannerSectionComponent",
            config: { imgSrc: "assets/banner-mydoc.jpg" }
        },
        { component: "CategorySectionComponent", "config": {} },
        { component: "RecentProvidersSectionComponent", "config": {} },
        { component: "RecentFeedsSectionComponent", "config": {} },
    ]
}
