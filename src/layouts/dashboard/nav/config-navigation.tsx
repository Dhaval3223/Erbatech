import localStorageAvailable from 'src/utils/localStorageAvailable';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  role: icon('ic_role'),
  user: icon('ic_user'),
  customer: icon('ic_customer'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  variable: icon('ic_sensor_variable'),
  setting: icon('ic_sensor_setting'),
  customSetting: icon('ic_sensor_costom_setting'),
  acknowledgement: icon('ic_acknowledgement'),
  accessControl: icon('ic_access_control'),
  templateMaster: icon('ic_template_master'),
  templateMapping: icon('ic_template_mapping'),
};

const storageAvailable = localStorageAvailable();

const user = storageAvailable ? JSON.parse(localStorage.getItem('user') || '{}') : '';

/* const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      {
        title: 'ecommerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'File manager',
        path: PATH_DASHBOARD.fileManager,
        icon: ICONS.folder,
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      {
        title: 'chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
      {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },

  // DEMO MENU STATES
  {
    subheader: 'Other cases',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'item_by_roles',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
        caption: 'only_admin_can_see_this_item',
      },
      {
        title: 'menu_level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'menu_level_2a',
            path: '#/dashboard/menu_level/menu_level_2a',
          },
          {
            title: 'menu_level_2b',
            path: '#/dashboard/menu_level/menu_level_2b',
            children: [
              {
                title: 'menu_level_3a',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
              },
              {
                title: 'menu_level_3b',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
                children: [
                  {
                    title: 'menu_level_4a',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
                  },
                  {
                    title: 'menu_level_4b',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'item_disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },

      {
        title: 'item_label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
            NEW
          </Label>
        ),
      },
      {
        title: 'item_caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'item_external_link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
      },
      {
        title: 'blank',
        path: PATH_DASHBOARD.blank,
        icon: ICONS.blank,
      },
    ],
  },
]; */

const navConfig = [
  {
    subheader: 'general',
    items: [
      // { title: 'dashboard', path: PATH_DASHBOARD.general.dashboard, icon: ICONS.dashboard, code: 'PG001' },
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.dashboard,
        icon: ICONS.dashboard,
        code: 'PG001',
      },
      {
        title: 'Variable values',
        path: PATH_DASHBOARD.general.sensorVariable,
        icon: ICONS.variable,
        code: 'PG006',
      },
      // {
      //   title: 'Alarms',
      //   path: PATH_DASHBOARD.general.alarms,
      //   icon: ICONS.variable,
      //   code: 'PG015',
      // },
      {
        title: 'Sensor/Actor values',
        path: PATH_DASHBOARD.general.sensorSetting,
        icon: ICONS.setting,
        code: 'PG007',
      },
      {
        title: 'Parameter settings',
        path: PATH_DASHBOARD.general.sensorCustomSetting,
        icon: ICONS.customSetting,
        code: 'PG008',
      },
      {
        title: 'Message Center',
        path: PATH_DASHBOARD.general.acknowledgement,
        icon: ICONS.acknowledgement,
        code: 'PG015',
      },
      {
        title: 'Reports',
        path: PATH_DASHBOARD.general.reports,
        icon: ICONS.analytics,
        code: 'PG012',
        children: [
          {
            title: 'Yields',
            path: 'yields',
            children: [
              {
                title: 'yields report',
                path: 'yields/report',
              },
              {
                title: 'yields table',
                path: 'yields/table',
              },
            ],
          },
          {
            title: 'Weather',
            path: 'weather',
            children: [
              {
                title: 'weather report',
                path: 'weather/report',
              },
              {
                title: 'weather table',
                path: 'weather/table',
              },
            ],
          },
          {
            title: 'Temperature',
            path: 'temprature',
            children: [
              {
                title: 'temperature report',
                path: 'temprature/report',
              },
              {
                title: 'temperature table',
                path: 'temprature/table',
              },
            ],
          },
          {
            title: 'SK Frequency And Pressure',
            path: 'sk-frequency-and-pressure',
            children: [
              {
                title: 'sk frequency and pressure report',
                path: 'sk-frequency-and-pressure/report',
              },
              {
                title: 'sk frequency and pressure table',
                path: 'sk-frequency-and-pressure/table',
              },
            ],
          },
          {
            title: 'Levels',
            path: 'levels',
            children: [
              {
                title: 'Levels report',
                path: 'levels/report',
              },
              {
                title: 'Levels table',
                path: 'levels/table',
              },
            ],
          },
          {
            title: 'SV Heat Transfer',
            path: 'sv-heat-transfer',
            children: [
              {
                title: 'sv heat transfer report',
                path: 'sv-heat-transfer/report',
              },
              {
                title: 'sv heat transfer table',
                path: 'sv-heat-transfer/table',
              },
            ],
          },
          {
            title: 'Stratefied Tank',
            path: 'stratefied-tank',
            children: [
              {
                title: 'stratefied tank report',
                path: 'stratefied-tank/report',
              },
              {
                title: 'stratefied tank table',
                path: 'stratefied-tank/table',
              },
            ],
          },
          {
            title: 'Operating Hours',
            path: 'operating-hours',
            children: [
              {
                title: 'operating hours report',
                path: 'operating-hours/report',
              },
              {
                title: 'operating hours table',
                path: 'operating-hours/table',
              },
            ],
          },
          {
            title: 'New Variables',
            path: 'new-variable',
            children: [
              {
                title: 'new variable table',
                path: 'new-variable/table',
              },
            ],
          },
        ],
      },
      {
        title: 'user',
        path: PATH_DASHBOARD.general.userManagement,
        icon: ICONS.user,
        code: 'PG003',
        isblueLine: true,
      },
      {
        title: 'role',
        path: PATH_DASHBOARD.general.roles,
        icon: ICONS.role,
        code: 'PG002',
      },
      {
        title: 'access control',
        path: PATH_DASHBOARD.general.accessControl,
        icon: ICONS.accessControl,
        code: 'PG005',
      },
      {
        title: 'customer management',
        path: PATH_DASHBOARD.general.customerManagement,
        icon: ICONS.customer,
        code: 'PG004',
      },
      {
        title: 'Template Master',
        path: PATH_DASHBOARD.general.templateMaster,
        icon: ICONS.templateMaster,
        code: 'PG013',
      },
      {
        title: 'Instance Creation',
        path: PATH_DASHBOARD.general.templateMapping,
        icon: ICONS.templateMapping,
        code: 'PG014',
      },

      // { title: 'sensor variable', path: PATH_DASHBOARD.general.sensorVariable, icon: ICONS.booking },
      // { title: 'sensor setting', path: PATH_DASHBOARD.general.sensorSetting, icon: ICONS.file },
      // { title: 'sensor custom setting', path: PATH_DASHBOARD.general.sensorCustomSetting, icon: ICONS.file },
      // { title: 'PLC Alert', path: PATH_DASHBOARD.general.plcAlert, icon: ICONS.file },
      // { title: 'collector performamce', path: PATH_DASHBOARD.general.collectorPerformance, icon: ICONS.file },
      // {
      //   title: 'Reports',
      //   path: PATH_DASHBOARD.general.reports,
      //   icon: ICONS.analytics,
      //   code: 'PG008',
      // },
      // { title: 'AWS integration status', path: PATH_DASHBOARD.general.awsIntegrationStatus, icon: ICONS.file },
      // { title: 'template master', path: PATH_DASHBOARD.general.templateMaster, icon: ICONS.file },
      // { title: 'template mapping', path: PATH_DASHBOARD.general.templateMapping, icon: ICONS.file },
    ],
  },
];

export default navConfig;
