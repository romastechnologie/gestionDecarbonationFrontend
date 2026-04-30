import { createWebHistory, createRouter, createWebHashHistory } from "vue-router";
// import {useAuthStore} from  "@/services/auth"
// import ApiService from "@/services/ApiService";

// Layouts
// import MainLayout from "@/layouts/MainLayout.vue";




import MaintenancePage from "../pages/PagesInner/MaintenancePage.vue";
import ConnectedAccountsPage from "../pages/PagesInner/ConnectedAccountsPage.vue";
import LogoutPage from "../pages/LogoutPage.vue";
import ListePermissionPage from "@/pages/Permission/ListePermissionPage.vue";
import AddRolePage from "@/pages/Role/AddRolePage.vue";
import EditRolePage from "@/pages/Role/EditRolePage.vue";
import ListeRolePage from "@/pages/Role/ListeRolePage.vue";
import ViewRolePage from "@/pages/Role/ViewRolePage.vue";
import AddUserPage from "@/pages/Users/AddUserPage.vue";
import EditUserPage from "@/pages/Users/EditUserPage.vue";
import ViewUserPage from "@/pages/Users/ViewUserPage.vue";
import ListeUserPage from "@/pages/Users/ListeUserPage.vue";



import EcommercePage from "../pages/Dashboard/EcommercePage.vue";
import ProjectManagementPage from "../pages/Dashboard/ProjectManagementPage.vue";
import SupportDeskPage from "../pages/Dashboard/SupportDeskPage.vue";
import LMSCoursesPage from "../pages/Dashboard/LMSCoursesPage.vue";
import CRMSystemPage from "../pages/Dashboard/CRMSystemPage.vue";
import FileManagerPage from "../pages/FileManagerPage.vue";
import ChangelogPage from "../pages/ChangelogPage.vue";
import CalendarPage from "../pages/CalendarPage.vue";
import ChatPage from "../pages/ChatPage.vue";
import ChatGroupPage from "../pages/ChatGroupPage.vue";
import ChatContactPage from "../pages/ChatContactPage.vue";
import LeadsPage from "../pages/CRM/LeadsPage.vue";
import LeadDetailsPage from "../pages/CRM/LeadDetailsPage.vue";
import ContactsListPage from "../pages/CRM/ContactsListPage.vue";
import CustomersListPage from "../pages/CRM/CustomersListPage.vue";
import EmailsPage from "../pages/Emails/EmailsPage.vue";
import ReadEmailPage from "../pages/Emails/ReadEmailPage.vue";
import ProductsGridPage from "../pages/Ecommerce/ProductsGridPage.vue";
import ProductsListPage from "../pages/Ecommerce/ProductsListPage.vue";
import AddProductPage from "../pages/Ecommerce/AddProductPage.vue";
import ProductDetailsPage from "../pages/Ecommerce/ProductDetailsPage.vue";
import OrdersListPage from "../pages/Ecommerce/OrdersListPage.vue";
import OrderDetailsPage from "../pages/Ecommerce/OrderDetailsPage.vue";
import ShoppingCartPage from "../pages/Ecommerce/ShoppingCartPage.vue";
import CheckoutPage from "../pages/Ecommerce/CheckoutPage.vue";
import CustomersPage from "../pages/Ecommerce/CustomersPage.vue";
import SellersListPage from "../pages/Ecommerce/SellersListPage.vue";
import ManageReviewsPage from "../pages/Ecommerce/ManageReviewsPage.vue";
import RefundPage from "../pages/Ecommerce/RefundPage.vue";
import InvoiceListPage from "../pages/Ecommerce/InvoiceListPage.vue";
import InvoiceDetailsPage from "../pages/Ecommerce/InvoiceDetailsPage.vue";
import OrderTrackingPage from "../pages/Ecommerce/OrderTrackingPage.vue";
import CoursesListPage from "../pages/ELearning/CoursesListPage.vue";
import CoursesGridPage from "../pages/ELearning/CoursesGridPage.vue";
import CourseDetailsPage from "../pages/ELearning/CourseDetailsPage.vue";
import LessonsPreviewPage from "../pages/ELearning/LessonsPreviewPage.vue";
import EditCoursePage from "../pages/ELearning/EditCoursePage.vue";
import ListViewPage from "../pages/SupportDesk/ListViewPage.vue";
import CardViewPage from "../pages/SupportDesk/CardViewPage.vue";
import ContactsPage from "../pages/SupportDesk/ContactsPage.vue";
import TicketPreviewPage from "../pages/SupportDesk/TicketPreviewPage.vue";
import ProjectsListPage from "../pages/Projects/ProjectsListPage.vue";
import ProjectsGridPage from "../pages/Projects/ProjectsGridPage.vue";
import CreateNewProjectPage from "../pages/Projects/CreateNewProjectPage.vue";
import ProjectDetailsPage from "../pages/Projects/ProjectDetailsPage.vue";
import ToDoListPage from "../pages/Projects/ToDoListPage.vue";
import TeamsPage from "../pages/Projects/TeamsPage.vue";
import KanbanPage from "../pages/KanbanPage.vue";
import EventsGridPage from "../pages/Events/EventsGridPage.vue";
import EventDetailsPage from "../pages/Events/EventDetailsPage.vue";
import TimelinePage from "../pages/Social/TimelinePage.vue";
import AboutPage from "../pages/Social/AboutPage.vue";
import ActivityPage from "../pages/Social/ActivityPage.vue";
import ProfileSettingsPage from "../pages/Social/ProfileSettingsPage.vue";
import StarterPage from "../pages/StarterPage.vue";
import LoginPage from "../pages/Authentication/LoginPage.vue";
import RegisterPage from "../pages/Authentication/RegisterPage.vue";
import ForgotPasswordPage from "../pages/Authentication/ForgotPasswordPage.vue";
import ResetPasswordPage from "../pages/Authentication/ResetPasswordPage.vue";
import EmailConfirmationPage from "../pages/Authentication/EmailConfirmationPage.vue";
import UsersListPage from "../pages/Users/UsersListPage.vue";
import PricingPage from "../pages/PricingPage.vue";
import FaqPage from "../pages/FaqPage.vue";
import SwiperSliderPage from "../pages/Miscellaneous/SwiperSliderPage.vue";
import PrivacyPolicyPage from "../pages/Miscellaneous/PrivacyPolicyPage.vue";
import TermsConditionsPage from "../pages/Miscellaneous/TermsConditionsPage.vue";
import FormOverviewPage from "../pages/Forms/FormOverviewPage.vue";
import FormControlPage from "../pages/Forms/FormControlPage.vue";
import FormSelectPage from "../pages/Forms/FormSelectPage.vue";
import FormChecksRadiosPage from "../pages/Forms/FormChecksRadiosPage.vue";
import FormRangePage from "../pages/Forms/FormRangePage.vue";
import FormInputGroupPage from "../pages/Forms/FormInputGroupPage.vue";
import FormFloatingLabelsPage from "../pages/Forms/FormFloatingLabelsPage.vue";
import FormLayoutPage from "../pages/Forms/FormLayoutPage.vue";
import FormValidationPage from "../pages/Forms/FormValidationPage.vue";
import FormWizardPage from "../pages/Forms/FormWizardPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import TablesPage from "../pages/TablesPage.vue";
import ChartsPage from "../pages/Charts/ChartsPage.vue";
import MixedChartsPage from "../pages/Charts/MixedChartsPage.vue";
import FlaticonsPage from "../pages/Icons/FlaticonsPage.vue";
import PhosphoriconsPage from "../pages/Icons/PhosphoriconsPage.vue";
import GoogleMapsPage from "../pages/Maps/GoogleMapsPage.vue";
import LeafletMapPage from "../pages/Maps/LeafletMapPage.vue";
import TreePage from "../pages/ExtendedUI/TreePage.vue";
import EditorsPage from "../pages/ExtendedUI/EditorsPage.vue";
import AccordionPage from "../pages/UIElements/AccordionPage.vue";
import AlertsPage from "../pages/UIElements/AlertsPage.vue";
import AvatarsPage from "../pages/UIElements/AvatarsPage.vue";
import BadgesPage from "../pages/UIElements/BadgesPage.vue";
import BreadcrumbPage from "../pages/UIElements/BreadcrumbPage.vue";
import ButtonsPage from "../pages/UIElements/ButtonsPage.vue";
import ButtonGroupPage from "../pages/UIElements/ButtonGroupPage.vue";
import CarouselPage from "../pages/UIElements/CarouselPage.vue";
import CloseButtonPage from "../pages/UIElements/CloseButtonPage.vue";
import ColorBackgroundPage from "../pages/UIElements/ColorBackgroundPage.vue";
import ColoredLinksPage from "../pages/UIElements/ColoredLinksPage.vue";
import CollapsePage from "../pages/UIElements/CollapsePage.vue";
import DropdownsPage from "../pages/UIElements/DropdownsPage.vue";
import DatepickerPage from "../pages/UIElements/DatepickerPage.vue";
import FiguresPage from "../pages/UIElements/FiguresPage.vue";
import IconLinkPage from "../pages/UIElements/IconLinkPage.vue";
import ListGroupPage from "../pages/UIElements/ListGroupPage.vue";
import ModalPage from "../pages/UIElements/ModalPage.vue";
import NavsTabsPage from "../pages/UIElements/NavsTabsPage.vue";
import OffcanvasPage from "../pages/UIElements/OffcanvasPage.vue";
import PaginationPage from "../pages/UIElements/PaginationPage.vue";
import PlaceholdersPage from "../pages/UIElements/PlaceholdersPage.vue";
import PopoversPage from "../pages/UIElements/PopoversPage.vue";
import ProgressPage from "../pages/UIElements/ProgressPage.vue";
import RatioPage from "../pages/UIElements/RatioPage.vue";
import ScrollspyPage from "../pages/UIElements/ScrollspyPage.vue";
import StacksPage from "../pages/UIElements/StacksPage.vue";
import SpinnersPage from "../pages/UIElements/SpinnersPage.vue";
import UITablesPage from "../pages/UIElements/UITablesPage.vue";
import ToastsPage from "../pages/UIElements/ToastsPage.vue";
import UiTimelinePage from "../pages/UIElements/UiTimelinePage.vue";
import TimepickerPage from "../pages/UIElements/TimepickerPage.vue";
import TooltipsPage from "../pages/UIElements/TooltipsPage.vue";
import TypographyPage from "../pages/UIElements/TypographyPage.vue";
import BackgroundPage from "../pages/Utilities/BackgroundPage.vue";
import BordersPage from "../pages/Utilities/BordersPage.vue";
import ColorsPage from "../pages/Utilities/ColorsPage.vue";
import ClearfixPage from "../pages/Utilities/ClearfixPage.vue";
import DisplayPage from "../pages/Utilities/DisplayPage.vue";
import FlexPage from "../pages/Utilities/FlexPage.vue";
import FloatPage from "../pages/Utilities/FloatPage.vue";
import FocusRingPage from "../pages/Utilities/FocusRingPage.vue";
import GridPage from "../pages/Utilities/GridPage.vue";
import GuttersPage from "../pages/Utilities/GuttersPage.vue";
import InteractionsPage from "../pages/Utilities/InteractionsPage.vue";
import LinkPage from "../pages/Utilities/LinkPage.vue";
import ObjectFitPage from "../pages/Utilities/ObjectFitPage.vue";
import OpacityPage from "../pages/Utilities/OpacityPage.vue";
import OverflowPage from "../pages/Utilities/OverflowPage.vue";
import PositionPage from "../pages/Utilities/PositionPage.vue";
import ShadowsPage from "../pages/Utilities/ShadowsPage.vue";
import SizingPage from "../pages/Utilities/SizingPage.vue";
import SpacingPage from "../pages/Utilities/SpacingPage.vue";
import TextPage from "../pages/Utilities/TextPage.vue";
import TextTruncationPage from "../pages/Utilities/TextTruncationPage.vue";
import VerticalAlignmentPage from "../pages/Utilities/VerticalAlignmentPage.vue";
import VerticalRulePage from "../pages/Utilities/VerticalRulePage.vue";
import VisuallyHiddenPage from "../pages/Utilities/VisuallyHiddenPage.vue";
import VisibilityPage from "../pages/Utilities/VisibilityPage.vue";
import ZIndexPage from "../pages/Utilities/ZIndexPage.vue";
import CardsPage from "../pages/Widgets/CardsPage.vue";
import GalleryPage from "../pages/PagesInner/GalleryPage.vue";
import NotificationsPage from "../pages/PagesInner/NotificationsPage.vue";
import ProfilePage from "../pages/PagesInner/ProfilePage.vue";

import BlankPage from "../pages/BlankPage.vue";


import AddParametrePage from "@/pages/Parametre/AddParametrePage.vue";

import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/services/auth";
import ListeDocumentPage from "@/pages/Document/ListeDocumentPage.vue";
import ListeCompagnie from "@/components/compagnie/ListeCompagnie.vue";
import ListeCompagniePage from "@/pages/Compagnie/ListeCompagniePage.vue";
import ListeVesselPage from "@/pages/Vessel/ListeVesselPage.vue";
import ListeManifestPage from "@/pages/Manifest/ListeManifestPage.vue";
import ListePortPage from "@/pages/Port/ListePortPage.vue";
import ListePortARisquePage from "@/pages/PortARisque/ListePortARisquePage.vue";
import ListeTableauIMDGPage from "@/pages/TableauIMDG/ListeTableauIMDGPage.vue";
import ListeCategorieHsCodePage from "@/pages/CategorieHsCode/ListeCategorieHsCodePage.vue";
import ListeHsCodePage from "@/pages/HsCode/ListeHsCodePage.vue";
import ListeAgentConsignatairePage from "@/pages/AgentConsignataire/ListeAgentConsignatairePage.vue";
import ViewManifestPage from "@/pages/Manifest/ViewManifestPage.vue";
import ManifestMapPage from "@/pages/Manifest/ManifestMapPage.vue";
import ViewVesselPage from "@/pages/Vessel/ViewVesselPage.vue";
import ViewEquipMarchandPage from "@/pages/Manifest/ViewEquipMarchandPage.vue";
import AnalyticPage from "@/pages/Dashboard/AnalyticPage.vue";
import DmppmPage from "@/pages/Dashboard/DmppmPage.vue";
import DmppnPage from "@/pages/Dashboard/DmppnPage.vue";
import CmppmPage from "@/pages/Dashboard/CmppmPage.vue";
import CrmeKpiPage from "@/pages/Dashboard/CrmeKpiPage.vue";
import ListePostPage from "@/pages/Post/ListePostPage.vue";
import AddEquipageModalPage from "@/pages/Equipage/AddEquipageModalPage.vue";
import ListeEquipagePage from "@/pages/Equipage/ListeEquipagePage.vue";
import InscriptionPage from "@/pages/Authentication/Inscription/InscriptionPage.vue";

import ListTransportAssetPage from "@/pages/Transport-Asset/ListTransport-AssetPage.vue";
import AddTransportAssetPage from "@/pages/Transport-Asset/AddTransport-AssetPage.vue";
import EditTransportAssetPage from "@/pages/Transport-Asset/EditTransport-AssetPage.vue";
import AddActivityPage from "@/pages/Activity/AddActivityPage.vue";
import EditActivityPage from "@/pages/Activity/EditActivityPage.vue";
import ListActivityPage from "@/pages/Activity/ListActivityPage.vue";
import ListeInstallationPage from "@/pages/Installation/ListeInstallationPage.vue";
import AddInstallationPage from "@/pages/Installation/AddInstallationPage.vue";
import EditInstallationPage from "@/pages/Installation/EditInstallationPage.vue";
import DetailsActivityPage from "@/pages/Activity/DetailsActivityPage.vue";
import AddCurrencyPage from "@/pages/Currency/AddCurrencyPage.vue";
import ListCurrencyPage from "@/pages/Currency/ListCurrencyPage.vue";
import ListCurrencyRatePage from "@/pages/CurrencyRate/ListCurrencyRatePage.vue";


const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/Accueil",
        name: "EcommercePage",
        component: EcommercePage,
      },

      {
        path: "/analytique",
        name: "AnalyticPage",
        component: AnalyticPage,
      },
      {
        path: "/kpi/dmppm",
        name: "DmppmPage",
        component: DmppmPage,
      },
      {
        path: "/kpi/dmppn",
        name: "DmppnPage",
        component: DmppnPage,
      },
      {
        path: "/kpi/cmppm",
        name: "CmppmPage",
        component: CmppmPage,
      },
      {
        path: "/kpi/crme",
        name: "CrmeKpiPage",
        component: CrmeKpiPage,
      },
      {
        path: "/liste-privileges",
        name: "ListePermissionPage",
        component: ListePermissionPage,
      },
      {
        path: "/ajouter-role",
        name: "AddRolePage",
        component: AddRolePage,
      },
      {
        path: "/modifier-role/:id",
        name: "EditRolePage",
        component: EditRolePage,
      },
      {
        path: "/liste-roles",
        name: "ListeRolePage",
        component: ListeRolePage,
      },
      {
        path: "/view-role/:id",
        name: "ViewRolePage",
        component: ViewRolePage,
      },
      {
        path: "/ajouter-user",
        name: "AddUserPage",
        component: AddUserPage,
      },
      {
        path: "/modifier-user/:id",
        name: "EditUserPage",
        component: EditUserPage,
      },
      {
        path: "/liste-users",
        name: "ListeUserPage",
        component: ListeUserPage,
      },
      {
        path: "/view-user/:id",
        name: "ViewUserPage",
        component: ViewUserPage,
      },
      {
        path: "/profile",
        name: "ProfilePage",
        component: ProfilePage,
      },

      {
        path: "/Parametres",
        name: "AddParametrePage",
        component: AddParametrePage,
      },
      {
        path: "/liste-documents",
        name: "ListeDocumentPage",
        component: ListeDocumentPage,
      },

      {
        path: "/liste-compagnies",
        name: "ListeCompagnie",
        component: ListeCompagniePage
      },

      {
        path: "/liste-vessels",
        name: "ListeVessel",
        component: ListeVesselPage
      },

      {
        path: "/liste-manifestes",
        name: "ListeManifest",
        component: ListeManifestPage
      },

      {
        path: "/profile",
        name: "ProfilePage",
        component: ProfilePage,
      },

      {
        path: "/tableau_bord",
        name: "tableauBordPage",
        component: EcommercePage,
      },

      {
        path: "/liste-ports",
        name: "ListePortPage",
        component: ListePortPage,
      },

      {
        path: "/liste_ports_a_risque",
        name: "ListePortARisquePage",
        component: ListePortARisquePage,
      },

      {
        path: "/listeTableauIMDG",
        name: "ListeTableauIMDGPage",
        component: ListeTableauIMDGPage,
      },
      {
        path: "/listeCategorie_hs_Code",
        name: "ListeCategorieHsCodePage",
        component: ListeCategorieHsCodePage,
      },
      {
        path: "/listeHs_Code",
        name: "ListeHsCodePage",
        component: ListeHsCodePage,
      },

      {
        path: "/listeAgentC",
        name: "ListeAgentConsignatairePage",
        component: ListeAgentConsignatairePage,
      },

      {
        path: "/view-manifest/:id",
        name: "ViewManifestPage",
        component: ViewManifestPage,
      },
      {
        path: "/manifest-map/:id",
        name: "ManifestMapPage",
        component: ManifestMapPage,
      },

      {
        path: "/view-equiMarchand/:id",
        name: "ViewEquipMarchandPage",
        component: ViewEquipMarchandPage,
      },

      {
        path: "/ajouter-equipage",
        name: "AddEquipagePage",
        component: AddEquipageModalPage,
      },

       {
        path: '/listeEquipage/:manifestId?',
        name: "ListeEquipagePage",
        component: ListeEquipagePage,
      },
    

       {
        path: "/listePoste",
        name: "ListePostPage",
        component: ListePostPage,
      },


      //    {
      //   path: "/view-vessel/:id",
      //   name: "ViewVesselPage",
      //   component: ViewVesselPage,
      // },



      {
        path: "/project-management",
        name: "ProjectManagementPage",
        component: ProjectManagementPage,
      },
      {
        path: "/support-desk",
        name: "SupportDeskPage",
        component: SupportDeskPage,
      },
      {
        path: "/lms-courses",
        name: "LMSCoursesPage",
        component: LMSCoursesPage,
      },
      {
        path: "/crm-system",
        name: "CRMSystemPage",
        component: CRMSystemPage,
      },
      {
        path: "/file-manager",
        name: "FileManagerPage",
        component: FileManagerPage,
      },
      {
        path: "/changelog",
        name: "ChangelogPage",
        component: ChangelogPage,
      },
      {
        path: "/calendar",
        name: "CalendarPage",
        component: CalendarPage,
      },
      {
        path: "/chat",
        name: "ChatPage",
        component: ChatPage,
      },
      {
        path: "/chat-group",
        name: "ChatGroupPage",
        component: ChatGroupPage,
      },
      {
        path: "/chat-contact",
        name: "ChatContactPage",
        component: ChatContactPage,
      },
      {
        path: "/leads",
        name: "LeadsPage",
        component: LeadsPage,
      },
      {
        path: "/lead-details",
        name: "LeadDetailsPage",
        component: LeadDetailsPage,
      },
      {
        path: "/crm-contacts",
        name: "ContactsListPage",
        component: ContactsListPage,
      },
      {
        path: "/crm-customers",
        name: "CustomersListPage",
        component: CustomersListPage,
      },
      {
        path: "/emails",
        name: "EmailsPage",
        component: EmailsPage,
      },
      {
        path: "/read-email",
        name: "ReadEmailPage",
        component: ReadEmailPage,
      },
      {
        path: "/products",
        name: "ProductsGridPage",
        component: ProductsGridPage,
      },

      {
        path: "/orders",
        name: "OrdersListPage",
        component: OrdersListPage,
      },
      {
        path: "/order-details",
        name: "OrderDetailsPage",
        component: OrderDetailsPage,
      },
      {
        path: "/cart",
        name: "ShoppingCartPage",
        component: ShoppingCartPage,
      },
      {
        path: "/checkout",
        name: "CheckoutPage",
        component: CheckoutPage,
      },
      {
        path: "/customers",
        name: "CustomersPage",
        component: CustomersPage,
      },
      {
        path: "/sellers",
        name: "SellersListPage",
        component: SellersListPage,
      },
      {
        path: "/reviews",
        name: "ManageReviewsPage",
        component: ManageReviewsPage,
      },
      {
        path: "/refund",
        name: "RefundPage",
        component: RefundPage,
      },
      {
        path: "/invoice",
        name: "InvoiceListPage",
        component: InvoiceListPage,
      },
      {
        path: "/invoice-details",
        name: "InvoiceDetailsPage",
        component: InvoiceDetailsPage,
      },
      {
        path: "/order-tracking",
        name: "OrderTrackingPage",
        component: OrderTrackingPage,
      },
      {
        path: "/courses-list",
        name: "CoursesListPage",
        component: CoursesListPage,
      },
      {
        path: "/courses-grid",
        name: "CoursesGridPage",
        component: CoursesGridPage,
      },
      {
        path: "/course-details",
        name: "CourseDetailsPage",
        component: CourseDetailsPage,
      },
      {
        path: "/lessons-preview",
        name: "LessonsPreviewPage",
        component: LessonsPreviewPage,
      },
      {
        path: "/edit-course",
        name: "EditCoursePage",
        component: EditCoursePage,
      },
      {
        path: "/support-desk-list",
        name: "ListViewPage",
        component: ListViewPage,
      },
      {
        path: "/support-desk-card",
        name: "CardViewPage",
        component: CardViewPage,
      },
      {
        path: "/contacts",
        name: "ContactsPage",
        component: ContactsPage,
      },
      {
        path: "/ticket-preview",
        name: "TicketPreviewPage",
        component: TicketPreviewPage,
      },
      {
        path: "/projects-list",
        name: "ProjectsListPage",
        component: ProjectsListPage,
      },
      {
        path: "/projects-grid",
        name: "ProjectsGridPage",
        component: ProjectsGridPage,
      },
      {
        path: "/create-new-project",
        name: "CreateNewProjectPage",
        component: CreateNewProjectPage,
      },
      {
        path: "/project-details",
        name: "ProjectDetailsPage",
        component: ProjectDetailsPage,
      },
      {
        path: "/to-do-list",
        name: "ToDoListPage",
        component: ToDoListPage,
      },
      {
        path: "/projects-teams",
        name: "TeamsPage",
        component: TeamsPage,
      },
      {
        path: "/kanban",
        name: "KanbanPage",
        component: KanbanPage,
      },
      {
        path: "/events",
        name: "EventsGridPage",
        component: EventsGridPage,
      },
      {
        path: "/event-details",
        name: "EventDetailsPage",
        component: EventDetailsPage,
      },
      {
        path: "/social-timeline",
        name: "TimelinePage",
        component: TimelinePage,
      },
      {
        path: "/social-about",
        name: "AboutPage",
        component: AboutPage,
      },
      {
        path: "/social-activity",
        name: "ActivityPage",
        component: ActivityPage,
      },
      {
        path: "/profile-settings",
        name: "ProfileSettingsPage",
        component: ProfileSettingsPage,
      },
      {
        path: "/starter",
        name: "StarterPage",
        component: StarterPage,
      },

      {
        path: "/users-list",
        name: "UsersListPage",
        component: UsersListPage,
      },

      {
        path: "/pricing",
        name: "PricingPage",
        component: PricingPage,
      },
      {
        path: "/faq",
        name: "FaqPage",
        component: FaqPage,
      },
      {
        path: "/ui-swiper-slider",
        name: "SwiperSliderPage",
        component: SwiperSliderPage,
      },
      {
        path: "/privacy-policy",
        name: "PrivacyPolicyPage",
        component: PrivacyPolicyPage,
      },
      {
        path: "/terms-conditions",
        name: "TermsConditionsPage",
        component: TermsConditionsPage,
      },
      {
        path: "/forms-overview",
        name: "FormOverviewPage",
        component: FormOverviewPage,
      },
      {
        path: "/forms-form-control",
        name: "FormControlPage",
        component: FormControlPage,
      },
      {
        path: "/forms-select",
        name: "FormSelectPage",
        component: FormSelectPage,
      },
      {
        path: "/forms-checks-radios",
        name: "FormChecksRadiosPage",
        component: FormChecksRadiosPage,
      },

      //    {
      //   path: "/inscription",
      //   name: "InscriptionPage",
      //   component: InscriptionPage,
      //  
      // },

      {
        path: "/blank-page",
        name: "BlankPage",
        component: BlankPage,
      },
      {
        path: "/logout",
        name: "LogoutPage",
        component: LogoutPage,
      },
      {
        path: "/addTransportAsset",
        name: "AddTransportAssetPage",
        component: AddTransportAssetPage,
      },
      {
        path: "/listTransportAsset",
        name: "ListTransportAssetPage",
        component: ListTransportAssetPage,
      },
      {
        path: '/modifierTransport/:id',
        name: 'EditTransportAssetPage',
        component:EditTransportAssetPage
      },
      {
        path: '/addActivity',
        name: 'AddActivityPage',
        component: AddActivityPage
      },
      {
        path: '/modifierActivity/:id',
        name: 'EditActivityPage',
        component:EditActivityPage
      },
      {
        path: '/listActivity',
        name: 'ListActivityPage',
        component:ListActivityPage
      },
      { 
        path: '/addInstallation',       
        name: 'AddInstallationPage', 
        component: AddInstallationPage
      },
      { 
        path: '/modifierInstallation/:id',       
        name: 'EditInstallationPage', 
        component:EditInstallationPage
      },
      { 
        path: '/listInstallation',       
        name: 'ListInstallationPage', 
        component:ListeInstallationPage
      },
      { 
        path: '/viewActivity/:id',       
        name: 'ViewActivityPage', 
        component:DetailsActivityPage
      },
      {
        path: "/listCurrency",
        name: "ListCurrencyPage",
        component: ListCurrencyPage,
      },
      {
        path: "/listCurrencyRate",
        name: "ListCurrencyRatePage",
        component: ListCurrencyRatePage,
      }
    ],
  },
  {
    path: "/",
    redirect: "/login",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
      },

    {
      path: "/inscription",
      name: "InscriptionPage",
      component: InscriptionPage,
    },

    ]
  },
  { path: "/:pathMatch(.*)*", name: "ErrorPage", component: ErrorPage },

];

const router = createRouter({
  //history: createWebHistory(),
  history: createWebHashHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});


// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//   // await authStore.verifyAuth();
//   if(to.meta.middleware == "auth") {
//     ApiService.setHeader();
//     if (authStore.isAuthenticated) {
//       next();
//     } else {
//       next({ name: "LoginPage" });
//       next();
//     }
//   } else {
//     next();
//   }
//   // Scroll page to top on every route change
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });
// });

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  //authStore.verifyAuth();

  if (to.meta.middleware == "auth") {
    // console.log("aaronnnn");
    ApiService.setHeader();
    if (authStore.isAuthenticated) {
      next();
    } else {
      //next({ name: "LoginPage" });
      next()
    }
  } else {
    // console.log("AARONNN");
    next();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});


export default router;

