<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="partners-page">
    <SiteHeader />

    <main class="partners-main">
      <!-- Hero Section -->
      <section class="partners-hero">
        <div class="container">
          <h1 class="partners-title">合作伙伴</h1>
          <p class="partners-subtitle">赛盈分销平台携手业界顶尖伙伴，为您提供全方位的跨境电商解决方案</p>
        </div>
      </section>

      <!-- Tab Navigation -->
      <section class="partners-tabs-section">
        <div class="container">
          <div class="tabs-wrapper">
            <button
              v-for="(category, index) in categories"
              :key="index"
              class="tab-button"
              :class="{ active: activeTab === index }"
              @click="activeTab = index"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </section>

      <!-- Partners Grid -->
      <section class="partners-section">
        <div class="container">
          <div class="partners-grid">
            <div
              v-for="partner in filteredPartners"
              :key="partner.id"
              class="partner-card"
            >
              <div class="partner-image">
                <img :src="partner.image" :alt="partner.name" />
              </div>
              <div class="partner-content">
                <h3 class="partner-name">{{ partner.name }}</h3>
                <p class="partner-desc">{{ partner.description }}</p>
                <a :href="partner.link" target="_blank" rel="noreferrer" class="partner-link">
                  查看更多 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const categories = [
  '全部',
  '海外仓储',
  '物流',
  '软件服务',
  '支付',
  '营销',
  '财税服务',
  '选品工具',
  '建站工具',
  '知识产权',
  '跨境电商媒体',
]

const activeTab = ref(0)

const partners = [
  {
    id: 1,
    name: '谷仓海外仓',
    description: '谷仓海外仓，为全球电商提供标准化仓配、头程、尾程以及定制化服务的正逆向一���化供应链解决方案，隶属纵腾集团；已覆盖30余个国家、建成50余个订单处理中心，是中国首家跨越百万级的海外仓企业。',
    link: 'https://www.goodcang.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/1d43edfd-fea4-44df-be2a-d0d992fdf5bc.png',
    categories: [0, 1],
  },
  {
    id: 2,
    name: '云途物流',
    description: '云途物流（YunExpress）是中国领先的跨境B2C商业专线物流服务商。公司成立于2014年，总部位于深圳，聚焦电商件，为全球跨境电商企业提供优质的全球小包裹直发服务。',
    link: 'https://www.yunexpress.cn/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/3551f96b-bd03-4281-ab84-4067b17f5fe3.png',
    categories: [0, 2],
  },
  {
    id: 3,
    name: '卖家精灵',
    description: '卖家精灵是专业服务于跨境电商卖家的SaaS软件。产��从2017年上线以来，深耕亚马逊平台卖家的大数据选品和运营辅助服务，极大提高了亚马逊卖家的选品及运营效率，深得数十万用户的好评。',
    link: 'https://www.sellersprite.com/v2/tools/sales-estimator',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/a8d75f97-ba9d-40db-8953-396f45341efd.jpg',
    categories: [0, 3, 7],
  },
  {
    id: 4,
    name: 'Payoneer派安盈',
    description: 'Payoneer派安盈 (NASDAQ: PAYO) :是全球跨境商贸拓展的首选合作伙伴。以"世界的每个机会，你都有机会"为理念，通过共享金融科技与世界资源，将来自全球的国际数字巨头、跨境商贸企业和个人在内的核心用户与无限跨境商机无缝连接，实现共盈。',
    link: 'https://www.payoneer.com.cn/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/6da34fe8-7eb6-40c1-bcd6-eb83f7bcc54b.png',
    categories: [0, 4],
  },
  {
    id: 5,
    name: '紫鸟浏览器',
    description: '紫鸟超级浏览器SuperBrowser专注解决亚马逊、沃尔玛、eBay、Shopee等跨境电商账号安全管理问题,为Amazon、Wish、eBay、独立站等跨境电商卖家提供专业安全的店铺管理方案,专业技术让店铺安全更简单。',
    link: 'https://www.superbrowser.com/?from=110848&utm_source=110848',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/3551f96b-bd03-4281-ab84-4067b17f5fe3.png',
    categories: [0, 3],
  },
  {
    id: 6,
    name: '51Tracking',
    description: '51Tracking国际快递查询平台，支持1000多家国内外快递批量查询服务，包括全球邮政包裹、EMS、四通一���、DHL、UPS、FedEx、Gls、Aramex等，并提供专业稳定的快递API查询接口。',
    link: 'https://www.51tracking.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2024/202407/6e8aa1f9-e397-4ca3-bad3-2ff9ec3e1e4e.png',
    categories: [0, 3],
  },
  {
    id: 7,
    name: '鲁班跨境通',
    description: '"鲁班跨境通"是蓝色光标旗下推出的出海营销一站式服务平台。鲁班跨境通拥有Meta、Google、TikTok for Business等20余家海外主流媒体资源，为客户提供专业的出海营销解决方案。集海量广告营销资源整合、多平台数据聚合分析、资产和资金管理于一体的出海营销服务。同时，鲁班跨境通为客户提供各类出海培训，集结强大导师阵容，助力跨境卖家创收，提升出海成效。',
    link: 'https://luban.bluemediagroup.cn/about/index?utm_source=SAIYING',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2024/202403/ba626046-78ec-4ee8-a950-cc197d3f25f3.jpg',
    categories: [0, 5],
  },
  {
    id: 8,
    name: '大旗财税',
    description: '大旗财税于2009年成立，总部位于广州，公司员工逾300人。公司致力于推动企业全球化，助力中国企业出海发展。作为跨境财税引领者，我们在财税咨询、跨境投资、全��公司和外贸服务等领域拥有丰富的经验。',
    link: 'https://www.hitouch.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202303/965fbc95-8b55-4594-a5ac-87e93f07f8b0.png',
    categories: [0, 6],
  },
  {
    id: 9,
    name: '欧税通',
    description: '深圳欧税通技术有限公司成立于2019年，作为跨境电商合规SaaS平台解决方案提供商，欧税通目前有超300位员工，包括海外税务专家、IT工程师、专属税务顾问、专业客服团队等。我司于2020年2月推出一站式税务合规智能SaaS管理平台——欧税通（eVatMaster），是英国、德国、西班牙税局官方认证的API报税软件。',
    link: 'http://www.domee.cn/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202303/ba3df5c0-16c3-4b8c-a8ec-61827fb10e11.png',
    categories: [0, 6],
  },
  {
    id: 10,
    name: '鸥鹭',
    description: '鸥鹭为��马逊跨境卖家提供一站式选品和运营解决方案服务，提供市场调研、选品开发、监控跟卖、洞察趋势、流量分析等专业SaaS工具，解决客户两大核心问题"卖什么"和"怎么卖"。目前已服务10万+客户并获得了知名大卖及知名机构的高度认可。',
    link: 'https://0x7.me/8Zlk',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/17b858c9-e814-4c57-8f76-868dd68b81e6.png',
    categories: [0, 3, 7],
  },
  {
    id: 11,
    name: 'UseePay',
    description: 'UseePay是跨境支付领域的创新技术品牌，依托全新Fintech技术，专注于独立站"无跳转支付"的全球解决方案，聚合了6大国际信用卡及多种本地化支付，对接简单、安全、高效。服务客户覆盖跨境电商、航空酒店旅游、交通出行、数字娱乐、软件、教育等行业。',
    link: 'https://www.useepay.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/f307d3a8-75de-4006-a96c-d983ceed25aa.jpg',
    categories: [0, 4],
  },
  {
    id: 12,
    name: 'Ueeshop',
    description: 'Ueeshop是国内最早的SaaS跨境电商自建站平台，专业为中国跨境电商卖家提供高效、快速的建站服务。通过其独立站生态资源体系一站式助力中国卖家��牌出海，帮助商户更快速、便捷地实现跨境电商品牌出海。',
    link: 'https://www.ueeshop.com/?&f=saleyee&k=1',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/f307d3a8-75de-4006-a96c-d983ceed25aa.jpg',
    categories: [0, 8],
  },
  {
    id: 13,
    name: '扬天下知识产权',
    description: '广州扬天下知识���权专注为跨境电商企业提供全球商标、专利、版权申请、欧洲中东VAT税号注册申报、IOSS注册、海外公司注册，跨境资质认证（WEEE、欧代、英代、德国包装法、德国电池法、法国EPR）等一站式跨境商务服务。',
    link: 'http://www.ytx-ip.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2020/202204/62d3cc71-3f8d-46e8-ad65-3e07067b1c39.png',
    categories: [0, 6, 9],
  },
  {
    id: 14,
    name: 'NIUKE跨境通',
    description: '【NIUKE跨境通】 APP是一款专注于跨境电商生态领域综合服务类信息新媒体平台。该APP汇集了跨境新闻信息，跨境展会资讯，跨境达人视频，跨境求职招聘，跨境工具集成，跨境知识问答等境全球开店六大板块的综合信息服务。致力于为跨境电商生态领域相关人士提供专业、便捷、高效的服务，实现全球产业互通，链接全球信息，打造全球顶尖品牌的跨境电商综合服务类信息新媒体应用！',
    link: 'https://www.niuke888.com/home',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2022/202204/96775b5a-0dad-49d3-9666-0a83cf1a4a24.jpg',
    categories: [0, 10],
  },
  {
    id: 15,
    name: '飞鸟国际',
    description: '飞鸟国际成立于2010年，专注为跨���电商提供一站式物流解决方案，服务体系涵盖海外仓储、跨境专线及VAT税务服务等多个板块，在英国、德国、美国等主流外贸市场中拥有自营海外仓超10万平米，日处理订单峰值超20万单。',
    link: 'https://www.birdsystemgroup.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2021/202112/3551f96b-bd03-4281-ab84-4067b17f5fe3.png',
    categories: [0, 1, 2],
  },
  {
    id: 16,
    name: '跨境卫士',
    description: '跨境卫士帮助跨境卖家解决人员、电脑、网络、账号在管理上遇到的相关场景问题，在海外电商平台、支付平台、独立站平台、邮箱平台等运营过程中帮助企业进行网络加速、团队管理、协同办公等功能等方面的提升。5年来，成功保护120万+店铺的数据资产，护航品牌安全出海。',
    link: 'https://www.kuajingvs.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202303/cb095947-f23d-4307-a960-ebf8bb69ef5f.png',
    categories: [0, 3],
  },
  {
    id: 17,
    name: '超店Shoplus',
    description: '超店Shoplus是中国商家出海成功平台，以优质的产品、服务和解决方案打通出海全链路，高效赋能中国商家掘金海外。基于领先的AI大数据、数字化SaaS等核心技���，凭借与Facebook、TikTok等多媒体多渠道在营销推广、品牌共建等方面深度合作的流量沉淀，全程助力卖家成功出海、成功出单，最终成功打造全球化品牌。',
    link: 'https://www.shoplus.net/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2022/202202/9799112b-d480-4559-8a21-a7f4c035e671.png',
    categories: [0, 5],
  },
  {
    id: 18,
    name: '宜日达',
    description: '环球速递 跨境小包 就选宜日达，提供全国上门揽件、代理清关、海海外送货上门等服务，覆盖海陆空多种运输方式，强调价低高效、物流全程可视化。',
    link: 'https://edaycome.com/home',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202303/ba3df5c0-16c3-4b8c-a8ec-61827fb10e11.png',
    categories: [0, 2],
  },
  {
    id: 19,
    name: '赛狐ERP',
    description: '赛狐ERP，是店小秘旗下专为亚马逊卖家量身打��的一款精细化管理系统产品基于店小秘17万+亚马逊卖家的服务经验深度研发，全面贴合亚马逊平台，为卖家提供运营、管理、供应链、财务全链路的数字化解决方案，助力企业降本增效。',
    link: 'https://www.sellfox.com/?aff=J7RA4H',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202303/cb095947-f23d-4307-a960-ebf8bb69ef5f.png',
    categories: [0, 3],
  },
  {
    id: 20,
    name: '木瓜移动',
    description: '木瓜移动深耕海外广告行业15年，拥有海量头部媒体资源，是Google中国区官方代理商、微软广告中国区官方代理商、Amazon官方战略合作伙伴，帮助中国出海企业分享全球市场，业务包括：广告采买、优化代投、素材制作、效果追踪、智能产品。',
    link: 'https://www.papayamobile.com/',
    image: 'https://resource.saleyee.com/UploadFiles/Images/2023/202305/0d73a0c5-43b4-42b8-9992-502a0de60f08.png',
    categories: [0, 5],
  },
]

const filteredPartners = computed(() => {
  const categoryIndex = activeTab.value
  if (categoryIndex === 0) {
    return partners
  }
  return partners.filter((partner) => partner.categories.includes(categoryIndex))
})
</script>

<style scoped>
.partners-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.partners-main {
  flex: 1;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

/* Hero Section */
.partners-hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 80px 16px;
  text-align: center;
}

.partners-title {
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
}

.partners-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
}

/* Tabs Section */
.partners-tabs-section {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 24px 16px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.tabs-wrapper {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-behavior: smooth;
}

.tabs-wrapper::-webkit-scrollbar {
  height: 4px;
}

.tabs-wrapper::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.tabs-wrapper::-webkit-scrollbar-thumb {
  background: #cb261c;
  border-radius: 2px;
}

.tab-button {
  padding: 10px 20px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  transition: all 0.3s;
}

.tab-button:hover {
  border-color: #cb261c;
  color: #cb261c;
}

.tab-button.active {
  background: #cb261c;
  color: #fff;
  border-color: #cb261c;
}

/* Partners Section */
.partners-section {
  padding: 60px 16px;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.partner-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.partner-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
  border-color: #cb261c;
}

.partner-image {
  height: 160px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.partner-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 16px;
}

.partner-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.partner-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.partner-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.partner-link {
  display: inline-block;
  color: #cb261c;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: auto;
}

.partner-link:hover {
  color: #a01f16;
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .partners-title {
    font-size: 32px;
  }

  .partners-subtitle {
    font-size: 14px;
  }

  .partners-hero {
    padding: 40px 16px;
  }

  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .partners-section {
    padding: 40px 16px;
  }

  .tabs-wrapper {
    gap: 8px;
  }

  .tab-button {
    padding: 8px 16px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .partners-title {
    font-size: 24px;
  }

  .partners-grid {
    grid-template-columns: 1fr;
  }

  .partner-image {
    height: 120px;
  }
}
</style>
