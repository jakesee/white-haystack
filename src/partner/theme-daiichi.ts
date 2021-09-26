import { IAppConfig, PageStyleContainerEnum, PageStyleContentEnum } from "@app/interfaces";

export const Daiichi: IAppConfig = {
    providerId: 1,
    theme: {
        // body
        "--theme-font-family": "'Roboto', sans-serif",
        "--theme-font-primary-color": "#000000",
        "--theme-font-secondary-color": "#ED0225",
        "--theme-font-inactive-color": "#AAAAAA",

        // header/footer
        "--theme-header-background-color": "#ffffff",
        "--theme-footer-background-color": "#ffffff",

        // background
        "--theme-primary-background-color": "#ffffff",
        "--theme-secondary-background-color": "#ffffff",

        // box
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

        //buttons
        "--theme-button-border-radius": "unset",
        "--theme-button-primary-border-color": "unset",
        "--theme-button-primary-background-color": "#ED0225",
        "--theme-button-primary-foreground-color": "#ffffff",
        "--theme-button-secondary-border-color": "unset",
        "--theme-button-secondary-background-color": "#EFEFEF",
        "--theme-button-secondary-foreground-color": "#000000",
        "--theme-button-primary-inactive-border-color": "unset",
        "--theme-button-primary-inactive-background-color": "#DBDBDB",
        "--theme-button-primary-inactive-foreground-color": "#EFEFEF",
        "--theme-button-secondary-inactive-border-color": "unset",
        "--theme-button-secondary-inactive-background-color": "#FAFAFA",
        "--theme-button-secondary-inactive-foreground-color": "#EFEFEF",

        // icons
        "--theme-icon-color": "#FFFFFF",
        "--theme-icon-background-color": "#ED0225",
        "--theme-icon-inactive-color": "#333333",
        "--theme-icon-inactive-background-color": "#DBDBDB",
    },
    logoUrl: "https://app.qa.my-doc.com/dai-ichi/assets/images/logo_vn_01.svg",
    menuItems: [
        { "text": "Home", "routerLink": "/home", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        { "text": "Dashboard", "routerLink": "/dashboard", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        { "text": "Waiting Room", "routerLink": "/waiting-room", "icon": ["fas", "calendar-alt"], "display": { "public": true, "private": true } },
        { "text": "Profile", "routerLink": "/profile", "icon": ["fas", "user"], "display": { "public": true, "private": true } }
    ],
    pageStyle: { container: PageStyleContainerEnum.fluidContainer, content: PageStyleContentEnum.contentLeft },
    header: { component: "HeaderComponent", "config": {} },
    footer: { component: "FooterComponent", "config": {} },
    sections: [
        {
            component: "ConsultNowComponent",
            config: {
                imgSource: "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                title: "Welcome to Dai-ichi e-Health Virtual Consultation!",
                body: "Speak to an experienced GP within minutes",
                subText: "Operational Hours: 0800H - 2200H, including weekend and holidays",
                buttonText: "SPEAK WITH A DOCTOR NOW",
                command: ["/provider", 1, "journey", "start"]
            }
        },
        { component: "SymptomsSectionComponent", "config": {} },
        { component: "OnetwothreeSectionComponent", "config": {} },
        {
            component: "NeedAssistanceSectionComponent",
            config: {
                content: "<p>Need any assistance? Call us at</p><p><b>Dai-ichi Life Vietnam<br /> (028) 38100888</b><br /> 08: 00 - 17: 30, Mon - Fri and 08: 00 - 12: 00, Sat </p><p><b>MyDoc <br /> 0707150628</b><br /> 8: 00 to 22: 00, incl.weekend & holidays </p>"
            }
        },
        {
            component: "BannerSectionComponent",
            config: {}
        }
    ]
}
