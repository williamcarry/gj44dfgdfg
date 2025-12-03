<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="mb-6">
      <h3 class="text-sm font-semibold text-slate-900">基本信息</h3>
    </div>

    <!-- 重要提醒 -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <p class="text-sm text-yellow-800">
        <span class="font-semibold">重要提醒：</span>敬请如实填写信息，以便我们安排最合适的业务经理为您提供定制化的服务。您的信息也将纳入本站
        <a href="#" class="text-primary hover:underline">《隐私协议》</a>，受到严格保护。
      </p>
    </div>

    <!-- 账户类型选择 -->
    <form class="space-y-6 max-w-2xl">
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" v-model="formData.accountType" value="personal" class="w-4 h-4 accent-primary" />
          <span class="text-sm text-slate-700">个人</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" v-model="formData.accountType" value="enterprise" class="w-4 h-4 accent-primary" />
          <span class="text-sm text-slate-700">企业</span>
        </label>
      </div>

      <!-- ==================== 个人信息部分 ==================== -->
      <div v-if="formData.accountType === 'personal'" class="border-t border-slate-200 pt-6">
        <h4 class="text-sm font-semibold text-slate-900 mb-6">个人信息</h4>

        <!-- 姓名 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 姓名
          </label>
          <div class="flex-1">
            <input
              v-model="formData.personalInfo.realName"
              type="text"
              placeholder="请输入姓名"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 性别 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 性别
          </label>
          <div class="flex-1 flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.personalInfo.gender" value="1" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">男</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.personalInfo.gender" value="2" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">女</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.personalInfo.gender" value="0" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">未知</span>
            </label>
          </div>
        </div>

        <!-- 生日 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 生日
          </label>
          <div class="flex-1">
            <DatePicker
              v-model="formData.personalInfo.birthday"
              placeholder="请选择生日"
              :disable-future="true"
            />
          </div>
        </div>

        <!-- 个人身份证号 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 身份证号
          </label>
          <div class="flex-1">
            <input
              v-model="formData.personalInfo.individualIdCard"
              type="text"
              placeholder="请输入身���证号"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 个人身份证正面照片 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 身份证正面
          </label>
          <div class="flex-1">
            <ImageUpload
              v-model="formData.personalInfo.individualIdFront"
              label="身份证正面照片"
            />
          </div>
        </div>

        <!-- 个人身份证反面照片 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 身份证反面
          </label>
          <div class="flex-1">
            <ImageUpload
              v-model="formData.personalInfo.individualIdBack"
              label="身份证反面照片"
            />
          </div>
        </div>

        <!-- 详细地址 - 选填 -->
        <div class="border-t border-slate-200 pt-6">
          <h5 class="text-sm font-semibold text-slate-900 mb-4">地址信息（可选）</h5>

          <div class="flex gap-4 mb-6">
            <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">详细地址</label>
            <div class="flex-1">
              <textarea
                v-model="formData.personalInfo.address"
                placeholder="请输入详细地址"
                rows="2"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 企业信息部分 ==================== -->
      <div v-if="formData.accountType === 'enterprise'" class="border-t border-slate-200 pt-6">
        <h4 class="text-sm font-semibold text-slate-900 mb-6">企业信息</h4>

        <!-- 公司名称 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 公司名称
          </label>
          <div class="flex-1">
            <input
              v-model="formData.enterpriseInfo.companyName"
              type="text"
              placeholder="请输入公司名���"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 公司类型 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 公司类型
          </label>
          <div class="flex-1 flex flex-wrap gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.enterpriseInfo.companyType" value="factory" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">工厂</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.enterpriseInfo.companyType" value="trader" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">贸易商</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.enterpriseInfo.companyType" value="factory_trader" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">工贸一体</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="formData.enterpriseInfo.companyType" value="brand" class="w-4 h-4 accent-primary" />
              <span class="text-sm text-slate-700">品牌商</span>
            </label>
          </div>
        </div>

        <!-- 营业执照注册号 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 营业执照号
          </label>
          <div class="flex-1">
            <input
              v-model="formData.enterpriseInfo.businessLicenseNumber"
              type="text"
              placeholder="请输入营业执照注册号"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 营业执照照片 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 营业执照
          </label>
          <div class="flex-1">
            <ImageUpload
              v-model="formData.enterpriseInfo.businessLicenseImage"
              label="营业执照照片"
            />
          </div>
        </div>

        <!-- 法人姓名 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 法人姓名
          </label>
          <div class="flex-1">
            <input
              v-model="formData.enterpriseInfo.legalPersonName"
              type="text"
              placeholder="请输入法人姓名"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 法人身份证号 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 法人身份证号
          </label>
          <div class="flex-1">
            <input
              v-model="formData.enterpriseInfo.legalPersonIdCard"
              type="text"
              placeholder="请输入法人身份证号"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 法人身份证正面照片 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 法人证正面
          </label>
          <div class="flex-1">
            <ImageUpload
              v-model="formData.enterpriseInfo.legalPersonIdFront"
              label="法人身份证正面照片"
            />
          </div>
        </div>

        <!-- 法人身份证反面照片 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 法人证反面
          </label>
          <div class="flex-1">
            <ImageUpload
              v-model="formData.enterpriseInfo.legalPersonIdBack"
              label="法人身份证反面照片"
            />
          </div>
        </div>

        <!-- 注册资本 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 注册资本
          </label>
          <div class="flex-1 flex gap-2">
            <input
              v-model="formData.enterpriseInfo.registeredCapital"
              type="number"
              placeholder="请输入注册资本"
              class="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span class="text-sm text-slate-700 pt-2">万元</span>
          </div>
        </div>

        <!-- 公司成立日期 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 成立日期
          </label>
          <div class="flex-1">
            <DatePicker
              v-model="formData.enterpriseInfo.establishmentDate"
              placeholder="请选择公司成立日期"
              :disable-future="true"
            />
          </div>
        </div>

        <!-- 经营范围 -->
        <div class="flex gap-4 mb-6">
          <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
            <span class="text-red-500">*</span> 经营范围
          </label>
          <div class="flex-1">
            <textarea
              v-model="formData.enterpriseInfo.businessScope"
              placeholder="请输入经营范围"
              rows="3"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>
        </div>

        <!-- 地址 - 必填 -->
        <div class="border-t border-slate-200 pt-6">
          <h5 class="text-sm font-semibold text-slate-900 mb-4">公司地址（必填）</h5>

          <!-- 详细地址 -->
          <div class="flex gap-4 mb-6">
            <label class="w-24 text-sm font-semibold text-slate-900 text-right pt-2">
              <span class="text-red-500">*</span> 详细地址
            </label>
            <div class="flex-1">
              <textarea
                v-model="formData.enterpriseInfo.address"
                placeholder="请输入详细地址"
                rows="2"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="pt-6 ml-28">
        <button
          @click="handleSubmit"
          type="button"
          class="px-8 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          提交审核
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ImageUpload from '@/components/ImageUpload.vue'
import DatePicker from '@/components/DatePicker.vue'

const formData = reactive({
  accountType: 'enterprise',
  personalInfo: {
    realName: '',
    gender: '1',
    birthday: '',
    individualIdCard: '',
    individualIdFront: '',
    individualIdBack: '',
    address: '',
  },
  enterpriseInfo: {
    companyName: '',
    companyType: '',
    businessLicenseNumber: '',
    businessLicenseImage: '',
    legalPersonName: '',
    legalPersonIdCard: '',
    legalPersonIdFront: '',
    legalPersonIdBack: '',
    registeredCapital: '',
    establishmentDate: '',
    businessScope: '',
    address: '',
  },
})

const handleSubmit = () => {
  ElMessage.success('提交审核成功')
  console.log('提交审核数据:', formData)
}
</script>

<style scoped></style>
