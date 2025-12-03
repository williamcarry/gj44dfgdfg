<template>
  <div class="bg-white shadow-sm" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 7px 0px; z-index: 998">
    <div
      class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 relative"
      style="display: flex; align-items: stretch"
    >
      <!-- All Categories Button (Left) -->
      <div style="float: left; position: relative; width: 210px; flex-shrink: 0">
        <router-link
          to="/all-categories"
          class="all-categories-btn"
          style="
            background-color: rgb(203, 38, 28);
            color: rgb(255, 255, 255);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 210px;
            height: 36px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
            transition-duration: 0.3s;
            text-decoration: none;
          "
        >
          <img
            src="https://www.saleyee.com/ContentNew/Images/allmenu.png"
            alt=""
            style="
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 10px;
              margin-top: -3px;
              vertical-align: middle;
            "
          />
          全部分类
        </router-link>
      </div>

      <!-- Navigation Links (Right) -->
      <div
        style="
          display: inline-block;
          width: calc(100% - 220px);
          background-color: rgba(0, 0, 0, 0);
          flex: 1;
        "
      >
        <div
          class="nav-links-container"
          style="
            display: flex;
            flex-wrap: wrap;
            height: 36px;
            overflow: hidden;
            width: 100%;
            align-items: stretch;
          "
        >
          <router-link
            to="/all-products"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-block;
            "
          >
            全部商品
          </router-link>

          <router-link
            to="/hot-sales"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            "
          >
            热销
            <span
              style="
                display: inline-block;
                width: 18px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-weight: 700;
                border-radius: 8px 8px 8px 0px;
                position: relative;
                top: -3px;
                overflow: hidden;
              "
            >
              <img
                loading="lazy"
                src="https://resource.saleyee.com/UploadFiles/Images/2023/202310/14e97d01-926e-4eec-ba20-ca868afff797.png"
                alt=""
                style="display: inline-block; width: 18px; height: 20px; vertical-align: middle"
              />
            </span>
          </router-link>

          <router-link
            to="/discount-sale"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            "
          >
            折扣
            <span
              style="
                display: inline-block;
                width: 18px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-weight: 700;
                border-radius: 8px 8px 8px 0px;
                position: relative;
                top: -3px;
                overflow: hidden;
              "
            >
              <img
                loading="lazy"
                src="https://resource.saleyee.com/UploadFiles/Images/2023/202310/695ea9bc-c5b7-4128-a7e8-01f19d376976.png"
                alt=""
                style="display: inline-block; width: 18px; height: 20px; vertical-align: middle"
              />
            </span>
          </router-link>

          <router-link
            to="/new"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            "
          >
            新品
            <span
              style="
                display: inline-block;
                width: 18px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-weight: 700;
                border-radius: 8px 8px 8px 0px;
                position: relative;
                top: -3px;
                overflow: hidden;
              "
            >
              <img
                loading="lazy"
                src="https://resource.saleyee.com/UploadFiles/Images/2024/202407/6684e6af-8bce-4bdd-933f-c68a04e37db3.png"
                alt=""
                style="display: inline-block; width: 18px; height: 20px; vertical-align: middle"
              />
            </span>
          </router-link>

          <router-link
            to="/direct-delivery"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            "
          >
            平台直发
            <span
              style="
                display: inline-block;
                width: 18px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-weight: 700;
                border-radius: 8px 8px 8px 0px;
                position: relative;
                top: -3px;
                overflow: hidden;
              "
            >
              <img
                loading="lazy"
                src="https://resource.saleyee.com/UploadFiles/Images/2025/202503/943763c8-afdc-4b04-b399-4f0a93a581c3.png"
                alt=""
                style="display: inline-block; width: 18px; height: 20px; vertical-align: middle"
              />
            </span>
          </router-link>
        </div>
      </div>

      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: rgb(203, 38, 28);
}

.all-categories-btn:hover {
  background-color: #a8201a;
  color: rgb(255, 255, 255);
}

.nav-link:hover {
  color: rgb(203, 38, 28);
}
</style>
