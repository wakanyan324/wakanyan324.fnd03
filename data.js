//カフェのリスト（`cafeList`）や、お店のデータそのものだけを管理する場所。

/**
 * cafeList配列　
 * @param {Array} array 配列
 * @returns {}　配列の要素　
 * */

window.cafeList = [
{
    id: 1,
    name: "Typica",
    station: "西荻窪",
    visited: true,
    drinkName: "ブラックコーヒー",
    totalScore: 5,
    sweets: "パフェ",
    comment: "パフェが美味しい。通ってる。",
    mapUrl: "https://share.google/oQraxm3DR9t8VnTvp",
    instaUrl: "https://www.instagram.com/typica_nishiogi/?utm_source=ig_web_button_share_sheet",
    image: "images/PXL_20260508_103941500.jpg"
  },
  {
    id: 2,
    name: "AKHA AMA COFFEE",
    station: "高田馬場",
    visited: true,
    drinkName: "ブラックコーヒー",
    totalScore: 5,
    sweets: "キャロットケーキ",
    comment: "美味しい。ほかのスイーツも気になる。",
    mapUrl: "",
    instaUrl: "",
    image: "images/PXL_20260905_035527764.jpg"
  },
  {
    id: 3,
    name: "Bonnet",
    station: "",
    visited: false,
    drinkName: "",
    totalScore: null,
    sweets: "秋のスイーツ",
    comment: "かぼちゃスイーツが食べたい。",
    mapUrl: "",
    instaUrl: "",
    image: ""
  }
];

