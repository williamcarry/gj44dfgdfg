<template>
  <div class="public-resource-manager">
    <h3>公共资源管理</h3>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="resource-section">
          <template #header>
            <div class="card-header">
              <span>页头资源</span>
              <el-button type="primary" size="small" @click="loadHeaderResources">刷新</el-button>
            </div>
          </template>
          
          <div v-if="headerResources.length === 0" class="no-data">
            暂无页头资源
          </div>
          
          <div v-else class="resource-list">
            <div 
              v-for="resource in headerResources" 
              :key="resource.id" 
              class="resource-item"
            >
              <div class="resource-title">{{ resource.title }}</div>
              <div class="resource-type">
                <el-tag :type="getResourceTypeTag(resource.type)">
                  {{ getResourceTypeText(resource.type) }}
                </el-tag>
              </div>
              <div v-if="resource.image" class="resource-image">
                <img 
                  :src="getImageUrl(resource.image)" 
                  :alt="resource.title" 
                  @error="handleImageError"
                />
              </div>
              <div v-if="resource.description" class="resource-description">
                {{ resource.description }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="resource-section">
          <template #header>
            <div class="card-header">
              <span>页脚资源</span>
              <el-button type="primary" size="small" @click="loadFooterResources">刷新</el-button>
            </div>
          </template>
          
          <div v-if="footerResources.length === 0" class="no-data">
            暂无页脚资源
          </div>
          
          <div v-else class="resource-list">
            <div 
              v-for="resource in footerResources" 
              :key="resource.id" 
              class="resource-item"
            >
              <div class="resource-title">{{ resource.title }}</div>
              <div class="resource-type">
                <el-tag :type="getResourceTypeTag(resource.type)">
                  {{ getResourceTypeText(resource.type) }}
                </el-tag>
              </div>
              <div v-if="resource.image" class="resource-image">
                <img 
                  :src="getImageUrl(resource.image)" 
                  :alt="resource.title" 
                  @error="handleImageError"
                />
              </div>
              <div v-if="resource.description" class="resource-description">
                {{ resource.description }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PublicResourceManager',
  setup() {
    const store = useStore();
    
    // 获取公共资源数据
    const headerResources = computed(() => store.getters.headerResources);
    const footerResources = computed(() => store.getters.footerResources);
    
    // 获取图片URL（如果是图片key则获取签名URL）
    const getImageUrl = (imageKey) => {
      if (!imageKey) return '';
      
      // 如果已经是完整URL，直接返回
      if (imageKey.startsWith('http')) {
        return imageKey;
      }
      
      // 从store获取签名URL
      return store.getters.getImageSignedUrl(imageKey);
    };
    
    // 处理图片加载错误
    const handleImageError = async (event) => {
      const imgElement = event.target;
      const imageKey = imgElement.dataset.imageKey;
      
      if (imageKey && !imageKey.startsWith('http')) {
        // 获取新的签名URL
        const signedUrl = await store.dispatch('getImageSignedUrl', imageKey);
        imgElement.src = signedUrl;
      }
    };
    
    // 加载公共资源数据
    const loadPublicResources = () => {
      store.dispatch('loadPublicResources');
    };
    
    // 加载页头资源（刷新按钮用）
    const loadHeaderResources = () => {
      store.dispatch('loadPublicResources');
    };
    
    // 加载页脚资源（刷新按钮用）
    const loadFooterResources = () => {
      store.dispatch('loadPublicResources');
    };
    
    // 获取资源类型标签
    const getResourceTypeTag = (type) => {
      const typeMap = {
        'image': 'success',
        'text': 'info',
        'link': 'warning'
      };
      return typeMap[type] || 'info';
    };
    
    // 获取资源类型文本
    const getResourceTypeText = (type) => {
      const typeMap = {
        'image': '图片资源',
        'text': '文字内容',
        'link': '链接资源'
      };
      return typeMap[type] || type;
    };
    
    // 组件挂载时检查是否需要加载数据
    onMounted(() => {
      // 检查是否需要加载数据
      // 如果Vuex中没有公共资源数据，或者数据已过期，则请求公用数据
      const lastUpdated = store.state.publicResources.lastUpdated;
      let shouldLoad = false;
      
      if (!lastUpdated) {
        // 从未加载过数据
        shouldLoad = true;
      } else {
        // 检查数据是否过期（5分钟内认为是有效的）
        const lastUpdatedTime = new Date(lastUpdated);
        const now = new Date();
        const diffMinutes = (now - lastUpdatedTime) / (1000 * 60);
        shouldLoad = diffMinutes >= 5;
      }
      
      // 如果需要加载数据，则调用action
      if (shouldLoad) {
        loadPublicResources();
      }
    });
    
    return {
      headerResources,
      footerResources,
      getImageUrl,
      handleImageError,
      loadHeaderResources,
      loadFooterResources,
      getResourceTypeTag,
      getResourceTypeText
    };
  }
};
</script>

<style scoped>
.public-resource-manager {
  padding: 20px;
}

.resource-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-data {
  text-align: center;
  color: #909399;
  padding: 20px;
}

.resource-list {
  max-height: 400px;
  overflow-y: auto;
}

.resource-item {
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-bottom: 10px;
}

.resource-item:last-child {
  margin-bottom: 0;
}

.resource-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.resource-type {
  margin-bottom: 10px;
}

.resource-image img {
  max-width: 100%;
  max-height: 100px;
  border-radius: 4px;
}

.resource-description {
  margin-top: 10px;
  color: #606266;
  font-size: 14px;
}
</style>