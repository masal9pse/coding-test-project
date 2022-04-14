## ディレクトリ構成

1. models
- ビジネスロジックを記述しています。

2. components
- ページの部品とその部品で使われる状態を管理しています。

3. services
- API通信の処理を記述します。

ディレクトリ構成に関してはこちらの記事( https://pentagon.tokyo/app/2937/#toc_id_2_1 )を参考にしました。

## 環境変数の定義
「.env」ファイルをこのプロジェクトの直下に配置して下記のコードを入力してください。

## バージョン情報

```
"axios": "^0.26.1",
"chart.js": "^2.9.3",
"core-js": "^3.8.3",
"vue": "^2.6.14",
"vue-axios": "^3.4.1",
"vue-chartjs": "^3.5.0"
```

```.env

NODE_ENV='dev'
VUE_APP_RESAS_BASE_URL = "https://opendata.resas-portal.go.jp"
VUE_APP_RESAS_API_KEY='取得したAPI_KEYを入力してください'

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
