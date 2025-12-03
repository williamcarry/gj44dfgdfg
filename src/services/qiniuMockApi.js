// ============================================
// 七牛云上传 Mock API
// ============================================
// 这是一个mock API，用于本地开发和测试
// 生产环境请将后端URL替换为真实的七牛云上传接口

export const QINIU_API_BASE_URL = 'http://localhost:3000/api/qiniu'

/**
 * 获取七牛云上传凭证
 * @returns {Promise<{uploadToken: string, domain: string}>}
 */
export const getQiniuUploadToken = async () => {
  try {
    const response = await fetch(`${QINIU_API_BASE_URL}/upload-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('获取上传凭证失败')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('获取七牛云上传凭证失败:', error)
    throw error
  }
}

/**
 * Mock 七牛云上传凭证响应
 * 本地开发时使用这个函数模拟后端响应
 */
export const mockGetQiniuUploadToken = () => {
  // 模拟上传凭证（实际应由后端生成）
  const uploadToken = 'mock_upload_token_' + Date.now()
  const domain = 'https://cdn.example.com' // 七牛云域名

  return Promise.resolve({
    uploadToken,
    domain,
  })
}

/**
 * Mock 七牛云上传响应
 * 当XHR请求完成时，模拟七牛云的响应格式
 */
export const getMockQiniuResponse = (fileName) => {
  return {
    key: `uploads/${Date.now()}_${fileName}`,
    hash: 'mock_hash_' + Date.now(),
    fsize: 1024,
  }
}
