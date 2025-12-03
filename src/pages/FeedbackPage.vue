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
  <div class="feedback-wrapper">
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <a class="top-bar-notice" href="https://resource.saleyee.cn/Files/%E5%85%AC%E5%91%8A%E5%85%AC%E5%BC%80%E4%BF%A1/%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%AATTENGMING%20LIMITED%20%E5%8F%8D%E4%BD%9C%E9%94%80%E9%93%BE%E4%BF%A1%E6%81%AF.pdf" target="_blank" rel="noreferrer">
            <span>【公告】TENGMING LIMITED 公司名称冒用声明</span>
          </a>
        </div>
        <div class="top-bar-right">
          <a class="top-bar-link" href="/login">登录</a>
          <a class="top-bar-link" href="/register">注册</a>
          <a class="top-bar-link" href="/getting-started">入门指引</a>
          <a class="top-bar-link" href="/membership">会员权益</a>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="container-full header-inner">
        <div class="header-brand">
          <a class="header-logo" href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈分销" />
          </a>
          <div class="header-title">
            <h1>赛盈分销</h1>
            <p>帮助中心</p>
          </div>
        </div>
        <nav class="header-nav">
          <a class="nav-link" href="/">首页</a>
          <a class="nav-link" href="/help-center">帮助中心</a>
          <a class="nav-link" href="/contact-us">联系我们</a>
        </nav>
      </div>
    </header>

    <div class="feedback-bg">
      <div class="feedback-pages-main">
        <div class="breadcrumb-wrapper">
          <div class="container-wrapper">
            <div class="breadcrumb">
              <a href="/">首页</a>
              <span>&gt;</span>
              <span>体验反馈</span>
            </div>
          </div>
        </div>

        <div class="container-wrapper">
          <div class="page-header">
            <h1 class="page-title">赛盈分销-用户体验调���</h1>
            <h2 class="page-subtitle">尊敬的用户：<br />您好！为了给您提供更好的产品和服务，我们希望收集您使用赛盈分销平台时的看法或建议。</h2>
          </div>

          <form class="feedback-form" @submit.prevent="handleSubmit">
            <div class="feedback-question">
              <p class="question-title">
                <span class="required">*</span> 1. 请对赛盈分销平台的网站体验打个分吧！
              </p>
              <div class="rating-group">
                <div class="star-rating">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    class="star-btn"
                    :class="{ active: star <= formData.score }"
                    @click="formData.score = star"
                    @mouseover="hoverScore = star"
                    @mouseleave="hoverScore = 0"
                    :title="`${star}星`"
                  >
                    ★
                  </button>
                </div>
                <span class="rating-text">{{ ratingText }}</span>
              </div>
              <span v-if="errors.score" class="error-message">{{ errors.score }}</span>
            </div>

            <div class="feedback-question">
              <p class="question-title">
                <span class="required">*</span> 2. 如果您在使用赛盈分销平台时，有什么好或不好的地方，请在此留言！我们会关注您的反馈，不断优化产品，为您提供更好的服务！
              </p>
              <div class="textarea-box">
                <textarea
                  v-model="formData.feedback"
                  maxlength="500"
                  rows="4"
                  placeholder="请输入您的反馈意见..."
                  class="feedback-textarea"
                ></textarea>
                <p class="char-count">
                  <span class="current-length">{{ formData.feedback.length }}</span>
                  <span class="separator"> / </span>
                  <span class="max-length">500</span>
                </p>
              </div>
              <span v-if="errors.feedback" class="error-message">{{ errors.feedback }}</span>
            </div>

            <div class="feedback-question">
              <p class="question-title">
                3. 为了方便我们与您联系，可填写您的手机号。（选填，信息仅作为内部资料绝不外泄）
              </p>
              <input
                v-model="formData.contactInfo"
                type="text"
                maxlength="20"
                class="contact-input"
              />
              <span v-if="errors.contactInfo" class="error-message">{{ errors.contactInfo }}</span>
            </div>

            <div class="button-group">
              <button type="submit" class="btn btn-submit" :disabled="submitting">
                {{ submitting ? '提交中...' : '提交' }}
              </button>
              <a href="https://www.saleyee.com/annual-report.html" target="_blank" rel="noreferrer" class="btn btn-secondary">
                2024年度简报
              </a>
            </div>

            <div v-if="submitMessage" :class="['submit-message', submitMessage.type]">
              {{ submitMessage.text }}
            </div>
          </form>
        </div>
      </div>

      <div class="feedback-record">
        <div class="record-header">
          <h5 class="record-title">��史反馈</h5>
        </div>
        <div class="container-wrapper">
          <ul class="record-list">
            <li v-for="record in feedbackRecords" :key="record.id" class="record-item">
              <div class="record-header-info">
                <div class="record-user">
                  <span class="user-name">{{ record.userName }}</span>
                  <span class="user-rating">
                    <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= record.score }">★</span>
                  </span>
                </div>
                <span class="record-date">{{ formatDate(record.date) }}</span>
              </div>
              <div class="record-content">
                {{ record.feedback }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container-full footer-inner">
        <div class="col">
          <h3>关于赛盈</h3>
          <ul>
            <li><a href="/about-saleyee">赛盈简介</a></li>
            <li><a href="/membership">会员权益</a></li>
            <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
            <li><a href="/contact-us">联系我们</a></li>
          </ul>
        </div>
        <div class="col">
          <h3>客户服务</h3>
          <ul>
            <li><a href="/help-center">帮助中心</a></li>
            <li><a href="/faq/hc271661">售后条款</a></li>
            <li><a href="/faq/hp062361">支付方式</a></li>
            <li><a href="/vat-policy">VAT政策���读</a></li>
            <li><a href="/feedback">体验反馈</a></li>
          </ul>
        </div>
        <div class="col footer-wechat">
          <h3>赛盈官方微信</h3>
          <img src="https://resource.saleyee.cn/UploadFiles/Images/2024/202412/3d1ddf0c-7c7c-4f2e-a9bd-30813e3e5a99.png" alt="赛盈官方微信" />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container-full">© 2025 Saleyee.com Tengming Limited | 网站地图</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  score: 0,
  feedback: '',
  contactInfo: '',
})

const errors = ref({
  score: '',
  feedback: '',
  contactInfo: '',
})

const hoverScore = ref(0)
const submitting = ref(false)
const submitMessage = ref(null)

// 历史反馈示例数据
const feedbackRecords = ref([
  {
    id: 1,
    userName: '用户A',
    score: 5,
    feedback: '平台使用体验很好，页面加载速度快，功能完整。特别是商品搜索和分类功能做得很棒！',
    date: new Date('2025-01-12'),
  },
  {
    id: 2,
    userName: '张三',
    score: 4,
    feedback: '整体不错，功能齐全。不过希望能增加更多支付方式选项，这样对国际用户会更友好。',
    date: new Date('2025-01-11'),
  },
  {
    id: 3,
    userName: '李女士',
    score: 5,
    feedback: '赛盈分销平台真的很专业！客服响应速度快，商品质量有保障��已经成为我们公司的主要供应商了。',
    date: new Date('2025-01-10'),
  },
  {
    id: 4,
    userName: '王先生',
    score: 3,
    feedback: '基本功能都有，但有时候页面会卡顿。建议优化一下系统性能。',
    date: new Date('2025-01-09'),
  },
  {
    id: 5,
    userName: '小李',
    score: 4,
    feedback: '很不错的平台。希望后续能支持更多的国家和地区配送。',
    date: new Date('2025-01-08'),
  },
])

const ratingText = computed(() => {
  const score = hoverScore.value || formData.value.score
  const texts = ['', '很不满意', '不太满意', '一般', '满意', '非常满意']
  return texts[score] || '未选择'
})

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const validateForm = () => {
  errors.value = {
    score: '',
    feedback: '',
    contactInfo: '',
  }

  let isValid = true

  if (formData.value.score === 0) {
    errors.value.score = '请选择评分'
    isValid = false
  }

  if (!formData.value.feedback.trim()) {
    errors.value.feedback = '请输入反馈意见'
    isValid = false
  }

  if (formData.value.contactInfo) {
    const phoneRegex = /^[0-9\-\+\s]+$/
    if (!phoneRegex.test(formData.value.contactInfo)) {
      errors.value.contactInfo = '请输入正确的手机号'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    submitMessage.value = {
      type: 'error',
      text: '请检查表单信息',
    }
    return
  }

  submitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    submitMessage.value = {
      type: 'success',
      text: '感谢您的反馈！我们会认真对待您的意见，持续改进我们的服务。',
    }

    setTimeout(() => {
      formData.value = {
        score: 0,
        feedback: '',
        contactInfo: '',
      }
      submitMessage.value = null
    }, 3000)
  } catch (error) {
    submitMessage.value = {
      type: 'error',
      text: '提交失败，请��后重试',
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.feedback-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.container-full {
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

.container-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 顶部通知栏 */
.top-bar {
  background: #f5f7fa;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  color: #666;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 16px;
}

.top-bar-notice {
  color: #cb261c;
  text-decoration: none;
  font-weight: 500;
}

.top-bar-link {
  color: #666;
  text-decoration: none;
  margin-left: 18px;
  transition: color 0.3s;
}

.top-bar-link:hover {
  color: #cb261c;
}

/* 头部导航 */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo img {
  height: 56px;
}

.header-title h1 {
  margin: 0;
  font-size: 20px;
  color: #1f2937;
  font-weight: bold;
}

.header-title p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.header-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #cb261c;
}

/* 反馈页面背景 */
.feedback-bg {
  background: linear-gradient(180deg, #fbeae5, #f2f3f7);
  padding-top: 30px;
  flex: 1;
}

/* 面包屑导航 */
.breadcrumb-wrapper {
  margin-bottom: 20px;
}

.breadcrumb {
  color: #6b7280;
  font-size: 14px;
  padding: 0;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb span {
  margin: 0 8px;
  color: #6b7280;
}

/* 页面标题和副标题 */
.page-header {
  margin-bottom: 35px;
  text-align: center;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 25px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin: 0;
}

/* 反馈表单主区域 */
.feedback-pages-main {
  background: #fff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 50px;
}

/* 表单样式 */
.feedback-form {
  width: 100%;
}

.feedback-question {
  margin-bottom: 25px;
}

.question-title {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: block;
}

.required {
  color: #ff0000;
  margin-right: 4px;
  font-weight: bold;
}

/* 星评分样式 */
.rating-group {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 0;
}

.star-rating {
  display: flex;
  gap: 0;
  align-items: center;
}

.star-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #d1d5db;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-right: 5px;
  transition: color 0.2s, transform 0.2s;
  line-height: 1;
  display: inline-block;
  width: auto;
}

.star-btn:last-child {
  margin-right: 0;
}

.star-btn:hover,
.star-btn.active {
  color: #cb261c;
}

.star-btn:hover {
  transform: scale(1.15);
}

.rating-text {
  font-size: 14px;
  color: #666;
  min-width: 70px;
  display: inline-block;
}

/* 文本框样式 */
.textarea-box {
  position: relative;
  margin-bottom: 10px;
}

.feedback-textarea {
  width: 100%;
  height: 136px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.3s;
}

.feedback-textarea:focus {
  outline: none;
  border-color: #cb261c;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.current-length {
  color: #cb261c;
  font-weight: bold;
}

/* 联系方式输入框 */
.contact-input {
  width: 350px;
  height: 34px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.contact-input:focus {
  outline: none;
  border-color: #cb261c;
  box-shadow: 0 0 3px rgba(203, 38, 28, 0.2);
}

/* 按钮组 */
.button-group {
  margin: 35px 0 20px 0;
  text-align: center;
}

.btn {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
  text-align: center;
  font-weight: normal;
}

.btn + .btn {
  margin-left: 10px;
}

.btn-submit {
  background-color: #cb261c;
  color: #fff;
  min-width: 100px;
}

.btn-submit:hover:not(:disabled) {
  background-color: #a01f16;
  box-shadow: 0 2px 8px rgba(203, 38, 28, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #fff;
  color: #555;
  border: 1px solid #c9c9c9;
  min-width: 100px;
}

.btn-secondary:hover {
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 提示消息 */
.submit-message {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit-message.success {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.submit-message.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.error-message {
  display: block;
  color: #ff0000;
  font-size: 12px;
  margin-top: 6px;
}

/* 历史反馈区域 */
.feedback-record {
  background: #fff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 20px;
}

.record-header {
  background: #fff;
  padding: 0 40px;
  border-bottom: 1px solid #e5e7eb;
}

.record-title {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin: 0;
  padding: 20px 0 20px 15px;
  border-left: 3px solid #cb261c;
}

.record-list {
  list-style: none;
  padding: 20px 40px;
  margin: 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.record-list:empty::after {
  content: '暂无历史反馈记录';
}

/* 页脚 */
.footer {
  background: #fafafa;
  border-top: 1px solid #e5e7eb;
  margin-top: 0;
}

.footer-inner {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 200px;
}

.col h3 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.col li {
  margin-bottom: 8px;
}

.col a {
  color: #374151;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
}

.col a:hover {
  color: #cb261c;
}

.footer-wechat img {
  width: 120px;
  height: 120px;
  border-radius: 4px;
}

.footer-bottom {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 16px 0;
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
}
</style>
