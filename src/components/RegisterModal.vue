<template>
  <div v-if="visible" class="supplier-modal-overlay" @click.self="closeModal" role="dialog">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <button type="button" aria-label="Close" class="modal-close" @click="closeModal">
        <span class="close-icon">×</span>
      </button>
      
      <div class="modal-content">
        <!-- Compact Three-Step Header -->
        <ul class="modal-steps">
          <li class="modal-step">
            <FileText class="modal-step-icon" />
            <h3 class="modal-step-title">提交表单信息</h3>
            <p class="modal-step-desc">项目需要一个工作日</p>
          </li>
          <li class="modal-step">
            <Phone class="modal-step-icon" />
            <h3 class="modal-step-title">专业业务经理电话联系</h3>
            <p class="modal-step-desc">诉求沟通、开通账号</p>
          </li>
          <li class="modal-step">
            <Smile class="modal-step-icon" />
            <h3 class="modal-step-title">成为合作伙伴</h3>
          </li>
        </ul>

        <h2 class="modal-title">马上加入我们</h2>

        <form class="modal-form" @submit.prevent="submitRegister">
          <div class="form-group">
            <label class="form-label">公司类型</label>
            <div class="form-radios">
              <label class="radio-label">
                <input type="radio" value="工厂" v-model="form.companyType" class="radio-input" />
                <span>工厂</span>
              </label>
              <label class="radio-label">
                <input type="radio" value="贸易" v-model="form.companyType" class="radio-input" />
                <span>贸易</span>
              </label>
              <label class="radio-label">
                <input type="radio" value="工贸一体" v-model="form.companyType" class="radio-input" />
                <span>工贸一体</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">是否自营跨境电商</label>
            <div class="form-radios">
              <label class="radio-label">
                <input type="radio" value="是" v-model="form.selfRun" class="radio-input" />
                <span>是</span>
              </label>
              <label class="radio-label">
                <input type="radio" value="否" v-model="form.selfRun" class="radio-input" />
                <span>否</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="mainCategory" class="form-label">主营品类</label>
            <input id="mainCategory" v-model="form.mainCategory" placeholder="请选择类目" type="text" class="form-input" />
          </div>

          <div class="form-group">
            <label for="companyName" class="form-label">公司名称</label>
            <input id="companyName" v-model="form.companyName" placeholder="请输入公司名称" type="text" maxlength="128" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label">公司地址</label>
            <div class="form-address">
              <select v-model="form.country" class="form-select">
                <option v-for="country in countries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
              <input v-model="form.province" placeholder="州省" type="text" maxlength="50" class="form-input" />
              <input v-model="form.city" placeholder="城市" type="text" maxlength="50" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label for="contact" class="form-label">联系人</label>
            <input id="contact" v-model="form.contact" placeholder="请输入联系人" type="text" maxlength="128" class="form-input" />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">联系邮箱</label>
            <input id="email" v-model="form.email" placeholder="请输入联系邮箱" type="text" maxlength="256" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label">电话</label>
            <div class="form-phone">
              <input v-model="form.phone" placeholder="请输入联系电话" type="text" maxlength="64" class="form-input form-phone-input" />
              <input v-model="form.smsCode" placeholder="短信验证码" type="text" maxlength="6" class="form-input form-sms-input" />
              <button type="button" class="btn-sms" @click="getSmsCode" :disabled="smsCountdown > 0">
                {{ smsCountdown > 0 ? smsCountdown + 's' : '获取验证码' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="inviteCode" class="form-label">邀请码</label>
            <input id="inviteCode" v-model="form.inviteCode" placeholder="请输入邀请码" type="text" class="form-input" />
          </div>

          <div class="form-group">
            <label for="remark" class="form-label">留言</label>
            <textarea id="remark" v-model="form.remark" placeholder="请输入留言" class="form-textarea" rows="4"></textarea>
          </div>

          <div class="form-submit">
            <button type="submit" class="btn-submit">提 交</button>
            <p class="form-note">已有账号，<a href="/login" class="form-link">立即登录</a></p>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-backdrop-bottom"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { FileText, Phone, Smile } from 'lucide-vue-next'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const smsCountdown = ref(0)
let smsTimer = null

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
  companyType: '工厂',
  selfRun: '否',
  mainCategory: '',
  companyName: '',
  country: '中国',
  province: '',
  city: '',
  contact: '',
  email: '',
  phone: '',
  smsCode: '',
  inviteCode: '',
  remark: '',
})

const closeModal = () => {
  emit('close')
}

const getSmsCode = () => {
  if (!form.value.phone) {
    alert('请输入手机号')
    return
  }
  if (smsCountdown.value > 0) return
  smsCountdown.value = 60
  smsTimer = window.setInterval(() => {
    smsCountdown.value -= 1
    if (smsCountdown.value <= 0 && smsTimer) {
      clearInterval(smsTimer)
      smsTimer = null
    }
  }, 1000)
  console.log('send sms to', form.value.phone)
}

const submitRegister = () => {
  const required = [
    { k: 'mainCategory', name: '主营品类' },
    { k: 'companyName', name: '公司名称' },
    { k: 'contact', name: '联系人' },
    { k: 'phone', name: '联系电话' },
    { k: 'smsCode', name: '短信验证码' },
  ]
  for (const r of required) {
    if (!form.value[r.k]) {
      alert(r.name + ' 为必填项')
      return
    }
  }

  console.log('submit supplier register', form.value)
  alert('提交成功，感谢您的申请，我们会尽快联系您')
  emit('submit', form.value)
  closeModal()
}
</script>

<style scoped>
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.modal-close:hover {
  background-color: #f0f0f0;
}

.close-icon {
  font-size: 24px;
  color: #666;
  font-weight: bold;
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

/* Responsive Design */
@media (max-width: 1024px) {
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