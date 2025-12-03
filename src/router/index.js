import { createRouter, createWebHashHistory } from 'vue-router'

// Lazy-load page components to keep bundle small
const HomePage = () => import('@/pages/HomePage.vue')
const AllProductsPage = () => import('@/pages/AllProductsPage.vue')
const ItemDetailPage = () => import('@/pages/ItemDetailPage.vue')
const HelpCenterPage = () => import('@/pages/HelpCenterPage.vue')
const OperationGuidePage = () => import('@/pages/OperationGuidePage.vue')
const FAQDetailPage = () => import('@/pages/FAQDetailPage.vue')
const FeedbackPage = () => import('@/pages/FeedbackPage.vue')
const LoginPage = () => import('@/pages/LoginPage.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const GettingStartedPage = () => import('@/pages/GettingStartedPage.vue')
const ContactUsPage = () => import('@/pages/ContactUsPage.vue')
const AboutSaleyeePage = () => import('@/pages/AboutSaleyeePage.vue')
const VATPolicyPage = () => import('@/pages/VATPolicyPage.vue')
const DistributorsPage = () => import('@/pages/DistributorsPage.vue')
const SupplierPage = () => import('@/pages/SupplierPage.vue')
const PartnersPage = () => import('@/pages/PartnersPage.vue')
const UserCenterPage = () => import('@/pages/UserCenterPage.vue')
const ProductManagementPage = () => import('@/pages/ProductManagementPage.vue')
const ListingPushPage = () => import('@/pages/ListingPushPage.vue')
const ListingProductsPage = () => import('@/pages/ListingProductsPage.vue')
const BrandAuthPage = () => import('@/pages/BrandAuthPage.vue')
const ProductNotificationPage = () => import('@/pages/ProductNotificationPage.vue')
const CartPage = () => import('@/pages/CartPage.vue')
const AllCategoriesPage = () => import('@/pages/AllCategoriesPage.vue')
const NewPage = () => import('@/pages/NewPage.vue')
const DirectDeliveryPage = () => import('@/pages/DirectDeliveryPage.vue')
const MembershipPage = () => import('@/pages/MembershipPage.vue')
const DiscountSalePage = () => import('@/pages/DiscountSalePage.vue')
const HotSalesPage = () => import('@/pages/HotSalesPage.vue')
const AddressBookPage = () => import('@/pages/AddressBookPage.vue')
const AfterSalesManagementPage = () => import('@/pages/AfterSalesManagementPage.vue')
const AfterSalesNotificationPage = () => import('@/pages/AfterSalesNotificationPage.vue')
const AfterSalesNotificationDetailPage = () => import('@/pages/AfterSalesNotificationDetailPage.vue')
const BasicInfoPage = () => import('@/pages/BasicInfoPage.vue')
const BatchOrderPage = () => import('@/pages/BatchOrderPage.vue')
const CashbackActivityPage = () => import('@/pages/CashbackActivityPage.vue')
const DownloadCenterPage = () => import('@/pages/DownloadCenterPage.vue')
const ExceptionOrderPage = () => import('@/pages/ExceptionOrderPage.vue')
const InquiryOrderPage = () => import('@/pages/InquiryOrderPage.vue')
const InventoryUpdatePage = () => import('@/pages/InventoryUpdatePage.vue')
const LogisticsMappingPage = () => import('@/pages/LogisticsMappingPage.vue')
const MallAnnouncementPage = () => import('@/pages/MallAnnouncementPage.vue')
const MallAnnouncementDetailPage = () => import('@/pages/MallAnnouncementDetailPage.vue')
const MarketingActivityPage = () => import('@/pages/MarketingActivityPage.vue')
const MarketingActivityDetailPage = () => import('@/pages/MarketingActivityDetailPage.vue')
const MyBalancePage = () => import('@/pages/MyBalancePage.vue')
const MyInvoicesPage = () => import('@/pages/MyInvoicesPage.vue')
const MyOrderPage = () => import('@/pages/MyOrderPage.vue')
const MyVouchersPage = () => import('@/pages/MyVouchersPage.vue')
const OrderNotificationPage = () => import('@/pages/OrderNotificationPage.vue')
const OrderNotificationDetailPage = () => import('@/pages/OrderNotificationDetailPage.vue')
const OrderSettingsPage = () => import('@/pages/OrderSettingsPage.vue')
const PaymentAccountPage = () => import('@/pages/PaymentAccountPage.vue')
const PlatformAuthPage = () => import('@/pages/PlatformAuthPage.vue')
const PlatformMessagePage = () => import('@/pages/PlatformMessagePage.vue')
const PlatformMessageDetailPage = () => import('@/pages/PlatformMessageDetailPage.vue')
const PlatformOrderPage = () => import('@/pages/PlatformOrderPage.vue')
const ProductNotificationDetailPage = () => import('@/pages/ProductNotificationDetailPage.vue')
const SecurityPage = () => import('@/pages/SecurityPage.vue')
const SkuMappingPage = () => import('@/pages/SkuMappingPage.vue')
const UpdateLogPage = () => import('@/pages/UpdateLogPage.vue')
const CrossBordereCommercePage = () => import('@/pages/CrossBordereCommercePage.vue')

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/all-products', name: 'all-products', component: AllProductsPage },
  { path: '/allsearch', name: 'allsearch', component: AllProductsPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/getting-started', name: 'getting-started', component: GettingStartedPage },
  { path: '/help-center', name: 'help-center', component: HelpCenterPage },
  { path: '/operation-guide', name: 'operation-guide', component: OperationGuidePage },
  { path: '/faq/:id', name: 'faq-detail', component: FAQDetailPage, props: true },
  { path: '/contact-us', name: 'contact-us', component: ContactUsPage },
  { path: '/about-saleyee', name: 'about-saleyee', component: AboutSaleyeePage },
  { path: '/vat-policy', name: 'vat-policy', component: VATPolicyPage },
  { path: '/feedback', name: 'feedback', component: FeedbackPage },
  { path: '/distributors', name: 'distributors', component: DistributorsPage },
  { path: '/supplier', name: 'supplier', component: SupplierPage },
  { path: '/partners', name: 'partners', component: PartnersPage },
  { path: '/item/:id', name: 'item-detail', component: ItemDetailPage, props: true },
  { path: '/user-center', name: 'user-center', component: UserCenterPage },
  { path: '/product-management', name: 'product-management', component: ProductManagementPage },
  { path: '/listing-push', name: 'listing-push', component: ListingPushPage },
  { path: '/listing-products', name: 'listing-products', component: ListingProductsPage },
  { path: '/brand-auth', name: 'brand-auth', component: BrandAuthPage },
  { path: '/product-notification', name: 'product-notification', component: ProductNotificationPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/all-categories', name: 'all-categories', component: AllCategoriesPage },
  { path: '/new', name: 'new', component: NewPage },
  { path: '/direct-delivery', name: 'direct-delivery', component: DirectDeliveryPage },
  { path: '/membership', name: 'membership', component: MembershipPage },
  { path: '/discount-sale', name: 'discount-sale', component: DiscountSalePage },
  { path: '/hot-sales', name: 'hot-sales', component: HotSalesPage },
  { path: '/address-book', name: 'address-book', component: AddressBookPage },
  { path: '/after-sales-management', name: 'after-sales-management', component: AfterSalesManagementPage },
  { path: '/after-sales-notification', name: 'after-sales-notification', component: AfterSalesNotificationPage },
  { path: '/after-sales-notification/:id', name: 'after-sales-notification-detail', component: AfterSalesNotificationDetailPage, props: true },
  { path: '/basic-info', name: 'basic-info', component: BasicInfoPage },
  { path: '/batch-order', name: 'batch-order', component: BatchOrderPage },
  { path: '/cashback-activity', name: 'cashback-activity', component: CashbackActivityPage },
  { path: '/download-center', name: 'download-center', component: DownloadCenterPage },
  { path: '/exception-order', name: 'exception-order', component: ExceptionOrderPage },
  { path: '/inquiry-order', name: 'inquiry-order', component: InquiryOrderPage },
  { path: '/inventory-update', name: 'inventory-update', component: InventoryUpdatePage },
  { path: '/logistics-mapping', name: 'logistics-mapping', component: LogisticsMappingPage },
  { path: '/mall-announcement', name: 'mall-announcement', component: MallAnnouncementPage },
  { path: '/mall-announcement/:id', name: 'mall-announcement-detail', component: MallAnnouncementDetailPage, props: true },
  { path: '/marketing-activity', name: 'marketing-activity', component: MarketingActivityPage },
  { path: '/marketing-activity/:id', name: 'marketing-activity-detail', component: MarketingActivityDetailPage, props: true },
  { path: '/my-balance', name: 'my-balance', component: MyBalancePage },
  { path: '/my-invoices', name: 'my-invoices', component: MyInvoicesPage },
  { path: '/my-order', name: 'my-order', component: MyOrderPage },
  { path: '/my-vouchers', name: 'my-vouchers', component: MyVouchersPage },
  { path: '/order-notification', name: 'order-notification', component: OrderNotificationPage },
  { path: '/order-notification/:id', name: 'order-notification-detail', component: OrderNotificationDetailPage, props: true },
  { path: '/order-settings', name: 'order-settings', component: OrderSettingsPage },
  { path: '/payment-account', name: 'payment-account', component: PaymentAccountPage },
  { path: '/platform-auth', name: 'platform-auth', component: PlatformAuthPage },
  { path: '/platform-message', name: 'platform-message', component: PlatformMessagePage },
  { path: '/platform-message/:id', name: 'platform-message-detail', component: PlatformMessageDetailPage, props: true },
  { path: '/platform-order', name: 'platform-order', component: PlatformOrderPage },
  { path: '/product-notification/:id', name: 'product-notification-detail', component: ProductNotificationDetailPage, props: true },
  { path: '/security', name: 'security', component: SecurityPage },
  { path: '/sku-mapping', name: 'sku-mapping', component: SkuMappingPage },
  { path: '/update-log', name: 'update-log', component: UpdateLogPage },
  { path: '/cross-border-ecommerce', name: 'cross-border-ecommerce', component: CrossBordereCommercePage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
