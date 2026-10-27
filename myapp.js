//data.js` からデータを受け取って、HTMLのパーツを作ったり、画面に表示したり、ボタンが押されたときの動きを管理する場所。

dayjs().format(); //day.jsを使うためのもの　

/*
実装済み
1. imgを表示できるようにする
OK各お店をカード型で表示させたい~~
２．インスタリンクを表示できるようにする→できればインスタのアイコン付き？
３．行ったカフェと行ってないカフェを絞り込みできるようにしたい
→ JavaScriptの `.filter()` という機能を使って、`visited: true` のものだけを簡単に取り出せます。
４．評価順で並べかえできるようにしたい
JavaScriptの `.sort()` を使って、`totalScore` が高い順に一瞬で並び替えられます。
４．ボタン一つで新規追加のカードが表示されるようにしたい
並び替えボタンを右端に
お店追加ボタンの大きさ
未完
リロードしたときに新規追加のカードがなくなるのをどうにかする
★の数分表示させる
６．行った日を登録する→登録順で並び替え
既存カードの編集・削除ボタンを追加　
残り

訪問日追加　
Googlemapアイコン
*/

/**
 * cafeCafe関数　
 * @param {object} cafe cafeList配列の中にある一つ一つのオブジェクトデータ
 * @returns {HTMLDivElement} HTMLDiv要素
 */

const cafeCard = (cafe) => {
  // 1. カード全体の箱を作る
  const cardEl = document.createElement('div');
  cardEl.className = 'cafe-card'; // クラス名もわかりやすく！

  const textContainer = document.createElement('div');
  textContainer.className = 'cafe-text';

  // 2. 店名を表示する要素 (<h2>タグなど)
  const nameEl = document.createElement('h2');
  nameEl.innerText = cafe.name;
  textContainer.append(nameEl);

  // 3. 最寄駅を表示する要素
  //cafe.stationと書くだけで、真偽判定をする　trueの場合処理実行
  if (cafe.station) {
    const stationEl = document.createElement('p');
    stationEl.className = 'station';
    stationEl.innerText = `最寄駅: ${cafe.station}`;
    textContainer.append(stationEl);
  }

  // 4. スイーツ・ドリンク情報
  if (cafe.drinkName || cafe.sweets) {
  const menuEl = document.createElement('p');
  menuEl.innerText = `注文: ${cafe.drinkName} / ${cafe.sweets}`;
  textContainer.append(menuEl);
  }

  // 5. 評価 (totalScore)
  if (cafe.totalScore) {
    const scoreEl = document.createElement('p');
    scoreEl.innerText = `評価: ⭐${cafe.totalScore}点`;
    textContainer.append(scoreEl);
  }

  // 6. コメント
  const commentEl = document.createElement('p');
  commentEl.className = 'comment';
  commentEl.innerText = `感想・コメント： ${cafe.comment}`;
  textContainer.append(commentEl);

  // 7. リンク (GoogleMap や Instagram) がある場合だけボタンやリンクを作る
  if (cafe.mapUrl) {
    const mapLink = document.createElement('a');
    mapLink.className = 'map-link';
    mapLink.href = cafe.mapUrl; //リンク先のURLを指定
    mapLink.innerText = 'Google Map'; //表示させる文字を指定
    mapLink.target = '_blank'; // 別タブで開く
    textContainer.append(mapLink);
  }

  //インスタのURLがあるときだけ表示
  if (cafe.instaUrl) {
    const instaLink = document.createElement('a');
    instaLink.className = 'insta-link';
    instaLink.href = cafe.instaUrl;
    instaLink.target = '_blank';
    // ① アイコン用の <i> タグをJavaScriptで新しく作る
    const iconEl = document.createElement('i');
    iconEl.className = 'fa-brands fa-instagram';

    // ② リンクの中に「アイコン」と「Instagramという文字」を順番に追加する
    instaLink.append(iconEl);
    instaLink.append(' Instagram'); // アイコンと文字の間に少しスペースを空ける

    textContainer.append(instaLink);
  }
  cardEl.append(textContainer);

  //8.画像があるときだけ表示
  if(cafe.image){
    //画像要素を全部親要素divにまとめるとCSSで指定がしやすい
    const imageEl = document.createElement('div');
    imageEl.className = 'images';

    const newImage = document.createElement('img');
    newImage.src = cafe.image;

    imageEl.append(newImage);
    cardEl.append(imageEl);
  }

  return cardEl; // 組み立てたカードを返す！
};

// 画面にカードを表示する共通関数
const displayCafes = (cafes) => {
  const containerEl = document.querySelector('#cafelist');
  containerEl.innerHTML = ''; // いったん画面をきれいにする

  cafes.forEach((cafe) => {
    const card = cafeCard(cafe);
    containerEl.append(card);
  });
};

// ① ページを読み込んだときは「全部」を表示する
//DOMContentLoadedは、画像読み込みを待たず、HTMLの骨組み読み込みが終わった瞬間に実行される
//そのためこちらの方が一般的によく使われる
window.addEventListener('DOMContentLoaded', () => {
  displayCafes(window.cafeList);
});

// ①「すべて」ボタンが押されたとき
document.querySelector('#btn-all').addEventListener('click', () => {
  displayCafes(window.cafeList); // 全体のリストをそのまま渡す
});

//行ったお店と行きたいお店で絞り込む
//行ったお店タブがクリックされたときにいったお店のみ表示
const visitedButton = document.querySelector('#btn-visited');
visitedButton.addEventListener('click', () => {
  const visitedCafes = window.cafeList.filter(cafe => cafe.visited);
  displayCafes(visitedCafes);
});

// 「行きたいお店ボタン」が押されたときのイベントリスナー
const wantButton = document.querySelector('#btn-want'); // ※HTMLにボタンがあるのが先
wantButton.addEventListener('click', () => {
  const wantCafes = window.cafeList.filter(cafe => !cafe.visited);
  displayCafes(wantCafes); // 絞り込んだリストを渡して画面を更新する！
});

// 評価順に並び替え　
const sortedButton = document.querySelector('#btn-sort');
sortedButton.addEventListener('click', () => {
  const sortedCafes = [...window.cafeList].sort((cafeA , cafeB) => cafeB.totalScore - cafeA.totalScore);
  displayCafes(sortedCafes);
});

// 新規スポットを追加ボタンが押されたときに、フォームを出す
const newButton = document.querySelector('#btn-new');
const formCard = document.querySelector('#cafe-form-card');

newButton.addEventListener('click', () => {
  // フォームが隠れていれば出し、出ていれば隠す
  if (formCard.style.display === 'block') {
    formCard.style.display = 'none';
  } else {
    formCard.style.display = 'block';
  }
});

  // 2. 新しいカフェのオブジェクトを作る
  // 入力欄からデータを回収して、1つのオブジェクトにして返す「まとめ用関数」
const getCafeInputData = () => {
  return {
    name: document.querySelector('#input-name').value,
    station: document.querySelector('#input-station').value,
    visited: document.querySelector('#input-visited').checked,// またはチェックボックスの値など
    drinkName: document.querySelector('#input-drink').value,
    totalScore: Number(document.querySelector('#input-score').value),
    // 数字として認識させる必要があるため、Numberを先頭につける
    sweets: document.querySelector('#input-menu').value,
    comment: document.querySelector('#input-comment').value,
    mapUrl: document.querySelector('#input-map').value,
    instaUrl: document.querySelector('#input-insta').value,
    image: document.querySelector('#input-image').value,
  };
};

// 新規データを保存する共通の関数
const saveCafeData = () => {
  const newCafe = getCafeInputData();

  // (簡単なバリデーション：名前が空っぽじゃなければ進める)
  if (newCafe.name === '') {
    alert('店名を入力してください');
    return;
  }

  window.cafeList.push(newCafe);
  displayCafes(window.cafeList);

// 入力欄をリセット
  document.querySelector('#input-name').value = '';
  document.querySelector('#input-station').value = '';
  document.querySelector('#input-menu').value = '';
  document.querySelector('#input-comment').value = '';
  document.querySelector('#input-map').value = '';
  document.querySelector('#input-insta').value = '';
  document.querySelector('#input-image').value = '';

  formCard.style.display = 'none';
};

//保存ボタンが押されたとき
const saveButton = document.querySelector('#btn-save');
saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  saveCafeData();
});

//Enterが押されたとき
formCard.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
  e.preventDefault();
  saveCafeData();
  }
});
