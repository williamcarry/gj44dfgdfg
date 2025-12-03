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
  <div class="login-page register-clone">
    <!-- Header copied from LoginPage -->
    <header class="login-header">
      <div class="login-container login-header__inner">
        <a href="/" class="login-logo" aria-label="SaleYee 首页">
          <img src="https://www.saleyee.com/Content/Images/logo.png" alt="SaleYee" />
        </a>
        <div class="login-header__actions">
          <a class="login-header__link" href="/getting-started">{{
            t('header.gettingStarted')
          }}</a>

          <div class="login-language" ref="langRef">
            <button
              type="button"
              class="login-language__btn"
              @click="toggleLang"
              @keydown.escape="closeLang"
              :aria-expanded="langOpen ? 'true' : 'false'"
              aria-haspopup="menu"
            >
              <Globe class="login-language__icon" :stroke-width="1.6" />
              <span>{{ langLabel }}</span>
              <ChevronDown class="login-language__chevron" :stroke-width="1.6" />
            </button>
            <div v-show="langOpen" class="login-language__menu" role="menu">
              <button
                type="button"
                class="login-language__item"
                :class="currentLang === 'zh-CN' ? 'is-active' : ''"
                @click="selectLang('zh-CN')"
                role="menuitem"
              >
                {{ t('lang.zh') }}
              </button>
              <button
                type="button"
                class="login-language__item"
                :class="currentLang === 'en' ? 'is-active' : ''"
                @click="selectLang('en')"
                role="menuitem"
              >
                {{ t('lang.en') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main hero copied from LoginPage; login card replaced with register card -->
    <main class="login-main">
      <div class="login-hero-wrap">
        <section class="login-hero">
          <transition-group name="fade" tag="div" class="login-hero__stage">
            <img
              v-for="(src, i) in slides"
              :key="src + ':' + i + ':' + index"
              v-show="i === index"
              class="login-hero__image"
              :src="src"
              :alt="t('login.altBanner')"
              @error="onHeroError"
            />
          </transition-group>

          <div class="login-hero__inner">
            <button class="login-hero__arrow" type="button" aria-label="上一张" @click="prev">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.3"
                />
                <path
                  d="M13.8 8.5 10.3 12l3.5 3.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                />
              </svg>
            </button>
            <button
              class="login-hero__arrow login-hero__arrow--right"
              type="button"
              aria-label="下一张"
              @click="next"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.3"
                />
                <path
                  d="M10.2 8.5 13.7 12l-3.5 3.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                />
              </svg>
            </button>

            <!-- Register Card (matches saleyee.com/register.html layout) -->
            <div class="register-card">
              <div class="register-card__tab">注册</div>

              <!-- Country area + phone -->
              <div class="reg-row reg-row--split">
                <div class="reg-field reg-field--select">
                  <label class="reg-label">{{ t('register.area') }}</label>
                  <div class="reg-select">
                    <select v-model="form.area" aria-label="地区区号">
                      <option v-for="o in areaOptions" :key="o.value" :value="o.value">
                        {{ o.label }}
                      </option>
                    </select>
                    <span class="reg-select__arrow" aria-hidden="true">▾</span>
                  </div>
                </div>
                <div class="reg-field reg-field--input">
                  <input
                    id="register-phone"
                    v-model="form.phone"
                    class="reg-input"
                    type="text"
                    placeholder="手机号码"
                    autocomplete="tel"
                    inputmode="numeric"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="reg-field">
                <div class="reg-input-wrap">
                  <button
                    type="button"
                    class="reg-eye"
                    @click="showPwd = !showPwd"
                    aria-label="切换密码可见性"
                  >
                    <img :src="showPwd ? visibleIcon : hiddenIcon" alt="" />
                  </button>
                  <input
                    id="register-password"
                    v-model="form.password"
                    class="reg-input reg-input--with-eye"
                    :type="showPwd ? 'text' : 'password'"
                    placeholder="请输入密码(须含字母及数字，区分大小写，8-32位)"
                    autocomplete="new-password"
                  />
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="reg-field">
                <div class="reg-input-wrap">
                  <button
                    type="button"
                    class="reg-eye"
                    @click="showConfirm = !showConfirm"
                    aria-label="切换确认密码可见性"
                  >
                    <img :src="showConfirm ? visibleIcon : hiddenIcon" alt="" />
                  </button>
                  <input
                    id="register-confirm"
                    v-model="form.confirm"
                    class="reg-input reg-input--with-eye"
                    :type="showConfirm ? 'text' : 'password'"
                    placeholder="请再次输入密码"
                    autocomplete="new-password"
                  />
                </div>
              </div>

              <!-- SMS code -->
              <div class="reg-row reg-row--code">
                <input
                  id="register-sms"
                  v-model="form.sms"
                  class="reg-input"
                  type="text"
                  maxlength="4"
                  placeholder="请输入短信验证码"
                  autocomplete="one-time-code"
                  inputmode="numeric"
                />
                <button type="button" class="reg-code" @click="sendCode">获取验证码</button>
              </div>

              <!-- Invitation code -->
              <div class="reg-field">
                <input
                  id="register-invite"
                  v-model="form.invite"
                  class="reg-input"
                  type="text"
                  placeholder="邀请码（没有可不填）"
                  autocomplete="off"
                />
              </div>

              <!-- Agreement -->
              <div class="reg-agree">
                <input id="agree" type="checkbox" v-model="form.agree" />
                <label for="agree">
                  我已阅读并同意
                  <a href="/PrivacyDetails/1" target="_blank" rel="noreferrer">《服务条款》</a>
                  -
                  <a href="/PrivacyDetails/2" target="_blank" rel="noreferrer">《隐私协议》</a>
                </label>
              </div>

              <!-- Next button -->
              <button type="button" class="reg-submit" @click="nextStep">下一步</button>

              <!-- Login link -->
              <div class="reg-login">
                <a href="/login">已有账号,马上<span>登录</span></a>
              </div>
            </div>

            <div class="login-hero__dots" aria-hidden="true">
              <span
                v-for="(s, i) in slides"
                :key="'dot-' + i"
                :class="i === index ? 'is-active' : ''"
                @click="go(i)"
              ></span>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer copied from LoginPage -->
    <footer class="login-footer">
      <div class="login-container">
        <div class="login-footer__grid">
          <div class="login-footer__column">
            <h2>{{ t('footer.about') }}</h2>
            <ul>
              <li>
                <a href="/about-saleyee">赛盈简介</a>
              </li>
              <li><a href="/membership" target="_blank" rel="noreferrer">会员权益</a></li>
              <li>
                <a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a>
              </li>
              <li>
                <a href="/contact-us"
                  >联系我们</a
                >
              </li>
            </ul>
          </div>
          <div class="login-footer__column">
            <h2>{{ t('footer.customer') }}</h2>
            <ul>
              <li>
                <a href="https://www.saleyee.com/help-center.html" target="_blank" rel="noreferrer"
                  >帮助中心</a
                >
              </li>
              <li>
                <a href="/faq/hc271661">售后条款</a>
              </li>
              <li>
                <a href="/faq/hp062361">支付方式</a>
              </li>
              <li>
                <a href="/faq/hp981158">物流方式</a>
              </li>
              <li><a href="/help/14" target="_blank" rel="noreferrer">VAT政策解读</a></li>
              <li>
                <a href="https://www.saleyee.com/feedback.html" target="_blank" rel="noreferrer"
                  >体验反馈</a
                >
              </li>
            </ul>
          </div>
          <div class="login-footer__column">
            <h2>{{ t('footer.partners') }}</h2>
            <ul>
              <li>
                <a href="/distributors">跨境卖家入驻</a>
              </li>
              <li>
                <a href="/supplier">供应商入驻</a>
              </li>
              <li>
                <a href="/partners">合作伙伴</a>
              </li>
              <li><a href="/help/51" target="_blank" rel="noreferrer">商务合作</a></li>
            </ul>
          </div>
          <div class="login-footer__column login-footer__column--social">
            <h2>{{ t('footer.weixin') }}</h2>
            <div class="login-social">
              <a
                href="https://v.qq.com/s/videoplus/2791751583"
                target="_blank"
                rel="noreferrer"
                aria-label="腾讯视频"
              >
                <svg viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#1f1f1f" />
                  <path d="M17.5 12.5 26 19l-8.5 6.5z" fill="#fff" />
                </svg>
              </a>
              <a
                href="https://www.iqiyi.com/u/1639384380"
                target="_blank"
                rel="noreferrer"
                aria-label="爱奇艺"
              >
                <svg viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#1f1f1f" />
                  <path
                    d="M12.5 19.2c0-4 2.6-6.7 7.6-6.7h2.6c3.4 0 5.3 1.4 5.3 5.2v4.6c0 3.9-1.9 5.2-5.3 5.2h-2.6c-5 0-7.6-2.7-7.6-6.8zm5.4 0c0 2.2 1 3.4 3.1 3.4h1.3c1.9 0 2.7-.6 2.7-2.7v-1.4c0-2.2-.8-2.8-2.7-2.8h-1.3c-2.1 0-3.1 1.1-3.1 3.5z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a
                href="https://space.bilibili.com/517583603"
                target="_blank"
                rel="noreferrer"
                aria-label="哔哩哔哩"
              >
                <svg viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#1f1f1f" />
                  <path
                    d="M13.5 13h13c2.4 0 3.5 1.1 3.5 3.5v7c0 2.4-1.1 3.5-3.5 3.5h-13c-2.4 0-3.5-1.1-3.5-3.5v-7c0-2.4 1.1-3.5 3.5-3.5zm1.7 4.2c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.6 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="login-footer__column login-footer__column--qr">
            <h2>赛盈官方微信</h2>
            <div class="login-footer__qr">
              <img
                src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png"
                alt="赛盈官方微信"
              />
            </div>
          </div>
        </div>

        <div class="login-footer__bottom">
          <div class="login-footer__station" role="button" tabindex="0" aria-label="赛盈国际站点">
            <span></span>
            <p>International</p>
          </div>
          <p>
            © 2025 <a href="/" rel="noreferrer">Saleyee.com</a> Tengming Limited |
            <a href="/sitemap" target="_blank" rel="noreferrer">网站地图</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { currentLang, setLang, t } from '@/i18n'
import { Globe, ChevronDown } from 'lucide-vue-next'

// language
const langOpen = ref(false)
const langRef = ref(null)
const langLabel = computed(() => (currentLang.value === 'zh-CN' ? t('lang.zh') : t('lang.en')))
function toggleLang() {
  langOpen.value = !langOpen.value
}
function closeLang() {
  langOpen.value = false
}
function selectLang(code) {
  setLang(code)
  closeLang()
}
function onClickOutside(e) {
  const el = langRef.value
  if (el && !el.contains(e.target)) closeLang()
}

// hero carousel (copied from LoginPage)
const slides = [
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/9fbef686-c4a5-4825-a43f-fadcee9ffe54.png',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202510/06189dc6-4039-4415-9581-e5d1bee4983b.jpg',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/49bbf525-ac11-4d7e-b8ba-f502c58b4407.jpg',
]
const index = ref(0)
let timer
const fallbackHero =
  'https://resource.saleyee.com/UploadFiles/Images/2022/202204/49ae70d5-7089-46ae-bca9-67901afde1f7.jpg'
function onHeroError(event) {
  const target = event.target
  if (target && target.src !== fallbackHero) target.src = fallbackHero
}
function startAuto() {
  stopAuto()
  if (slides.length > 1)
    timer = window.setInterval(() => (index.value = (index.value + 1) % slides.length), 4500)
}
function stopAuto() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}
function prev() {
  index.value = (index.value - 1 + slides.length) % slides.length
}
function next() {
  index.value = (index.value + 1) % slides.length
}
function go(i) {
  index.value = i % slides.length
}

onMounted(() => {
  startAuto()
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  stopAuto()
  document.removeEventListener('click', onClickOutside)
})

// register form state
const form = reactive({
  area: '86',
  phone: '',
  password: '',
  confirm: '',
  sms: '',
  invite: '',
  agree: false,
})
const showPwd = ref(false)
const showConfirm = ref(false)
const visibleIcon = 'https://www.saleyee.com/ContentNew/Images/visible.png'
const hiddenIcon = 'https://www.saleyee.com/ContentNew/Images/invisible.png'

function sendCode() {
  alert('Mock: 发送验证码')
}
function nextStep() {
  if (!form.phone || !form.password || !form.confirm || !form.agree) {
    alert('请完整填写并同意协议')
    return
  }
  if (form.password !== form.confirm) {
    alert('两次输入的密码不一致')
    return
  }
  alert('Mock register 下一步')
}

const areaOptions = [
  { value: '1', label: '+1 美国 和 加拿大' },
  { value: '7', label: '+7 俄罗斯 和 哈萨克' },
  { value: '20', label: '+20 埃及' },
  { value: '27', label: '+27 南非' },
  { value: '30', label: '+30 希腊' },
  { value: '31', label: '+31 荷' },
  { value: '32', label: '+32 比利时' },
  { value: '33', label: '+33 法国' },
  { value: '34', label: '+34 西班牙' },
  { value: '36', label: '+36 匈牙利' },
  { value: '39', label: '+39 意大利' },
  { value: '40', label: '+40 罗马尼亚' },
  { value: '41', label: '+41 瑞士' },
  { value: '43', label: '+43 奥地利' },
  { value: '44', label: '+44 英国' },
  { value: '45', label: '+45 丹麦' },
  { value: '46', label: '+46 瑞典' },
  { value: '47', label: '+47 挪威' },
  { value: '48', label: '+48 波兰' },
  { value: '49', label: '+49 德国' },
  { value: '51', label: '+51 秘鲁' },
  { value: '52', label: '+52 墨西哥' },
  { value: '53', label: '+53 古巴' },
  { value: '54', label: '+54 阿根廷' },
  { value: '55', label: '+55 巴西' },
  { value: '56', label: '+56 智利' },
  { value: '57', label: '+57 哥伦比亚' },
  { value: '58', label: '+58 委内瑞拉' },
  { value: '60', label: '+60 马来西亚' },
  { value: '61', label: '+61 澳洲' },
  { value: '62', label: '+62 印度尼西亚' },
  { value: '63', label: '+63 菲律宾' },
  { value: '64', label: '+64 新西兰' },
  { value: '65', label: '+65 新加坡' },
  { value: '66', label: '+66 泰国' },
  { value: '81', label: '+81 日本' },
  { value: '82', label: '+82 韩国' },
  { value: '84', label: '+84 越南' },
  { value: '86', label: '+86 中国' },
  { value: '90', label: '+90 土耳其' },
  { value: '91', label: '+91 印度' },
  { value: '92', label: '+92 巴基斯坦' },
  { value: '93', label: '+93 阿富汗' },
  { value: '94', label: '+94 斯里兰卡' },
  { value: '95', label: '+95 缅甸' },
  { value: '98', label: '+98 伊朗' },
  { value: '211', label: '+211 南苏丹' },
  { value: '212', label: '+212 摩洛哥' },
  { value: '213', label: '+213 阿尔及利亚' },
  { value: '216', label: '+216 突尼斯' },
  { value: '218', label: '+218 利比亚' },
  { value: '220', label: '+220 冈比亚' },
  { value: '221', label: '+221 塞内加尔' },
  { value: '222', label: '+222 毛里塔尼亚' },
  { value: '223', label: '+223 马里共和国' },
  { value: '224', label: '+245 几内亚比绍' },
  { value: '225', label: '+225 科特迪瓦' },
  { value: '226', label: '+226 布基纳法索' },
  { value: '227', label: '+227 尼日' },
  { value: '228', label: '+228 多哥' },
  { value: '229', label: '+229 贝宁' },
  { value: '230', label: '+230 毛里求斯' },
  { value: '231', label: '+231 利比里亚' },
  { value: '232', label: '+232 狮子山共和国' },
  { value: '233', label: '+233 加纳' },
  { value: '234', label: '+234 尼日利亚' },
  { value: '235', label: '+235 查德' },
  { value: '236', label: '+236 中非共和国' },
  { value: '237', label: '+237 喀麦隆' },
  { value: '238', label: '+238 佛得角' },
  { value: '239', label: '+239 圣多美普林西比' },
  { value: '240', label: '+240 赤道几内亚' },
  { value: '241', label: '+241 加蓬' },
  { value: '242', label: '+242 刚果共和国' },
  { value: '243', label: '+243 刚果民主共和国' },
  { value: '244', label: '+244 安哥拉' },
  { value: '245', label: '+245 几内亚比绍' },
  { value: '247', label: '+247 阿森松岛' },
  { value: '248', label: '+248 塞舌尔' },
  { value: '249', label: '+249 苏丹' },
  { value: '250', label: '+250 卢旺达' },
  { value: '251', label: '+251 埃塞俄比亚' },
  { value: '252', label: '+252 索马里' },
  { value: '253', label: '+253 吉布提' },
  { value: '254', label: '+254 肯尼亚' },
  { value: '255', label: '+255 坦桑尼亚' },
  { value: '256', label: '+256 乌干达' },
  { value: '257', label: '+257 布隆迪' },
  { value: '258', label: '+258 莫桑比克' },
  { value: '260', label: '+260 赞比亚' },
  { value: '261', label: '+261 马达加斯加' },
  { value: '262', label: '+262 留尼旺' },
  { value: '263', label: '+263 津巴布韦' },
  { value: '264', label: '+264 纳米比亚' },
  { value: '265', label: '+265 马拉维' },
  { value: '266', label: '+266 莱索托' },
  { value: '267', label: '+267 博茨瓦纳' },
  { value: '268', label: '+268 斯威士兰' },
  { value: '269', label: '+269 科摩罗 和 马约特' },
  { value: '297', label: '+297 阿鲁巴 (荷兰王国)' },
  { value: '298', label: '+298 法罗群岛 (丹麦)' },
  { value: '299', label: '+299 格陵兰 (丹麦)' },
  { value: '350', label: '+350 直布罗陀 (英国)' },
  { value: '351', label: '+351 葡萄牙' },
  { value: '352', label: '+352 卢森堡' },
  { value: '353', label: '+353 爱尔兰共和国' },
  { value: '354', label: '+354 冰岛' },
  { value: '355', label: '+355 阿尔巴尼亚' },
  { value: '356', label: '+356 马耳他' },
  { value: '357', label: '+357 塞浦路斯' },
  { value: '358', label: '+358 芬兰' },
  { value: '359', label: '+359 保加利亚' },
  { value: '370', label: '+370 立陶宛' },
  { value: '371', label: '+371 拉脱维亚' },
  { value: '372', label: '+372 爱沙尼亚' },
  { value: '373', label: '+373 摩尔多瓦' },
  { value: '374', label: '+374 亚美尼亚' },
  { value: '375', label: '+375 白俄罗斯' },
  { value: '376', label: '+376 安道尔' },
  { value: '377', label: '+377 摩纳哥' },
  { value: '378', label: '+378 圣马力诺' },
  { value: '380', label: '+380 乌克兰' },
  { value: '381', label: '+381 塞尔维亚共和国' },
  { value: '382', label: '+382 黑山共和国' },
  { value: '385', label: '+385 克罗地亚' },
  { value: '386', label: '+386 斯洛文尼亚' },
  { value: '387', label: '+387 波斯尼亚与赫塞哥维纳' },
  { value: '389', label: '+389 马其顿' },
  { value: '420', label: '+420 捷克' },
  { value: '421', label: '+421 斯洛伐克' },
  { value: '423', label: '+423 列支敦士登' },
  { value: '501', label: '+501 伯利兹' },
  { value: '502', label: '+502 危地马拉' },
  { value: '503', label: '+503 萨尔瓦多' },
  { value: '504', label: '+504 洪都拉斯' },
  { value: '505', label: '+505 尼加拉瓜' },
  { value: '506', label: '+506 哥斯达黎加' },
  { value: '507', label: '+507 巴拿马' },
  { value: '508', label: '+508 圣皮耶与密克隆群岛 (法国)' },
  { value: '509', label: '+509 海地' },
  { value: '590', label: '+590 瓜德罗普岛 和 圣马丁岛(荷兰部分)' },
  { value: '591', label: '+591 玻利维亚' },
  { value: '592', label: '+592 圭亚那' },
  { value: '593', label: '+593 厄瓜多尔' },
  { value: '594', label: '+594 法属圭亚那 (法国)' },
  { value: '595', label: '+595 巴拉圭' },
  { value: '596', label: '+596 马提克 (法国)' },
  { value: '597', label: '+597 苏里南' },
  { value: '598', label: '+598 乌拉圭' },
  { value: '599', label: '+599 博内尔岛，圣尤斯特歇斯 和 库拉索 (荷兰王国)' },
  { value: '670', label: '+670 东帝汶' },
  { value: '673', label: '+673 文莱' },
  { value: '675', label: '+675 巴布亚新几内亚' },
  { value: '676', label: '+676 东加' },
  { value: '677', label: '+677 所罗门群岛' },
  { value: '678', label: '+678 瓦努阿图' },
  { value: '679', label: '+679 斐济' },
  { value: '680', label: '+680 帕劳' },
  { value: '682', label: '+682 库克群岛 (新西兰)' },
  { value: '685', label: '+685 萨摩亚' },
  { value: '686', label: '+686 基里巴斯' },
  { value: '687', label: '+687 新喀里多尼亚 (法国)' },
  { value: '689', label: '+689 法属波利尼西亚 (法国)' },
  { value: '852', label: '+852 中国香港' },
  { value: '853', label: '+853 中国澳门' },
  { value: '855', label: '+855 柬埔寨' },
  { value: '856', label: '+856 老挝' },
  { value: '880', label: '+880 孟加拉国' },
  { value: '886', label: '+886 中国台湾' },
  { value: '960', label: '+960 马尔代夫' },
  { value: '961', label: '+961 黎巴嫩' },
  { value: '962', label: '+962 约旦' },
  { value: '963', label: '+963 叙利亚' },
  { value: '964', label: '+964 伊拉克' },
  { value: '965', label: '+965 科威特' },
  { value: '966', label: '+966 沙特阿拉伯' },
  { value: '967', label: '+967 也门' },
  { value: '968', label: '+968 阿曼' },
  { value: '970', label: '+970 巴勒斯坦' },
  { value: '971', label: '+971 阿拉伯联合酋长国' },
  { value: '972', label: '+972 ���色列' },
  { value: '973', label: '+973 巴林' },
  { value: '974', label: '+974 卡达' },
  { value: '975', label: '+975 不丹' },
  { value: '976', label: '+976 蒙古国' },
  { value: '977', label: '+977 尼泊尔' },
  { value: '992', label: '+992 塔吉克' },
  { value: '993', label: '+993 土库曼' },
  { value: '994', label: '+994 阿塞拜疆' },
  { value: '995', label: '+995 乔治亚' },
  { value: '996', label: '+996 吉尔吉斯' },
  { value: '998', label: '+998 乌兹别克' },
  { value: '1242', label: '+1242 巴哈马' },
  { value: '1246', label: '+1246 巴巴多斯' },
  { value: '1264', label: '+1264 安圭拉' },
  { value: '1268', label: '+1268 安提瓜和巴布达' },
  { value: '1284', label: '+1284 英属维尔京群岛 (英国)' },
  { value: '1340', label: '+1340 美属维尔京群岛 (美国)' },
  { value: '1345', label: '+1345 开曼群岛 (英国)' },
  { value: '1441', label: '+1441 百慕大 (英国)' },
  { value: '1473', label: '+1473 格林纳达' },
  { value: '1649', label: '+1649 土克凯可群岛 (英国)' },
  { value: '1664', label: '+1664 蒙塞拉特岛 (英国)' },
  { value: '1671', label: '+1671 关岛 (美国)' },
  { value: '1684', label: '+1684 美属萨摩亚 (美国)' },
  { value: '1758', label: '+1758 圣卢西亚' },
  { value: '1767', label: '+1767 多米尼克' },
  { value: '1784', label: '+1784 圣文森及格林纳丁' },
  { value: '1787', label: '+1787 波多黎各 (美国)' },
  { value: '1809', label: '+1809 多米尼加共和国' },
  { value: '1868', label: '+1868 特立尼达和多巴哥' },
  { value: '1869', label: '+1869 圣克里斯多福与尼维斯' },
  { value: '1876', label: '+1876 牙买加' },
]
</script>

<style scoped>
/* ====== Copied base styles from LoginPage ====== */
.login-page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #2d2d2d;
  display: flex;
  flex-direction: column;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}
.login-container {
  width: 1200px;
  margin: 0 auto;
}
.login-hero-wrap {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.login-header {
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
}
.login-header__inner {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-logo img {
  height: 46px;
  display: block;
}
.login-header__actions {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 14px;
  color: #262626;
}
.login-header__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}
.login-header__link:hover {
  color: #cb261c;
}
.login-language {
  position: relative;
}
.login-language__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #cb261c;
  cursor: pointer;
  background: transparent;
  border: none;
}
.login-language__icon {
  width: 16px;
  height: 16px;
}
.login-language__chevron {
  width: 12px;
  height: 12px;
}
.login-language__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  width: 120px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  z-index: 50;
}
.login-language__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: #444;
  cursor: pointer;
}
.login-language__item:hover {
  background: #f8fafc;
}
.login-language__item.is-active {
  color: #cb261c;
}
.login-main {
  padding: 36px 0 60px;
  flex: 1;
}
.login-hero {
  position: relative;
  height: 540px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}
.login-hero__stage {
  position: absolute;
  inset: 0;
}
.login-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(24, 8, 1, 0.68) 0%,
    rgba(24, 8, 1, 0.38) 44%,
    rgba(24, 8, 1, 0.08) 82%
  );
  pointer-events: none;
}
.login-hero__arrow {
  position: absolute;
  left: 34px;
  top: 50%;
  transform: translateY(-50%);
  width: 49px;
  height: 49px;
  border: none;
  background: transparent;
  color: #cbd5e1;
  z-index: 3;
  cursor: pointer;
}
.login-hero__arrow--right {
  left: auto;
  right: 34px;
}
.login-hero__arrow svg {
  width: 62%;
  height: 62%;
}
.login-hero__arrow:hover {
  color: #9ca3af;
}
.login-hero__dots {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 3;
}
.login-hero__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
}
.login-hero__dots .is-active {
  width: 12px;
  height: 12px;
  background-color: #ffb400;
}

/* ====== Register card (match register.html layout) ====== */
.register-card {
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  width: 420px;
  padding: 22px 24px 20px;
  background-color: rgba(255, 255, 255, 0.97);
  border-radius: 18px;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.25);
  z-index: 4;
  backdrop-filter: blur(4px);
}
.register-card__tab {
  font-size: 24px;
  font-weight: 600;
  color: #cb261c;
  text-align: left;
  margin-bottom: 14px;
}

.reg-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.reg-row--split {
  align-items: flex-end;
}
.reg-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.reg-field--select {
  max-width: 180px;
}
.reg-label {
  font-size: 12px;
  color: #6b7280;
}

.reg-select {
  position: relative;
}
.reg-select select {
  appearance: none;
  width: 100%;
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  padding: 0 28px 0 12px;
  font-size: 14px;
  color: #111827;
}
.reg-select__arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 12px;
  pointer-events: none;
}

.reg-input {
  width: 100%;
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  padding: 0 12px;
  font-size: 14px;
  color: #111827;
  outline: none;
}

.reg-input-wrap {
  position: relative;
}
.reg-eye {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  padding: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.reg-eye img {
  width: 18px;
  height: 18px;
}
.reg-input--with-eye {
  padding-left: 40px;
}

.reg-row--code {
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}
.reg-row--code .reg-input {
  flex: 1 1 auto;
  min-width: 0;
}
.reg-code {
  height: 44px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #1f2937;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}
.reg-code:hover {
  background: #f3f4f6;
}

.reg-agree {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.4;
  margin: 8px 0 6px;
}
.reg-agree a {
  color: #cb261c;
  text-decoration: none;
}
.reg-agree input[type='checkbox'] {
  width: 16px;
  height: 16px;
}
.reg-agree a:hover {
  text-decoration: underline;
}

.reg-submit {
  width: 100%;
  height: 46px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.6px;
  background: #cb261c;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-top: 4px;
}
.reg-submit:hover {
  background: #b02118;
}

.reg-login {
  margin-top: 10px;
  font-size: 13px;
  color: #6b7280;
  display: flex;
  justify-content: center;
}
.reg-login a {
  color: #6b7280;
  text-decoration: none;
}
.reg-login a span {
  color: #cb261c;
  margin-left: 2px;
}

/* Footer (copied) */
.login-footer {
  background-color: #ffffff;
  padding: 52px 0 64px;
  border-top: 1px solid #f1f1f1;
}
.login-footer__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 36px;
}
.login-footer__column h2 {
  font-size: 16px;
  font-weight: 600;
  color: #2a2a2a;
  margin-bottom: 18px;
}
.login-footer__column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.login-footer__column a {
  font-size: 14px;
  color: #585858;
  text-decoration: none;
  transition: color 0.2s ease;
}
.login-footer__column a:hover {
  color: #cb261c;
}
.login-footer__column--social {
  display: flex;
  flex-direction: column;
}
.login-social {
  display: flex;
  gap: 16px;
}
.login-social a {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.login-footer__column--qr {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-footer__qr {
  width: 140px;
  height: 140px;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background-color: #ffffff;
}
.login-footer__qr img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-footer__bottom {
  margin-top: 48px;
  border-top: 1px solid #ededed;
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #707070;
}
.login-footer__bottom a {
  color: inherit;
  text-decoration: none;
}
.login-footer__bottom a:hover {
  color: #cb261c;
}
.login-footer__station {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #2a2a2a;
}
.login-footer__station span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #cb261c;
  display: inline-block;
}

@media (max-width: 1280px) {
  .login-container {
    width: 100%;
    padding: 0 24px;
  }
  .login-hero {
    height: 560px;
  }
  .register-card {
    right: 162px;
  }
}

/* transitions for carousel */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
