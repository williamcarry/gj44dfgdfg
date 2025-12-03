/**
 * ============================================
 * 订单状态监控 Mock API
 * ============================================
 * 
 * 模拟 Mercure 实时订单状态推送
 * 包含订单处理流程的各个阶段
 */

// 模拟订单处理的状态序列
const orderProcessingSequence = [
  {
    step: 'price_verified',
    message: '价格验证成功',
    delay: 500,
    debug: {
      frontend_total: 'USD 78.20',
      backend_total: 'USD 78.20',
      difference: 'USD 0.00',
      backend_breakdown: {
        selling_price: 78.20,
        quantity: 1,
        member_discount_rate: 0,
        display_price: 78.20,
        subtotal: 78.20,
        shipping_fee: 0,
        min_amount: null,
        discount_amount: null
      }
    }
  },
  {
    step: 'balance_checking',
    message: '正在检查账户余额...',
    delay: 1000
  },
  {
    step: 'stock_checking',
    message: '正在检查库存...',
    delay: 1500
  },
  {
    step: 'balance_deducting',
    message: '正在扣除余额...',
    delay: 2000
  },
  {
    step: 'stock_deducting',
    message: '正在扣除库存...',
    delay: 2500
  },
  {
    step: 'completed',
    message: '订单处理完成',
    delay: 3000
  }
]

/**
 * 获取 Mercure Token（Mock）
 * 实际项目中应该从后端获取真实的 JWT Token
 */
export async function getMercureToken(orderNo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: `mock-jwt-token-${orderNo}-${Date.now()}`,
        topic: `orders/${orderNo}`,
        message: 'Mock token generated'
      })
    }, 100)
  })
}

/**
 * 模拟订单处理流程
 * 按照预定的时间序列发送状态更新
 */
export function simulateOrderProcessing(orderNo, onMessage, onError, onComplete) {
  console.log(`[Mock API] 开始模拟订单 ${orderNo} 的处理流程`)

  let messageIndex = 0

  const sendNextMessage = () => {
    if (messageIndex >= orderProcessingSequence.length) {
      // 所有消息已发送
      console.log(`[Mock API] 订单 ${orderNo} 处理流程已完成`)
      if (onComplete) onComplete()
      return
    }

    const currentMessage = orderProcessingSequence[messageIndex]
    const nextMessage = orderProcessingSequence[messageIndex + 1]

    // 计算距离当前消息的延迟
    const delay = messageIndex === 0 
      ? currentMessage.delay 
      : nextMessage.delay - currentMessage.delay

    setTimeout(() => {
      console.log(`[Mock API] 发送消息 (${messageIndex + 1}/${orderProcessingSequence.length}):`, currentMessage.step)
      
      if (onMessage) {
        onMessage({
          step: currentMessage.step,
          message: currentMessage.message,
          debug: currentMessage.debug || null
        })
      }

      messageIndex++
      sendNextMessage()
    }, delay)
  }

  // 开始发送
  sendNextMessage()
}

/**
 * 创建一个假的 EventSource 用于本地测试
 * 在实际项目中应该使用真实的 Mercure EventSource
 */
export function createMockEventSource(token, topic, onMessage, onError, onComplete) {
  console.log(`[Mock API] 创建 Mock EventSource - Topic: ${topic}`)

  // 立即触发 onopen 事件
  setTimeout(() => {
    console.log('[Mock API] EventSource 连接已建立')
    if (onMessage) {
      onMessage({
        type: 'open',
        data: null
      })
    }
  }, 100)

  // 模拟订单处理流程
  const processMessages = (index = 0) => {
    if (index >= orderProcessingSequence.length) {
      if (onComplete) onComplete()
      return
    }

    const item = orderProcessingSequence[index]
    setTimeout(() => {
      console.log(`[Mock API] 推送消息: ${item.step}`)
      
      if (onMessage) {
        onMessage({
          type: 'message',
          data: JSON.stringify({
            step: item.step,
            message: item.message,
            debug: item.debug || null
          })
        })
      }

      processMessages(index + 1)
    }, item.delay)
  }

  processMessages()

  // 返回一个模拟的 EventSource 对象
  return {
    readyState: 0,
    url: `mock://mercure?topic=${topic}`,
    close() {
      console.log('[Mock API] Mock EventSource 已关闭')
    },
    addEventListener(event, handler) {
      console.log(`[Mock API] 添加事件监听: ${event}`)
    },
    removeEventListener(event, handler) {
      console.log(`[Mock API] 移除事件监听: ${event}`)
    }
  }
}

export default {
  getMercureToken,
  simulateOrderProcessing,
  createMockEventSource
}
