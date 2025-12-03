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
  <div class="vat-page">
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
          <a class="top-bar-link" href="/membership">会���权益</a>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="container header-inner">
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

    <main class="main container">
      <div class="breadcrumb">
        <a href="/help-center">帮助中心</a>
        <span>&gt;</span>
        <span>VAT政策解读</span>
      </div>

      <article class="vat-article">
        <h1 class="article-title">2021年英国VAT新法规解读及赛盈分销平台VAT政策剖析</h1>

        <div class="article-content">
          <p>当地时间2020年12月31日，英国结束了11个月的脱欧过渡期，正式告别欧盟。随即而来的，英国VAT政策也发生了重大的���更。</p>

          <p>英国与欧盟之间增设海关边境，这就意味着所有从英国发往欧盟国家以及从欧盟国家发往英国的商品都需要向海关进行申报。政策的变更无疑将直接影响欧洲站的卖家，今天，赛盈学院将深入解读英国VAT最新税务法规，并结合大家的疑问整理了一份纯干货。</p>

          <section class="section">
            <h2>一、英国VAT新政对欧洲站的卖家产生哪些影响?</h2>

            <div class="subsection">
              <h3>1、英国脱欧后不能再与欧盟用同个EORI号清关</h3>
              <p>从2021年1月1日起，针对英国以及卖家打算运输商品的任何其他欧盟国家或地区，都将需要一个EORI，并且因为VAT税号是用来交增值税，EORI号是用来清关，因此卖家需要准备一个VAT税号和EORI号。</p>
            </div>

            <div class="subsection">
              <h3>2、英国脱欧之后，卖家需要在英国和欧盟之间建立双��存</h3>
              <p>亚马逊FBA从2020年12月末开始就已经停止将货物在英国和欧盟之间派送，卖家的商品通过FBA进行销售，若仅在欧盟境内有库存，英国没有仓库，那么英国买家则无法查看商品和购买��</p>
            </div>

            <div class="subsection">
              <h3>3、B2B——英国境外库存向英国买家配送商品</h3>
              <p>若卖家从英国境外向英国买家配送商品，且该买家在英国登记了增值税（企业及机构买家），第三方平台无需代收和代缴增值税，已登记增值税的买家可通过其增值税申报单自行申报英国增值税。</p>
            </div>

            <div class="subsection">
              <h3>4、B2C——自发货（从英国境外向英国买家配送商品）</h3>
              <p>若卖家从英国境外向英国买家配送商品，托运商品的价值<strong>不超过￡135</strong>（单件物品扣除运保费之后的净价值），必须由第三方电商平台代收代缴适用的增值税；托运商品的价值<strong>超过￡135</strong>（单件物品扣除运保费之后的净价值）则和目前一样，卖家仍需自行缴纳增值税和所有进口关税；对于托运价值<strong>低于￡15</strong>的商品，将不再��受的增值税豁免政策。</p>
            </div>

            <div class="subsection">
              <h3>5、B2C——FBA或者海外仓（从英国境内的库存向英国买家配送商品）</h3>
              <p>对于在英国境内使用亚马逊��流和第三方��送方式���卖家，无论商品价值如何，都一律由第三方电商平台代扣代缴。</p>
            </div>

            <div class="subsection">
              <h3>6、关于"进口税延迟核算"政策的理解</h3>
              <p>"进口税延迟核算"是针对英国脱欧后在英国注册VAT的商业主体出台进口税核算政策。即您无需在清关时先支付进口税（Import VAT），再抵扣，直接在季度申报时包���这方面数据即可。</p>

              <p>任何在英国注册VAT，并有进出口业务的生意主体都可以在2020年12月31日后选择使用。同时，卖家不需要额外进行申请。此项政策并非强制，您仍然可以选择之前货代代收进口税再抵扣的方式。但强烈建议选择延迟核算方式。这对您运营现金流有益，对VAT申报来说也不会出现平台代扣代缴后大量从税局退税情况。</p>

              <p>流程如下：</p>
              <ul>
                <li>流程1：通知货代在报关时���择Postponed VAT accounting；</li>
                <li>流程2：每个月初在HMRC税局取得上个月清关情况报告；</li>
                <li>流程3：季度申报时需包括3个月清关报告monthly statement postponed VAT数值和进口货值总额。</li>
              </ul>

              <p>原货代代收进口税的方式仍可继续使用，即清关时不选择PostponedVAT accounting，顾客支付进口税，收到C79，在申报时可再抵扣C79。</p>
            </div>

            <div class="subsection">
              <h3>7、海外电商低税率未取消，但不做低税率计算</h3>
              <p>英国低税率并没有取消，卖家仍然可以使用低税率，但是平台代扣是按照标准税率扣税，不做低税率计算。英国税局对此项的回应是"商家可以选择随时离开低税率计划"。若卖家使用其他非代扣税金的电商平台或者自己的网站经营，还是按之前的方式正常申报，仍然可以在申报时按低税率计算并缴税。</p>
            </div>
          </section>

          <section class="section">
            <h2>二、亚马逊将于1月1日起代征收英国增值税</h2>

            <p>根据亚马逊后台新闻，亚马逊将负责向通过任何亚马逊店面对英国客户交付的以下商品销售收取英国增值税：</p>
            <ul>
              <li>从英国境外存放的库存中交付的货物，包裹价值最高不超过￡135；</li>
              <li>从英国国内���存的库存交付的商品，无论其价值如何，无��您��处何���。</li>
            </ul>

            <p>无论使用哪种供应方式，亚马逊都会在结账时从客户那里计算并收取英国增值税，并将其直接汇给英国税务部门。您将不会在付款中收到英国增值税金额，也不需要将这些金额汇给英国税务机关。</p>

            <div class="subsection">
              <h3>1) 亚马逊会代扣销售增值税吗？</h3>
              <p>自2021年1月1日起，亚马逊等电商平台针对海外电商将实行代扣代缴，即以前在申报后交付税局的VAT税金将直接在销售时由亚马逊等电商平台直接扣除。但此政策只针对海外电商，对于英国主体的公司或个体经营者不受影响。</p>

              <p><strong>由亚马逊代收代缴适用的增值税的情况：</strong>如果您通过英国境內的库存向英国买家配送商品，且您公司的成立地在英国境外，则必须由亚马逊代收代缴适用的增值税。这对在英国境內使用亚马逊物流的卖家和使用第三方配送方式的卖家均适用。</p>

              <p><strong>亚马逊不代收代缴增值税的情况：</strong>如果您从英国境外向英国买家配送商品，且该买家在英国登记��增值税（企业及机构买家），则亚马逊无需代收和代缴增值��。已登记增���税的买家可通过其增值税申报单自行申报英国。</p>
            </div>

            <div class="subsection">
              <h3>2) 进项税金是否也由平台扣除？</h3>
              <p>进项税金不会被平台代扣，亚马逊只代扣销售VAT，不做抵扣申报。但英国税局针对脱欧引用了"进口税延迟核算"政策。即商家无需在进口时支付进口税，这样也不会产生需要抵扣的进项��金。</p>
            </div>

            <div class="subsection">
              <h3>3) 代扣代缴后是否还需要做VAT申报？</h3>
              <p>只要您注册了英国VAT还是需要按HMRC要求准时申报。您仍需要在VAT申报中体现您的销售额，使用"进口税延迟核算"方式报关的数据，及其他经营数据。只是您被平台代扣的销售部分不会被计算包含在VAT申报的"应缴税金"栏目中。</p>
            </div>

            <div class="subsection">
              <h3>4) 在新的增值税法规中，有几项变化值得卖家注意：</h3>
              <ul>
                <li>对于销售价值低于￡15的商品，目前享受的增值税豁免政策被取消。现在，您销售的商��均需缴纳英国增值税。</li>
                <li>如果这些��售商品的货件价���不超过￡135，必须由亚马逊代收和代缴英国增值税。</li>
                <li>如果销售商品的货件价值超过￡135��则和目前一样，您仍需自行缴纳增值税和所有进口关税。</li>
              </ul>
            </div>

            <div class="subsection">
              <h3>5) 亚马逊欧洲站卖家需要做好以下三大准备：</h3>
              <ul>
                <li>保证英国及欧盟都有库存。卖家可以拆分库存，并分别发送至英国和欧盟，进而保障英国和欧盟销售，确保在2021年1月1日起生效的新边境两侧都有充足的库存。</li>
                <li>准备VAT税号。若跨境运输商品并在当地储存，卖家需要提供存放这些商品的国家或地区的增值税税号。</li>
                <li>获取EORI号。EORI指的是在欧洲国家内凡是有经济活动，尤其是进出口生意的企业，必备的一个登记号。从2021年1月1日起，针对英国以及卖家打算运输商品的任何其他欧盟国家或地区，都将需要一个EORI。</li>
              </ul>
            </div>
          </section>

          <section class="section">
            <h2>三、eBay也将于1月1���起代征收英国增值税</h2>

            <p>日前���eBay发布公告�，将��2021年1月1日起代征代缴英国增值税。适用情形包括：</p>
            <ul>
              <li>对于进口至英国并销售给英国境内消费者且价值不超过135英镑的货物；</li>
              <li>对于非英国企业的卖家、提前仓储于英国境内并销售给英国消费者的货物。英国将取消目前针对进口至英国且价值不超过15英镑的低价值货物享受的增值税免征待遇。</li>
            </ul>

            <p>同时，从2021年3月1日起，eBay将强制要求所有在eBay英国及eBay欧洲站点上的刊登提供增值税税率。因此，卖家应尽快检查并修正在eBay英国站点或任何eBay欧洲站点上的刊登以提供适用的增值税税率。如果卖家没有任何欧盟或英国的增值税号码（VAT ID），则当修改现有刊登或创建新刊登时，卖家可以在增值税税率栏填写0%。</p>
          </section>

          <section class="section">
            <h2>四、赛盈分销平台针对英国VAT采取相关措施</h2>

            <p>为符合英国���值税新规的要求，赛盈分销平台将于近期升级相关功能模块，对英国路向的分销商品进行调整，并要求购买英国路向��销商品的分销商提供相关信息，具体功��内容及要求如下：</p>

            <div class="subsection">
              <h3>1) 赛盈分销平台发货区域为UK的商品价格将进行调整</h3>
              <p>赛盈分销平台针对发货区域为UK的商品，将要求供应商在发布商品时计算并列明相应的增值税税额（VAT税），调整后的商品价格为含税价，分销商在进行订单结算时能够明显区分商品应缴纳的VAT税费，调整后的新功能上线时间将在近期内另行通知。</p>
            </div>

            <div class="subsection">
              <h3>2) 赛盈分销平台将上线分销商VAT税号登记功能</h3>
              <p>按照英国增值税新规的要求，赛盈分销平台将要求分销商披露其是否注册了英国增值税税号，以便赛盈分销平台确定正确的增值税处理方法。平台近期将上线分销商VAT税号登记功能收集分销商的英国增值税税号并进行在线核验，敬请期待。</p>

              <p>关于分销商是否提供相关VAT税号进而采取相应措施，将会出现以下两种情况：</p>

              <p><strong>情况一：</strong>购买商品时，提供VAT税号的分销商，按照B2B模式执行（分销商申请发票，供应商开票）。例如：供应商提交的商品价格为不含税价100元；平台增加20%VAT税����价，结算价为120元；分销商提供VAT税号，120元购买商品，后可申请发票，其中产品金额为100元，VAT税为20元；发票由分销商申请，供应商开予分销商；网��电子发票功能以后续公告时间为准；平台结算120元给供应商。</p>

              <p><strong>情况二：</strong>购买商品时，无法提供VAT税号的分销商，按照B2C模式执行。情形包括：情形1：若是英国个人身份，平台将开票给英国个人；情形2：若是年收入不超过8.5万英镑的英国公司，平台需要开票给此英国公司分销商；示例同上，平台开票金额、结算及VAT处理按情形不���给出。</p>
            </div>

            <div class="subsection">
              <h3>3) 分销商在赛盈分销平台下单的商品需补开增值税发票说明</h3>
              <p>在2021年1月1日至2021年1月20日期间下单采购的发货区域为UK的商品，其结算价格为未含税价格，商品详情页已展示未含税标识。若分销商未留意，错误以为价格含���并在第三方平台销售造成损失，分销商可自本通知发布之日起至2021年1月31日期间联系业务经理说明情况，并按要���提供相关资料，经审核通过后，分销商可��请补开增值税发票。若分销商未��前述期间联系，平台不再受理。</p>
            </div>
          </section>

          <section class="section">
            <h2>五、赛盈分销平台VAT政策Q&A</h2>

            <div class="qa-items">
              <div class="qa-item">
                <h3>1) 赛盈分销平台何时正式执行VAT相关政策？</h3>
                <p>根据英国税法及海关总署公告，2021年1月1日起，英国已生效新版VAT税收政策。赛盈平台在2021年1月1日至2021年1月20日期间销售的商品价格，均为未含税价格，但在发货区域为UK的商品详情页会提示客户，商品详情页展示的价格为未含税价格。若在此期间未留意，导致在第三方平台销售时按错误价格结算，卖家可在公告发布日至2021年1月31日期间联系业务经理协商处理。至于何时在原商品价格基础上增加20% VAT，将另行公告通知。</p>
              </div>

              <div class="qa-item">
                <h3>2) 需要增加VAT税额的商品条件是什么？</h3>
                <ul>
                  <li>赛盈平台发货区域为英国的商品；</li>
                  <li>商品收件地址位于英国境内。</li>
                </ul>
              </div>

              <div class="qa-item">
                <h3>3) 后续对于商品价格加VAT税的调整，对赛盈商城选品分销有什么影响���</h3>
                <p>平台会���据政策调整相关模块功能，仅针对发货区域为UK的商品进行含VAT税的定价，商品的搜索页面、商品详情页、列表页都不受影响。分销商只会看到含VAT的定价。</p>
              </div>

              <div class="qa-item">
                <h3>4) 产生的VAT税额由谁承担？</h3>
                <p>分销商在购买商品支付订单时，符合税收条件的订单会自动结算出订单金额与税额，与商品订单共同支付。有VAT税号的分销商，后续可���请发票（网站上线电子发票功能，见平台公告）。</p>
              </div>

              <div class="qa-item">
                <h3>5) 赛盈分销平台的VAT税收政策是否会影响到分销商在英国区域销售？</h3>
                <p>对于2021年度的英国增值税新政，所有在英国区域正规销售的卖家统一执行此税收政策，公平竞争；税收合规化也有利于在英国进行的跨境电商贸易。</p>
              </div>

              <div class="qa-item">
                <h3>6) 相关VAT发票如何申请？</h3>
                <p>赛盈平台的VAT功能暂未发布，预计第一季度末上线，不影响VAT申报。上线后可按季度报税。</p>
              </div>

              <div class="qa-item">
                <h3>7) VAT税款包括哪些项？</h3>
                <p>以订单为维度，按每个订单实际支付金额的20%计算VAT。</p>
              </div>

              <div class="qa-item">
                <h3>8) 发票金额包括哪些项目？</h3>
                <p>包括商品价格和对应的VAT税额。</p>
              </div>

              <div class="qa-item">
                <h3>9) 有VAT税号的公司卖家，需要提供哪些信息？</h3>
                <ul>
                  <li>公司名称；</li>
                  <li>VAT税号；</li>
                  <li>公司所属国家；</li>
                  <li>公司注册地址；</li>
                  <li>公司商业执照/注册证；</li>
                  <li>增值税证明文件；</li>
                  <li>店铺名称；</li>
                  <li>店铺链接；</li>
                  <li>店铺后台相关截图。</li>
                </ul>
              </div>

              <div class="qa-item">
                <h3>10) 无VAT税号的个人卖家，需要提供哪些信息？</h3>
                <ul>
                  <li>发票抬头；</li>
                  <li>国家；</li>
                  <li>地址；</li>
                  <li>证件类型；</li>
                  <li>证件号码；</li>
                  <li>证件照片。</li>
                </ul>
              </div>
            </div>

            <p class="conclusion">现如今，英国脱欧已成事实，面临VAT政策变更的种种问题，各大跨境电商平台都已陆续开展相关应对措施，赛盈分销平台也不例外。卖家需要跟上平台最新资讯和相关政策，及时调整战略，方能顺利开拓欧洲市场。</p>

            <p>英国VAT政策的分享告一段落，关于赛盈分销平台VAT政策的相关事宜若后续仍有疑问，欢迎联系业务经理获取更全面的答疑。</p>
          </section>
        </div>
      </article>
    </main>

    <footer class="footer">
      <div class="container footer-inner">
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
            <li><a href="/vat-policy">VAT政策解读</a></li>
          </ul>
        </div>
        <div class="col footer-wechat">
          <h3>赛盈官方微信</h3>
          <img src="https://resource.saleyee.cn/UploadFiles/Images/2024/202412/3d1ddf0c-7c7c-4f2e-a9bd-30813e3e5a99.png" alt="赛盈官方微信" />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">© 2025 Saleyee.com Tengming Limited | 网站地图</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// VAT政策页面组件
</script>

<style scoped>
.vat-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.container {
  max-width: 1500px;
  min-width: 1150px;
  margin: 0 auto;
  padding: 0 16px;
}

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

.main {
  padding: 40px 0;
  flex: 1;
}

.breadcrumb {
  color: #6b7280;
  margin-bottom: 24px;
  font-size: 14px;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb span {
  margin: 0 8px;
}

.vat-article {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.article-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 30px 0;
  line-height: 1.4;
}

.article-content {
  color: #374151;
  line-height: 1.8;
  font-size: 15px;
}

.article-content > p {
  margin-bottom: 16px;
}

.section {
  margin-bottom: 32px;
}

.section h2 {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin: 24px 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.subsection {
  margin-bottom: 20px;
  padding-left: 16px;
}

.subsection h3 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 16px 0 12px 0;
}

.subsection p {
  margin-bottom: 12px;
  color: #374151;
}

.subsection ul {
  margin: 12px 0 12px 24px;
  padding: 0;
}

.subsection li {
  margin-bottom: 8px;
  color: #374151;
  list-style-type: disc;
}

.subsection strong {
  color: #1f2937;
  font-weight: 600;
}

.qa-items {
  margin: 20px 0;
}

.qa-item {
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #cb261c;
}

.qa-item h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.qa-item p {
  margin-bottom: 12px;
  color: #374151;
}

.qa-item ul {
  margin: 12px 0 0 24px;
  padding: 0;
}

.qa-item li {
  margin-bottom: 8px;
  color: #374151;
  list-style-type: disc;
}

.conclusion {
  margin-top: 24px;
  padding: 16px;
  background: #f0fdf4;
  border-radius: 6px;
  border-left: 4px solid #10b981;
  color: #374151;
}

.footer {
  background: #fafafa;
  border-top: 1px solid #e5e7eb;
  margin-top: 40px;
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
