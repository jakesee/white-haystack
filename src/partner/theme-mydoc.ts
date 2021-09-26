import { IAppConfig, PageStyleContainerEnum, PageStyleContentEnum } from "@app/interfaces";

export const MyDoc: IAppConfig = {
    providerId: 0,
    theme: {
        // body
        "--theme-font-family": "'Roboto', sans-serif",
        "--theme-font-primary-color": "#0E194E",
        "--theme-font-secondary-color": "#828FB7",
        "--theme-font-inactive-color": "#C7D2E1",


        // header/footer
        "--theme-header-background-color": "#ffffff",
        "--theme-footer-background-color": "#ffffff",

        // background
        "--theme-primary-background-color": "#ffffff",
        "--theme-secondary-background-color": "#ffffff", // applies to pageStyle.container

        // errors and warnings
        "--theme-box-border-radius": "5px",
        "--theme-error-border-color": "#FFEBE6",
        "--theme-error-background-color": "#FFEBE6",
        "--theme-error-foreground-color": "#333333",
        "--theme-warning-border-color": "#FFF9E7",
        "--theme-warning-background-color": "#FFF9E7",
        "--theme-warning-foreground-color": "#333333",
        "--theme-info-border-color": "#DEECFE",
        "--theme-info-background-color": "#DEECFE",
        "--theme-info-foreground-color": "#333333",
        "--theme-note-border-color": "#EAE7FE",
        "--theme-note-background-color": "#EAE7FE",
        "--theme-note-foreground-color": "#333333",
        "--theme-success-border-color": "#E3FCEF",
        "--theme-success-background-color": "#E3FCEF",
        "--theme-success-foreground-color": "#333333",

        // buttons
        "--theme-button-border-radius": "5px",
        "--theme-button-primary-border-color": "#4F85F1",
        "--theme-button-primary-background-color": "#4F85F1",
        "--theme-button-primary-foreground-color": "#FFFFFF",
        "--theme-button-secondary-border-color": "#DBDBDB",
        "--theme-button-secondary-background-color": "#DBDBDB",
        "--theme-button-secondary-foreground-color": "#000000",
        "--theme-button-primary-inactive-border-color": "#4F85F1",
        "--theme-button-primary-inactive-background-color": "#4F85F1",
        "--theme-button-primary-inactive-foreground-color": "#84adea",
        "--theme-button-secondary-inactive-border-color": "#DBDBDB",
        "--theme-button-secondary-inactive-background-color": "#DBDBDB",
        "--theme-button-secondary-inactive-foreground-color": "#AAAAAA",

        // icons
        "--theme-icon-color": "#FFFFFF",
        "--theme-icon-background-color": "#4F85F1",
        "--theme-icon-inactive-color": "#333333",
        "--theme-icon-inactive-background-color": "#DBDBDB",
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
