<template>
  <div class="store-example">
    <h2>Vuex Store 使用示例</h2>
    
    <!-- 搜索功能示例 -->
    <div class="search-section">
      <h3>搜索功能</h3>
      <input 
        v-model="localSearchQuery" 
        @input="updateSearchQuery" 
        placeholder="输入搜索关键词"
        class="search-input"
      />
      <p>当前搜索词: {{ searchQuery }}</p>
      <p>搜索状态: {{ isSearching ? '搜索中...' : '空闲' }}</p>
    </div>
    
    <!-- 用户功能示例 -->
    <div class="user-section">
      <h3>用户功能</h3>
      <div v-if="!isLoggedIn">
        <button @click="login" class="login-button">登录</button>
      </div>
      <div v-else>
        <p>欢迎, {{ user.name }}!</p>
        <button @click="logout" class="logout-button">退出登录</button>
      </div>
    </div>
    
    <!-- 购物车功能示例 -->
    <div class="cart-section">
      <h3>购物车</h3>
      <p>购物车商品数量: {{ cartItemCount }}</p>
      <p>购物车总价: ¥{{ cartTotal.toFixed(2) }}</p>
      <button @click="addToCart" class="add-to-cart-button">添加商品到购物车</button>
      <button @click="clearCart" class="clear-cart-button">清空购物车</button>
      
      <div v-if="cartItems.length > 0" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <span>{{ item.name }} - ¥{{ item.price }} x {{ item.quantity }}</span>
          <button @click="removeFromCart(item.id)" class="remove-item-button">移除</button>
        </div>
      </div>
    </div>
    
    <!-- UI状态示例 -->
    <div class="ui-section">
      <h3>UI状态</h3>
      <button @click="toggleSidebar" class="toggle-sidebar-button">
        {{ isSidebarOpen ? '关闭' : '打开' }} 侧边栏
      </button>
      <button @click="openModal" class="open-modal-button">打开模态框</button>
      <button @click="closeModal" class="close-modal-button">关闭模态框</button>
    </div>
    
    <!-- 模态框 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h3>模态框内容</h3>
        <p>{{ modalContent }}</p>
        <button @click="closeModal" class="close-modal-button">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'StoreExample',
  setup() {
    const store = useStore();
    
    // 本地状态
    const localSearchQuery = ref('');
    
    // 从store获取状态
    const searchQuery = computed(() => store.getters.searchQuery);
    const isSearching = computed(() => store.getters.isSearching);
    const user = computed(() => store.getters.user);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const cartItems = computed(() => store.getters.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);
    const cartItemCount = computed(() => store.getters.cartItemCount);
    const isSidebarOpen = computed(() => store.getters.isSidebarOpen);
    const isModalOpen = computed(() => store.getters.isModalOpen);
    const modalContent = computed(() => store.getters.modalContent);
    
    // Actions
    const updateSearchQuery = () => {
      store.dispatch('updateSearchQuery', localSearchQuery.value);
    };
    
    const login = () => {
      store.dispatch('login', {
        id: 1,
        name: '示例用户',
        email: 'user@example.com'
      });
    };
    
    const logout = () => {
      store.dispatch('logout');
    };
    
    const addToCart = () => {
      const sampleItems = [
        { id: 1, name: '示例商品1', price: 99.99 },
        { id: 2, name: '示例商品2', price: 149.99 },
        { id: 3, name: '示例商品3', price: 199.99 }
      ];
      
      const randomItem = sampleItems[Math.floor(Math.random() * sampleItems.length)];
      store.dispatch('addToCart', { ...randomItem, quantity: 1 });
    };
    
    const removeFromCart = (itemId) => {
      store.dispatch('removeFromCart', itemId);
    };
    
    const clearCart = () => {
      store.dispatch('clearCart');
    };
    
    const toggleSidebar = () => {
      store.dispatch('toggleSidebar');
    };
    
    const openModal = () => {
      store.dispatch('openModal', '这是一个示例模态框内容');
    };
    
    const closeModal = () => {
      store.dispatch('closeModal');
    };
    
    return {
      // 状态
      localSearchQuery,
      searchQuery,
      isSearching,
      user,
      isLoggedIn,
      cartItems,
      cartTotal,
      cartItemCount,
      isSidebarOpen,
      isModalOpen,
      modalContent,
      
      // 方法
      updateSearchQuery,
      login,
      logout,
      addToCart,
      removeFromCart,
      clearCart,
      toggleSidebar,
      openModal,
      closeModal
    };
  }
};
</script>

<style scoped>
.store-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.search-section, .user-section, .cart-section, .ui-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

.login-button {
  background-color: #42b983;
  color: white;
}

.logout-button {
  background-color: #ff6b6b;
  color: white;
}

.add-to-cart-button {
  background-color: #42b983;
  color: white;
}

.clear-cart-button {
  background-color: #ff6b6b;
  color: white;
}

.remove-item-button {
  background-color: #ff6b6b;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
}

.toggle-sidebar-button {
  background-color: #409eff;
  color: white;
}

.open-modal-button {
  background-color: #67c23a;
  color: white;
}

.close-modal-button {
  background-color: #909399;
  color: white;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
</style>