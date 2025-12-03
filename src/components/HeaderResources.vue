<template>
  <div class="header-resources">
    <div v-if="headerResources.length > 0" class="header-resources-container">
      <div 
        v-for="resource in headerResources" 
        :key="resource.id" 
        class="header-resource-item"
        :class="`resource-${resource.type}`"
      >
        <!-- 图片资源 -->
        <div v-if="resource.type === 'image'" class="resource-image">
          <img 
            :src="getImageUrl(resource.image)" 
            :alt="resource.title" 
            @error="handleImageError"
          />
        </div>
        
        <!-- 文字内容 -->
        <div v-else-if="resource.type === 'text'" class="resource-text">
          <h4>{{ resource.title }}</h4>
          <p>{{ resource.description }}</p>
        </div>
        
        <!-- 链接资源 -->
        <div v-else-if="resource.type === 'link'" class="resource-link">
          <a :href="resource.description" target="_blank" rel="noopener noreferrer">
            {{ resource.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HeaderResources',
  setup() {
    const store = useStore();
    
    // 获取页头资源
    const headerResources = computed(() => store.getters.headerResources);
    
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
    
    // 组件挂载时加载数据
    onMounted(() => {
      // 检查是否需要加载数据
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
      
      // 如果需要加载数据，则一次性加载所有公共资源
      if (shouldLoad) {
        store.dispatch('loadPublicResources');
      }
    });
    
    return {
      headerResources,
      getImageUrl,
      handleImageError
    };
  }
};
</script>

<style scoped>
.header-resources-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 0;
}

.header-resource-item {
  flex: 1;
  min-width: 200px;
}

.resource-image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.resource-text h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.resource-text p {
  margin: 0;
  color: #606266;
  line-height: 1.5;
}

.resource-link a {
  color: #409eff;
  text-decoration: none;
}

.resource-link a:hover {
  text-decoration: underline;
}
</style>