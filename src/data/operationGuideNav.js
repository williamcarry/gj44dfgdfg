function section(title, items) {
  return {
    title,
    items: items.map(t => ({ title: t, url: `/operation-guide#${slug(t)}` }))
  }
}

function slug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const operationGuideNav = [
  {
    id: 'getting-started',
    title: '如何成为注册会员',
    url: '/operation-guide#getting-started',
    children: [
      {
        id: 'account-security',
        title: '注册流程与账户信息安全',
        url: '/operation-guide#account-security',
        faqs: [
          section('注册流程与账户信息安全', [
            '会员注册流程步骤',
            '会员如何登录以及找回密码',
            '账户信息维护与安全管理说明',
          ])
        ]
      },
      {
        id: 'membership',
        title: '赛盈会员制度',
        url: '/operation-guide#membership',
        faqs: [
          section('赛盈会员制度', [
            '赛盈会员权益说明',
          ])
        ]
      },
      {
        id: 'company-intro',
        title: '赛盈企业介绍',
        url: '/operation-guide#company-intro',
        faqs: [
          section('赛盈企业介绍', [
            '深圳赛盈网络有限公司企业介绍',
          ])
        ]
      }
    ]
  },
  {
    id: 'realname',
    title: '如何实名认证',
    url: '/operation-guide#realname',
    children: [
      {
        id: 'realname-materials',
        title: '实名认证材料',
        url: '/operation-guide#realname-materials',
        faqs: [
          section('实名认证材料清单', [
            '实名认证材料清单所需资料说明',
          ])
        ]
      },
      {
        id: 'personal-realname',
        title: '个人用户实名认证流程',
        url: '/operation-guide#personal-realname',
        faqs: [
          section('个人用户实名认证流程', [
            '个人实名认证流程简图',
            '个人实名认证操作流程',
          ])
        ]
      },
      {
        id: 'enterprise-realname',
        title: '企业用户实名认证流程',
        url: '/operation-guide#enterprise-realname',
        faqs: [
          section('企业用户实名认证流程', [
            '企业实名认证流程指引',
            '企业用户实名认证操作流程',
          ])
        ]
      },
      {
        id: 'realname-status',
        title: '如何查看实名状态',
        url: '/operation-guide#realname-status',
        faqs: [
          section('如何查看实名状态', [
            '如何查看实名认证进度以及状态？',
          ])
        ]
      }
    ]
  },
  {
    id: 'vat-registration',
    title: '如何完成VAT税号登记',
    url: '/operation-guide#vat-registration',
    children: [
      {
        id: 'vat-materials',
        title: 'VAT税号登记资料清单',
        url: '/operation-guide#vat-materials',
        faqs: [
          section('VAT税号登记资料清单', [
            'VAT税号登记准备材料有哪些？',
          ])
        ]
      },
      {
        id: 'vat-enterprise',
        title: '企业卖家登记操作指引',
        url: '/operation-guide#vat-enterprise',
        faqs: [
          section('企业卖家登记操作指引', [
            '企业卖家VAT税号登记操作指引',
          ])
        ]
      },
      {
        id: 'vat-personal',
        title: '个人卖家登记操作指引',
        url: '/operation-guide#vat-personal',
        faqs: [
          section('个人卖家登记操作指引', [
            '卖家VAT税号信息登记操作指引',
          ])
        ]
      },
      {
        id: 'vat-manual-order',
        title: '手动下单与VAT税号关联注意事项',
        url: '/operation-guide#vat-manual-order',
        faqs: [
          section('手动下单与VAT税号关联注意事项', [
            '手动下单商品与VAT税号关联事项说明',
          ])
        ]
      },
      {
        id: 'vat-batch-order',
        title: '批量下单与VAT税号关联注意事项',
        url: '/operation-guide#vat-batch-order',
        faqs: [
          section('批量下单与VAT税号关联注意事项', [
            '商品批量导入下单与VAT税号关联注意事项',
          ])
        ]
      }
    ]
  },
  {
    id: 'product-management',
    title: '商品如何选品以及理',
    url: '/operation-guide#product-management',
    children: [
      {
        id: 'product-search',
        title: '如何搜索筛选商品',
        url: '/operation-guide#product-search',
        faqs: [
          section('如何搜索筛选商品', [
            '如何搜索及筛选商品？',
          ])
        ]
      },
      {
        id: 'product-info',
        title: '商品信息说明',
        url: '/operation-guide#product-info',
        faqs: [
          section('商品信息说明', [
            '商品页面信息说明',
          ])
        ]
      },
      {
        id: 'one-click-listing',
        title: '一键刊登的操作指南',
        url: '/operation-guide#one-click-listing',
        faqs: [
          section('一键刊登的操作指南', [
            '商品如何一键刊登至亚马逊北美站点店铺？',
            '赛盈商品如何一键刊登至Shopify平台店铺',
            '如何获取Shopify产品ID',
            '如何获取Shopify变体ID',
          ])
        ]
      },
      {
        id: 'download-data',
        title: '如何下载商品数据包',
        url: '/operation-guide#download-data',
        faqs: [
          section('如何下载商品数据包', [
            '如何下载数据包？',
            '如何收藏商品？',
          ])
        ]
      },
      {
        id: 'product-features',
        title: '商品管理功能说明',
        url: '/operation-guide#product-features',
        faqs: [
          section('商品管理功能说明', [
            '商品管理功能说明',
          ])
        ]
      }
    ]
  },
  {
    id: 'order-management',
    title: '订单如何管理',
    url: '/operation-guide#order-management',
    children: [
      {
        id: 'platform-order',
        title: '平台载单操作流程',
        url: '/operation-guide#platform-order',
        faqs: [
          section('平台载单操作流程', [
            '载单操作流程简介',
            'Amazon店铺授权操作流程及注意事项',
            'Wish账号授权注意事项及流程',
            'eBay账号授权注意事项及流程',
            'Shopify账号授权注意事项及流程',
            'Walmart账号授权注意事项及流程',
            'EKM账号授权注意事项及流程',
          ])
        ]
      },
      {
        id: 'sku-mapping',
        title: 'SKU映射设置说明',
        url: '/operation-guide#sku-mapping',
        faqs: [
          section('SKU映射设置说明', [
            '如何添加SKU映射',
            '如何批量添加SKU映射',
            '如何修改SKU映射',
            '如何删除SKU映射',
            '如何批量删除SKU映射',
            '如何查询SKU映射',
            '如何导出SKU映射',
            '如何导入SKU映射',
          ])
        ]
      },
      {
        id: 'inventory-sync',
        title: '库存同步设置说明',
        url: '/operation-guide#inventory-sync',
        faqs: [
          section('库存同步设置说明', [
            '如何设置库存同步',
            '如何手动同步库存',
            '如何查看库存同步记录',
          ])
        ]
      },
      {
        id: 'inventory-alert',
        title: '库存警戒线设置说明',
        url: '/operation-guide#inventory-alert',
        faqs: [
          section('库存警戒线设置说明', [
            '如何设置库存警戒线',
            '如何查看库存警戒线',
            '如何修改库存警戒线',
            '如何删除库存警戒线',
            '如何批量删除库存警戒线',
            '如何查询库存警戒线',
            '如何导出库存警戒线',
            '如何导入库存警戒线',
          ])
        ]
      },
      {
        id: 'message-notification',
        title: '消息通知设置说明',
        url: '/operation-guide#message-notification',
        faqs: [
          section('消息通知设置说明', [
            '如何设置消息通知',
            '如何查看消息通知',
            '如何修改消息通知',
            '如何删除消息通知',
            '如何批量删除消息通知',
            '如何查询消息通知',
            '如何导出消息通知',
            '如何导入消息通知',
          ])
        ]
      },
      {
        id: 'inventory-trend',
        title: '库存/价格走势查看说明',
        url: '/operation-guide#inventory-trend',
        faqs: [
          section('库存/价格走势查看说明', [
            '如何查看库存/价格走势',
            '如何导出库存/价格走势',
          ])
        ]
      },
      {
        id: 'special-attention',
        title: '特别关注设置说明',
        url: '/operation-guide#special-attention',
        faqs: [
          section('特别关注设置说明', [
            '如何设置特别关注',
            '如何查看特别关注',
            '如何修改特别关注',
            '如何删除特别关注',
            '如何批量删除特别关注',
            '如何查询特别关注',
            '如何导出特别关注',
            '如何导入特别关注',
          ])
        ]
      },
      {
        id: 'advanced-filter',
        title: '高级筛选设置说明',
        url: '/operation-guide#advanced-filter',
        faqs: [
          section('高级筛选设置说明', [
            '如何使用高级筛选',
            '如何查看高级筛选',
            '如何修改高级筛选',
            '如何删除高级筛选',
            '如何批量删除高级筛选',
            '如何查询高级筛选',
            '如何导出高级筛选',
            '如何导入高级筛选',
          ])
        ]
      },
      {
        id: 'batch-export',
        title: '一键导出设置说明',
        url: '/operation-guide#batch-export',
        faqs: [
          section('一键导出设置说明', [
            '如何一键导出商品信息',
            '如何查看一键导出记录',
            '如何下载一键导出文件',
            '如何删除一键导出记录',
            '如何批量删除一键导出记录',
            '如何查询一键导出记录',
          ])
        ]
      }
    ]
  }
]