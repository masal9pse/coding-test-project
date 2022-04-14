# coding-test-project

## ディレクトリ構成
1. const
 - 都道府県の情報など値に変更がない固定値を定義します。

2. model
- ビジネスロジックを記述しています。

3. components
- ページの部品とその部品で使われる状態を管理しています。

4. services
- API通信の処理を記述します。

ディレクトリ構成に関してはこちらの記事( https://pentagon.tokyo/app/2937/#toc_id_2_1 )を参考にしました。

## setting enviroment
.envこのプロジェクトの直下に配置して下記のコードを入力してください。

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
