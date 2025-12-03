# CentOS Stream 9 订单处理卡顿完整修复方案

## 问题描述

在CentOS Stream 9系统上，订单处理页面卡在**"正在处理您的订单... 已连接到服务器，等待处理..."**状态，无法继续。
但在Windows系统上工作正常。

### 根本原因

**时序竞态问题 - 消息丢失**

1. **后端速度过快**：Linux系统执行速度比Windows快，订单处理消息会立即发送
2. **前端订阅滞后**：前端建立EventSource连接需要时间，但消息已经发送了
3. **消息丢失**：Mercure是基于长连接的，消息发送时没有订阅者，消息就会丢失

```
Windows（慢）：
1. 前端：发起连接
2. [等待...] 消息发送
3. 前端：连接建立
4. ✅ 收到消息

Linux（快）：
1. 前端：发起连接
2. 消息立即发送 🚫 没有订阅者，消息丢失！
3. 前端：连接建立
4. ❌ 没有收到消息，页面卡死
```

## 解决方案

**使用 Redis 持久化 + 主动查询** 替代**单纯的事件推送**

不依赖延迟，而是依赖**消息持久化**：
1. 后端发送消息时，同时存储到 Redis
2. 前端连接建立后，主动查询 Redis 中的待处理消息
3. 处理完毕后，清空 Redis 队列

这样即使消息在前端连接前发送，也能通过查询获取。

## 修改的文件清单

### 新增文件
- `aaabbb/src/Service/MercureMessageService.php` - Redis消息存储服务

### 修改的文件
1. `aaabbb/src/MessageHandler/OrderProcessingMessageHandler.php` - 单商品订单处理
2. `aaabbb/src/MessageHandler/MultiProductOrderProcessingMessageHandler.php` - 多商品订单处理
3. `aaabbb/src/Controller/Api/MercureController.php` - 新增API接口
4. `aaabbb/assets/vue/controllers/shop/components/OrderStatusMonitor.vue` - 前端查询待处理消息

## 详细修改说明

### 1. 后端服务：MercureMessageService.php

**文件：** `aaabbb/src/Service/MercureMessageService.php`（新增）

**功能：**
- 存储消息到 Redis（确保不丢失）
- 查询 Redis 中的待处理消息（前端调用）
- 清空已处理的消息（避免重复）

**关键方法：**
```php
// 存储消息（在publishUpdate中调用）
$this->mercureMessageService->publishMessage($orderNo, $data);

// 前端查询待处理消息
$messages = $this->mercureMessageService->getPendingMessages($orderNo);

// 清空消息队列
$this->mercureMessageService->clearMessages($orderNo);
```

---

### 2. 后端处理器：OrderProcessingMessageHandler.php

**文件：** `aaabbb/src/MessageHandler/OrderProcessingMessageHandler.php`

**修改内容：**
1. 注入 `MercureMessageService` 依赖
2. 修改 `publishUpdate()` 方法，添加 Redis 存储

**修改点：**
```php
// 在构造函数中添加
public function __construct(
    // ... 其他参数 ...
    MercureMessageService $mercureMessageService
) {
    // ... 其他初始化 ...
    $this->mercureMessageService = $mercureMessageService;
}

// 在 publishUpdate() 方法中添加
private function publishUpdate(string $orderNo, array $data): void
{
    try {
        // 第一步：先存储消息到 Redis（确保不丢失）
        $this->mercureMessageService->publishMessage($orderNo, $data);
        
        // 第二步：再推送到 Mercure（实时推送给已��接的前端）
        // ... 原有的 Mercure 推送代码 ...
    }
}
```

---

### 3. 后端处理器：MultiProductOrderProcessingMessageHandler.php

**文件：** `aaabbb/src/MessageHandler/MultiProductOrderProcessingMessageHandler.php`

**修改内容：** 与 `OrderProcessingMessageHandler.php` 完全相同

---

### 4. 后端控制器：MercureController.php

**文件：** `aaabbb/src/Controller/Api/MercureController.php`

**新增的 API 接口：**

#### 接口 1：获取待处理消息
```
GET /api/mercure/pending-messages?orderNo={orderNo}
```

**响应示例：**
```json
{
  "success": true,
  "orderNo": "ORD202511244680187E",
  "messages": [
    {
      "timestamp": 1234567890.123,
      "data": {
        "status": "processing",
        "step": "validating",
        "message": "正在验证订单信息..."
      },
      "status": "processing",
      "step": "validating"
    },
    {
      "timestamp": 1234567890.456,
      "data": {
        "status": "success",
        "step": "completed",
        "message": "订单处理成功！"
      },
      "status": "success",
      "step": "completed"
    }
  ],
  "count": 2,
  "timestamp": 1234567890.789
}
```

#### 接口 2：清空消息队列
```
POST /api/mercure/clear-messages
Content-Type: application/json

{
  "orderNo": "ORD202511244680187E"
}
```

**响应示例：**
```json
{
  "success": true,
  "orderNo": "ORD202511244680187E",
  "message": "消息已清空",
  "timestamp": 1234567890.789
}
```

---

### 5. 前端组件：OrderStatusMonitor.vue

**文件：** `aaabbb/assets/vue/controllers/shop/components/OrderStatusMonitor.vue`

**修改内容：**

#### 修改点 1：onopen 事件中添加消息查询

```javascript
newEventSource.onopen = async () => {
  statusMessage.value = t('msgConnected')
  
  // ✅ 【关键修复】获取待处理的消息
  console.log('🔄 查询待处理消息...')
  await fetchAndProcessPendingMessages(orderNo)
  
  // 通知后端
  notifyBackendReady(orderNo)
  
  isConnecting.value = false
}
```

#### 修改点 2：新增函数 - 获取并处理待处理消息

```javascript
const fetchAndProcessPendingMessages = async (orderNo) => {
  try {
    // 调用后端API获取Redis中存储的待处理消息
    const response = await fetch(
      `/api/mercure/pending-messages?orderNo=${encodeURIComponent(orderNo)}`,
      { credentials: 'include' }
    )
    
    const result = await response.json()
    
    if (result.success && result.messages && result.messages.length > 0) {
      // 处理每一条待处理消息
      for (const messageObj of result.messages) {
        const messageData = messageObj.data
        handleMercureMessage(messageData)
        
        // 小延迟，避免UI更新过快
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      
      // 处理完后，清空Redis中的消息队列
      await clearProcessedMessages(orderNo)
    }
  } catch (error) {
    console.warn('获取待处理消息失败:', error)
  }
}
```

#### 修改点 3：新增函数 - 清空已处理的消息

```javascript
const clearProcessedMessages = async (orderNo) => {
  try {
    const response = await fetch('/api/mercure/clear-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ orderNo })
    })
    
    const result = await response.json()
    console.log('清空消息队列结果:', result)
  } catch (error) {
    console.warn('清空消息队列失败:', error)
  }
}
```

---

## 执行流程

### 后端流程

```
1. 前端 POST /api/mercure/ready
   └─> MercureController::notifyReady()
       └─> 发布 OrderReadyMessage

2. OrderReadyMessageHandler 收到消息
   └─> 触发订单处理（OrderProcessingMessage）

3. OrderProcessingMessageHandler 处理订单
   └─> 调用 publishUpdate() 发送消息
       └─> 第一步：$mercureMessageService->publishMessage()
           └─> 消息存储到 Redis: mercure:messages:{orderNo}
       └─> 第二步：$hub->publish() 
           └─> 推送到 Mercure（如果前端已连接）
```

### 前端流程

```
1. EventSource onopen 事件触发
   └─> 调用 fetchAndProcessPendingMessages()
       └─> GET /api/mercure/pending-messages
           └─> 获取 Redis 中的所有待处理消息
       └─> 逐条处理消息
           └─> handleMercureMessage()
       └─> POST /api/mercure/clear-messages
           └─> 清空 Redis 队列

2. 同时监听 Mercure 实时消息
   └─> onmessage 事件
       └─> handleMercureMessage()

3. 消息来源：
   ✅ Redis 中已存储的消息（解决消息丢失）
   ✅ Mercure 实时推送的消息（解决连接后的消息）
```

---

## 优势对比

### 原方案（仅 Mercure）

| 问题 | 表现 |
|------|------|
| Linux 高速执行 | ❌ 消息在前端连接前发送，消息丢失 |
| 网络波动 | ❌ 消息可能丢失 |
| 页面刷新 | ❌ 消息��失 |
| 可靠性 | ❌ 低 |

### 新方案（Redis 持久化 + Mercure 实时）

| 优势 | 实现 |
|------|------|
| ✅ 消息不丢失 | Redis 持久化存储 |
| ✅ 实时推送 | Mercure 长连接 |
| ✅ 系统无关 | 不依赖延迟，无论 Windows/Linux 都可靠 |
| ✅ 网络容错 | Redis 确保消息不丢失 |
| ✅ 可查询 | 前端可主动查询消息历史 |

---

## 测试方法

### 1. 修改代码后，清理缓存
```bash
cd /path/to/project
rm -rf var/cache/*
php bin/console cache:clear
```

### 2. 重启消息队列 Worker
```bash
# 停止现有 Worker
pkill -f "messenger:consume"

# 启动新的 Worker
php bin/console messenger:consume async -vv
```

### 3. 测试订单创建

#### Windows 测试（应该已经工作）
```
1. 创建订单
2. 观察页面，应该显示"订单处理成功"
3. 检查日志：应该看到 Mercure 消息推送
```

#### Linux / CentOS Stream 9 测试（应该解决）
```
1. 创建订单
2. 观察页面，应该立即显示待处理消息
3. 检查浏览器 Network 标签：应该看到
   - GET /api/mercure/pending-messages
   - POST /api/mercure/clear-messages
4. 检查日志：应该看到 Redis 消息存储和查询
```

### 4. 查看日志

```bash
# 查看后端日志
tail -f var/log/dev.log | grep -i "mercure\|pending\|redis"

# 查看 Redis 消息队列（可选）
redis-cli KEYS "mercure:messages:*"
redis-cli LRANGE "mercure:messages:ORD202511244680187E" 0 -1
```

---

## 故障排查

### 问题 1：页面仍然卡住

**检查清单：**
1. 是否成功修改了所有 4 个文件？
2. 是否清理了缓存？`rm -rf var/cache/*`
3. 是否重启了 Worker？`pkill -f "messenger:consume"`
4. Redis 是否正常运行？`redis-cli ping`
5. 检查日志是否有错误？`tail -f var/log/dev.log`

### 问题 2：获取待处理消息失败

**错误示例：**
```
❌ 获取待处理消息失败: TypeError: Cannot read property 'success' of undefined
```

**解决方案：**
1. 检查 `/api/mercure/pending-messages` 是否正常响应
2. 检查是否正确注入了 `MercureMessageService`
3. 检查 Redis 连接是否正常

### 问题 3：消息重复处理

**表现：** 订单处理消息显示两次

**原因：** 未成功清空 Redis 队列

**解决方案：**
1. 检查 `/api/mercure/clear-messages` 是否正常响应
2. 手动清空队列：
   ```bash
   redis-cli DEL "mercure:messages:ORD202511244680187E"
   ```

---

## 配置要求

### Redis 配置

确保以下环境变量已设置：
```bash
# .env 或 .env.local
REDIS_KHUMFG=redis://:password@127.0.0.1:6379
```

### Mercure 配置

保持现有配置不变，本修复完全兼容原有 Mercure 设置。

---

## 总结

| 方面 | 说明 |
|------|------|
| **问题** | Linux 系统高速执行导致 Mercure 消息在前端连接前丢失 |
| **解决** | Redis 持久化 + 前端主动查询 |
| **优势** | 不依赖延迟，系统无关，网络容错 |
| **修改量** | 5 个文件（1 新增 + 4 修改），共约 300 行代码 |
| **兼容性** | 完全兼容现有 Mercure 系统，无需修改配置 |
| **测试** | 简单的 GET/POST 接口测试 |

---

## 支持

如有问题，检查以下文件是否正确修改：

1. ✅ `aaabbb/src/Service/MercureMessageService.php` - 新建
2. ✅ `aaabbb/src/MessageHandler/OrderProcessingMessageHandler.php` - 注入 + publishUpdate
3. ✅ `aaabbb/src/MessageHandler/MultiProductOrderProcessingMessageHandler.php` - 注入 + publishUpdate
4. ✅ `aaabbb/src/Controller/Api/MercureController.php` - 注入 + 2 个新接口
5. ✅ `aaabbb/assets/vue/controllers/shop/components/OrderStatusMonitor.vue` - onopen + 2 个新函数
