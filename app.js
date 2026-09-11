const app = document.getElementById("app");
const toastEl = document.getElementById("toast");

const car = (name) => `./${name}`;
const ADMISSION_DEPOSIT_AMOUNT = 2000;
const ACCESS_STORAGE_KEY = "xincheng:access-state-v2";
const DRAFT_PAYMENT_DAYS = 3;
// 里程区间计算公式待业务确认
// 支付后车辆冲突的定金退款方式及退款时效待业务确认

const bannerSlides = [
  {
    title: "专业的「运营」二手车平台",
    desc: "整包车源 · 整包打包 · 高效交易 · 平台保障",
    tags: ["整包车源", "品质保障", "手续齐全"],
    image: car("ev450-white.png"),
  },
  {
    title: "企业采购高效撮合",
    desc: "选车入池 · 电话沟通 · 固定价下单",
    tags: ["批量采购", "保证金锁车", "物流支持"],
    image: car("a6l-black.png"),
  },
  {
    title: "透明车源信息",
    desc: "基础参数 · 车辆参数 · 一口价交易",
    tags: ["信息清晰", "一口价销售", "企业采购"],
    image: car("ei5-white.png"),
  },
];

const filterOptions = {
  city: ["全部城市", "上海", "西安", "成都", "武汉", "北京"],
  brand: ["全部品牌", "吉利汽车", "奥迪", "荣威", "本田", "特斯拉"],
  price: ["全部价格", "10万以下", "10-30万", "30-60万", "60万以上"],
  age: ["全部", "3年以内", "5年以内", "3万公里以内", "5万公里以内", "10万公里以内"],
};

const filterLabels = {
  city: "城市",
  brand: "品牌",
  price: "价格",
  age: "车龄/里程",
};

// Demo 模拟资产公司配置值；车辆定金实际金额及规则待业务确认。
const merchants = {
  jingju: { name: "京桔", logo: "京", tone: "orange", vehicleDeposit: 5000, contactPhone: "010-6338 1028" },
  fengju: { name: "丰桔", logo: "丰", tone: "orange", vehicleDeposit: 4000, contactPhone: "021-6123 8890" },
  yadi: { name: "亚滴", logo: "亚", tone: "blue", vehicleDeposit: 3000, contactPhone: "028-8536 7215" },
  shengdi: { name: "车胜惠迪", logo: "S", tone: "gray", vehicleDeposit: 6000, contactPhone: "0571-8672 3106" },
};

const backendOrderNamePrefixes = {
  jingju: "京桔运营车采购",
  fengju: "丰桔优质车源采购",
  yadi: "亚滴新能源采购",
  shengdi: "车胜惠迪车辆采购",
};

const bundleProducts = [
  {
    id: "b1",
    type: "bundle",
    merchantId: "jingju",
    name: "西安优质整包 A",
    city: "西安",
    totalCount: 5,
    cartUnits: 5,
    price: 30.4,
    image: car("ev450-white.png"),
    hero: car("detail-hero.png"),
    cars: [
      vehicle("b1-1", "吉利汽车 帝豪新能源 2018款 EV450 进取型", "西安", "白色", "3万—5万公里", "2018年上牌", "9.98", car("ev450-white.png"), "外观瑕疵"),
      vehicle("b1-2", "吉利汽车 帝豪新能源 2018款 EV450 进取型", "西安", "白色", "3万—5万公里", "2018年上牌", "10.20", car("ev450-single.png"), "内饰瑕疵"),
      vehicle("b1-3", "吉利汽车 帝豪新能源 2018款 EV450 进取型", "西安", "白色", "5万—7万公里", "2018年上牌", "10.22", car("ev450-white.png"), "后保喷漆"),
      vehicle("b1-4", "2018款 宝马5系新能源 改款", "西安", "白色", "3万—5万公里", "2018年上牌", "9.60", car("ev450-single.png"), "轻微划痕"),
      vehicle("b1-5", "大众 途观L 330TSI 两驱舒适版", "西安", "白色", "5万—7万公里", "2018年上牌", "8.80", car("ev450-white.png"), "外观补漆"),
    ],
  },
  {
    id: "b2",
    type: "bundle",
    merchantId: "fengju",
    name: "上海优质整包 B",
    city: "上海",
    totalCount: 3,
    cartUnits: 3,
    price: 58.8,
    image: car("a6l-black.png"),
    cars: [
      vehicle("b2-1", "奥迪A6L 2020款 40 TFSI 豪华致雅型", "上海", "黑色", "3万—5万公里", "2020年上牌", "18.80", car("a6l-black.png"), "精品车况"),
      vehicle("b2-2", "奥迪A6L 2020款 40 TFSI 豪华致雅型", "上海", "黑色", "3万—5万公里", "2020年上牌", "17.20", car("a6l-black.png"), "外观瑕疵"),
      vehicle("b2-3", "奥迪A6L 2020款 40 TFSI 豪华致雅型", "上海", "黑色", "5万—7万公里", "2020年上牌", "15.10", car("a6l-black.png"), "局部钣喷"),
    ],
  },
  {
    id: "b3",
    type: "bundle",
    merchantId: "yadi",
    name: "成都优质整包 C",
    city: "成都",
    totalCount: 2,
    cartUnits: 2,
    price: 22.9,
    image: car("ei5-white.png"),
    cars: [
      vehicle("b3-1", "荣威Ei5 2021款 舒适版", "成都", "白色", "5万—7万公里", "2021年上牌", "7.70", car("ei5-white.png"), "内饰磨损"),
      vehicle("b3-2", "荣威Ei5 2021款 舒适版", "成都", "白色", "5万—7万公里", "2021年上牌", "7.20", car("ei5-white.png"), "外观瑕疵"),
    ],
  },
  {
    id: "b4",
    type: "bundle",
    merchantId: "fengju",
    name: "成都优质整包 D",
    city: "成都",
    totalCount: 3,
    cartUnits: 3,
    price: 22.3,
    image: car("crv-black.png"),
    cars: [
      vehicle("b4-1", "本田 CR-V 2019款 240TURBO 两驱风尚版", "成都", "黑色", "5万—7万公里", "2019年上牌", "8.20", car("crv-black.png"), "外观瑕疵"),
      vehicle("b4-2", "日产 轩逸 2018款 1.6XE CVT舒适版", "成都", "黑色", "3万—5万公里", "2018年上牌", "7.50", car("crv-black.png"), "精品车况"),
      vehicle("b4-3", "丰田 凯美瑞 2020款 2.0G 豪华版", "成都", "黑色", "3万—5万公里", "2020年上牌", "6.60", car("crv-black.png"), "轻微划痕"),
    ],
  },
];

const singleProducts = [
  {
    id: "s1",
    type: "single",
    merchantId: "jingju",
    name: "吉利汽车 帝豪新能源 2018款 EV450 进取型",
    city: "西安",
    color: "白色",
    mileageRange: "3万—5万公里",
    license: "2018年上牌",
    flaws: "外观0处  |  内饰3处  |  机械结构0处",
    price: 9.98,
    image: car("ev450-single.png"),
  },
  {
    id: "s2",
    type: "single",
    merchantId: "jingju",
    name: "吉利汽车 博瑞GE 2020款 1.5T 耀智版",
    city: "上海",
    color: "黑色",
    mileageRange: "3万—5万公里",
    license: "2020年上牌",
    flaws: "外观3处  |  内饰1处  |  机械结构0处",
    price: 8.98,
    image: car("ge-black.png"),
  },
  {
    id: "s3",
    type: "single",
    merchantId: "yadi",
    name: "本田 CR-V 2019款 240TURBO 两驱风尚版",
    city: "成都",
    color: "白色",
    mileageRange: "5万—7万公里",
    license: "2019年上牌",
    flaws: "外观2处  |  内饰2处  |  机械结构1处",
    price: 7.68,
    image: car("crv-white.png"),
  },
  {
    id: "s4",
    type: "single",
    merchantId: "yadi",
    name: "奥迪 Q5L 2021款 40 TFSI 豪华动感型",
    city: "上海",
    color: "黑色",
    mileageRange: "3万—5万公里",
    license: "2021年上牌",
    flaws: "外观1处  |  内饰0处  |  机械结构0处",
    price: 12.8,
    image: car("q5-black.png"),
  },
  {
    id: "s5",
    type: "single",
    merchantId: "shengdi",
    name: "特斯拉 Model 3 2021款 标准续航后驱版",
    city: "杭州",
    color: "黑色",
    mileageRange: "3万—5万公里",
    license: "2021年上牌",
    flaws: "外观0处  |  内饰1处  |  机械结构0处",
    price: 15.6,
    image: car("ge-black.png"),
  },
  {
    id: "s6",
    type: "single",
    merchantId: "fengju",
    name: "本田 CR-V 2020款 240TURBO 两驱风尚版",
    city: "成都",
    color: "黑色",
    mileageRange: "3万—5万公里",
    license: "2020年上牌",
    flaws: "外观1处  |  内饰1处  |  机械结构0处",
    price: 7.88,
    image: car("crv-black.png"),
  },
];

const extraBundleBlueprints = [
  ["b5", "北京优质整包 E", "北京", "jingju", "ev450-white.png", "吉利汽车 帝豪新能源 2019款 EV500 精英型"],
  ["b6", "武汉优质整包 F", "武汉", "fengju", "crv-black.png", "本田 CR-V 2020款 240TURBO 两驱风尚版"],
  ["b7", "上海优质整包 G", "上海", "yadi", "a6l-black.png", "奥迪A6L 2021款 40 TFSI 豪华致雅型"],
  ["b8", "成都优质整包 H", "成都", "shengdi", "ei5-white.png", "荣威Ei5 2021款 舒适版"],
  ["b9", "西安优质整包 I", "西安", "jingju", "ge-black.png", "吉利汽车 博瑞GE 2020款 耀智版"],
  ["b10", "北京优质整包 J", "北京", "fengju", "q5-black.png", "奥迪 Q5L 2021款 豪华动感型"],
  ["b11", "武汉优质整包 K", "武汉", "yadi", "crv-white.png", "本田 CR-V 2019款 两驱风尚版"],
  ["b12", "上海优质整包 L", "上海", "shengdi", "a6l-black.png", "奥迪A6L 2020款 豪华致雅型"],
];

extraBundleBlueprints.forEach(([id, name, city, merchantId, imageName, vehicleName], index) => {
  const count = 2;
  bundleProducts.push({
    id,
    type: "bundle",
    merchantId,
    name,
    city,
    totalCount: count,
    cartUnits: count,
    price: 18.6 + index * 3.2,
    image: car(imageName),
    brand: vehicleName.split(" ")[0],
    model: vehicleName,
    cars: [
      vehicle(`${id}-1`, vehicleName, city, index % 2 ? "黑色" : "白色", "3万—5万公里", "2020年上牌", money(6.2 + index), car(imageName), "车况信息完整"),
      vehicle(`${id}-2`, vehicleName, city, index % 2 ? "黑色" : "白色", "5万—7万公里", "2020年上牌", money(6.8 + index), car(imageName), "轻微使用痕迹"),
    ],
  });
});

const extraSingleBlueprints = [
  ["s7", "特斯拉 Model 3 2022款 后轮驱动版", "北京", "shengdi", "ge-black.png", "特斯拉", "Model 3"],
  ["s8", "奥迪A6L 2021款 40 TFSI 豪华致雅型", "上海", "fengju", "a6l-black.png", "奥迪", "奥迪A6L"],
  ["s9", "荣威Ei5 2022款 旗舰版", "武汉", "yadi", "ei5-white.png", "荣威", "荣威Ei5"],
  ["s10", "吉利汽车 帝豪新能源 2021款 精英型", "西安", "jingju", "ev450-single.png", "吉利汽车", "帝豪新能源"],
  ["s11", "本田 CR-V 2021款 240TURBO 两驱风尚版", "成都", "fengju", "crv-white.png", "本田", "本田CR-V"],
  ["s12", "奥迪 Q5L 2022款 40 TFSI 豪华动感型", "北京", "yadi", "q5-black.png", "奥迪", "奥迪Q5L"],
  ["s13", "吉利汽车 博瑞GE 2021款 耀智版", "上海", "jingju", "ge-black.png", "吉利汽车", "博瑞GE"],
  ["s14", "荣威Ei5 2021款 舒适版", "武汉", "shengdi", "ei5-white.png", "荣威", "荣威Ei5"],
];

extraSingleBlueprints.forEach(([id, name, city, merchantId, imageName, brand, model], index) => {
  singleProducts.push({
    id,
    type: "single",
    merchantId,
    name,
    city,
    brand,
    model,
    color: index % 2 ? "黑色" : "白色",
    mileageRange: index % 3 ? "3万—5万公里" : "5万—7万公里",
    license: "2021年上牌",
    flaws: "外观信息完整  |  内饰信息完整  |  机械结构信息完整",
    price: 8.6 + index * 1.35,
    image: car(imageName),
  });
});

const vehicleIntroductions = {
  b1: { brand: "吉利汽车", series: "帝豪新能源", model: "EV450", year: "2018款", trim: "进取型", exterior: "白色", interior: "深色", firstRegistration: "2018-06-18", mileageRange: "3万—7万公里" },
  b2: { brand: "奥迪", series: "奥迪A6L", model: "40 TFSI", year: "2020款", trim: "豪华致雅型", exterior: "黑色", interior: "黑色", firstRegistration: "2020-09-12", mileageRange: "3万—7万公里" },
  b3: { brand: "荣威", series: "荣威Ei5", model: "Ei5", year: "2021款", trim: "舒适版", exterior: "白色", interior: "深色", firstRegistration: "2021-05-26", mileageRange: "5万—7万公里" },
  b4: { brand: "本田", series: "本田CR-V", model: "240TURBO", year: "2019款", trim: "两驱风尚版", exterior: "黑色", interior: "深色", firstRegistration: "2019-08-15", mileageRange: "3万—7万公里" },
  s1: { brand: "吉利汽车", series: "帝豪新能源", model: "EV450", year: "2018款", trim: "进取型", exterior: "白色", interior: "深色", firstRegistration: "2018-06-18", mileageRange: "3万—5万公里" },
  s2: { brand: "吉利汽车", series: "博瑞GE", model: "1.5T", year: "2020款", trim: "耀智版", exterior: "黑色", interior: "黑色", firstRegistration: "2020-11-03", mileageRange: "3万—5万公里" },
  s3: { brand: "本田", series: "本田CR-V", model: "240TURBO", year: "2019款", trim: "两驱风尚版", exterior: "白色", interior: "深色", firstRegistration: "2019-08-15", mileageRange: "5万—7万公里" },
  s4: { brand: "奥迪", series: "奥迪Q5L", model: "40 TFSI", year: "2021款", trim: "豪华动感型", exterior: "黑色", interior: "黑色", firstRegistration: "2021-10-09", mileageRange: "3万—5万公里" },
  s5: { brand: "特斯拉", series: "Model 3", model: "标准续航后驱版", year: "2021款", trim: "标准续航后驱版", exterior: "黑色", interior: "黑色", firstRegistration: "2021-07-21", mileageRange: "3万—5万公里" },
  s6: { brand: "本田", series: "本田CR-V", model: "240TURBO", year: "2020款", trim: "两驱风尚版", exterior: "黑色", interior: "深色", firstRegistration: "2020-06-11", mileageRange: "3万—5万公里" },
};

const vehicleIdentity = {
  b1: ["陕A·D5602", "LJXCE6CB8JT018562", "2026-07"],
  b2: ["沪A·Q1826", "LFV3A24K2L3026418", "2026-09"],
  b3: ["川A·D7391", "LSJE24037M1678421", "2026-05"],
  b4: ["川A·C5198", "LVHRW1889K5062317", "2026-08"],
  s1: ["陕A·D5602", "LJXCE6CB8JT018562", "2026-07"],
  s2: ["沪A·G7286", "L6T7824Z7LA021453", "2026-11"],
  s3: ["川A·C3167", "LVHRW1856K5073142", "2026-08"],
  s4: ["沪B·Q6905", "LFV3B28R5M3072169", "2026-10"],
  s5: ["浙A·D3185", "LRW3E7FA8MC186725", "2026-07"],
  s6: ["川A·C6682", "LVHRW1872L5084096", "2026-06"],
};

const orders = [
  {
    id: "o1",
    status: "processing",
    processingStage: "vehicle_confirming",
    merchantId: "shengdi",
    orderNo: "CG20240521000123",
    orderName: "华东新能源单车采购单",
    sourceTypes: ["单台车源"],
    bundles: [],
    singles: ["s5"],
    amount: 15.6,
    vehicleDeposit: 6000,
    temporary: true,
    mayConflictAfterDeposit: true,
    conflictVehicleIds: ["s5"],
  },
  {
    id: "o2",
    status: "draft",
    merchantId: "jingju",
    orderNo: "CG20240521000124",
    orderName: "西安运营车整包采购单",
    sourceTypes: ["整包车源"],
    bundles: ["b1"],
    singles: [],
    amount: 30.4,
    vehicleDeposit: 5000,
    ...draftWindowFromNow(),
    temporary: true,
  },
  {
    id: "o3",
    status: "processing",
    processingStage: "locked_pending_payment",
    merchantId: "shengdi",
    orderNo: "CG20240518000218",
    orderName: "杭州新能源车辆交付单",
    sourceTypes: ["单台车源"],
    bundles: [],
    singles: ["s5"],
    amount: 15.6,
    vehicleDeposit: 6000,
  },
  {
    id: "o4",
    status: "processing",
    processingStage: "vehicle_confirming",
    exchangePending: true,
    merchantId: "fengju",
    orderNo: "CG20240514007890",
    orderName: "华东运营车辆替换单",
    sourceTypes: ["单台车源"],
    bundles: [],
    singles: ["s8"],
    amount: 9.95,
    vehicleDeposit: 4000,
    issue: "原车辆动力系统出现故障，无法继续完成本次交易履约。",
    replacementId: "s6",
  },
  {
    id: "o5",
    status: "completed",
    processingStage: "completed",
    merchantId: "jingju",
    orderNo: "CG20240515004567",
    orderName: "上海运营车辆完成单",
    sourceTypes: ["单台车源"],
    bundles: [],
    singles: ["s2"],
    amount: 16.8,
    paymentVoucherUploaded: true,
    paymentVoucherName: "华东新能源车款支付凭证.jpg",
    paymentVoucherUploadedAt: "2026-09-05 16:28",
  },
  {
    id: "o6",
    status: "completed",
    processingStage: "completed",
    merchantId: "yadi",
    orderNo: "CG20240512003321",
    orderName: "成都优质整包完成单",
    sourceTypes: ["整包车源"],
    bundles: ["b3"],
    singles: [],
    amount: 12.8,
    paymentVoucherUploaded: true,
    paymentVoucherName: "成都整包车款支付凭证.pdf",
    paymentVoucherUploadedAt: "2026-09-03 11:46",
  },
  {
    id: "o7",
    status: "cancelled",
    merchantId: "yadi",
    orderNo: "CG20240512003322",
    orderName: "上海豪华车型采购单",
    sourceTypes: ["单台车源"],
    bundles: [],
    singles: ["s4"],
    amount: 12.8,
    vehicleDeposit: 3000,
    cancelReason: "JV 公司超过 3 天未反馈确认结果",
    cancelDetail: "对应资产公司超过 3 天未反馈确认结果，本订单已停止继续履约。",
  },
  {
    id: "o8",
    status: "cancelled",
    merchantId: "jingju",
    orderNo: "CG20240515004568",
    orderName: "西安整包车辆锁定订单",
    sourceTypes: ["整包车源"],
    bundles: ["b1"],
    singles: [],
    amount: 18.6,
    cancelReason: "部分车辆已被其他订单优先锁定",
    cancelDetail: "因部分车辆已被其他订单优先锁定，本订单无法继续履约。",
    conflictVehicleIds: ["b1-2"],
    refundPendingBusinessConfirmation: true,
  },
];

const storedAccess = readStoredObject(ACCESS_STORAGE_KEY, { loggedIn: false, admissionPaid: false });

const state = {
  access: {
    loggedIn: Boolean(storedAccess.loggedIn),
    admissionPaid: Boolean(storedAccess.loggedIn && storedAccess.admissionPaid),
  },
  cart: readStoredObject("xincheng:cart", {
    bundle: [
      { id: "b1", selected: true },
      { id: "b2", selected: true },
    ],
    single: [
      { id: "s1", selected: true },
      { id: "s2", selected: true },
      { id: "s3", selected: true },
    ],
  }),
  filters: { bundle: {}, single: {} },
  activeFilter: null,
  amountDetailOpen: false,
  confirmCancelOrderId: null,
  confirmSubmitOrderOpen: false,
  accessGateOpen: false,
  admissionDepositOpen: false,
  pendingUnlockRoute: "",
  conflictDialog: null,
  voucherUploadOrderId: null,
  voucherFileName: "",
  voucherFileUrl: "",
  voucherFileType: "",
  paymentVoucherPreviewOrderId: null,
  catalogSearchQuery: "",
  cartSearchQuery: "",
  bannerIndex: 0,
};

function vehicle(id, name, city, color, mileageRange, license, price, image, flaw) {
  return { id, name, city, color, mileageRange, license, price, image, flaw };
}

function icon(name) {
  const icons = {
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4.2-4.2"></path>',
    home: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V21h13V10.5"></path>',
    cart: '<path d="M4 5h2l2 11h10l2-7H8"></path><circle cx="10" cy="20" r="1.5"></circle><circle cx="18" cy="20" r="1.5"></circle>',
    order: '<path d="M7 3h10l2 3v15H5V6l2-3Z"></path><path d="M8 8h8M8 12h8M8 16h5"></path>',
    user: '<circle cx="12" cy="8" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path>',
    check: '<path d="m5 12 4 4 10-10"></path>',
    plus: '<path d="M12 5v14M5 12h14"></path>',
    heart: '<path d="M20.5 8.5c0 6.2-8.5 11-8.5 11s-8.5-4.8-8.5-11A4.7 4.7 0 0 1 12 5.4a4.7 4.7 0 0 1 8.5 3.1Z"></path>',
    back: '<path d="m15 5-7 7 7 7"></path>',
    shield: '<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"></path><path d="m9 12 2 2 4-5"></path>',
    truck: '<path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"></path><path d="M9 8h6M9 12h6"></path>',
    file: '<path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5M9 13h6M9 17h5"></path>',
    message: '<path d="M4 5h16v11H8l-4 4V5Z"></path><path d="M8 10h.1M12 10h.1M16 10h.1"></path>',
    up: '<path d="m6 15 6-6 6 6"></path>',
    yen: '<circle cx="12" cy="12" r="9"></circle><path d="m8 8 4 5 4-5M12 13v5M9 14h6"></path>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6l4 2"></path>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 12 9 5 9-5"></path>',
    ban: '<circle cx="12" cy="12" r="9"></circle><path d="M5.7 5.7 18.3 18.3"></path>',
    wallet: '<path d="M4 7h16v12H4z"></path><path d="M17 12h4v4h-4a2 2 0 0 1 0-4Z"></path>',
    phone: '<path d="M5 4h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"></path>',
    building: '<path d="M4 21V5l8-3 8 3v16"></path><path d="M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-4h6v4"></path>',
    pin: '<path d="M12 21s7-5.3 7-11a7 7 0 0 0-14 0c0 5.7 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    help: '<circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.8 2.8 0 1 1 4.5 2.2c-1 .7-2 1.2-2 2.8M12 17h.1"></path>',
    info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.1"></path>',
    tool: '<path d="m14 7 3-3 3 3-3 3"></path><path d="M4 20 14 10"></path><path d="M8 4h4v4H8z"></path>',
    car: '<path d="M5 16h14l-1.5-5h-11L5 16Z"></path><path d="m7 11 1.5-4h7L17 11"></path><circle cx="8" cy="18" r="2"></circle><circle cx="16" cy="18" r="2"></circle>',
    invoice: '<path d="M7 3h10v18l-2-1.5-3 1.5-3-1.5L7 21V3Z"></path><path d="M10 8h4M10 12h4M12 12v6M10 15h4"></path>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ""}</svg>`;
}

function parseRoute() {
  let raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw) raw = "mine";
  const [path, query = ""] = raw.split("?");
  return {
    segments: path.split("/").filter(Boolean),
    params: Object.fromEntries(new URLSearchParams(query)),
  };
}

function go(path) {
  window.location.hash = path.startsWith("/") ? `#${path}` : `#/${path}`;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function money(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function readStoredObject(key, fallback) {
  try {
    const raw = window.localStorage?.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStoredObject(key, value) {
  try {
    window.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is optional for this static demo.
  }
}

function accessStage() {
  if (!state.access.loggedIn) return "guest";
  return state.access.admissionPaid ? "unlocked" : "deposit-unpaid";
}

function isUnlocked() {
  return accessStage() === "unlocked";
}

function persistAccess() {
  saveStoredObject(ACCESS_STORAGE_KEY, state.access);
}

function miniProgramStatus(time = "9:41") {
  return `
    <div class="status-bar">
      <span>${time}</span>
      <span class="system-icons">
        <span class="signal"><span></span><span></span><span></span><span></span></span>
        <span class="wifi"></span>
        <span class="battery">100</span>
      </span>
    </div>
  `;
}

function capsule() {
  return `
    <div class="mini-capsule" aria-hidden="true">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="split"></span>
      <span class="circle"></span>
    </div>
  `;
}

function appHeader(title, options = {}) {
  const {
    back = false,
    home = false,
    showCapsule = true,
    searchText = "",
    searchPlaceholder = "",
    searchRoute = "/search?type=bundle&q=吉利",
    time = "9:41",
    className = "",
  } = options;
  const left = back
    ? `<button class="nav-back" data-back aria-label="返回">${icon("back")}</button>`
    : home
      ? `<button class="nav-home" data-route="/home?type=bundle" aria-label="首页">${icon("home")}</button>`
      : `<span></span>`;
  const right = showCapsule ? capsule() : `<span></span>`;
  const rowClass = showCapsule ? "nav-row" : "nav-row no-capsule";
  const search = searchPlaceholder
    ? SearchBar({ className: "header-search", text: searchText || searchPlaceholder, route: searchRoute })
    : "";

  return `
    <header class="app-header ${className}">
      ${miniProgramStatus(time)}
      <div class="${rowClass}">
        ${left}
        <div class="nav-title">${title}</div>
        ${right}
      </div>
      ${search}
    </header>
  `;
}

function MiniProgramHeader(title, options = {}) {
  return appHeader(title, options);
}

function AppShell(activeNav, pageHtml, options = {}) {
  const classes = ["page"];
  if (activeNav) classes.push("with-tabbar");
  if (options.actionbar) classes.push("with-actionbar");
  if (options.quotebar) classes.push("with-quotebar");
  if (options.cartbar) classes.push("with-cartbar");
  const showBackTop = Boolean(activeNav || options.backtop);
  return `
    <div class="phone">
      <div class="${classes.join(" ")}">${pageHtml}</div>
      ${renderAmountDetailPanel()}
      ${renderCancelDialog()}
      ${renderSubmitOrderDialog()}
      ${renderVoucherUploadDialog()}
      ${renderVoucherPreviewDialog()}
      ${renderAccessGateDialog()}
      ${renderAdmissionDepositDialog()}
      ${renderConflictDialog()}
      ${activeNav ? bottomNav(activeNav) : ""}
      ${showBackTop ? BackTopButton() : ""}
    </div>
  `;
}

function layout(activeNav, pageHtml, options = {}) {
  return AppShell(activeNav, pageHtml, options);
}

function bottomNav(active) {
  const items = [
    ["home", "首页", "home", "/home?type=bundle"],
    ["purchase", "购物车", "cart", "/purchase?type=bundle"],
    ["orders", "订单", "order", "/orders?status=all"],
    ["mine", "我的", "user", "/mine"],
  ];
  return `
    <nav class="tabbar">
      ${items
        .map(([key, label, ico, route]) => `
          <button class="${active === key ? "active" : ""}" data-route="${route}">
            ${icon(ico)}
            <span>${label}</span>
          </button>
        `)
        .join("")}
    </nav>
  `;
}

function SearchBar({ className = "plain-search", text = "", route = "", toast = "", clear = false }) {
  const attrs = route ? `data-route="${route}"` : toast ? `data-toast="${toast}"` : "";
  if (clear) {
    return `
      <div class="${className}">
        ${icon("search")}
        <span class="search-value">${text}</span>
        <button class="close" data-clear-search aria-label="清除搜索">×</button>
      </div>
    `;
  }
  return `
    <button class="${className}" ${attrs}>
      ${icon("search")}
      <span class="search-value">${text}</span>
    </button>
  `;
}

function BottomNav(active) {
  return bottomNav(active);
}

function BackTopButton() {
  return `<button class="back-top" data-back-top aria-label="返回顶部">${icon("up")}</button>`;
}

function StickyControls(content, className = "") {
  return `<div class="sticky-controls ${className}">${content}</div>`;
}

function merchantLogo(id) {
  const merchant = merchants[id];
  const tone = merchant.tone === "blue" ? "blue" : merchant.tone === "gray" ? "gray" : "";
  return `<span class="merchant-logo ${tone}">${merchant.logo}</span>`;
}

function merchantPill(id) {
  return `<span class="merchant-pill">${merchantLogo(id)}${merchants[id].name}</span>`;
}

function merchantOwner(id) {
  return `<div class="merchant-owner">${merchantPill(id)}</div>`;
}

function MerchantBadge(id) {
  return merchantPill(id);
}

function sourceSwitch(current, base, extra = {}) {
  const badgeBundle = extra.bundleBadge ? `<span class="switch-badge">${extra.bundleBadge}</span>` : "";
  const badgeSingle = extra.singleBadge ? `<span class="switch-badge">${extra.singleBadge}</span>` : "";
  return `
    <div class="source-switch">
      <button class="${current === "bundle" ? "active" : ""}" data-route="${base}type=bundle">
        整包车源${badgeBundle}
      </button>
      <button class="${current === "single" ? "active" : ""}" data-route="${base}type=single">
        单台车源${badgeSingle}
      </button>
    </div>
  `;
}

function SourceTypeTabs(current, base, extra = {}) {
  return sourceSwitch(current, base, extra);
}

function filterBar(type) {
  const filters = state.filters[type] || {};
  const unlocked = isUnlocked();
  const label = (kind) => filters[kind] || filterLabels[kind];
  const activeKind = state.activeFilter?.type === type ? state.activeFilter.kind : "";
  return `
    <div class="filter-shell ${activeKind ? "open" : ""} ${unlocked ? "" : "disabled"}">
      <div class="filter-bar">
        ${["city", "brand", "price", "age"].map((kind) => `
          <button class="${filters[kind] ? "selected" : ""} ${activeKind === kind ? "active" : ""}" data-filter="${kind}" data-filter-type="${type}" aria-expanded="${activeKind === kind}" aria-disabled="${!unlocked}">
            <span>${label(kind)}</span><i class="chev-down"></i>
          </button>
        `).join("")}
      </div>
      ${renderFilterPanel(type)}
    </div>
  `;
}

function FilterBar(type) {
  return filterBar(type);
}

function renderFilterPanel(currentType) {
  if (!isUnlocked() || !state.activeFilter || state.activeFilter.type !== currentType) return "";
  const { kind, type } = state.activeFilter;
  const options = filterOptions[kind] || [];
  const selected = state.filters[type]?.[kind] || options[0];
  return `
    <button class="filter-dropdown-backdrop" data-filter-close aria-label="关闭筛选"></button>
    <section class="filter-dropdown" role="dialog" aria-label="${filterLabels[kind]}筛选">
      <header><strong>${filterLabels[kind]}筛选</strong><button data-filter-close aria-label="收起筛选">×</button></header>
      <div class="filter-options">
        ${options
          .map((option, index) => `
            <button class="${selected === option || (!state.filters[type]?.[kind] && index === 0) ? "active" : ""}" data-filter-value="${option}" data-filter-kind="${kind}" data-filter-type="${type}">
              <span>${option}</span>
              ${selected === option || (!state.filters[type]?.[kind] && index === 0) ? icon("check") : ""}
            </button>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderCancelDialog() {
  const order = state.confirmCancelOrderId ? orderById(state.confirmCancelOrderId) : null;
  if (!order) return "";
  const willDeductDeposit = order.status === "processing" && Number(order.vehicleDeposit) > 0;
  const depositAmount = Number(order.vehicleDeposit || 0);
  return `
    <div class="mini-modal-mask" data-cancel-dialog-backdrop>
      <section class="mini-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-dialog-title">
        <h3 id="cancel-dialog-title">确认取消订单</h3>
        ${willDeductDeposit
          ? `<div class="modal-warning-box danger">
               <strong>取消将扣除车辆定金</strong>
               <p>该订单已支付车辆定金 ${money(depositAmount)} 元，此时取消将扣除全部车辆定金。是否仍要取消？</p>
             </div>`
          : `<p>是否确认取消订单 ${order.orderNo}？确认后订单将进入“已取消”。</p>`}
        <div class="mini-modal-actions">
          <button class="ghost-btn" data-cancel-dialog-close>暂不取消</button>
          <button class="danger-confirm-btn" data-confirm-cancel="${order.id}">${willDeductDeposit ? "确认取消并扣除" : "确认取消"}</button>
        </div>
      </section>
    </div>
  `;
}

function renderSubmitOrderDialog() {
  if (!state.confirmSubmitOrderOpen) return "";
  const route = parseRoute();
  const { selectedBundles, selectedSingles } = selectedOrderProducts(route.params);
  const groups = groupProductsByMerchant(selectedBundles, selectedSingles);
  const depositTotal = groups.reduce((sum, group) => sum + group.vehicleDeposit, 0);
  return `
    <div class="mini-modal-mask" data-submit-dialog-backdrop>
      <section class="mini-modal warning-modal" role="dialog" aria-modal="true" aria-labelledby="submit-dialog-title">
        <button class="modal-close-x" data-submit-dialog-close aria-label="关闭">×</button>
        <h3 id="submit-dialog-title">是否支付车辆定金</h3>
        <div class="modal-warning-box">
          <p>选择支付，将支付车辆定金 ${money(depositTotal)} 元并进入“处理中”；暂不支付会按 ${groups.length} 个资产主体生成草稿订单，须在 ${DRAFT_PAYMENT_DAYS} 天内完成定金支付。</p>
        </div>
        <div class="mini-modal-actions">
          <button class="ghost-btn" data-submit-without-deposit>暂不支付</button>
          <button class="brand-confirm-btn" data-submit-order-confirm>支付车辆定金</button>
        </div>
      </section>
    </div>
  `;
}

function renderVoucherUploadDialog() {
  const order = state.voucherUploadOrderId ? orderById(state.voucherUploadOrderId) : null;
  if (!order || order.status !== "processing" || order.processingStage !== "locked_pending_payment") return "";
  const hasFile = Boolean(state.voucherFileName);
  return `
    <div class="mini-modal-mask" data-voucher-upload-backdrop>
      <section class="mini-modal voucher-upload-modal" role="dialog" aria-modal="true" aria-labelledby="voucher-upload-title">
        <button class="modal-close-x" data-voucher-upload-close aria-label="关闭">×</button>
        <h3 id="voucher-upload-title">上传支付凭证</h3>
        <p>请上传本次车辆款项的支付凭证。上传完成后，履约进度将更新为“已支付”。</p>
        <label class="voucher-picker ${hasFile ? "selected" : ""}">
          <input type="file" accept="image/*,.pdf" data-voucher-file />
          ${icon(hasFile ? "check" : "file")}
          <span>${hasFile ? escapeAttribute(state.voucherFileName) : "选择支付凭证"}</span>
          <small>${hasFile ? "已选择，可确认上传" : "支持图片或 PDF 文件"}</small>
        </label>
        <div class="mini-modal-actions">
          <button class="ghost-btn" data-voucher-upload-close>取消</button>
          <button class="brand-confirm-btn" data-voucher-upload-confirm ${hasFile ? "" : "disabled"}>确认上传</button>
        </div>
      </section>
    </div>
  `;
}

function renderVoucherPreviewDialog() {
  const order = state.paymentVoucherPreviewOrderId ? orderById(state.paymentVoucherPreviewOrderId) : null;
  if (!order?.paymentVoucherUploaded) return "";
  const hasUploadedImage = Boolean(order.paymentVoucherUrl && order.paymentVoucherType?.startsWith("image/"));
  const hasUploadedPdf = Boolean(order.paymentVoucherUrl && order.paymentVoucherType === "application/pdf");
  const preview = hasUploadedImage
    ? `<img class="payment-voucher-image" src="${escapeAttribute(order.paymentVoucherUrl)}" alt="${escapeAttribute(order.paymentVoucherName || "支付凭证")}" />`
    : hasUploadedPdf
      ? `<iframe class="payment-voucher-pdf" src="${escapeAttribute(order.paymentVoucherUrl)}#toolbar=0" title="${escapeAttribute(order.paymentVoucherName || "支付凭证")}"></iframe>`
      : `<div class="payment-voucher-placeholder">
           ${icon("receipt")}
           <strong>支付凭证已归档</strong>
           <span>${escapeAttribute(order.paymentVoucherName || "车款支付凭证")}</span>
         </div>`;
  return `
    <div class="mini-modal-mask" data-voucher-preview-backdrop>
      <section class="mini-modal voucher-preview-modal" role="dialog" aria-modal="true" aria-labelledby="voucher-preview-title">
        <button class="modal-close-x" data-voucher-preview-close aria-label="关闭">×</button>
        <h3 id="voucher-preview-title">支付凭证</h3>
        <div class="payment-voucher-preview">${preview}</div>
        <div class="payment-voucher-meta">
          <span>文件名称</span><strong>${escapeAttribute(order.paymentVoucherName || "支付凭证")}</strong>
          <span>上传时间</span><strong>${order.paymentVoucherUploadedAt || "--"}</strong>
        </div>
        <div class="mini-modal-actions">
          <button class="brand-confirm-btn single-modal-action" data-voucher-preview-close>关闭</button>
        </div>
      </section>
    </div>
  `;
}

function renderAccessGateDialog() {
  if (!state.accessGateOpen) return "";
  const guest = accessStage() === "guest";
  return `
    <div class="mini-modal-mask" data-access-gate-backdrop>
      <section class="mini-modal access-gate-modal" role="dialog" aria-modal="true" aria-labelledby="access-gate-title">
        <button class="modal-close-x" data-access-gate-close aria-label="关闭">×</button>
        <h3 id="access-gate-title">${guest ? "请先登录" : "请先缴纳平台准入保证金"}</h3>
        <p>${guest
          ? "登录后可查看车辆价格、里程区间及完整车况信息。"
          : "缴纳2000元平台准入保证金后，可查看完整车源信息。保证金长期有效。"}</p>
        <div class="mini-modal-actions">
          <button class="ghost-btn" data-access-gate-close>${guest ? "暂不登录" : "暂不缴纳"}</button>
          <button class="brand-confirm-btn" ${guest ? "data-demo-login" : "data-open-admission-deposit"}>${guest ? "立即登录" : "立即缴纳"}</button>
        </div>
      </section>
    </div>
  `;
}

function renderAdmissionDepositDialog() {
  if (!state.admissionDepositOpen) return "";
  return `
    <div class="mini-modal-mask" data-admission-deposit-backdrop>
      <section class="mini-modal admission-deposit-modal" role="dialog" aria-modal="true" aria-labelledby="admission-deposit-title">
        <button class="modal-close-x" data-admission-deposit-close aria-label="关闭">×</button>
        <h3 id="admission-deposit-title">缴纳平台准入保证金</h3>
        <div class="admission-amount"><span>应缴金额</span><strong>${money(ADMISSION_DEPOSIT_AMOUNT)}<small>元</small></strong></div>
        <p>缴纳成功后长期有效，将解锁全部车源、价格、里程区间、车况信息及筛选功能。</p>
        <div class="mini-modal-actions">
          <button class="ghost-btn" data-admission-deposit-close>取消</button>
          <button class="brand-confirm-btn" data-confirm-admission-deposit>确认缴纳</button>
        </div>
      </section>
    </div>
  `;
}

function renderConflictDialog() {
  if (!state.conflictDialog) return "";
  const names = state.conflictDialog.vehicles.map((item) => `<li>${item.name}<small>${item.id}</small></li>`).join("");
  return `
    <div class="mini-modal-mask" data-conflict-backdrop>
      <section class="mini-modal conflict-modal" role="dialog" aria-modal="true" aria-labelledby="conflict-title">
        <button class="modal-close-x" data-conflict-close aria-label="关闭">×</button>
        <h3 id="conflict-title">车辆状态发生变化</h3>
        <p>车辆定金支付后，部分车辆因并发状态变化未能成功锁定。本订单已转入“已取消”，订单记录将继续保留。</p>
        <ul class="conflict-vehicle-list">${names}</ul>
        <div class="mini-modal-actions">
          <button class="brand-confirm-btn single-modal-action" data-conflict-close>我知道了</button>
        </div>
      </section>
    </div>
  `;
}

function NoticeBanner(text, actionText = "说明 ›", iconName = "shield") {
  return `
    <div class="notice-banner">
      <span>${icon(iconName)}${text}</span>
      <button data-toast="${text}">${actionText}</button>
    </div>
  `;
}

function noticeBanner(text, actionText = "说明 ›", iconName = "shield") {
  return NoticeBanner(text, actionText, iconName);
}

function productById(type, id) {
  return (type === "bundle" ? bundleProducts : singleProducts).find((item) => item.id === id);
}

function orderById(id) {
  return orders.find((item) => item.id === id);
}

function productSearchText(product) {
  const info = vehicleIntroductions[product.id] || {};
  return [product.name, product.brand, product.model, info.brand, info.model, product.city, ...(product.cars || []).map((item) => item.name)]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN");
}

function applyProductFilters(products, type) {
  if (!isUnlocked()) return products;
  const selected = state.filters[type] || {};
  return products.filter((product) => {
    if (selected.city && product.city !== selected.city) return false;
    if (selected.brand && !productSearchText(product).includes(selected.brand.toLocaleLowerCase("zh-CN"))) return false;
    const price = Number(product.price);
    if (selected.price === "10万以下" && price >= 10) return false;
    if (selected.price === "10-30万" && (price < 10 || price > 30)) return false;
    if (selected.price === "30-60万" && (price < 30 || price > 60)) return false;
    if (selected.price === "60万以上" && price < 60) return false;
    const mileageText = type === "bundle"
      ? product.cars.map((item) => item.mileageRange).join(" ")
      : product.mileageRange || "";
    if (selected.age === "3万公里以内" && !/0万—3万|1万—3万/.test(mileageText)) return false;
    if (selected.age === "5万公里以内" && !/3万—5万|0万—3万|1万—3万/.test(mileageText)) return false;
    if (selected.age === "10万公里以内" && !/万—/.test(mileageText)) return false;
    const yearText = type === "bundle" ? product.cars.map((item) => item.license).join(" ") : product.license || "";
    const newestYear = Math.max(...(yearText.match(/20\d{2}/g) || [0]).map(Number));
    if (selected.age === "3年以内" && newestYear < 2023) return false;
    if (selected.age === "5年以内" && newestYear < 2021) return false;
    return true;
  });
}

function renderProductList(type, products, mode = "normal") {
  if (!products.length) {
    return `<div class="empty-state">暂无车源<br />可切换分类继续查看</div>`;
  }
  const restricted = !isUnlocked() && mode === "normal";
  const visibleProducts = restricted ? products.slice(0, 10) : products;
  const tip = accessStage() === "guest" ? "登录后查看更多车源" : "缴纳平台准入保证金后查看更多车源";
  return `
    <div class="list ${restricted ? "restricted-list" : ""}">${visibleProducts.map((item) => renderProductCard(item, type, restricted ? "restricted" : mode)).join("")}</div>
    ${restricted ? `<p class="restricted-list-tip">${tip}</p>` : ""}
  `;
}

function ProductCard(product, type, mode = "normal") {
  const isBundle = type === "bundle";
  const route = `/detail/${type}/${product.id}`;
  if (mode === "restricted") {
    return `
      <article class="restricted-product-card" data-product-route="${route}" tabindex="0" aria-label="查看 ${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p><span>${product.city}</span><span>共${isBundle ? product.totalCount : 1}台</span></p>
        </div>
        <strong class="restricted-price">?</strong>
      </article>
    `;
  }
  const meta = isBundle
    ? `<div class="line-meta"><span>${product.city}</span><span>共${product.totalCount}台</span></div>`
    : `<div class="line-meta"><span>${product.city}</span><span>${product.color}</span><span>${product.mileageRange}</span><span>${product.license}</span></div>`;
  const priceLabel = isBundle ? "打包总价" : "售价";
  const action =
    mode === "favorite"
      ? `<button class="plus-btn" data-add-cart="${type}:${product.id}" aria-label="加入购物车">${icon("plus")}</button>`
      : mode === "normal"
        ? `<button class="heart-btn ${isFavorite(type, product.id) ? "on" : ""}" data-favorite-toggle="${type}:${product.id}" aria-label="加入购物车" aria-pressed="${isFavorite(type, product.id)}">${icon("heart")}</button>`
        : "";
  const cardClass = `product-card ${isBundle ? "bundle-card" : "single-card"} ${mode === "normal" ? "catalog-card" : ""} ${mode === "cart" ? "cart-card" : ""} ${mode === "favorite" ? "compact" : ""}`;

  if (mode === "cart") {
    const cartItem = state.cart[type].find((item) => item.id === product.id);
    return `
      <article class="${cardClass}" data-product-route="${route}">
        <button class="select-cell" data-cart-toggle="${type}:${product.id}" aria-label="选择车源">
          <span class="check ${cartItem?.selected ? "checked" : ""}">${cartItem?.selected ? icon("check") : ""}</span>
        </button>
        <div class="product-image"><img src="${product.image}" alt="${product.name}" /></div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          ${meta}
          <div class="price-row"><strong>${money(product.price)}</strong><span class="unit">万</span></div>
        </div>
      </article>
    `;
  }

  return `
    <article class="${cardClass}" data-product-route="${route}">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" /></div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        ${meta}
        <div class="price-row">
          ${!isBundle ? `<span class="label">${priceLabel}</span>` : ""}
          <strong>${money(product.price)}</strong><span class="unit">万</span>
          ${isBundle ? `<span class="suffix">${priceLabel}</span>` : ""}
        </div>
      </div>
      ${action}
    </article>
  `;
}

function renderProductCard(product, type, mode = "normal") {
  return ProductCard(product, type, mode);
}

function renderHeroBanner() {
  const slide = bannerSlides[state.bannerIndex % bannerSlides.length];
  return `
    <div class="hero-banner" data-banner-touch style="--hero-car:url('${slide.image}')">
      <div class="hero-copy">
        <h2>${slide.title}</h2>
        <p>${slide.desc}</p>
        <div class="hero-features">
          ${slide.tags.map((tag) => `<span>${icon("shield")}${tag}</span>`).join("")}
        </div>
        <div class="hero-dots">
          ${bannerSlides.map((_, index) => `<button class="${index === state.bannerIndex ? "active" : ""}" data-banner-index="${index}" aria-label="切换到第${index + 1}张"></button>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderHome(params) {
  const type = params.type || "bundle";
  const products = applyProductFilters(type === "bundle" ? bundleProducts : singleProducts, type);
  const header = appHeader("新橙二手车", {
    className: "header-home fixed-home-header",
    searchPlaceholder: type === "bundle" ? "搜索" : "搜索品牌 / 车系 / 车型 / 车源",
    searchRoute: `/search?type=${type}&q=`,
    time: type === "bundle" ? "17:45" : "9:41",
  });
  const body = `
    ${header}
    <section class="content">
      ${renderHeroBanner()}
      ${StickyControls(`${SourceTypeTabs(type, "/home?")}${FilterBar(type)}`, "home-controls")}
      ${renderProductList(type, products)}
    </section>
  `;
  return layout("home", body);
}

function renderSearch(params) {
  const type = params.type || "bundle";
  const q = params.q !== undefined ? params.q : state.catalogSearchQuery;
  state.catalogSearchQuery = q;
  const sourceProducts = type === "bundle" ? bundleProducts : singleProducts;
  const keyword = String(q).trim().toLocaleLowerCase("zh-CN");
  const products = applyProductFilters(keyword ? sourceProducts.filter((item) => productSearchText(item).includes(keyword)) : sourceProducts, type);
  const body = `
    <div class="fixed-page-top search-page-top">
      ${appHeader("搜索结果", { home: true, time: "14:39" })}
      <section class="search-page-head">
        <div class="cart-search-field catalog-search-field">
          ${icon("search")}
          <input type="search" value="${escapeAttribute(q)}" placeholder="搜索品牌 / 车型 / 车源" aria-label="搜索车源" data-catalog-search-input autofocus />
          <button class="cart-search-clear" data-catalog-search-clear aria-label="清空搜索关键词" ${q ? "" : "hidden"}>×</button>
        </div>
      </section>
    </div>
    <section class="content no-top">
      ${StickyControls(`${SourceTypeTabs(type, `/search?q=${encodeURIComponent(q)}&`)}${FilterBar(type)}`, "search-controls")}
      <div data-catalog-search-results>${renderProductList(type, products)}</div>
    </section>
  `;
  return layout(null, body, { backtop: true });
}

function renderVehicleIntroduction(product) {
  const info = vehicleIntroductions[product.id] || {
    brand: product.brand || "—",
    series: "—",
    model: product.model || product.name,
    year: "—",
    trim: "—",
    exterior: product.color || "—",
    interior: "—",
    firstRegistration: product.license || "—",
    mileageRange: product.mileageRange || product.cars?.[0]?.mileageRange || "—",
  };
  const [plateNo = "—", vin = "—", inspectionExpiry = "—"] = vehicleIdentity[product.id] || [];
  const isElectric = /新能源|EV|Ei5|Model 3/i.test(product.name);
  const batteryModel = /Ei5/i.test(product.name)
    ? "上汽时代三元锂电池"
    : /Model 3/i.test(product.name)
      ? "磷酸铁锂电池"
      : isElectric
        ? "宁德时代磷酸铁锂电池"
        : "—";
  const basicFields = [
    ["品牌", info.brand],
    ["车型", info.model],
    ["年款", info.year],
    ["配置版本", info.trim],
    ["使用性质", "营运"],
    ["城市", product.city],
    ["首次上牌日期", info.firstRegistration],
    ["里程区间", info.mileageRange],
  ];
  const vehicleFields = [
    ["能源类型", isElectric ? "纯电动" : "汽油"],
    ["年检到期时间", inspectionExpiry],
    ["车牌号", plateNo],
    ["变速箱", isElectric ? "电动车单速变速箱" : "自动变速箱"],
    ["VIN码", vin],
    ["电池型号", batteryModel],
    ["三电质保是否过期", isElectric ? "否" : "不适用"],
    ["车身颜色", info.exterior],
    ["报废标准", "60万公里"],
    ["内饰颜色", info.interior],
  ];
  const section = (title, fields) => `
    <section class="detail-card vehicle-info-section">
      <h3>${title}</h3>
      <div class="vehicle-data-grid">
        ${fields.map(([label, value]) => `<div class="vehicle-data-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}
      </div>
    </section>
  `;
  return `
    ${section("基本信息", basicFields)}
    ${section("车辆信息", vehicleFields)}
  `;
}

function renderDetail(segments) {
  const type = segments[1] || "bundle";
  const id = segments[2] || (type === "bundle" ? "b1" : "s1");
  const product = productById(type, id) || productById("bundle", "b1");
  const isBundle = type === "bundle";
  const body = `
    ${appHeader(isBundle ? "整包车源" : "单台车源", { back: true })}
    <section class="detail-hero">
      <img src="${product.hero || product.image}" alt="${product.name}" />
      <span class="page-count">1/6</span>
    </section>
    <section class="detail-main">
      <div class="detail-card price-panel">
        <div class="price-panel-top">
          <div class="big-price"><span>${isBundle ? "打包总价" : "售价"}</span><strong>${money(product.price)}</strong><span>万</span></div>
          <span>共${isBundle ? product.totalCount : 1}台车</span>
          <span class="source-tag">直营</span>
        </div>
      </div>
      <h1 class="detail-title">${product.name}</h1>
      ${renderVehicleIntroduction(product)}
      <div class="section-title">
        <div><span>${isBundle ? `车辆清单（${product.cars.length}台）` : "车源明细"}</span>${isBundle ? `<small>整包商品不可拆分购买</small>` : ""}</div>
      </div>
      <div class="vehicle-list">
        ${(isBundle ? product.cars : [singleToVehicle(product)]).map((item) => renderVehicleRow(item)).join("")}
      </div>
    </section>
    <div class="bottom-action">
      <button class="phone-mini" data-toast="已联系车辆对接人，将同步车辆照片" aria-label="联系车辆对接人">${icon("phone")}</button>
      <button class="outline-btn cart-detail-btn ${isFavorite(type, product.id) ? "on" : ""}" data-favorite-toggle="${type}:${product.id}">${icon("heart")} 购物车</button>
      <button class="primary-btn" data-route="/quote?type=${type}&id=${product.id}">提交订单</button>
    </div>
  `;
  return layout(null, body, { actionbar: true });
}

function singleToVehicle(product) {
  return {
    id: product.id,
    name: product.name,
    city: product.city,
    color: product.color,
    mileageRange: product.mileageRange,
    license: product.license,
    image: product.image,
    flaw: "",
  };
}

function renderVehicleRow(item) {
  return `
    <article class="detail-card vehicle-row" data-toast="单车明细已打开">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <div class="sub-meta"><span>${item.city}</span><span>${item.color}</span><span>${item.mileageRange}</span><span>${item.license}</span></div>
        ${item.flaw ? `<span class="flaw">${item.flaw}</span>` : ""}
      </div>
    </article>
  `;
}

function renderPurchase(params) {
  const type = params.type || "bundle";
  const unlocked = isUnlocked();
  const base = `/purchase?`;
  const bundleSelected = state.cart.bundle.filter((item) => item.selected).length;
  const singleSelected = state.cart.single.filter((item) => item.selected).length;
  const body = `
    <div class="fixed-page-top purchase-page-top">
      ${appHeader("购物车", { className: "header-home" })}
      <section class="purchase-header-block">
        <div class="purchase-panel">
          <div class="purchase-search">${unlocked
            ? SearchBar({ className: "plain-search", text: "搜索购物车内商品", route: "/purchase-search" })
            : `<button class="plain-search locked-search" data-access-gate-trigger>${icon("search")}<span class="search-value">搜索购物车内商品</span></button>`}
        </div>
      </section>
    </div>
    <section class="content purchase-list-content">
      ${unlocked ? StickyControls(SourceTypeTabs(type, base, { bundleBadge: bundleSelected, singleBadge: singleSelected }), "purchase-controls") : ""}
      ${unlocked ? renderCartList(type) : `<div class="locked-cart-panel">${icon("shield")}<h2>购物车信息暂未解锁</h2><p>${accessStage() === "guest" ? "登录并缴纳平台准入保证金后查看购物车商品。" : "缴纳平台准入保证金后查看购物车商品。"}</p><button class="primary-btn" data-access-gate-trigger>${accessStage() === "guest" ? "立即登录" : "立即缴纳"}</button></div>`}
    </section>
    ${unlocked ? renderCartSummary(type) : ""}
  `;
  return layout("purchase", body, { cartbar: true });
}

function renderCartList(type) {
  const rows = state.cart[type].map((row) => productById(type, row.id)).filter(Boolean);
  if (!rows.length) return `<div class="empty-state">购物车暂无车源</div>`;
  return `<div class="list">${rows.map((item) => SwipeDeleteCard(renderProductCard(item, type, "cart"), `cart:${type}:${item.id}`)).join("")}</div>`;
}

function cartProductEntries() {
  return ["bundle", "single"].flatMap((type) =>
    state.cart[type]
      .map((row) => ({ type, product: productById(type, row.id) }))
      .filter((entry) => Boolean(entry.product)),
  );
}

function cartProductSearchText(product) {
  const info = vehicleIntroductions[product.id] || {};
  const merchant = merchants[product.merchantId];
  const vehicleNames = (product.cars || []).map((item) => item.name).join(" ");
  return [product.name, info.brand, info.model, merchant?.name, product.city, vehicleNames]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN");
}

function cartSearchResults(query = "") {
  const keywords = String(query).trim().toLocaleLowerCase("zh-CN").split(/\s+/).filter(Boolean);
  const entries = cartProductEntries();
  if (!keywords.length) return entries;
  return entries.filter(({ product }) => {
    const searchable = cartProductSearchText(product);
    return keywords.every((keyword) => searchable.includes(keyword));
  });
}

function renderCartSearchResults(query = "") {
  const results = cartSearchResults(query);
  if (!results.length) {
    return `
      <div class="empty-state cart-search-empty">
        未找到相关购物车商品
        <small>可尝试商品名称、品牌、车型、商户名称或城市</small>
      </div>
    `;
  }
  return ["bundle", "single"]
    .map((type) => {
      const rows = results.filter((entry) => entry.type === type);
      if (!rows.length) return "";
      return `
        <section class="cart-search-group">
          <header class="cart-search-group-head">
            <h2>${type === "bundle" ? "整包车源" : "单台车源"}</h2>
            <span>${rows.length}个商品</span>
          </header>
          <div class="list">
            ${rows
              .map(({ product }) => SwipeDeleteCard(renderProductCard(product, type, "cart"), `cart:${type}:${product.id}`))
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderPurchaseSearch() {
  const query = state.cartSearchQuery;
  const resultCount = cartSearchResults(query).length;
  const body = `
    <div class="fixed-page-top purchase-search-page-top">
      ${appHeader("搜索购物车", { back: true })}
      <section class="cart-search-head">
        <div class="cart-search-field">
          ${icon("search")}
          <input
            type="search"
            value="${escapeAttribute(query)}"
            placeholder="搜索商品名称 / 品牌 / 车型 / 商户 / 城市"
            aria-label="搜索购物车商品"
            data-cart-search-input
            autofocus
          />
          <button class="cart-search-clear" data-cart-search-clear aria-label="清空搜索关键词" ${query ? "" : "hidden"}>×</button>
        </div>
        <p>仅搜索当前购物车内商品</p>
      </section>
    </div>
    <section class="content cart-search-content">
      <div class="cart-search-summary">搜索结果 <strong data-cart-search-count>${resultCount}</strong> 个商品</div>
      <div data-cart-search-results>${renderCartSearchResults(query)}</div>
    </section>
  `;
  return layout(null, body, { backtop: true });
}

function updateCartSearch(query) {
  state.cartSearchQuery = String(query);
  const results = cartSearchResults(state.cartSearchQuery);
  const resultsEl = document.querySelector("[data-cart-search-results]");
  const countEl = document.querySelector("[data-cart-search-count]");
  const clearEl = document.querySelector("[data-cart-search-clear]");
  if (resultsEl) resultsEl.innerHTML = renderCartSearchResults(state.cartSearchQuery);
  if (countEl) countEl.textContent = String(results.length);
  if (clearEl) clearEl.hidden = !state.cartSearchQuery;
  enableSwipe();
}

function updateCatalogSearch(query) {
  state.catalogSearchQuery = String(query);
  const route = parseRoute();
  const type = route.params.type || "bundle";
  const sourceProducts = type === "bundle" ? bundleProducts : singleProducts;
  const keyword = state.catalogSearchQuery.trim().toLocaleLowerCase("zh-CN");
  const products = applyProductFilters(keyword ? sourceProducts.filter((item) => productSearchText(item).includes(keyword)) : sourceProducts, type);
  const resultsEl = document.querySelector("[data-catalog-search-results]");
  const clearEl = document.querySelector("[data-catalog-search-clear]");
  if (resultsEl) resultsEl.innerHTML = renderProductList(type, products);
  if (clearEl) clearEl.hidden = !state.catalogSearchQuery;
  if (typeof history.replaceState === "function") {
    history.replaceState(null, "", `#/search?type=${type}&q=${encodeURIComponent(state.catalogSearchQuery)}`);
  }
}

function SwipeDeleteCard(inner, token) {
  return `
    <div class="swipe-shell">
      <button class="swipe-delete" data-swipe-delete="${token}">删除</button>
      <div class="swipe-row">${inner}</div>
    </div>
  `;
}

function swipeWrap(inner, token) {
  return SwipeDeleteCard(inner, token);
}

function cartStats() {
  const selectedBundles = state.cart.bundle.filter((item) => item.selected).map((item) => productById("bundle", item.id)).filter(Boolean);
  const selectedSingles = state.cart.single.filter((item) => item.selected).map((item) => productById("single", item.id)).filter(Boolean);
  return purchaseStats(selectedBundles, selectedSingles);
}

function purchaseStats(selectedBundles, selectedSingles) {
  const bundleCars = selectedBundles.reduce((sum, item) => sum + (item.cartUnits || item.totalCount), 0);
  const singleCars = selectedSingles.length;
  const total = [...selectedBundles, ...selectedSingles].reduce((sum, item) => sum + Number(item.price), 0);
  const merchantGroups = groupProductsByMerchant(selectedBundles, selectedSingles);
  return {
    selectedBundles,
    selectedSingles,
    bundleCount: selectedBundles.length,
    singleCount: selectedSingles.length,
    totalCars: bundleCars + singleCars,
    total,
    merchantGroups,
    vehicleDepositTotal: merchantGroups.reduce((sum, group) => sum + group.vehicleDeposit, 0),
  };
}

function groupProductsByMerchant(selectedBundles, selectedSingles) {
  const map = new Map();
  [...selectedBundles, ...selectedSingles].forEach((product) => {
    if (!map.has(product.merchantId)) {
      map.set(product.merchantId, {
        merchantId: product.merchantId,
        bundles: [],
        singles: [],
        amount: 0,
        vehicleDeposit: Number(merchants[product.merchantId]?.vehicleDeposit || 0),
      });
    }
    const group = map.get(product.merchantId);
    group[product.type === "bundle" ? "bundles" : "singles"].push(product);
    group.amount += Number(product.price);
  });
  return [...map.values()];
}

function backendConfiguredOrderName(merchantId, city) {
  return `${backendOrderNamePrefixes[merchantId] || "后台配置采购"} · ${city}`;
}

function CartSummaryBar(type) {
  const allCurrent = state.cart[type].length > 0 && state.cart[type].every((item) => item.selected);
  const stats = cartStats();
  return `
    <div class="cart-summary">
      <button class="all" data-cart-all="${type}">
        <span class="check ${allCurrent ? "checked" : ""}">${allCurrent ? icon("check") : ""}</span>全选
      </button>
      <div class="summary-text">
        已选 <em>${stats.bundleCount}个整包</em> + <em>${stats.singleCount}台单车</em>
        <div class="summary-price">预估总价 <strong>${money(stats.total)}</strong><em>万</em></div>
      </div>
      <button class="outline-btn" data-amount-detail>查看明细</button>
      <button class="primary-btn" data-route="/quote">提交订单</button>
    </div>
  `;
}

function renderCartSummary(type) {
  return CartSummaryBar(type);
}

function renderAmountDetailPanel() {
  if (!state.amountDetailOpen) return "";
  const stats = cartStats();
  return `
    <div class="amount-mask" data-amount-close>
      <section class="amount-panel" role="dialog" aria-label="费用明细">
        <header>
          <strong>费用明细</strong>
          <button data-amount-close>完成</button>
        </header>
        ${AmountDetailRows(stats, { preSubmit: true })}
        <div class="amount-panel-actions">
          <button class="outline-btn" data-amount-close>返回购物车</button>
          <button class="primary-btn" data-route="/quote">进入订单确认</button>
        </div>
      </section>
    </div>
  `;
}

function AmountDetailRows(stats, options = {}) {
  const bundleTotal = stats.selectedBundles.reduce((sum, item) => sum + Number(item.price), 0);
  const singleTotal = stats.selectedSingles.reduce((sum, item) => sum + Number(item.price), 0);
  const depositRows = (stats.merchantGroups || []).map((group) => `
    <div class="amount-row"><span>${merchants[group.merchantId].name}车辆定金</span><strong>${money(group.vehicleDeposit)}元</strong></div>
  `).join("");
  return `
    <div class="amount-detail-list">
      <div class="amount-row"><span>整包车源金额</span><strong>${money(bundleTotal)}万</strong></div>
      <div class="amount-row"><span>单台车源金额</span><strong>${money(singleTotal)}万</strong></div>
      <div class="amount-row total"><span>商品总价</span><strong>${money(stats.total)}万</strong></div>
      ${depositRows}
      <div class="amount-row vehicle-deposit-total"><span>车辆定金合计</span><strong>${money(stats.vehicleDepositTotal || 0)}元</strong></div>
      <p class="amount-rule-note">车辆定金由对应资产公司配置，不按商品金额比例计算。</p>
    </div>
  `;
}

function selectedOrderProducts(params = {}) {
  if (params.order) {
    const order = orderById(params.order);
    const exchangeReplacement = isExchangeOrder(order) ? productById("single", order.replacementId) : null;
    return {
      selectedBundles: order ? order.bundles.map((id) => productById("bundle", id)).filter(Boolean) : [],
      selectedSingles: exchangeReplacement
        ? [exchangeReplacement]
        : order
          ? order.singles.map((id) => productById("single", id)).filter(Boolean)
          : [],
    };
  }
  if (params.type && params.id) {
    const product = productById(params.type, params.id);
    return {
      selectedBundles: params.type === "bundle" && product ? [product] : [],
      selectedSingles: params.type === "single" && product ? [product] : [],
    };
  }
  return {
    selectedBundles: state.cart.bundle.filter((item) => item.selected).map((item) => productById("bundle", item.id)).filter(Boolean),
    selectedSingles: state.cart.single.filter((item) => item.selected).map((item) => productById("single", item.id)).filter(Boolean),
  };
}

function renderQuote(params = {}) {
  const order = params.order ? orderById(params.order) : null;
  const mode = params.mode || order?.status || "confirm";
  const { selectedBundles, selectedSingles } = selectedOrderProducts(params);
  const stats = purchaseStats(selectedBundles, selectedSingles);
  const isOrderDetail = Boolean(order);
  const title = isOrderDetail ? "订单明细" : "订单确认";
  const action = OrderDetailBottomAction(order, mode);
  const showPaymentSummary = isOrderDetail && ["draft", "processing"].includes(mode);
  const bottomAmount = isOrderDetail
    ? `
      <div class="quote-order-summary"><div><span>订单车辆</span><strong>共 ${stats.totalCars} 台</strong></div><em>${statusText[mode] || "订单明细"}</em></div>
      ${showPaymentSummary ? `
        <div class="order-payment-summary">
          <div><span>订单总价</span><strong>${money(order.amount)}万</strong></div>
          <div><span>所需尾款</span><strong>${money(orderTailPayment(order))}万</strong></div>
        </div>` : ""}`
    : `
      <div class="quote-total">
        已选 <em>${stats.bundleCount}个整包</em> + <em>${stats.singleCount}台单车</em>，共 <em>${stats.totalCars}台</em>
        <span>商品总价</span><span class="total-price">${money(stats.total)}万</span>
      </div>
      <div class="quote-deposit-box">
        <span>车辆定金合计</span><strong>${money(stats.vehicleDepositTotal)}元</strong><small>按资产主体分别配置</small>
      </div>`;
  const body = `
    ${appHeader(title, { back: true })}
    <section class="quote-section">
      ${isOrderDetail ? renderFulfillmentProgress(order) : ""}
      ${QuoteDetailList(selectedBundles, selectedSingles)}
      ${isExchangeOrder(order) ? renderExchangeProposal(order) : ""}
      <article class="quote-group amount-confirm-card">
        <header class="quote-group-head">
          <div>
            <h3>${isOrderDetail ? "订单信息" : "费用明细"}</h3>
            <strong>${isOrderDetail ? `订单编号：${order.orderNo}` : "不同资产主体将分别生成订单"}</strong>
          </div>
        </header>
        ${isOrderDetail
          ? `<div class="order-info-rows">
               <div class="order-secondary-info"><span>订单名称</span><strong>${order.orderName}</strong></div>
               <div class="order-secondary-info"><span>联系人电话</span><button class="order-contact-phone" data-toast="正在联系${merchants[order.merchantId].name}：${merchants[order.merchantId].contactPhone}">${icon("phone")}<span>${merchants[order.merchantId].contactPhone}</span></button></div>
               ${order.paymentVoucherUploaded ? `<div class="order-secondary-info"><span>支付凭证</span><button class="voucher-view-btn" data-view-payment-voucher="${order.id}">${icon("file")}<span>查看</span></button></div>` : ""}
             </div>`
          : AmountDetailRows(stats)}
        ${OrderDetailNotice(order, mode)}
      </article>
    </section>
    <div class="quote-bottom ${isOrderDetail ? "order-detail-bottom" : ""} ${action ? "" : "no-actions"}">
      <div class="quote-bottom-top">
        ${bottomAmount}
      </div>
      ${action ? `
        <div class="quote-bottom-actions ${isOrderDetail ? "order-detail-actions" : ""} ${isOrderDetail && (mode === "draft" || isExchangeOrder(order) || order?.processingStage === "locked_pending_payment") ? "dual-actions" : ""}">
          ${isOrderDetail ? "" : `<button class="outline-btn icon-only-btn" data-toast="已联系车辆对接人，将同步车辆照片" aria-label="联系车辆对接人">${icon("phone")}</button>`}
          ${action}
        </div>
      ` : ""}
    </div>
  `;
  return layout(null, body, { quotebar: true });
}

function OrderDetailNotice(order, mode) {
  if (mode === "draft") return `<div class="deposit-alert">${icon("wallet")} 草稿订单已生成，车辆尚未锁定；请在 ${DRAFT_PAYMENT_DAYS} 天内支付车辆定金，逾期订单将自动取消。</div>`;
  if (mode === "processing" && isExchangeOrder(order)) return "";
  if (mode === "processing" && order.processingStage === "locked_pending_payment") return `<div class="deposit-alert waiting">${icon("clock")} 车辆已锁定，请在线下完成付款后上传支付凭证。</div>`;
  if (mode === "processing" && order.processingStage === "paid") return `<div class="deposit-alert ok">${icon("check")} 支付凭证已上传，订单已进入线下合同及交付流程。</div>`;
  if (mode === "processing") return `<div class="deposit-alert waiting">${icon("clock")} 车辆定金已支付，资产公司正在确认订单车辆。</div>`;
  if (mode === "completed") return `<div class="deposit-alert ok">${icon("check")} 交易已完成。</div>`;
  if (mode === "cancelled") return `<div class="cancelled-detail-copy"><strong>订单已取消</strong><p>${order.cancelDetail || order.cancelReason || "本订单已取消。"}</p>${order.refundPendingBusinessConfirmation ? `<small>支付后车辆冲突的定金退款方式及退款时效待业务确认</small>` : ""}</div>`;
  return `<div class="deposit-alert">${icon("wallet")} 支付车辆定金后进入“处理中”。</div>`;
}

function isExchangeOrder(order) {
  return Boolean(order?.status === "processing" && order.exchangePending && order.replacementId);
}

function renderFulfillmentProgress(order) {
  if (!order || !["processing", "completed"].includes(order.status)) return "";
  const steps = [
    ["vehicle_confirming", "车辆确认中"],
    ["locked_pending_payment", "已锁定待付款"],
    ["paid", "已支付"],
    ["completed", "已完成"],
  ];
  const stage = order.status === "completed" ? "completed" : order.processingStage || "vehicle_confirming";
  const currentIndex = Math.max(0, steps.findIndex(([key]) => key === stage));
  const progress = `${(currentIndex / (steps.length - 1)) * 100}%`;
  return `
    <article class="quote-group fulfillment-progress-card">
      <header class="quote-group-head"><div><h3>履约进度</h3></div></header>
      <div class="fulfillment-stepper" style="--progress-width:${progress}">
        <div class="fulfillment-track"><i></i></div>
        ${steps.map(([key, label], index) => {
          const done = index < currentIndex || order.status === "completed";
          const current = index === currentIndex && order.status !== "completed";
          return `
            <div class="fulfillment-step ${done ? "done" : ""} ${current ? "current" : ""}">
              <span class="fulfillment-dot">${done ? icon("check") : index + 1}</span>
              <strong>${label}</strong>
            </div>`;
        }).join("")}
      </div>
    </article>
  `;
}

function orderTailPayment(order) {
  return Math.max(0, Number(order.amount || 0) - Number(order.vehicleDeposit || 0) / 10000);
}

function OrderDetailBottomAction(order, mode) {
  const cancel = order && ["draft", "processing"].includes(mode) && order.processingStage !== "paid"
    ? `<button class="ghost-btn" data-cancel-order="${order.id}">取消订单</button>`
    : "";
  if (mode === "draft") return `${cancel}<button class="primary-btn" data-order-action="pay-deposit:${order.id}">支付车辆定金</button>`;
  if (isExchangeOrder(order)) return `${cancel}<button class="primary-btn" data-order-action="accept-exchange:${order.id}">接受替换</button>`;
  if (mode === "processing" && order.processingStage === "locked_pending_payment") return `${cancel}<button class="primary-btn" data-order-action="upload-voucher:${order.id}">上传支付凭证</button>`;
  if (["processing", "completed", "cancelled"].includes(mode)) return cancel;
  return `<button class="primary-btn" data-confirm-order>确认订单</button>`;
}

function renderExchangeProposal(order) {
  const original = order.singles.map((id) => productById("single", id)).find(Boolean);
  const replacement = productById("single", order.replacementId);
  if (!original || !replacement) return "";
  const proposalCard = (label, item, tone = "") => `
    <div class="exchange-vehicle ${tone}">
      <span class="exchange-label">${label}</span>
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>${item.city} · ${item.color} · ${item.mileageRange} · ${item.license}</p>
        ${item.price ? `<strong>${money(item.price)}万</strong>` : ""}
      </div>
    </div>
  `;
  return `
    <article class="quote-group exchange-proposal">
      <header class="quote-group-head"><div><h3>管理员换车方案</h3></div></header>
      <div class="exchange-issue"><b>换车原因</b><span>${order.issue}</span></div>
      ${proposalCard("问题车辆", original, "problem")}
      <div class="exchange-arrow">↓</div>
      ${proposalCard("替换车辆", replacement, "replacement")}
    </article>
  `;
}

function QuoteDetailList(selectedBundles, selectedSingles) {
  return `
    ${selectedBundles.map((item, index) => renderQuoteBundle(item, index + 1)).join("")}
    ${renderQuoteSingles(selectedSingles)}
  `;
}

function renderQuoteBundle(product, index) {
  return `
    <article class="quote-group">
      <header class="quote-group-head">
        <div>
          <h3>整包车源 ${index} <span>（${product.cars.length}台）</span></h3>
          <strong>${product.name}</strong>
        </div>
        ${merchantOwner(product.merchantId)}
      </header>
      ${product.cars.map((item) => renderQuoteRow(item, true)).join("")}
    </article>
  `;
}

function renderQuoteSingles(products) {
  if (!products.length) return "";
  const groups = groupProductsByMerchant([], products);
  return groups.map((group) => `
      <article class="quote-group">
        <header class="quote-group-head">
          <div><h3>单台车源 <span>（${group.singles.length}台）</span></h3></div>
          ${merchantOwner(group.merchantId)}
        </header>
        ${group.singles.map((item) => renderQuoteRow(singleToVehicleWithPrice(item), false)).join("")}
      </article>
    `).join("");
}

function singleToVehicleWithPrice(product) {
  return { ...singleToVehicle(product), price: money(product.price), merchantId: product.merchantId };
}

function renderQuoteRow(item) {
  return `
    <div class="quote-row">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <div class="sub-meta"><span>${item.city}</span><span>${item.color}</span><span>${item.mileageRange}</span><span>${item.license}</span></div>
      </div>
      <div class="q-price">${item.price}<span>万</span></div>
      <span style="color:#aab0b8">›</span>
    </div>
  `;
}

const orderCategories = [
  ["all", "全部", "layers"],
  ["draft", "草稿", "file"],
  ["processing", "处理中", "clock"],
  ["completed", "已完成", "check"],
  ["cancelled", "已取消", "ban"],
];

const statusText = {
  draft: "草稿",
  processing: "处理中",
  completed: "已完成",
  cancelled: "已取消",
};

function renderOrders(params) {
  const requestedStatus = params.status || "all";
  const status = orderCategories.some(([key]) => key === requestedStatus) ? requestedStatus : "all";
  if (!isUnlocked()) {
    const guest = accessStage() === "guest";
    const body = `
      ${appHeader("订单", { showCapsule: false })}
      <section class="content locked-orders-content">
        <div class="locked-cart-panel locked-orders-panel">
          ${icon("order")}
          <h2>暂无订单</h2>
          <p>${guest ? "登录并缴纳平台准入保证金后查看订单。" : "缴纳平台准入保证金后查看订单。"}</p>
          <button class="primary-btn" data-access-gate-trigger>${guest ? "立即登录" : "立即缴纳"}</button>
        </div>
      </section>
    `;
    return layout("orders", body);
  }
  const filtered = ordersForCategory(status);
  const body = `
    ${appHeader("订单", { showCapsule: false, searchPlaceholder: "搜索订单名称 / 商品 / 商家", searchRoute: "/orders?status=all" })}
    <section class="content">
      ${StickyControls(OrderStatusGrid(status), "order-controls")}
      <div>${filtered.map(renderOrderCard).join("")}</div>
    </section>
  `;
  return layout("orders", body);
}

function ordersForCategory(status) {
  if (status === "all") return orders;
  return orders.filter((item) => item.status === status);
}

function OrderStatusGrid(status) {
  return `
    <div class="order-categories">
      ${orderCategories
        .map(([key, label]) => `
          <button class="order-cat ${status === key ? "active" : ""}" data-route="/orders?status=${key}">
            <span>${label}</span><span class="badge">${ordersForCategory(key).length}</span>
          </button>
        `)
        .join("")}
    </div>
  `;
}

function OrderCard(order) {
  const merchant = merchants[order.merchantId];
  const statusClass = order.status === "completed"
    ? "done"
    : order.status === "cancelled"
      ? "cancelled"
      : order.status === "draft"
        ? "draft"
        : "progress";
  return `
    <article class="order-card" data-order-card="${order.id}">
      <header class="order-head">
        <div class="merchant-head">
          ${merchantLogo(order.merchantId)}
          <div>
            <h3>${merchant.name}</h3>
            <div class="order-no">订单名称：${order.orderName}</div>
          </div>
        </div>
        <span class="order-status ${statusClass}">${statusText[order.status]}</span>
      </header>
      ${order.bundles.map((id) => renderOrderBundle(productById("bundle", id))).join("")}
      ${order.singles.length ? renderOrderSingles(order.singles.map((id) => productById("single", id)).filter(Boolean)) : ""}
      ${renderOrderState(order)}
      ${renderOrderActions(order)}
    </article>
  `;
}

function renderOrderCard(order) {
  return OrderCard(order);
}

function renderOrderBundle(product) {
  if (!product) return "";
  return `
    <div class="order-package-box">
      <div class="order-section-head"><strong>整包车源</strong><span>共${product.totalCount}台</span><span class="hint">左右滑动查看全部 ›</span></div>
      <div class="mini-scroll">
        ${product.cars.map((item) => renderMiniCar(item)).join("")}
      </div>
    </div>
  `;
}

function renderOrderSingles(products) {
  return `
    <div class="single-order-list">
      <div class="order-section-head"><strong>单台车源</strong><span>共${products.length}台</span></div>
      <div class="mini-scroll">
        ${products.map((item) => renderMiniCar(singleToVehicle(item))).join("")}
      </div>
    </div>
  `;
}

function renderMiniCar(item) {
  return OrderMiniVehicleCard(item);
}

function OrderMiniVehicleCard(item) {
  return `
    <div class="mini-car" data-toast="横向车源卡片">
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
    </div>
  `;
}

function renderOrderState(order) {
  if (order.status === "draft") {
    return `
      <div class="amount-box amount-stack">
        <div class="amount-line"><span>待付车辆定金</span><strong>${money(order.vehicleDeposit)}<em>元</em></strong></div>
        <small class="lock-expiry">请于 ${order.draftExpiresAt} 前支付，逾期自动取消</small>
      </div>
    `;
  }
  if (order.status === "processing" && isExchangeOrder(order)) {
    return `
      <div class="amount-box"><span>商品总价</span><strong>${money(order.amount)}<em>万</em></strong></div>
      <div class="contact-note">管理员已发起车辆替换方案，请查看并确认。</div>
    `;
  }
  if (order.status === "processing") {
    const stageCopy = {
      vehicle_confirming: ["车辆确认中", "资产公司正在确认订单车辆"],
      locked_pending_payment: ["车辆已锁定，待付款", "线下付款后请上传支付凭证"],
      paid: ["已支付", "等待线下合同、交付及平台确认"],
    }[order.processingStage || "vehicle_confirming"];
    return `
      <div class="amount-box amount-stack processing-state-box">
        <div class="order-reminder">${icon(order.processingStage === "paid" ? "check" : "clock")} ${stageCopy[0]}</div>
        <div class="processing-card-copy">${stageCopy[1]}</div>
      </div>
    `;
  }
  if (order.status === "completed") {
    return `<div class="completed-note">${icon("check")} 订单已完成</div>`;
  }
  if (order.status === "cancelled") {
    return `
      <div class="cancel-reason">取消原因：${order.cancelReason}</div>
    `;
  }
  return "";
}

function renderOrderActions(order) {
  let actions = [["ghost-btn", "查看明细", "route", `/quote?order=${order.id}`]];
  if (order.status === "draft") {
    actions = [
      ...actions,
      ["ghost-btn", "取消订单", "cancel", order.id],
      ["primary-btn", "支付车辆定金", "order", `pay-deposit:${order.id}`],
    ];
  } else if (isExchangeOrder(order)) {
    actions = [
      ["ghost-btn", "取消订单", "cancel", order.id],
      ["primary-btn", "确认换车方案", "route", `/quote?order=${order.id}`],
    ];
  } else if (order.status === "processing" && order.processingStage === "locked_pending_payment") {
    actions = [
      ...actions,
      ["ghost-btn", "取消订单", "cancel", order.id],
      ["primary-btn", "上传支付凭证", "order", `upload-voucher:${order.id}`],
    ];
  } else if (order.status === "processing" && order.processingStage !== "paid") {
    actions.push(["ghost-btn", "取消订单", "cancel", order.id]);
  }
  if (!actions.length) return "";
  return `
    <div class="order-actions">
      ${actions
        .map(([cls, text, kind, action]) => {
          if (kind === "cancel") return `<button class="${cls}" data-cancel-order="${action}">${text}</button>`;
          if (kind === "order") return `<button class="${cls}" data-order-action="${action}">${text}</button>`;
          if (kind === "open-order") return `<button class="${cls}" data-open-order="${action}">${text}</button>`;
          if (kind === "toast") return `<button class="${cls}" data-toast="${action}">${text}</button>`;
          return `<button class="${cls}" data-route="${action}">${text}</button>`;
        })
        .join("")}
    </div>
  `;
}

function renderMine() {
  const stage = accessStage();
  const guestCard = `
    <article class="panel-card mine-access-card guest">
      <div class="access-state-icon">${icon("user")}</div>
      <h2>未登录状态</h2>
      <p>登录后可缴纳平台准入保证金，并解锁完整车源信息。</p>
      <button class="primary-btn" data-demo-login>登录</button>
    </article>`;
  const depositCard = `
    <article class="panel-card admission-status-card ${stage === "unlocked" ? "paid" : "unpaid"}">
      <div class="mine-title"><span>平台准入保证金</span><strong>${stage === "unlocked" ? "已缴纳" : "未缴纳"}</strong></div>
      <div class="admission-status-amount"><span>保证金金额</span><b>${money(ADMISSION_DEPOSIT_AMOUNT)}<small>元</small></b></div>
      <div class="admission-validity"><span>有效期</span><strong>长期有效</strong></div>
      ${stage === "unlocked"
        ? ""
        : `<button class="primary-btn" data-open-admission-deposit>立即缴纳</button>`}
    </article>`;
  const body = `
    ${appHeader("我的", { time: "14:32" })}
    <section class="mine-content access-mine">
      ${stage === "guest" ? guestCard : `${UserProfileCard()}${depositCard}`}
      <section class="panel-card demo-state-panel">
        <div><strong>Demo 状态控制</strong><p>可按“未登录 → 已登录未缴纳 → 已缴纳”顺序演示。</p></div>
        <button class="outline-btn" data-reset-access>重置状态</button>
      </section>
      ${stage === "guest" ? "" : `
        <section class="panel-card mine-section">
          <div class="mine-title"><span>采购概览</span><button data-route="/orders?status=all">查看订单 ›</button></div>
          <div class="stats-grid">
            ${mineStat("cart", String(cartProductEntries().length), "个", "购物车", "/purchase?type=bundle")}
            ${mineStat("file", String(ordersForCategory("draft").length), "单", "草稿", "/orders?status=draft")}
            ${mineStat("clock", String(ordersForCategory("processing").length), "单", "处理中", "/orders?status=processing")}
          </div>
        </section>`}
      <section class="panel-card mine-section">
        <div class="mine-title"><span>账户与服务</span></div>
        <div class="account-list">
          ${accountRow("pin", "收货 / 提车信息")}
          ${accountRow("help", "常见问题")}
          ${accountRow("info", "关于平台")}
        </div>
      </section>
    </section>
  `;
  return layout("mine", body);
}

function UserProfileCard() {
  return `
    <article class="panel-card profile-card">
      <div class="company-logo"><span class="mark">${icon("car")}</span></div>
      <div class="profile-info">
        <h2>上海新橙汽车贸易有限公司</h2>
        <span class="cert">${icon("shield")} 已认证采购商</span>
        <p>联系人：陈女士</p>
        <p>手机号：138****2689</p>
      </div>
      <span class="arrow">›</span>
    </article>
  `;
}

function mineStat(ico, number, unit, label, route) {
  return `
    <button class="stat-item" data-route="${route}">
      ${icon(ico)}
      <strong>${number}<small>${unit}</small></strong>
      <span>${label}</span>
    </button>
  `;
}

function quickItem(ico, label) {
  return `
    <button class="quick-item" data-toast="${label}演示">
      ${icon(ico)}
      <span>${label}</span>
    </button>
  `;
}

function accountRow(ico, label) {
  return `
    <button class="account-row" data-toast="${label}演示">
      ${icon(ico)}
      <span>${label}</span>
      <span>›</span>
    </button>
  `;
}

function openAccessGate(targetRoute = "") {
  state.pendingUnlockRoute = targetRoute;
  state.accessGateOpen = true;
  state.admissionDepositOpen = false;
  render();
}

function closeAccessGate() {
  state.accessGateOpen = false;
  state.pendingUnlockRoute = "";
  render();
}

function demoLogin() {
  state.access.loggedIn = true;
  state.access.admissionPaid = false;
  state.accessGateOpen = false;
  state.pendingUnlockRoute = "";
  persistAccess();
  toast("登录成功，请缴纳平台准入保证金");
  render();
}

function openAdmissionDeposit() {
  state.accessGateOpen = false;
  state.admissionDepositOpen = true;
  render();
}

function closeAdmissionDeposit() {
  state.admissionDepositOpen = false;
  render();
}

function confirmAdmissionDeposit() {
  state.access.loggedIn = true;
  state.access.admissionPaid = true;
  persistAccess();
  const target = state.pendingUnlockRoute;
  state.pendingUnlockRoute = "";
  state.admissionDepositOpen = false;
  toast("平台准入保证金缴纳成功，完整车源已解锁");
  if (target) go(target);
  else render();
}

function resetAccessState() {
  state.access = { loggedIn: false, admissionPaid: false };
  state.filters = { bundle: {}, single: {} };
  state.activeFilter = null;
  state.accessGateOpen = false;
  state.admissionDepositOpen = false;
  state.pendingUnlockRoute = "";
  persistAccess();
  toast("Demo 已重置为未登录状态");
  if (parseRoute().segments[0] === "mine") render();
  else go("/mine");
}

function isFavorite(type, id) {
  return state.cart[type].some((item) => item.id === id);
}

function persistCart() {
  saveStoredObject("xincheng:cart", state.cart);
}

function toggleFavorite(type, id) {
  const exists = state.cart[type].some((item) => item.id === id);
  if (exists) {
    state.cart[type] = state.cart[type].filter((item) => item.id !== id);
    toast("已移出购物车");
  } else {
    state.cart[type].unshift({ id, selected: true });
    toast("已加入购物车");
  }
  persistCart();
  render();
}

function addToCart(type, id) {
  if (!state.cart[type].some((item) => item.id === id)) {
    state.cart[type].push({ id, selected: true });
  } else {
    const item = state.cart[type].find((row) => row.id === id);
    item.selected = true;
  }
  toast("已加入购物车");
  persistCart();
  render();
}

function deleteSwipe(token) {
  const [scope, type, id] = token.split(":");
  if (scope === "cart") {
    state.cart[type] = state.cart[type].filter((item) => item.id !== id);
    toast("已从购物车删除");
    persistCart();
  }
  render();
}

function selectFilter(kind, type, value) {
  const defaultValue = filterOptions[kind]?.[0];
  if (!state.filters[type]) state.filters[type] = {};
  if (value === defaultValue) delete state.filters[type][kind];
  else state.filters[type][kind] = value;
  state.activeFilter = null;
  toast(value);
  render();
}

function toggleCart(type, id) {
  const item = state.cart[type].find((row) => row.id === id);
  if (item) item.selected = !item.selected;
  persistCart();
  render();
}

function toggleCartAll(type) {
  const allSelected = state.cart[type].length > 0 && state.cart[type].every((item) => item.selected);
  state.cart[type].forEach((item) => {
    item.selected = !allSelected;
  });
  persistCart();
  render();
}

function requestSubmitOrder() {
  if (!isUnlocked()) {
    openAccessGate();
    return;
  }
  const route = parseRoute();
  const { selectedBundles, selectedSingles } = selectedOrderProducts(route.params);
  if (!selectedBundles.length && !selectedSingles.length) {
    toast("请先选择车源");
    return;
  }
  state.confirmSubmitOrderOpen = true;
  render();
}

function closeSubmitOrderDialog() {
  state.confirmSubmitOrderOpen = false;
  render();
}

function confirmSubmitOrder() {
  state.confirmSubmitOrderOpen = false;
  submitCurrentOrder(true);
}

function submitWithoutDeposit() {
  state.confirmSubmitOrderOpen = false;
  submitCurrentOrder(false);
}

function vehicleById(id) {
  for (const product of bundleProducts) {
    const matched = product.cars.find((item) => item.id === id);
    if (matched) return matched;
  }
  const single = singleProducts.find((item) => item.id === id);
  return single ? singleToVehicle(single) : null;
}

function closeConflictDialog() {
  state.conflictDialog = null;
  render();
}

function openOrderCard(orderId) {
  const order = orderById(orderId);
  if (!order) return;
  if (order.status === "processing" && order.mayConflictAfterDeposit) {
    order.status = "cancelled";
    order.cancelReason = "部分车辆已被其他订单优先锁定";
    order.cancelDetail = "因部分车辆已被其他订单优先锁定，本订单无法继续履约。";
    order.refundPendingBusinessConfirmation = true;
    order.mayConflictAfterDeposit = false;
    state.conflictDialog = {
      orderId: order.id,
      vehicles: (order.conflictVehicleIds || []).map(vehicleById).filter(Boolean),
    };
    render();
    return;
  }
  go(`/quote?order=${order.id}`);
}

function formatDateTime(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function draftWindowFromNow() {
  const expiresAtMs = Date.now() + DRAFT_PAYMENT_DAYS * 24 * 60 * 60 * 1000;
  return {
    draftExpiresAt: formatDateTime(new Date(expiresAtMs)),
    draftExpiresAtMs: expiresAtMs,
  };
}

function expireDraftOrders() {
  const now = Date.now();
  let changed = false;
  orders.forEach((order) => {
    if (order.status !== "draft" || !order.draftExpiresAtMs || now < order.draftExpiresAtMs) return;
    order.status = "cancelled";
    order.cancelReason = `草稿超过 ${DRAFT_PAYMENT_DAYS} 天未支付车辆定金，订单自动取消`;
    order.cancelDetail = `本订单在 ${DRAFT_PAYMENT_DAYS} 天草稿有效期内未完成车辆定金支付，现已自动取消。`;
    delete order.draftExpiresAt;
    delete order.draftExpiresAtMs;
    changed = true;
  });
  return changed;
}

function submitCurrentOrder(payVehicleDeposit = true) {
  const route = parseRoute();
  const { selectedBundles, selectedSingles } = selectedOrderProducts(route.params);
  if (!selectedBundles.length && !selectedSingles.length) {
    toast("请先选择车源");
    return;
  }
  const groups = groupProductsByMerchant(selectedBundles, selectedSingles);
  const now = Date.now();
  groups.reverse().forEach((group, index) => {
    const first = group.bundles[0] || group.singles[0];
    orders.unshift({
      id: `temp-${now}-${index}`,
      status: payVehicleDeposit ? "processing" : "draft",
      ...(payVehicleDeposit ? { processingStage: "vehicle_confirming" } : draftWindowFromNow()),
      merchantId: group.merchantId,
      orderNo: `LS${String(now + index).slice(-14)}`,
      orderName: backendConfiguredOrderName(group.merchantId, first.city),
      sourceTypes: [
        ...(group.bundles.length ? ["整包车源"] : []),
        ...(group.singles.length ? ["单台车源"] : []),
      ],
      bundles: group.bundles.map((item) => item.id),
      singles: group.singles.map((item) => item.id),
      amount: group.amount,
      vehicleDeposit: group.vehicleDeposit,
      temporary: true,
    });
  });
  selectedBundles.forEach((product) => {
    state.cart.bundle = state.cart.bundle.filter((item) => item.id !== product.id);
  });
  selectedSingles.forEach((product) => {
    state.cart.single = state.cart.single.filter((item) => item.id !== product.id);
  });
  persistCart();
  toast(payVehicleDeposit
    ? `车辆定金支付成功，已按资产主体生成 ${groups.length} 个处理中订单`
    : `已按资产主体生成 ${groups.length} 个草稿订单，请在 ${DRAFT_PAYMENT_DAYS} 天内支付车辆定金`);
  go(`/orders?status=${payVehicleDeposit ? "processing" : "draft"}`);
}

function handleOrderAction(token) {
  const [action, orderId] = token.split(":");
  const order = orderById(orderId);
  if (!order) return;
  if (action === "pay-deposit" && order.status === "draft") {
    order.status = "processing";
    order.processingStage = "vehicle_confirming";
    delete order.draftExpiresAt;
    delete order.draftExpiresAtMs;
    toast("车辆定金支付成功，订单已进入处理中");
    render();
    return;
  }
  if (action === "upload-voucher" && order.status === "processing" && order.processingStage === "locked_pending_payment") {
    state.voucherUploadOrderId = order.id;
    state.voucherFileName = "";
    render();
    return;
  }
  if (action === "accept-exchange") {
    const replacement = productById("single", order.replacementId);
    if (!replacement) return;
    order.singles = [replacement.id];
    order.amount = Number(replacement.price);
    order.status = "processing";
    order.processingStage = "vehicle_confirming";
    order.exchangePending = false;
    delete order.exchangeDecision;
    toast("已接受替换方案，订单继续进入车辆确认流程");
    go("/orders?status=processing");
    return;
  }
}

function closeVoucherUpload() {
  if (state.voucherFileUrl && typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") {
    URL.revokeObjectURL(state.voucherFileUrl);
  }
  state.voucherUploadOrderId = null;
  state.voucherFileName = "";
  state.voucherFileUrl = "";
  state.voucherFileType = "";
  render();
}

function confirmVoucherUpload() {
  const order = state.voucherUploadOrderId ? orderById(state.voucherUploadOrderId) : null;
  if (!order || !state.voucherFileName || order.status !== "processing" || order.processingStage !== "locked_pending_payment") return;
  order.processingStage = "paid";
  order.paymentVoucherUploaded = true;
  order.paymentVoucherName = state.voucherFileName;
  order.paymentVoucherUploadedAt = formatDateTime(new Date());
  order.paymentVoucherUrl = state.voucherFileUrl;
  order.paymentVoucherType = state.voucherFileType;
  state.voucherUploadOrderId = null;
  state.voucherFileName = "";
  state.voucherFileUrl = "";
  state.voucherFileType = "";
  toast("支付凭证上传成功，履约进度已更新为已支付");
  render();
}

function openPaymentVoucher(orderId) {
  const order = orderById(orderId);
  if (!order?.paymentVoucherUploaded) return;
  state.paymentVoucherPreviewOrderId = order.id;
  render();
}

function closePaymentVoucher() {
  state.paymentVoucherPreviewOrderId = null;
  render();
}

function cancelOrder(orderId) {
  const order = orderById(orderId);
  if (!order || !["draft", "processing"].includes(order.status) || order.processingStage === "paid") return;
  state.confirmCancelOrderId = order.id;
  render();
}

function closeCancelDialog() {
  state.confirmCancelOrderId = null;
  render();
}

function confirmCancelOrder(orderId) {
  const order = orderById(orderId);
  if (!order || !["draft", "processing"].includes(order.status) || order.processingStage === "paid") return;
  const willDeductDeposit = order.status === "processing" && Number(order.vehicleDeposit) > 0;
  const depositAmount = Number(order.vehicleDeposit || 0);
  order.status = "cancelled";
  order.cancelReason = willDeductDeposit
    ? `买家主动取消订单，已扣除车辆定金 ${money(depositAmount)} 元`
    : "买家主动取消订单";
  if (willDeductDeposit) order.deductedDeposit = depositAmount;
  state.confirmCancelOrderId = null;
  toast(willDeductDeposit ? "订单已取消，车辆定金已扣除" : "订单已取消");
  go("/orders?status=cancelled");
}

let toastTimer;
function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
}

function enableSwipe() {
  document.querySelectorAll(".swipe-row").forEach((row) => {
    let sx = 0;
    let sy = 0;
    let moved = false;
    row.addEventListener("pointerdown", (event) => {
      sx = event.clientX;
      sy = event.clientY;
      moved = false;
    });
    row.addEventListener("pointerup", (event) => {
      const dx = event.clientX - sx;
      const dy = event.clientY - sy;
      if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy)) {
        moved = true;
        document.querySelectorAll(".swipe-row.swiped").forEach((item) => {
          if (item !== row) item.classList.remove("swiped");
        });
        row.classList.toggle("swiped", dx < 0);
      }
      if (moved) event.preventDefault();
    });
  });
}

function enableBannerSwipe() {
  if (typeof document.querySelector !== "function") return;
  const banner = document.querySelector("[data-banner-touch]");
  if (!banner) return;
  let sx = 0;
  let sy = 0;
  banner.addEventListener("pointerdown", (event) => {
    sx = event.clientX;
    sy = event.clientY;
  });
  banner.addEventListener("pointerup", (event) => {
    const dx = event.clientX - sx;
    const dy = event.clientY - sy;
    if (Math.abs(dx) < 38 || Math.abs(dx) < Math.abs(dy)) return;
    state.bannerIndex = (state.bannerIndex + (dx < 0 ? 1 : -1) + bannerSlides.length) % bannerSlides.length;
    render();
  });
}

function render() {
  expireDraftOrders();
  const route = parseRoute();
  const page = route.segments[0] || "home";
  let html;
  if (page === "home") html = renderHome(route.params);
  else if (page === "search") html = renderSearch(route.params);
  else if (page === "detail") html = renderDetail(route.segments);
  else if (page === "purchase") html = renderPurchase(route.params);
  else if (page === "purchase-search") html = renderPurchaseSearch();
  else if (page === "quote") html = renderQuote(route.params);
  else if (page === "orders") html = renderOrders(route.params);
  else if (page === "mine") html = renderMine();
  else html = renderHome({ type: "bundle" });
  app.innerHTML = html;
  enableSwipe();
  enableBannerSwipe();
}

document.addEventListener("click", (event) => {
  const backTop = event.target.closest("[data-back-top]");
  if (backTop) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const filterValue = event.target.closest("[data-filter-value]");
  if (filterValue) {
    event.stopPropagation();
    selectFilter(filterValue.dataset.filterKind, filterValue.dataset.filterType, filterValue.dataset.filterValue);
    return;
  }

  const filterClose = event.target.closest("[data-filter-close]");
  if (filterClose) {
    state.activeFilter = null;
    render();
    return;
  }

  const amountClose = event.target.closest("[data-amount-close]");
  if (amountClose) {
    state.amountDetailOpen = false;
    render();
    return;
  }

  const amountDetail = event.target.closest("[data-amount-detail]");
  if (amountDetail) {
    state.amountDetailOpen = true;
    render();
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    if (!isUnlocked()) {
      openAccessGate();
      return;
    }
    const next = { kind: filter.dataset.filter, type: filter.dataset.filterType };
    state.activeFilter = state.activeFilter?.kind === next.kind && state.activeFilter?.type === next.type ? null : next;
    render();
    return;
  }

  const accessGateTrigger = event.target.closest("[data-access-gate-trigger]");
  if (accessGateTrigger) {
    openAccessGate();
    return;
  }

  const bannerDot = event.target.closest("[data-banner-index]");
  if (bannerDot) {
    state.bannerIndex = Number(bannerDot.dataset.bannerIndex);
    render();
    return;
  }

  const clearCartSearch = event.target.closest("[data-cart-search-clear]");
  if (clearCartSearch) {
    const input = document.querySelector("[data-cart-search-input]");
    if (input) input.value = "";
    updateCartSearch("");
    input?.focus();
    return;
  }

  const clearCatalogSearch = event.target.closest("[data-catalog-search-clear]");
  if (clearCatalogSearch) {
    const input = document.querySelector("[data-catalog-search-input]");
    if (input) input.value = "";
    updateCatalogSearch("");
    input?.focus();
    return;
  }

  const clearSearch = event.target.closest("[data-clear-search]");
  if (clearSearch) {
    event.stopPropagation();
    const route = parseRoute();
    const type = route.params.type || "bundle";
    go(`/search?type=${type}&q=`);
    return;
  }

  const back = event.target.closest("[data-back]");
  if (back) {
    if (history.length > 1) history.back();
    else go("/home?type=bundle");
    return;
  }

  const favorite = event.target.closest("[data-favorite-toggle]");
  if (favorite) {
    event.stopPropagation();
    const [type, id] = favorite.dataset.favoriteToggle.split(":");
    toggleFavorite(type, id);
    return;
  }

  const add = event.target.closest("[data-add-cart]");
  if (add) {
    event.stopPropagation();
    const [type, id] = add.dataset.addCart.split(":");
    addToCart(type, id);
    return;
  }

  const swipeDelete = event.target.closest("[data-swipe-delete]");
  if (swipeDelete) {
    deleteSwipe(swipeDelete.dataset.swipeDelete);
    return;
  }

  const cartToggle = event.target.closest("[data-cart-toggle]");
  if (cartToggle) {
    event.stopPropagation();
    const [type, id] = cartToggle.dataset.cartToggle.split(":");
    toggleCart(type, id);
    return;
  }

  const cartAll = event.target.closest("[data-cart-all]");
  if (cartAll) {
    toggleCartAll(cartAll.dataset.cartAll);
    return;
  }

  const closeSubmitDialog = event.target.closest("[data-submit-dialog-close]");
  if (closeSubmitDialog) {
    closeSubmitOrderDialog();
    return;
  }

  const confirmSubmit = event.target.closest("[data-submit-order-confirm]");
  if (confirmSubmit) {
    confirmSubmitOrder();
    return;
  }

  const submitWithoutPayment = event.target.closest("[data-submit-without-deposit]");
  if (submitWithoutPayment) {
    submitWithoutDeposit();
    return;
  }

  const submitBackdrop = event.target.closest("[data-submit-dialog-backdrop]");
  if (submitBackdrop && event.target === submitBackdrop) {
    closeSubmitOrderDialog();
    return;
  }

  const closeVoucher = event.target.closest("[data-voucher-upload-close]");
  if (closeVoucher) {
    closeVoucherUpload();
    return;
  }

  const confirmVoucher = event.target.closest("[data-voucher-upload-confirm]");
  if (confirmVoucher && !confirmVoucher.disabled) {
    confirmVoucherUpload();
    return;
  }

  const voucherBackdrop = event.target.closest("[data-voucher-upload-backdrop]");
  if (voucherBackdrop && event.target === voucherBackdrop) {
    closeVoucherUpload();
    return;
  }

  const viewVoucher = event.target.closest("[data-view-payment-voucher]");
  if (viewVoucher) {
    openPaymentVoucher(viewVoucher.dataset.viewPaymentVoucher);
    return;
  }

  const closeVoucherPreview = event.target.closest("[data-voucher-preview-close]");
  if (closeVoucherPreview) {
    closePaymentVoucher();
    return;
  }

  const voucherPreviewBackdrop = event.target.closest("[data-voucher-preview-backdrop]");
  if (voucherPreviewBackdrop && event.target === voucherPreviewBackdrop) {
    closePaymentVoucher();
    return;
  }

  const closeAccess = event.target.closest("[data-access-gate-close]");
  if (closeAccess) {
    closeAccessGate();
    return;
  }

  const accessBackdrop = event.target.closest("[data-access-gate-backdrop]");
  if (accessBackdrop && event.target === accessBackdrop) {
    closeAccessGate();
    return;
  }

  const login = event.target.closest("[data-demo-login]");
  if (login) {
    demoLogin();
    return;
  }

  const openDeposit = event.target.closest("[data-open-admission-deposit]");
  if (openDeposit) {
    openAdmissionDeposit();
    return;
  }

  const closeDeposit = event.target.closest("[data-admission-deposit-close]");
  if (closeDeposit) {
    closeAdmissionDeposit();
    return;
  }

  const depositBackdrop = event.target.closest("[data-admission-deposit-backdrop]");
  if (depositBackdrop && event.target === depositBackdrop) {
    closeAdmissionDeposit();
    return;
  }

  const confirmDeposit = event.target.closest("[data-confirm-admission-deposit]");
  if (confirmDeposit) {
    confirmAdmissionDeposit();
    return;
  }

  const resetAccess = event.target.closest("[data-reset-access]");
  if (resetAccess) {
    resetAccessState();
    return;
  }

  const conflictClose = event.target.closest("[data-conflict-close]");
  if (conflictClose) {
    closeConflictDialog();
    return;
  }

  const conflictBackdrop = event.target.closest("[data-conflict-backdrop]");
  if (conflictBackdrop && event.target === conflictBackdrop) {
    closeConflictDialog();
    return;
  }

  const closeCancel = event.target.closest("[data-cancel-dialog-close]");
  if (closeCancel) {
    closeCancelDialog();
    return;
  }

  const confirmCancel = event.target.closest("[data-confirm-cancel]");
  if (confirmCancel) {
    confirmCancelOrder(confirmCancel.dataset.confirmCancel);
    return;
  }

  const cancelBackdrop = event.target.closest("[data-cancel-dialog-backdrop]");
  if (cancelBackdrop && event.target === cancelBackdrop) {
    closeCancelDialog();
    return;
  }

  const cancelTarget = event.target.closest("[data-cancel-order]");
  if (cancelTarget) {
    cancelOrder(cancelTarget.dataset.cancelOrder);
    return;
  }

  const orderAction = event.target.closest("[data-order-action]");
  if (orderAction) {
    handleOrderAction(orderAction.dataset.orderAction);
    return;
  }

  const openOrder = event.target.closest("[data-open-order]");
  if (openOrder) {
    openOrderCard(openOrder.dataset.openOrder);
    return;
  }

  const confirm = event.target.closest("[data-confirm-order]");
  if (confirm) {
    requestSubmitOrder();
    return;
  }

  const toastTarget = event.target.closest("[data-toast]");
  if (toastTarget) {
    toast(toastTarget.dataset.toast);
    return;
  }

  const productRoute = event.target.closest("[data-product-route]");
  if (productRoute) {
    const target = productRoute.dataset.productRoute;
    if (isUnlocked()) go(target);
    else openAccessGate(target);
    return;
  }

  const route = event.target.closest("[data-route]");
  if (route) {
    const target = route.dataset.route;
    if (target) go(target);
    return;
  }

  const orderCard = event.target.closest("[data-order-card]");
  if (orderCard) {
    openOrderCard(orderCard.dataset.orderCard);
  }
});

document.addEventListener("input", (event) => {
  const voucherFile = event.target.closest("[data-voucher-file]");
  if (voucherFile) {
    const file = voucherFile.files?.[0];
    if (state.voucherFileUrl && typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") {
      URL.revokeObjectURL(state.voucherFileUrl);
    }
    state.voucherFileName = file?.name || "";
    state.voucherFileType = file?.type || "";
    state.voucherFileUrl = file && typeof URL !== "undefined" && typeof URL.createObjectURL === "function"
      ? URL.createObjectURL(file)
      : "";
    render();
    return;
  }

  const catalogInput = event.target.closest("[data-catalog-search-input]");
  if (catalogInput) {
    updateCatalogSearch(catalogInput.value);
    return;
  }
  const input = event.target.closest("[data-cart-search-input]");
  if (!input) return;
  updateCartSearch(input.value);
});

window.addEventListener("hashchange", render);

if (window.location.hash !== "#/mine") {
  go("/mine");
  render();
} else {
  render();
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const page = parseRoute().segments[0] || "home";
    if (page !== "home") return;
    state.bannerIndex = (state.bannerIndex + 1) % bannerSlides.length;
    render();
  }, 3800);

  setInterval(() => {
    if (expireDraftOrders()) render();
  }, 60000);
}
