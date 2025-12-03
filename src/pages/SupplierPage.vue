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
  <div class="supplier-wrapper">
    <!-- Header -->
    <header class="supplier-header">
      <div class="header-container">
        <div class="header-logo">
          <a href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈供应商" />
            <span>赛盈供应商</span>
          </a>
        </div>
        <div class="header-actions">
          <a href="/login" class="header-link">登录</a>
          <span class="header-divider">|</span>
          <button class="header-btn-primary" @click="openRegisterModal">免费入驻</button>
        </div>
      </div>
    </header>

    <!-- Hero Carousel Section -->
    <section class="hero-carousel">
      <el-carousel arrow="always" :autoplay="false" class="carousel">
        <el-carousel-item class="carousel-slide">
          <div class="slide-content">
            <div class="slide-left">
              <h1 class="slide-title">入驻赛盈，轻松拓展全球市场</h1>
              <p class="slide-subtitle">赛盈分销平台为您打通海外渠道，提供低风险、一站式出海方案</p>
              <a href="#" class="slide-cta" @click.prevent="openRegisterModal">供应商免费入驻</a>
            </div>
            <div class="slide-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/banner1.png" alt="供应商入驻" />
            </div>
          </div>
        </el-carousel-item>

        <el-carousel-item class="carousel-slide">
          <div class="slide-content">
            <div class="slide-left">
              <h1 class="slide-title">跨境电商货源分销服务</h1>
              <p class="slide-subtitle">连接全球分销商，为您的产品打开无限市场空间，实现快速增长</p>
              <a href="#" class="slide-cta" @click.prevent="openRegisterModal">分销商免费入驻</a>
            </div>
            <div class="slide-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/banner2.png" alt="分销服务" />
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- Company Introduction Section -->
    <section class="company-intro">
      <div class="container">
        <h2 class="section-title">公司介绍</h2>
        <div class="intro-content">
          <div class="intro-text">
            <p>赛盈分销平台是一个全球领先的B2B电商分销平台，致力于为全球卖家和供应商提供一站式跨境分销解决方案。平台��为超过100000+卖家服务，涵盖Amazon、eBay、Wish、Walmart、Shopify等全球主流电商平台，产品分销覆盖200+个国家和地区。我们拥有9个海外仓，提供24小时发货、2-8天时效、全程物流跟踪等完整的供��链服务。</p>
          </div>
          <div class="intro-video">
            <video width="100%" height="100%" controls poster="https://www.saleyee.cn/ContentNew/Images/2022/202203/saleyee_video_bg.png">
              <source src="https://resource.saleyee.cn/videos/saleyee-ad-20220310.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages Section -->
    <section class="advantages">
      <div class="container">
        <h2 class="section-title-center">我��能为您解决什么问题？</h2>
        <p class="section-subtitle">我们的服务贴合客户需求</p>

        <ul class="advantages-list">
          <li class="advantage-item">
            <div class="advantage-left">
              <div class="advantage-number">01</div>
              <h3 class="advantage-title">渠道覆盖广<br />销售潜力大</h3>
              <p class="advantage-desc">连接全球200+个国家和地区的分销商，轻松拓展海外市场，让您的产���销售无处不在。</p>
            </div>
            <div class="advantage-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/advantage1.png" alt="渠道覆盖广" />
            </div>
          </li>

          <li class="advantage-item">
            <div class="advantage-left">
              <div class="advantage-number">02</div>
              <h3 class="advantage-title">专业分销平台<br />运营更高效</h3>
              <p class="advantage-desc">完善的分销管理系统，实时订单跟踪，智能数据分析，让您随时掌握销售动态。</p>
            </div>
            <div class="advantage-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/advantage2.png" alt="运营高效" />
            </div>
          </li>

          <li class="advantage-item">
            <div class="advantage-left">
              <div class="advantage-number">03</div>
              <h3 class="advantage-title">完整物流体系<br />时效有保障</h3>
              <p class="advantage-desc">9个海外仓覆盖主流消费地，24小时发货，2-8天极速妥投，全程物流跟踪。</p>
            </div>
            <div class="advantage-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/advantage3.png" alt="物流保障" />
            </div>
          </li>

          <li class="advantage-item">
            <div class="advantage-left">
              <div class="advantage-number">04</div>
              <h3 class="advantage-title">专业团队支持<br />售后更安心</h3>
              <p class="advantage-desc">拥有9年专业客服团队，7x24小时服务支持，快速解决问题，让您无后顾之忧。</p>
            </div>
            <div class="advantage-right">
              <img src="https://img.saleyee.cn/upload/imgs/landing/advantage4.png" alt="专业支持" />
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Qualification Requirements Section -->
    <section class="qualification">
      <div class="container">
        <h2 class="section-title">供应商资质要求</h2>
        <div class="qualification-content">
          <div class="qualification-image">
            <img src="https://img.saleyee.cn/upload/imgs/landing/partner.png" alt="供应商资质" />
          </div>
          <div class="qualification-text">
            <div class="recruitment-badge">招募对象：源头工厂/工贸一体、贸易商、品牌商</div>
            <ul class="requirements-list">
              <li>企业营业执照、法人身份证</li>
              <li>银行开户证明</li>
              <li>增值税发票样板</li>
              <li>产品授权资质（部分品类）</li>
              <li>商品质量检测报告（部��品类）</li>
              <li>企业基本信息完整（注册资本、成立时间等）</li>
              <li>产品符合目的地国家规标准</li>
              <li>无假冒伪劣、侵权等不良记录</li>
              <li>提供真实有效的联系方式和沟通渠道</li>
            </ul>
            <button class="qualification-cta" @click="openRegisterModal">供应商免费入驻</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <div class="container">
        <h2 class="section-title-center">招商品类</h2>
        <ul class="categories-grid">
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img1.png" alt="家居" />
            <div class="category-title">家居</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应��分销商入驻/supplier_classification_img2.png" alt="户外庭院" />
            <div class="category-title">户外庭院</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img3.png" alt="玩具" />
            <div class="category-title">玩具</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img4.png" alt="运动" />
            <div class="category-title">运动</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img5.png" alt="宠物用品" />
            <div class="category-title">宠物用品</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img6.png" alt="家电" />
            <div class="category-title">家电</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img7.png" alt="服饰箱包" />
            <div class="category-title">服饰箱包</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img8.png" alt="健康美容" />
            <div class="category-title">健康美容</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img9.png" alt="家纺百货" />
            <div class="category-title">家纺百货</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img10.png" alt="3C数码" />
            <div class="category-title">3C数码</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应���分销商入驻/supplier_classification_img11.png" alt="汽摩配件" />
            <div class="category-title">汽摩配件</div>
          </li>
          <li class="category-item">
            <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/supplier_classification_img12.png" alt="工具" />
            <div class="category-title">工具</div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Join CTA Section -->
    <section class="join-cta-section">
      <div class="container">
        <h2 class="join-title">立即使用，一可成为赛盈合作供应商</h2>
        <button class="join-cta-button" @click="openRegisterModal">供应商免费入驻</button>
      </div>
    </section>

    <!-- Register Modal -->
    <div v-if="showRegisterModal" class="supplier-modal-overlay" @click.self="closeRegisterModal" role="dialog">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <button type="button" aria-label="Close" class="modal-close" @click="closeRegisterModal">
          <img src="/images/supplier/close.svg" alt="关闭" />
        </button>
        
        <div class="modal-content">
          <!-- Compact Three-Step Header -->
          <ul class="modal-steps">
            <li class="modal-step">
              <FileText class="modal-step-icon" />
              <h3 class="modal-step-title">提交表单信息</h3>
              <p class="modal-step-desc">���目需要一个工作日</p>
            </li>
            <li class="modal-step">
              <Phone class="modal-step-icon" />
              <h3 class="modal-step-title">专业业务经理电话联系</h3>
              <p class="modal-step-desc">诉求沟通、开通账号</p>
            </li>
            <li class="modal-step">
              <Smile class="modal-step-icon" />
              <h3 class="modal-step-title">成为��作伙伴</h3>
            </li>
          </ul>

          <h2 class="modal-title">马上加入我们</h2>

          <form class="modal-form" @submit.prevent="submitRegister">
            <div class="form-group">
              <label for="username" class="form-label">登录用户名 <span class="form-required">*</span></label>
              <input id="username" v-model="form.username" placeholder="请输入登录用户名" type="text" maxlength="128" class="form-input" />
            </div>

            <div class="form-group">
              <label for="password" class="form-label">登录密码 <span class="form-required">*</span></label>
              <input id="password" v-model="form.password" placeholder="请输入登录密码" type="password" maxlength="128" class="form-input" />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">联系邮箱 <span class="form-required">*</span></label>
              <input id="email" v-model="form.email" placeholder="请输入联系邮箱（用于登录和通知）" type="email" maxlength="256" class="form-input" />
            </div>

            <div class="form-group">
              <label for="contact_person" class="form-label">联系人姓名 <span class="form-required">*</span></label>
              <input id="contact_person" v-model="form.contact_person" placeholder="请输入联系人姓名" type="text" maxlength="128" class="form-input" />
            </div>

            <div class="form-group">
              <label for="contact_phone" class="form-label">联系电话 <span class="form-required">*</span></label>
              <input id="contact_phone" v-model="form.contact_phone" placeholder="请输入联系电话" type="text" maxlength="64" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">供应商类型 <span class="form-required">*</span></label>
              <div class="form-radios">
                <label class="radio-label">
                  <input type="radio" value="individual" v-model="form.supplier_type" class="radio-input" />
                  <span>个人供应商</span>
                </label>
                <label class="radio-label">
                  <input type="radio" value="company" v-model="form.supplier_type" class="radio-input" />
                  <span>公司供应商</span>
                </label>
              </div>
            </div>

            <!-- Company-specific fields (shown only when supplier_type is 'company') -->
            <template v-if="form.supplier_type === 'company'">
              <div class="form-section-divider"></div>

              <div class="form-group">
                <label class="form-label">是否有跨境电商经验 <span class="form-required">*</span></label>
                <div class="form-radios">
                  <label class="radio-label">
                    <input type="radio" :value="1" v-model.number="form.has_cross_border_experience" class="radio-input" />
                    <span>是</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" :value="0" v-model.number="form.has_cross_border_experience" class="radio-input" />
                    <span>否</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="company_name" class="form-label">公司名称 <span class="form-required">*</span></label>
                <input id="company_name" v-model="form.company_name" placeholder="请输入公司名称" type="text" maxlength="128" class="form-input" />
              </div>

              <div class="form-group">
                <label class="form-label">公司类型 <span class="form-required">*</span></label>
                <div class="form-radios">
                  <label class="radio-label">
                    <input type="radio" value="factory" v-model="form.company_type" class="radio-input" />
                    <span>工厂</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="trader" v-model="form.company_type" class="radio-input" />
                    <span>贸易商</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="factory_trader" v-model="form.company_type" class="radio-input" />
                    <span>工贸一体</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="main_category" class="form-label">主营业务介绍 <span class="form-required">*</span></label>
                <textarea id="main_category" v-model="form.main_category" placeholder="请介绍公司主要经营的业务和产品" class="form-textarea" rows="3"></textarea>
              </div>

              <div class="form-group">
                <label for="annual_sales_volume" class="form-label">年销售额（万元） <span class="form-required">*</span></label>
                <input id="annual_sales_volume" v-model.number="form.annual_sales_volume" placeholder="请输入年销售额" type="number" class="form-input" />
              </div>
            </template>

            <div class="form-submit">
              <button type="submit" class="btn-submit">提 交</button>
              <p class="form-note">已有账号，<a href="/login" class="form-link">立即登录</a></p>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-backdrop-bottom"></div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-col footer-logo-col">
            <div class="footer-logo">
              <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈logo" />
            </div>
            <div class="footer-consultation">
              <div class="consultation-item">
                <img src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png" alt="微信" />
                <span>了解赛盈</span>
              </div>
              <div class="consultation-item">
                <img src="https://img.saleyee.cn/upload/imgs/landing/qc.png" alt="入驻���询" />
                <span>入驻咨询</span>
              </div>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">联系我们</h4>
            <p class="footer-text">联系人：李经理</p>
            <p class="footer-text">电话：0755-88600121</p>
            <p class="footer-text">邮箱：supplier@saleyee.com</p>
            <p class="footer-text">工作时间：9:00-18:00</p>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">友情链接</h4>
            <ul class="footer-links">
              <li><a href="/">赛盈分销商城</a></li>
              <li><a href="/help-center">帮助中心</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2025 Saleyee.com, Tengming Limited | <a href="#">粤ICP备2021098299号</a></p>
        </div>
      </div>
    </footer>

    <!-- Floating Action Panel -->
    <div class="floating-panel">
      <div class="floating-item floating-consult" @click="showConsultQR = !showConsultQR">
        <span>在线咨询</span>
        <div v-if="showConsultQR" class="qr-popup">
          <img src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png" alt="咨询QR" />
        </div>
      </div>
      <div class="floating-item floating-join" @click="openRegisterModal">
        <span>免费��驻</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FileText, Phone, Smile } from 'lucide-vue-next'

const showConsultQR = ref(false)
const showRegisterModal = ref(false)

const countries = [
  '中国',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

const form = ref({
  username: '',
  password: '',
  email: '',
  contact_person: '',
  contact_phone: '',
  supplier_type: 'individual',
  has_cross_border_experience: 0,
  company_name: '',
  company_type: 'factory',
  main_category: '',
  annual_sales_volume: '',
})

function openRegisterModal() {
  console.log('[SupplierPage] openRegisterModal called')
  showRegisterModal.value = true
  try { document.documentElement.setAttribute('data-supplier-modal','open') } catch(e) {}
}

function closeRegisterModal() {
  console.log('[SupplierPage] closeRegisterModal called')
  showRegisterModal.value = false
  try { document.documentElement.removeAttribute('data-supplier-modal') } catch(e) {}
}

function submitRegister() {
  const commonRequired = [
    { k: 'username', name: '登录用户名' },
    { k: 'password', name: '登录密码' },
    { k: 'email', name: '联系邮箱' },
    { k: 'contact_person', name: '联系人姓名' },
    { k: 'contact_phone', name: '联系电话' },
    { k: 'supplier_type', name: '供应商类型' },
  ]

  for (const r of commonRequired) {
    if (!form.value[r.k]) {
      alert(r.name + ' 为必填项')
      return
    }
  }

  if (form.value.supplier_type === 'company') {
    const companyRequired = [
      { k: 'company_name', name: '公司名称' },
      { k: 'company_type', name: '公司类型' },
      { k: 'main_category', name: '主营业务介绍' },
      { k: 'annual_sales_volume', name: '年销售额' },
    ]
    for (const r of companyRequired) {
      if (!form.value[r.k]) {
        alert(r.name + ' 为必填项')
        return
      }
    }
  }

  console.log('submit supplier register', form.value)
  alert('提交成功，感谢您的申请，我们会尽快联系您')
  showRegisterModal.value = false
}

onMounted(() => {
  window.scrollTo(0, 0)

  try {
    const headerBtn = document.querySelector('.header-btn-primary')
    const slideCtas = Array.from(document.querySelectorAll('.slide-cta'))
    function handler(e) {
      console.log('[SupplierPage] fallback CTA click', e.currentTarget?.className)
      e.preventDefault()
      openRegisterModal()
    }
    if (headerBtn) headerBtn.addEventListener('click', handler)
    slideCtas.forEach((el) => el.addEventListener('click', handler))
  } catch (e) {
    console.warn('failed to attach fallback listeners', e)
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.supplier-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

/* Header */
.supplier-header {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo a {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.header-logo img {
  height: 40px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.header-link:hover {
  color: #cb261c;
}

.header-divider {
  color: #ddd;
}

.header-btn-primary {
  background: #cb261c;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
}

.header-btn-primary:hover {
  background: #a01f16;
}

/* Hero Carousel */
.hero-carousel {
  padding: 0;
  margin: 0;
  background: #fafafa;
}

.carousel {
  width: 100%;
  min-height: 500px;
}

.carousel-slide {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.slide-content {
  max-width: 1280px;
  width: 100%;
  padding: 60px 16px;
  display: flex;
  align-items: center;
  gap: 60px;
  margin: 0 auto;
}

.slide-left {
  flex: 1;
}

.slide-title {
  font-size: 48px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.3;
}

.slide-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.slide-cta {
  display: inline-block;
  background: #cb261c;
  color: #fff;
  padding: 12px 40px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.slide-cta:hover {
  background: #a01f16;
}

.slide-right {
  flex: 1;
  text-align: right;
}

.slide-right img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Company Introduction */
.company-intro {
  padding: 80px 16px;
  background: #fff;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin: 0 0 40px 0;
  text-align: left;
  letter-spacing: 0.5px;
}

.intro-content {
  display: flex;
  gap: 60px;
  align-items: center;
}

.intro-text {
  flex: 1;
}

.intro-text p {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.intro-video {
  flex: 1;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.intro-video video {
  width: 100%;
  display: block;
}

/* Section Title Center */
.section-title-center {
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
  letter-spacing: 0.5px;
}

.section-subtitle {
  font-size: 16px;
  color: #999;
  text-align: center;
  margin: 0 0 50px 0;
}

/* Advantages */
.advantages {
  padding: 80px 16px;
  background: #fafafa;
}

.advantages-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.advantage-item {
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 100px;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
}

.advantage-item:last-child {
  margin-bottom: 0;
}

.advantage-left {
  flex: 1;
}

.advantage-number {
  font-size: 80px;
  font-weight: 700;
  color: #f0f0f0;
  margin: 0 0 20px 0;
  line-height: 1;
}

.advantage-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.advantage-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.advantage-right {
  flex: 1;
  text-align: center;
}

.advantage-right img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Qualification */
.qualification {
  padding: 80px 16px;
  background: #fff;
}

.qualification-content {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  margin-top: 40px;
}

.qualification-image {
  flex: 1;
}

.qualification-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.qualification-text {
  flex: 1;
}

.recruitment-badge {
  display: inline-block;
  background: #cb261c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 30px;
}

.requirements-list {
  list-style: none;
  margin: 0 0 30px 0;
  padding: 0;
}

.requirements-list li {
  font-size: 14px;
  color: #666;
  line-height: 2;
  padding-left: 0;
}

.requirements-list li:before {
  content: '✓ ';
  color: #cb261c;
  font-weight: bold;
  margin-right: 8px;
}

.qualification-cta {
  background: #cb261c;
  color: #fff;
  border: none;
  padding: 12px 40px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.qualification-cta:hover {
  background: #a01f16;
}

/* Categories */
.categories {
  padding: 80px 16px;
  background: #fafafa;
}

.categories-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 50px;
}

.category-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  cursor: pointer;
  background: #333;
  transition: transform 0.3s;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.category-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.3s;
}

.category-item:hover .category-title {
  background: rgba(0, 0, 0, 0.8);
}

/* Join CTA Section */
.join-cta-section {
  padding: 60px 16px;
  background: #cb261c;
  text-align: center;
  margin: 0;
}

.join-title {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 30px 0;
}

.join-cta-button {
  background: #fff;
  color: #cb261c;
  border: none;
  padding: 14px 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.join-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Modal Overlay */
.supplier-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.modal-backdrop-bottom {
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
}

.modal-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close img {
  width: 24px;
  height: 24px;
}

.modal-content {
  padding: 32px;
}

/* Modal Steps */
.modal-steps {
  list-style: none;
  margin: 0 0 28px 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.modal-step-icon {
  width: 40px;
  height: 40px;
  color: #cb261c;
  flex-shrink: 0;
}

.modal-step-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.modal-step-desc {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 24px 0;
  text-align: center;
}

/* Form Styles */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-required {
  color: #cb261c;
  margin-left: 2px;
}

.form-section-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 12px 0;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #cb261c;
}

.form-radios {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.radio-input {
  cursor: pointer;
}

.form-address {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.form-phone {
  display: grid;
  grid-template-columns: 1fr 120px 140px;
  gap: 12px;
  align-items: flex-end;
}

.form-phone-input {
  grid-column: 1 / 2;
}

.form-sms-input {
  grid-column: 2 / 3;
}

.btn-sms {
  grid-column: 3 / 4;
  padding: 10px 12px;
  background: #cb261c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
}

.btn-sms:hover:not(:disabled) {
  background: #a01f16;
}

.btn-sms:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-submit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #f0f0f0;
}

.btn-submit {
  width: 100%;
  padding: 14px 18px;
  background: #cb261c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background: #a01f16;
}

.form-note {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.form-link {
  color: #cb261c;
  text-decoration: none;
}

.form-link:hover {
  text-decoration: underline;
}

/* Footer */
.footer {
  background: #222;
  color: #ccc;
  padding: 40px 16px 20px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 30px;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.footer-col {
  flex: 1;
}

.footer-logo-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo img {
  height: 40px;
  width: auto;
}

.footer-consultation {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.consultation-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.consultation-item img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.footer-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 15px 0;
}

.footer-text {
  font-size: 13px;
  color: #999;
  margin: 8px 0;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #999;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #cb261c;
}

.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #666;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.footer-bottom a {
  color: #666;
  text-decoration: none;
}

.footer-bottom a:hover {
  color: #cb261c;
}

/* Floating Panel */
.floating-panel {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 99;
}

.floating-item {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #cb261c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.floating-item:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.floating-consult span,
.floating-join span {
  font-weight: 500;
}

.qr-popup {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.qr-popup img {
  width: 150px;
  height: 150px;
  display: block;
  border-radius: 4px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .slide-content {
    flex-direction: column;
    padding: 40px 16px;
    gap: 30px;
  }

  .slide-title {
    font-size: 36px;
  }

  .slide-left,
  .slide-right {
    flex: 1;
    width: 100%;
  }

  .slide-right {
    text-align: center;
  }

  .intro-content {
    flex-direction: column;
    gap: 30px;
  }

  .advantage-item {
    flex-direction: column;
    gap: 30px;
    padding: 30px;
  }

  .advantage-number {
    font-size: 60px;
  }

  .advantage-title {
    font-size: 24px;
  }

  .qualification-content {
    flex-direction: column;
    gap: 30px;
  }

  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .form-address {
    grid-template-columns: 1fr;
  }

  .form-phone {
    grid-template-columns: 1fr;
  }

  .form-phone-input,
  .form-sms-input,
  .btn-sms {
    grid-column: unset;
  }

  .modal-steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 12px 8px;
  }

  .header-actions {
    gap: 12px;
  }

  .header-btn-primary {
    padding: 6px 16px;
    font-size: 12px;
  }

  .slide-content {
    padding: 30px 12px;
  }

  .slide-title {
    font-size: 28px;
  }

  .slide-subtitle {
    font-size: 14px;
  }

  .section-title,
  .section-title-center {
    font-size: 28px;
  }

  .company-intro {
    padding: 40px 16px;
  }

  .advantage-item {
    padding: 20px;
    margin-bottom: 30px;
  }

  .advantage-number {
    font-size: 48px;
  }

  .advantage-title {
    font-size: 20px;
  }

  .advantages {
    padding: 40px 16px;
  }

  .qualification {
    padding: 40px 16px;
  }

  .categories {
    padding: 40px 16px;
  }

  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .join-cta-section {
    padding: 40px 16px;
  }

  .join-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .join-cta-button {
    padding: 10px 30px;
    font-size: 14px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .floating-item {
    width: 50px;
    height: 50px;
    font-size: 11px;
  }

  .modal-content {
    padding: 24px;
  }

  .modal-steps {
    gap: 16px;
  }

  .modal-title {
    font-size: 22px;
  }

  .form-submit {
    padding-top: 12px;
  }
}

@media (max-width: 480px) {
  .carousel {
    min-height: 350px;
  }

  .slide-title {
    font-size: 20px;
  }

  .slide-subtitle {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .slide-cta {
    padding: 10px 30px;
    font-size: 14px;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title,
  .section-title-center {
    font-size: 22px;
  }

  .advantage-number {
    font-size: 40px;
    margin-bottom: 10px;
  }

  .advantage-title {
    font-size: 16px;
  }

  .advantage-desc {
    font-size: 14px;
  }

  .floating-item {
    width: 45px;
    height: 45px;
    font-size: 10px;
  }

  .modal-container {
    max-width: calc(100% - 40px);
  }

  .modal-steps {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .form-address,
  .form-phone {
    grid-template-columns: 1fr;
  }

  .btn-sms {
    width: 100%;
  }
}
</style>
