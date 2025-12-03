<template>
  <div class="space-y-6">
    <!-- 更改密码卡片 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-slate-900">更改密码</h3>
        <span class="text-sm text-slate-600">定期更改密码可保护账户安全</span>
      </div>

      <form class="max-w-lg space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">新密码</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="至少8���字符，包含大小写字母、数字"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="text-xs text-slate-600 mt-3 space-y-1">
            <div :class="passwordStrength.length ? 'text-green-600' : ''">✓ 至少8个字符</div>
            <div :class="passwordStrength.uppercase ? 'text-green-600' : ''">✓ 包含大写字母 (A-Z)</div>
            <div :class="passwordStrength.lowercase ? 'text-green-600' : ''">✓ 包含小写字母 (a-z)</div>
            <div :class="passwordStrength.number ? 'text-green-600' : ''">✓ 包含数字 (0-9)</div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">确认密码</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          @click="handleChangePassword"
          type="button"
          class="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-red-50 transition text-sm font-medium"
        >
          更改密码
        </button>
      </form>
    </div>

    <!-- 邮箱验证卡片 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">更换邮箱</h3>
          <p class="text-sm text-slate-600 mt-1">
            <span v-if="emailVerified" class="text-green-600">✓ 已验证</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium text-slate-900">{{ email || '未设置' }}</p>
          <p class="text-xs text-slate-600 mt-1">当前邮箱</p>
        </div>
      </div>

      <form v-if="!emailVerifying" class="max-w-lg space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">新邮箱地址</label>
          <input
            v-model="emailForm.newEmail"
            type="email"
            placeholder="请输入新的邮箱地址"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <button
            @click="handleSendEmailCode"
            type="button"
            class="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            发送验证码
          </button>
          <span class="text-sm text-slate-600 ml-4">邮箱验证码会发送到您的邮箱</span>
        </div>
      </form>

      <form v-else class="max-w-lg space-y-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <h4 class="font-medium text-blue-900">验证码已发送</h4>
              <p class="text-sm text-blue-800 mt-1">验证码已发送到 {{ emailForm.newEmail }}，请在10分钟内输入</p>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">验证码</label>
          <input
            v-model="emailForm.emailCode"
            type="text"
            placeholder="请输入6位验证码"
            maxlength="6"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div class="flex gap-2">
          <button
            @click="handleVerifyEmail"
            type="button"
            class="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            更换邮箱
          </button>
          <button
            @click="emailVerifying = false"
            type="button"
            class="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium"
          >
            取消
          </button>
        </div>
      </form>
    </div>

    <!-- 手机号验证卡片 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">更换手机号</h3>
          <p class="text-sm text-slate-600 mt-1">
            <span v-if="phoneVerified" class="text-green-600">✓ 已验证</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium text-slate-900">{{ phone || '未设置' }}</p>
          <p class="text-xs text-slate-600 mt-1">当前手机号</p>
        </div>
      </div>

      <form v-if="!phoneVerifying" class="max-w-lg space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">国家/地区</label>
          <select
            v-model="phoneForm.country"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="CN">中国 (+86)</option>
            <option value="US">美国 (+1)</option>
            <option value="JP">日本 (+81)</option>
            <option value="GB">英国 (+44)</option>
            <option value="CA">加拿大 (+1)</option>
            <option value="AU">澳大利亚 (+61)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">手机号</label>
          <input
            v-model="phoneForm.newPhone"
            type="tel"
            placeholder="请输入手机号码"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <button
            @click="handleSendPhoneCode"
            type="button"
            class="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            发送验证码
          </button>
          <span class="text-sm text-slate-600 ml-4">验证码将通过短信发送</span>
        </div>
      </form>

      <form v-else class="max-w-lg space-y-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <h4 class="font-medium text-blue-900">验证码已发送</h4>
              <p class="text-sm text-blue-800 mt-1">验证码已发送到 {{ phoneForm.newPhone }}，请在10分钟内输入</p>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">验证码</label>
          <input
            v-model="phoneForm.phoneCode"
            type="text"
            placeholder="请输入6位验证码"
            maxlength="6"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div class="flex gap-2">
          <button
            @click="handleVerifyPhone"
            type="button"
            class="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            更换手机号
          </button>
          <button
            @click="phoneVerifying = false"
            type="button"
            class="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium"
          >
            取消
          </button>
        </div>
      </form>
    </div>

    <!-- 安全建议 -->
    <div class="rounded-lg p-6 bg-yellow-50 border border-yellow-200">
      <h4 class="font-semibold mb-3 text-yellow-900">��全建议</h4>
      <ul class="text-sm space-y-2 text-yellow-900">
        <li>• 定期更改密码，不要使用过于简单的密码</li>
        <li>• 不要在公共计算机上登录您的账户</li>
        <li>• 不要与他人共享您的登录凭据</li>
        <li>• 定期检查您的账户活动，发现异常立即更改密码</li>
        <li>• 启用两步验证以增强账户安全性</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 密码表单
const passwordForm = reactive({
  newPassword: '',
  confirmPassword: '',
})

// 邮箱表单
const emailForm = reactive({
  newEmail: '',
  emailCode: '',
})

// 手机号表单
const phoneForm = reactive({
  country: 'CN',
  newPhone: '',
  phoneCode: '',
})

// 状态
const emailVerified = ref(false)
const phoneVerified = ref(false)
const emailVerifying = ref(false)
const phoneVerifying = ref(false)

// 模拟数据
const email = ref('user@example.com')
const phone = ref('+86 13800138000')

// 计算密码强度
const passwordStrength = computed(() => {
  const pwd = passwordForm.newPassword
  return {
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
  }
})

// 更改密码
function handleChangePassword() {
  if (!passwordForm.newPassword) {
    ElMessage.warning('请输入新密码')
    return
  }
  if (passwordForm.newPassword.length < 8) {
    ElMessage.warning('新密码至少需要8个字符')
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  if (
    !passwordStrength.value.uppercase ||
    !passwordStrength.value.lowercase ||
    !passwordStrength.value.number
  ) {
    ElMessage.warning('密码必须包含大小写字母和数字')
    return
  }

  ElMessage.success('密码已更改')
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// 发送邮箱验证码
function handleSendEmailCode() {
  if (!emailForm.newEmail) {
    ElMessage.warning('请输入邮箱地址')
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.newEmail)) {
    ElMessage.warning('请输入有效的邮箱地址')
    return
  }

  emailVerifying.value = true
  ElMessage.success('验证码已发送到邮箱')
}

// 验证邮箱
function handleVerifyEmail() {
  if (!emailForm.emailCode) {
    ElMessage.warning('请输入验证码')
    return
  }
  if (emailForm.emailCode.length !== 6) {
    ElMessage.warning('验证码长度不正确')
    return
  }

  email.value = emailForm.newEmail
  emailVerified.value = true
  emailVerifying.value = false
  emailForm.newEmail = ''
  emailForm.emailCode = ''
  ElMessage.success('邮箱更换成功')
}

// 发送手机号验证码
function handleSendPhoneCode() {
  if (!phoneForm.newPhone) {
    ElMessage.warning('请输入手机号')
    return
  }
  if (!/^\d{10,}$/.test(phoneForm.newPhone.replace(/\D/g, ''))) {
    ElMessage.warning('请输入有效的手机号')
    return
  }

  phoneVerifying.value = true
  ElMessage.success('验证码已发送到手机')
}

// 验证手机号
function handleVerifyPhone() {
  if (!phoneForm.phoneCode) {
    ElMessage.warning('请输入验证码')
    return
  }
  if (phoneForm.phoneCode.length !== 6) {
    ElMessage.warning('验证码长度不正确')
    return
  }

  const countryCode = {
    CN: '+86',
    US: '+1',
    JP: '+81',
    GB: '+44',
    CA: '+1',
    AU: '+61',
  }[phoneForm.country] || ''

  phone.value = `${countryCode} ${phoneForm.newPhone}`
  phoneVerified.value = true
  phoneVerifying.value = false
  phoneForm.newPhone = ''
  phoneForm.phoneCode = ''
  ElMessage.success('手机号更换成功')
}
</script>

<style scoped></style>
