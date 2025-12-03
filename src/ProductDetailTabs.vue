<template>
  <div class="div">
    <div class="div-2">
      <div class="div-3">
        <ul class="ul">
          <li class="li" :class="{ active: tab==='details' }" @click="tab='details'">详细信息</li>
          <li class="li-2" :class="{ active: tab==='limit' }" @click="tab='limit'">零售限价</li>
          <li class="li-3" :class="{ active: tab==='shipping' }" @click="tab='shipping'">物流&支付信息</li>
          <li class="li-4" :class="{ active: tab==='addresses' }" @click="tab='addresses'">发货&退货地址</li>
          <li class="li-5" :class="{ active: tab==='guide' }" @click="tab='guide'">销售指导</li>
          <li class="li-6" :class="{ active: tab==='attachments' }" @click="tab='attachments'">附件</li>
          <li class="li-7" :class="{ active: tab==='compat' }" @click="tab='compat'">兼容属性</li>
        </ul>

        <div class="div-4">
          <!-- 详细信息 -->
          <section v-show="tab==='details'">
            <div class="divs">
              <div class="div-5">
                <ul class="ul-2">
                  <li class="li-8">长（CM）：<em class="em">58</em></li>
                  <li class="li-9">宽（CM）：<em class="em">22</em></li>
                  <li class="li-10">高（CM）：<em class="em">7</em></li>
                  <li class="li-11">重量（G）：<em class="em">1700</em></li>
                  <div class="div-6"></div>
                </ul>
              </div>
              <div class="div-7"></div>
              <div class="div-8"></div>
              <div class="div-9">
                <p class="p">
                  <span class="span">Our shoe rack made of non-woven fabric and heavy duty steel tubes ensures sturdy and stable construction, with up to 66lbs max load bearing capacity. 10 Tiers rack measuring 23.03x10.82x72.83in in size, is capable to hold about 25-30 pairs of high-heeled shoes, high-top shoes, sports shoes, flat shoes, and you can also remove one of the layer to hold ultra-high boots. Without any tools required, this easy-assemble tall 10-tier shoe shelf is your loyalty helper to keep the house tidy and well-organized.</span>
                </p>
                <p class="p">Feature：</p>
                <ul class="ul-3">
                  <ul class="ul-4">
                    <li class="li-12">Space Saving Shoe Rack: This 10-tier tall shoe rack measuring 23.03x10.82x72.83in, making full use of your vertical space, is an easy and affordable choice to store your various kinds of shoes. A large and stable rack helps you to keep the entryway, closet, hallway, living room and bedroom away from mess.</li>
                  </ul>
                </ul>
                <p class="p"></p>
                <ul class="ul-5">
                  <ul class="ul-6">
                    <li class="li-13">Stable Construction: Made of heavy duty steel frame, which is durable and sturdy, this reliable shoe rack can hold all shoes of your whole family at ease with its large load bearing capacity up to 66lbs in total. And the non-woven fabric is moisture-proof and easier easy to clean and maintain, you can wipe it directly with a damp cloth.</li>
                  </ul>
                </ul>
                <p class="p"></p>
                <ul class="ul-7">
                  <ul class="ul-8">
                    <li class="li-14">As Flexible As You Desire: With each tier height of 7.28in, suitable for store most types of high-heeled shoes, high-top shoes, sports shoes, flat shoes, or choose to remove 1tiers of the non-woven fabric to extend the height to 14.56in for your ultra-high boots. Moreover, you can also set up it to dual 5-tier shoe rack according to your preference.</li>
                  </ul>
                </ul>
                <p class="p"></p>
                <ul class="ul-9">
                  <ul class="ul-10">
                    <li class="li-15">Easy To Assemble: Come with complete accessories including steel tubes, PP connectors, and non-woven layer plates, easy to install with a few simple steps without any tools required. User manual is included to help you assemble the shoe rack quickly and easily.</li>
                  </ul>
                </ul>
                <p class="p"></p>
                <ul class="ul-11">
                  <li class="li-16">Ideal Household Organizer: No need to be bothered by shoes, kid's toys, bags that are piled out of order, this large capacity 10-tier shoe rack is an ideal household organizer to bring you a tidy and cleaning lifestyle.</li>
                </ul>
                <p class="p">Specification：</p>
                <p class="p">
                  <span class="span">Product Type: 10-Tier Shoe Rack</span><br class="br" />
                  <span class="span">Material: Steel; Non-Woven Fabric; PP</span><br class="br" />
                  <span class="span">Color: Black</span><br class="br" />
                  <span class="span">Tier Quantity: 10Tiers</span><br class="br" />
                  <span class="span">Total Shoe Capacity: About 25-30Pairs</span><br class="br" />
                  <span class="span">Load Bearing Capacity: 3kg/6.61lbs Per Tier; 30kg/66lbs In Total</span><br class="br" />
                  <span class="span">Per Tube Diameter: 12mm/0.47in</span><br class="br" />
                  <span class="span">Per Tube Wall Width: 0.23mm/0.01in</span><br class="br" />
                  <span class="span">Per Tier Size: 58.5x27.5cm/23.03x10.82in</span><br class="br" />
                  <span class="span">Per Tier Height: 18.5cm/7.28in</span><br class="br" />
                  <span class="span">Tube Length: 55.8cm/21.96in(Long); 24.5cm/9.64in(Middle); 17cm/6.69in(Short)</span><br class="br" />
                  <span class="span">Item Size: 58.5x27.5x185cm/23.03x10.82x72.83in</span><br class="br" />
                  <span class="span">Item Weight: 1.6kg/3.52lbs</span><br class="br" />
                  <span class="span">Package Size: 58*22*7cm/22.83*8.66*2.75in</span><br class="br" />
                  <span class="span">Package Weight: 1746g/3.84lbs</span>
                </p>
                <p class="p">Package Contents：</p>
                <p class="p">
                  <span class="span">10x Layer Plates</span><br class="br" />
                  <span class="span">4x Handle Connectors</span><br class="br" />
                  <span class="span">40x Connectors</span><br class="br" />
                  <span class="span">20x Long Length Tubes</span><br class="br" />
                  <span class="span">22x Middle Length Tubes</span><br class="br" />
                  <span class="span">40x Short Length Tubes</span><br class="br" />
                  <span class="span">1x User Manual</span>
                </p>
                <br class="br-2" />
                <div class="div-10">
                  <img alt="img-13" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/e6e56157-d26e-4fd0-a457-3d8bc912e0a4.Jpeg" class="img" />
                  <img alt="img-14" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/c6d39761-b8d3-4a71-9a24-135d395f982b.Jpeg" class="img" />
                  <img alt="img-15" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/c21abb0b-4c80-4f1f-a311-e45422e3e5b5.Jpeg" class="img" />
                  <img alt="img-16" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/72d9fc82-8a61-49c8-b26d-1ca2490c7db2.Jpeg" class="img" />
                  <img alt="img-17" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/202ab624-3562-42a7-9f00-63c19b961a36.Jpeg" class="img" />
                  <img alt="img-18" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/8ead43e7-fa41-4180-9808-5346ce6526c1.Jpeg" class="img" />
                  <img alt="img-19" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/ef04a463-4e9e-40b0-80ef-7fe28145dea1.Jpeg" class="img" />
                  <img alt="img-20" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/64e9df17-993c-444a-88b1-2fd4a7a03904.Jpeg" class="img" />
                  <img alt="img-21" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/1c883888-f526-4737-92fc-8e2c156b2361.Jpeg" class="img" />
                  <img alt="img-22" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d73f4743-c6a2-4dc7-9ddb-107c4164e278.Jpeg" class="img" />
                  <img alt="img-23" loading="lazy" src="https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/9538410a-dafe-49dc-b5cf-4e0624f7a80c.Jpeg" class="img" />
                </div>
              </div>
            </div>
          </section>

          <!-- 零售限价（默认隐藏） -->
          <section v-show="tab==='limit'">
            <div class="div-12">
              <table class="table">
                <thead class="thead">
                  <tr class="tr">
                    <td class="td">SKU</td>
                    <td class="td">属性</td>
                    <td class="td">版本编码</td>
                    <td class="td">价格类型</td>
                    <td class="td">销售平台</td>
                    <td class="td">销售站点</td>
                    <td class="td">销售国家</td>
                    <td class="td">最低零售价</td>
                    <td class="td">币别</td>
                    <td class="td">生效时间</td>
                    <td class="td">失效时间</td>
                  </tr>
                </thead>
                <tbody class="tbody">
                </tbody>
              </table>
            </div>
          </section>

          <!-- 物流&支付信息 -->
          <section v-show="tab==='shipping'">
            <div class="div-14">
              <p class="p"><strong class="strong">一、物流及仓库问题<br class="br-3" /></strong><br class="br-4" />1.<strong class="strong">是海外仓现货吗？</strong></p>
              <p class="p"></p>
              <p class="p">是的，赛盈所有的产品都已现货备货在海外仓，网站上有库存的，都是目前在仓可售产品。<br class="br-5" /><strong class="strong"><br class="br-6" /> 2.物流费用是怎么计算？</strong></p>
              <p class="p"></p>
              <p class="p">赛盈平台上的商品价格都已是包邮价格，无需考虑物流费用。 不过对于偏远区域，赛盈分销平台无法为您提供包邮服务：如若您的客户收件地址是在美国偏远州，则需额外支付物流费用，具体可联系您的客户经理进行咨询。</p>
              <p class="p"><br class="br-7" /> 3. <strong class="strong">仓库地在哪里？</strong></p>
              <p class="p"></p>
              <p class="p">美国仓（仅配送美国区域）：美东仓-新泽西、美西仓-加州、美南仓-亚特兰大；</p>
              <p class="p">英国仓（仅配送英国区域）：伯明翰仓；</p>
              <p class="p">德国仓（主要配送德国区域）：迪岑巴赫仓；</p>
              <p class="p">捷克仓（主要配送德国区域）：布拉格仓；</p>
              <p class="p">更多仓库信息可查看：<a href="https://www.saleyee.cn/help/33.html" class="a">https://www.saleyee.cn/help/33.html</a></p>
              <p class="p"><br class="br-8" />4. <strong class="strong">赛盈发什么快递？</strong></p>
              <p class="p"></p>
              <p class="p">赛盈美国区域主要是发Fedex，USPS、UPS等快递；</p>
              <p class="p">英国区域是发Yodel、Hermes、Royal Mail；</p>
              <p class="p">德国区域主要是DHL；</p>
              <p class="p">法国区域主要是GLS, LAPOSTE, FRC；</p>
              <p class="p">捷克区域主要是DHL, GLS</p>
              <p class="p">具体可查询关于物流方式：<a href="https://www.saleyee.cn/help/33.html" class="a">https://www.saleyee.cn/help/33.html</a></p>
              <p class="p"></p>
              <p class="p"><strong class="strong">5</strong><strong class="strong">.</strong><strong class="strong"></strong><strong class="strong">有跟踪号信息吗？</strong></p>
              <p class="p"></p>
              <p class="p">赛盈平台上发货的包裹，基本都是24小时内出物流跟踪号，且支持Fedex、USPS、UPS等物流全程跟踪（一件多票需拆包的订单会稍微延后）。</p>
              <p class="p"><br class="br-9" /><strong class="strong">6.发货时效、物流时效情况？</strong></p>
              <p class="p"></p>
              <p class="p">您在赛盈平台下单后，预计24小时内会安排发货，2-8天完成妥投。更多物流方式说明，可查看：<a href="https://www.saleyee.cn/help/33.html" class="a">https://www.saleyee.cn/help/33.html</a></p>
              <p class="p"></p>
              <p class="p"><strong class="strong">二、支付问题</strong></p>
              <p class="p"></p>
              <p class="p"><strong class="strong">1、赛盈平台支持哪些币种支付？</strong></p>
              <p class="p"></p>
              <p class="p">目前赛盈已上线美国仓、英国仓、德国仓、法国仓、捷克仓以及加拿大仓的商品，支持美元、英镑、欧元、以及加元这四种币种任选一种付款。</p>
              <p class="p"></p>
              <p class="p"><strong class="strong">2、赛盈平台支持哪些充值及支付方式？</strong></p>
              <p class="p"><strong class="strong">1.1 空中云汇：</strong><br class="br-10" /><br class="br-11" />（1）支持美元，欧元、英镑及加元订单支付；</p>
              <p class="p">（2）激活空中云汇账户需要提交企业资质材料，更推荐拥有空中云汇账户的企业型用户使用；</p>
              <p class="p">（3）申请售中售后退款时，资金将会默认退回您的赛盈余额账户，您可以继续消费，或选择提现；</p>
              <p class="p">（4）线下充值非实时到账。</p>
              <p class="p"><strong class="strong">1.2 Payoneer：</strong><br class="br-12" /><br class="br-13" />（1）支持美元、欧元、英镑订单支付；<br class="br-14" />（2）单笔支付金额平台无限制，如在支付中遇到限额问题，可联系Payoneer客服提升您的支付额度；<br class="br-15" />（3）线下充值非实时到账。</p>
              <p class="p"><strong class="strong">1.3 银行转账:<br class="br-16" /></strong><br class="br-17" />（1）仅支持线下的银行汇款，非实时到账，用户在线下汇款完成后需要到"个人中心-资产管理-我的余额-汇款"界面填写汇款单，平台核实到账以后将为您充值到账；<br class="br-18" />（2）支持美元、欧元、英镑 、加元币种的汇款；<br class="br-19" />（3）在汇款过程中，您的汇款银行可能会收取一定的手续费，具体充值金额以平台到账金额为准；<br class="br-20" />（4）不支持跨支付方式转账，通过银行转账以外的方式汇款到我方银行收款账户的资金不予受理，如造成损失，需自行承担。</p>
              <div class="div-15"><strong class="strong"><span class="span-2">1.4 微信支付:</span></strong></div>
              <div class="div-16"></div>
              <div class="div-17"><span class="span-3">（1）可直接支付赛盈订单，不支持账户余额充值；</span></div>
              <div class="div-18"><span class="span-4">（2）支付时，微信会将美元、欧元、英镑和加元币种的支付金额按照微信官方实时汇率转换为人民币付款，支持用绑定的储蓄卡或信用卡支付；</span></div>
              <div class="div-19"><span class="span-5">（3）仅支持微信大陆钱包认证用户使用，不支持用回乡证（港澳台往来大陆通行证）认证的用户使用；</span></div>
              <div class="div-20"><div class="div-21"><span class="span-6">（4）订单退款将按照支付时汇率将资金原路退回；</span></div></div>
              <div class="div-22"><span class="span-7">（5）PC端微信支付仅支持打开微信"扫一扫"功能支付，不支持通过长按二维码或相册识别二维码支付，否则订单将被锁定2小时以防止出现重复支付的行为。</span></div>
              <div class="div-23"></div>
              <div class="div-24"><strong class="strong"><span class="span-8">1.5 支付宝:</span></strong></div>
              <div class="div-25"></div>
              <div class="div-26"><span class="span-9">（1）可直接支付赛盈订单，不支持账户余额充值；</span></div>
              <div class="div-27"><span class="span-10">（2）支付时，支付宝会将美元、欧元和加元币种的支付金额按照支付宝官方实时汇率转换为人民币付款，支持用绑定的储蓄卡或信用卡支付；</span></div>
              <div class="div-28"><span class="span-11">（3）仅支持支付宝大陆钱包认证用户使用，不支持用回乡证（港澳台往来大陆通行证）认证的用户使用；</span></div>
              <div class="div-29"><span class="span-12">（4）订单退款将按照支付时汇率将资金原路退回；</span></div>
              <div class="div-30"><span class="span-13">（5）扫码后放弃支付，并刷新PC端支付页面以后若出现订单报错，可直接在手机端付款页面选择继续支付。</span></div>
              <div class="div-31"><span class="span-14">（6）PC端支付宝仅支持打开支付宝"扫一扫"功能支付，不支持通过长按二维码或相册识别二维码支付，否则订单将被锁定2小时以防止出现重复支付的行为。</span></div>
              <div class="div-32"></div>
              <div class="div-33"></div>
              <div class="div-34">
                <div dir="auto" class="div-35"><strong class="strong"><span class="span-15">1.6 </span> Lian Lian Global：</strong></div>
                <div dir="auto" class="div-36"></div>
                <div dir="auto" class="div-37"><span class="span-16">（1）可直接支付赛盈订单，不支持账户余额充值；</span></div>
                <div dir="auto" class="div-38"><span class="span-17"><span class="span-18">（2）支持美元，欧元，英镑及加元订单支付；</span></span></div>
                <div dir="auto" class="div-39"><span class="span-19"><span class="span-20">（3）订单退款资金将原路退回；</span></span></div>
                <div dir="auto" class="div-40"><span class="span-21"><span class="span-22">（4）线下汇款可能需要提供相关材料，若缺少材料可能导致双方收付款失败，可尝试其他汇款方式。</span></span></div>
                <br class="br-21" />
                <strong class="strong">1.7 赛盈账户余额：</strong><br class="br-22" /><br class="br-23" />（1）可通过银行转账、Payoneer、空中云汇进行赛盈余额充值；<br class="br-24" />（2）充值的金额可用于订单支付，安全快捷；<br class="br-25" />（3）充值金额可提现，但仅支持原路径退回原账户。
              </div>
              <p class="p"><br class="br-26" /><strong class="strong">各支付手续费及收取方式：</strong></p>
              <p class="p">1. 在账户充值或订单支付时，选择不同支付方式将收取不同比例的支付手续费，各支付方式具体收取费用如下：</p>
              <p class="p">
                <img alt="" loading="lazy" src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%B8%AE%E5%8A%A9%E4%B8%AD%E5%BF%83-%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F/fee2.9.jpg?v=51944508" class="img" />
                <img alt="" loading="lazy" src="https://resource.saleyee.cn/Content/Images/asset/%E6%94%AF%E4%BB%98%E7%9B%B8%E5%85%B3/%E9%98%B6%E6%A2%AF%E8%B4%B9%E7%8E%87/%E5%B9%B3%E5%8F%B0%E6%89%8B%E7%BB%AD%E8%B4%B9%E6%96%B0.jpg" class="img" />
                <br class="br-27" />
                <span class="span-23"><span class="span-24"><br class="br-28" /><span class="span-25">2.</span> 手续费收取规则为：每笔付款或充值订单总额*手续费比例</span>，最终计算出的手续费保留两位小数并向上舍入。若是多笔订单合并付款，手续费计算不拆分到具体的订单， 将按多个订单汇总的订单总额来计算。例：</span>
              </p>
              <div class="div-41">
                <span class="span-26">订单A金额=$30.99</span><br class="br-29" />
                <span class="span-27">订单B金额=$30.99</span><br class="br-30" />
                <span class="span-28">使用云汇支付，手续费：0.3%<br class="br-31" /><br class="br-32" /></span>
              </div>
              <div class="div-42">
                <strong class="strong-2"><span class="span-29">① 合并支付</span></strong><br class="br-33" />
                <span class="span-30">合并支付订单金额：$30.99*2=61.98</span><br class="br-34" />
                <span class="span-31">手续费：0.3%*$61.98=$0.18594=$0.19</span><br class="br-35" />
                <span class="span-32">手续费分摊到2个订单：$0.095+$0.095=$0.19<br class="br-36" /></span><br class="br-37" />
                <strong class="strong-3"><span class="span-33">② 非合并支付</span></strong><br class="br-38" />
                <span class="span-34">A订单手续费=0.3%*$30.99=$0.09297=$0.09</span><br class="br-39" />
                <span class="span-35">B订单手续费=0.3%*$30.99=$0.09297=$0.09</span>
              </div>
              <p class="p"><span class="span-36"></span></p>
              <p class="p"><span class="span-37">更多支付方式说明，可查看：<a target="_blank" rel="noopener" href="https://www.saleyee.cn/help/52.html" class="a">https://www.saleyee.cn/help/52.html</a></span></p>
              <p class="p"></p>
            </div>
          </section>

          <!-- 发货&退货地址 -->
          <section v-show="tab==='addresses'">
            <div class="div-43">
              <p class="p-2"><b class="b">发货地址</b></p>
              <table class="table-2">
                <tbody class="tbody-2">
                  <tr class="tr-2">
                    <td width="35%" class="td-2">US</td>
                    <td width="65%" class="td-3">CA Perris 18980 Messenia Lane  92571</td>
                  </tr>
                </tbody>
              </table>
              <p class="p-3"><b class="b">退货地址</b></p>
              <table class="table-3">
                <tbody class="tbody-3">
                  <tr class="tr-3">
                    <td width="35%" class="td-4">US</td>
                    <td width="65%" class="td-5">CA Perris 18980 Messenia Lane  92571</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('details')
</script>

<style scoped>
.div { max-width: 1500px; min-width: 1200px; position: relative; width: 80%; background-color: #f2f3f7; margin: 0 auto; }
.div-2 { background-color: #fff; float: left; width: 100%; }
.div-3 { position: relative; text-align: left; }
.ul { border-bottom: 1px solid #cb261c; height: 40px; position: relative; white-space: nowrap; font-size: 0; text-align: left; background-color: #fff; }
.li, .li-3, .li-4 { display: inline-block; min-width: 110px; padding: 0 15px; line-height: 40px; text-align: center; cursor: pointer; white-space: nowrap; vertical-align: middle; transition: .2s; color: #333; background-color: transparent; font-size: 14px; }
.li.active, .li-3.active, .li-4.active { background-color: #cb261c; color: #fff; }
.li:hover, .li-3:hover, .li-4:hover { background-color: #ffeaea; color: #cb261c; }
.li-2, .li-5, .li-6, .li-7 { display: none; }
.li, .li-3, .li-4 { margin: 0; }
.div-4 { padding: 10px; text-align: left; }
/* Following styles mirror provided attachment */
.divs { text-align: left; }
.div-5 { text-align: left; }
.ul-2 { border-bottom: 1px solid #eee; border-color: #666 #666 #eee; border-style: none none solid; }
.li-8, .li-9, .li-10, .li-11 { float: left; width: 25%; height: 40px; line-height: 40px; font-weight: 700; text-align: left; }
.em { display: inline; font-weight: 700; line-height: 40px; }
.div-6 { clear: both; }
.p { text-align: left; }
.span { background: #fff; color: #333; display: inline; font-family: Arial; font-size: 12px; }
.ul-3, .ul-4, .ul-5, .ul-6, .ul-7, .ul-8, .ul-9, .ul-10, .ul-11 { background: #fff; color: #333; font-family: Arial; font-size: 12px; }
.li-12, .li-13, .li-14, .li-15, .li-16 { margin-left: 30px; text-align: left; font-family: Arial; }
.br, .br-2, .br-3, .br-4, .br-5, .br-6, .br-7, .br-8, .br-9, .br-10, .br-11, .br-12, .br-13, .br-14, .br-15, .br-16, .br-17, .br-18, .br-19, .br-20, .br-21, .br-22, .br-23, .br-24, .br-25, .br-26, .br-27, .br-28 { display: inline; }
.div-10 { text-align: left; }
.img { margin: 0 auto; vertical-align: middle; }
.div-12 { margin: 10px 0; max-height: 440px; overflow: auto; }
.table { width: 100%; border-collapse: collapse; background: #fff; }
.thead { vertical-align: middle; }
.tr { background: #f2f2f2; transition: .3s; }
.td { border: 1px solid #e6e6e6; padding: 9px 15px; line-height: 20px; }
.div-14 { text-align: left; }
.strong { font-weight: 700; }
.div-41, .div-42 { text-align: justify; }
.strong-2, .strong-3 { font-weight: 700; }
.div-43 { text-align: left; }
.p-2, .p-3 { text-align: left; }
.table-2, .table-3 { width: 100%; border-collapse: collapse; background: #fff; }
.td-2, .td-3, .td-4, .td-5 { border: 1px solid #e6e6e6; padding: 9px 15px; line-height: 20px; }
</style>