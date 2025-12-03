<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提���
-->
<template>
  <div class="login-page">
    <header class="login-header">
      <div class="login-container login-header__inner">
        <a href="/" class="login-logo" aria-label="SaleYee 首页">
          <img src="https://www.saleyee.com/Content/Images/logo.png" alt="SaleYee" />
        </a>
        <div class="login-header__actions">
          <a class="login-header__link" href="/getting-started">{{ t('header.gettingStarted') }}</a>

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
            <div
              v-show="langOpen"
              class="login-language__menu"
              role="menu"
            >
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
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.3" /><path d="M13.8 8.5 10.3 12l3.5 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" /></svg>
            </button>
            <button class="login-hero__arrow login-hero__arrow--right" type="button" aria-label="下一张" @click="next">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.3" /><path d="M10.2 8.5 13.7 12l-3.5 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" /></svg>
            </button>

            <div class="login-card">
              <h1>{{ t('login.title') }}</h1>
              <form @submit.prevent="submit">
                <label class="login-input">
                  <img src="https://www.saleyee.com/ContentNew/Images/user.png" alt="账户" />
                  <input v-model="account" type="text" :placeholder="t('login.accountPlaceholder')" required />
                </label>

                <label class="login-input">
                  <img src="https://www.saleyee.com/ContentNew/Images/password.png" alt="密码" />
                  <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="t('login.passwordPlaceholder')" required />
                  <button type="button" class="password-toggle" @click="togglePassword">
                    <img
                      :src="showPassword ? visibleIcon : hiddenIcon"
                      :alt="showPassword ? '隐藏密码' : '显示密码'"
                    />
                  </button>
                </label>

                <div class="login-input login-input--captcha">
                  <img :src="captchaIcon" alt="验证码" />
                  <input
                    v-model="captchaInput"
                    type="text"
                    :placeholder="t('login.captchaPlaceholder')"
                    :aria-label="t('login.captchaPlaceholder')"
                    autocomplete="off"
                    inputmode="text"
                    maxlength="6"
                    required
                  />
                  <div class="login-captcha__visual">
                    <img
                      v-if="captchaImage"
                      class="captcha-image"
                      :src="captchaImage"
                      :alt="t('login.captchaAlt')"
                      @click="refreshCaptcha"
                    />
                  </div>
                </div>

                <button type="submit" class="login-submit">{{ t('login.submit') }}</button>

                <div class="login-links">
                  <a href="/user/forget-password">{{ t('login.forgot') }}</a>
                  <a href="/register">{{ t('login.register') }}</a>
                </div>
              </form>
            </div>

            <div class="login-hero__dots" aria-hidden="true">
              <span v-for="(s, i) in slides" :key="'dot-' + i" :class="i === index ? 'is-active' : ''" @click="go(i)"></span>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="login-footer">
      <div class="login-container">
        <div class="login-footer__grid">
          <div class="login-footer__column">
            <h2>{{ t('footer.about') }}</h2>
            <ul>
              <li><a href="/about-saleyee">赛盈简介</a></li>
              <li><a href="/membership" target="_blank" rel="noreferrer">会员权益</a></li>
              <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
              <li><a href="/contact-us">联���我们</a></li>
            </ul>
          </div>
          <div class="login-footer__column">
            <h2>{{ t('footer.customer') }}</h2>
            <ul>
              <li><a href="https://www.saleyee.com/help-center.html" target="_blank" rel="noreferrer">帮助中心</a></li>
              <li><a href="/faq/hc271661">售后条款</a></li>
              <li><a href="/faq/hp062361">支付方式</a></li>
              <li><a href="/faq/hp981158">物流方式</a></li>
              <li><a href="/help/14" target="_blank" rel="noreferrer">VAT政策解读</a></li>
              <li><a href="https://www.saleyee.com/feedback.html" target="_blank" rel="noreferrer">体验反馈</a></li>
            </ul>
          </div>
          <div class="login-footer__column">
            <h2>{{ t('footer.partners') }}</h2>
            <ul>
              <li><a href="/distributors">跨境卖家入驻</a></li>
              <li><a href="/supplier">供应商入驻</a></li>
              <li><a href="/partners">合作伙伴</a></li>
              <li><a href="/help/51" target="_blank" rel="noreferrer">商务合作</a></li>
            </ul>
          </div>
          <div class="login-footer__column login-footer__column--social">
            <h2>{{ t('footer.weixin') }}</h2>
            <div class="login-social">
              <a href="https://v.qq.com/s/videoplus/2791751583" target="_blank" rel="noreferrer" aria-label="腾讯视频">
                <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1f1f1f" /><path d="M17.5 12.5 26 19l-8.5 6.5z" fill="#fff" /></svg>
              </a>
              <a href="https://www.iqiyi.com/u/1639384380" target="_blank" rel="noreferrer" aria-label="爱奇艺">
                <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1f1f1f" /><path d="M12.5 19.2c0-4 2.6-6.7 7.6-6.7h2.6c3.4 0 5.3 1.4 5.3 5.2v4.6c0 3.9-1.9 5.2-5.3 5.2h-2.6c-5 0-7.6-2.7-7.6-6.8zm5.4 0c0 2.2 1 3.4 3.1 3.4h1.3c1.9 0 2.7-.6 2.7-2.7v-1.4c0-2.2-.8-2.8-2.7-2.8h-1.3c-2.1 0-3.1 1.1-3.1 3.5z" fill="#fff" /></svg>
              </a>
              <a href="https://space.bilibili.com/517583603" target="_blank" rel="noreferrer" aria-label="哔哩哔哩">
                <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1f1f1f" /><path d="M13.5 13h13c2.4 0 3.5 1.1 3.5 3.5v7c0 2.4-1.1 3.5-3.5 3.5h-13c-2.4 0-3.5-1.1-3.5-3.5v-7c0-2.4 1.1-3.5 3.5-3.5zm1.7 4.2c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.6 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6z" fill="#fff" /></svg>
              </a>
            </div>
          </div>
          <div class="login-footer__column login-footer__column--qr">
            <h2>赛盈官方微信</h2>
            <div class="login-footer__qr">
              <img src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png" alt="赛盈官方微信" />
            </div>
          </div>
        </div>

        <div class="login-footer__bottom">
          <div class="login-footer__station" role="button" tabindex="0" aria-label="赛盈国际站点">
            <span></span>
            <p>International</p>
          </div>
          <p>
            © 2025 <a href="/" rel="noreferrer">Saleyee.com</a> Tengming Limited | <a href="/sitemap" target="_blank" rel="noreferrer">网站地图</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { currentLang, setLang, t } from '@/i18n'
import { Globe, ChevronDown } from 'lucide-vue-next'

const account = ref('')
const password = ref('')
const showPassword = ref(false)
const captchaInput = ref('')
const captchaCode = ref('')
const captchaImage = ref('')
const captchaChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const captchaIcon =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23cb261c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12l2.4 2.3 4.6-4.1"/></svg>'

const slides = [
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/9fbef686-c4a5-4825-a43f-fadcee9ffe54.png',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202510/06189dc6-4039-4415-9581-e5d1bee4983b.jpg',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/49bbf525-ac11-4d7e-b8ba-f502c58b4407.jpg',
]
const index = ref(0)
let timer

const fallbackHero = 'https://resource.saleyee.com/UploadFiles/Images/2022/202204/49ae70d5-7089-46ae-bca9-67901afde1f7.jpg'
const visibleIcon = 'https://www.saleyee.com/ContentNew/Images/visible.png'
const hiddenIcon = 'https://www.saleyee.com/ContentNew/Images/invisible.png'

const langOpen = ref(false)
const langRef = ref(null)
const langLabel = computed(() => (currentLang.value === 'zh-CN' ? t('lang.zh') : t('lang.en')))

function togglePassword() {
  showPassword.value = !showPassword.value
}

function refreshCaptcha() {
  generateCaptcha()
}

function generateCaptcha(length = 5) {
  let value = ''
  for (let i = 0; i < length; i += 1) {
    value += captchaChars.charAt(Math.floor(Math.random() * captchaChars.length))
  }
  captchaCode.value = value
  captchaImage.value = buildCaptchaImage(value)
}

function buildCaptchaImage(text) {
  const palette = ['#cb261c', '#ef6a02', '#2d6df6', '#11a683']
  const letters = text
    .split('')
    .map((char, idx) => {
      const x = 18 + idx * 18
      const y = 24 + (idx % 2 === 0 ? -4 : 6)
      const angle = ((Math.random() - 0.5) * 28).toFixed(1)
      const color = palette[idx % palette.length]
      return `<text x="${x}" y="${y}" fill="${color}" font-size="22" font-family="Verdana" transform="rotate(${angle} ${x} ${y - 16})">${char}</text>`
    })
    .join('')
  const lines = Array.from({ length: 3 })
    .map(() => {
      const x1 = (Math.random() * 120).toFixed(1)
      const y1 = (Math.random() * 40).toFixed(1)
      const x2 = (Math.random() * 120).toFixed(1)
      const y2 = (Math.random() * 40).toFixed(1)
      const color = palette[Math.floor(Math.random() * palette.length)]
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.2" opacity="0.55" />`
    })
    .join('')
  const dots = Array.from({ length: 16 })
    .map(() => {
      const cx = (Math.random() * 120).toFixed(1)
      const cy = (Math.random() * 40).toFixed(1)
      const color = palette[Math.floor(Math.random() * palette.length)]
      return `<circle cx="${cx}" cy="${cy}" r="1.2" fill="${color}" opacity="0.35" />`
    })
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" ry="6" fill="#fdf8f6"/>${lines}${dots}${letters}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function onHeroError(event) {
  const target = event.target
  if (target && target.src !== fallbackHero) {
    target.src = fallbackHero
  }
}

function startAuto() {
  stopAuto()
  if (slides.length > 1) {
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % slides.length
    }, 4500)
  }
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

function submit() {
  const normalized = captchaInput.value.replace(/\s+/g, '').toUpperCase()
  if (!normalized) {
    alert(t('login.captchaRequired'))
    return
  }
  if (!captchaCode.value || normalized !== captchaCode.value) {
    alert(t('login.captchaMismatch'))
    captchaInput.value = ''
    generateCaptcha()
    return
  }
  alert('Mock login submit')
}

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
  if (el && !el.contains(e.target)) {
    closeLang()
  }
}

onMounted(() => {
  generateCaptcha()
  startAuto()
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  stopAuto()
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
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

/* Language switcher (match homepage behavior) */
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
.login-language__btn img {
  width: 22px;
  height: 22px;
  display: block;
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
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
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
  background: linear-gradient(90deg, rgba(24, 8, 1, 0.68) 0%, rgba(24, 8, 1, 0.38) 44%, rgba(24, 8, 1, 0.08) 82%);
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

.login-card {
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  width: 380px;
  padding: 42px 44px 36px;
  background-color: rgba(255, 255, 255, 0.97);
  border-radius: 28px;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.25);
  z-index: 4;
  backdrop-filter: blur(4px);
}

.login-card h1 {
  text-align: center;
  font-size: 26px;
  line-height: 1.3;
  font-weight: 600;
  color: #cb261c;
  margin-bottom: 32px;
}

.login-input {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  margin-bottom: 18px;
}

.login-input img {
  width: 20px;
  height: 20px;
}

.login-input input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #333333;
}

.password-toggle {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.password-toggle img {
  width: 20px;
  height: 20px;
}

.login-input--captcha {
  align-items: center;
  padding-right: 4px;
}

.login-input--captcha input {
  min-width: 0;
}

.login-captcha__visual {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.login-input .captcha-image {
  width: 108px;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(203, 38, 28, 0.18);
  cursor: pointer;
  background-color: #fdf8f6;
}

.login-submit {
  width: 100%;
  margin-top: 12px;
  height: 50px;
  border: none;
  border-radius: 4px;
  background-color: #cb261c;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-submit:hover {
  background-color: #b02118;
}

.login-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777777;
}

.login-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-links a:hover {
  color: #cb261c;
}

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

  .login-card {
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
