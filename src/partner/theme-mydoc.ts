import { IAppConfig, PageStyleContainerEnum, PageStyleContentEnum } from "@app/interfaces";

// proximanova-regular
// proximanova-semibold
// proximanova-bold
// proximanova-black

export const MyDoc: IAppConfig = {
    providerId: 0,
    theme: {
        "--theme-font-family": "'proximanova-regular', sans-serif",
        "--theme-color-background": "#ffffff",
        "--theme-color-on-background": "#000000",
        "--theme-color-surface": "#ffffff",
        "--theme-color-on-surface": "#000000",
        "--theme-color-neutral--2": "#f3f3f3",
        "--theme-color-neutral--1": "#eaeaea",
        "--theme-color-neutral-0": "#DBDBDB",
        "--theme-color-neutral-1": "#b7b7b7",
        "--theme-color-neutral-2": "#989898",
        "--theme-color-on-neutral--2": "#000000",
        "--theme-color-on-neutral--1": "#000000",
        "--theme-color-on-neutral-0": "#000000",
        "--theme-color-on-neutral-1": "#ffffff",
        "--theme-color-on-neutral-2": "#ffffff",
        "--theme-color-primary--2": "#e5f2ff",
        "--theme-color-primary--1": "#74b4ff",
        "--theme-color-primary-0": "#4f85f1",
        "--theme-color-primary-1": "#4861ca",
        "--theme-color-primary-2": "#4141a9",
        "--theme-color-on-primary--2": "#000000",
        "--theme-color-on-primary--1": "#000000",
        "--theme-color-on-primary-0": "#ffffff",
        "--theme-color-on-primary-1": "#ffffff",
        "--theme-color-on-primary-2": "#ffffff",
        "--theme-color-secondary--2": "#EAE7FE",
        "--theme-color-secondary--1": "#a4a0e8",
        "--theme-color-secondary-0": "#5d5fd3",
        "--theme-color-secondary-1": "#2441c4",
        "--theme-color-secondary-2": "#0029a4",
        "--theme-color-on-secondary--2": "#000000",
        "--theme-color-on-secondary--1": "#000000",
        "--theme-color-on-secondary-0": "#ffffff",
        "--theme-color-on-secondary-1": "#ffffff",
        "--theme-color-on-secondary-2": "#ffffff",
        //"--theme-header-background-color": "#F3F6FB",
        "--theme-header-background-color": "#ffffff",
        "--theme-footer-background-color": "#ffffff",
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
        "--theme-button-secondary-inactive-foreground-color": "#AAAAAA"
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
    pageStyle: { container: PageStyleContainerEnum.fluidContainer, content: PageStyleContentEnum.contentCenter },
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
