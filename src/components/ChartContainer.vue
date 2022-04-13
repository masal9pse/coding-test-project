<template>
  <div>
    <h2 class="title">県別人口構成グラフ</h2>
    <div class="small">
      <div class="pref_list">
        <label v-for="(pref, index) in pref_list" :key="index">
          <input
            type="checkbox"
            v-on:change="onChange(pref, $event)"
            :value="pref.name"
          />
          <span v-text="pref.name"></span>
        </label>
      </div>
      <line-chart :chart-data="datacollection" :option="options"></line-chart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart.js";
import Vue from "vue";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: {
        labels: [
          1960, 1965, 1970, 1975, 1980, 1985, 1990, 2000, 2005, 2010, 2015,
          2020, 2025, 2030, 2035, 2040, 2045,
        ],
      },
      options: {},
      pref_list: [
        { number: 1, name: "北海道" },
        { number: 2, name: "青森県" },
        { number: 3, name: "岩手県" },
        { number: 4, name: "宮城県" },
        { number: 5, name: "秋田県" },
        { number: 6, name: "山形県" },
        { number: 7, name: "福島県" },
        { number: 8, name: "茨城県" },
        { number: 9, name: "栃木県" },
        { number: 10, name: "群馬県" },
        { number: 11, name: "埼玉県" },
        { number: 12, name: "千葉県" },
        { number: 13, name: "東京都" },
        { number: 14, name: "神奈川県" },
        { number: 15, name: "新潟県" },
        { number: 16, name: "富山県" },
        { number: 17, name: "石川県" },
        { number: 18, name: "福井県" },
        { number: 19, name: "山梨県" },
        { number: 20, name: "長野県" },
        { number: 21, name: "岐阜県" },
        { number: 22, name: "静岡県" },
        { number: 23, name: "愛知県" },
        { number: 24, name: "三重県" },
        { number: 25, name: "滋賀県" },
        { number: 26, name: "京都府" },
        { number: 27, name: "大阪府" },
        { number: 28, name: "兵庫県" },
        { number: 29, name: "奈良県" },
        { number: 30, name: "和歌山県" },
        { number: 31, name: "鳥取県" },
        { number: 32, name: "島根県" },
        { number: 33, name: "岡山県" },
        { number: 34, name: "広島県" },
        { number: 35, name: "山口県" },
        { number: 36, name: "徳島県" },
        { number: 37, name: "香川県" },
        { number: 38, name: "愛媛県" },
        { number: 39, name: "高知県" },
        { number: 40, name: "福岡県" },
        { number: 41, name: "佐賀県" },
        { number: 42, name: "長崎県" },
        { number: 43, name: "熊本県" },
        { number: 44, name: "大分県" },
        { number: 45, name: "宮崎県" },
        { number: 46, name: "鹿児島県" },
        { number: 47, name: "沖縄県" },
      ],
    };
  },
  methods: {
    onChange(pref, event) {
      if (event.target.checked) {
        this.url =
          process.env.VUE_APP_RESAS_BASE_URL +
          "/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
          pref.number;

        axios
          .get(this.url, {
            headers: {
              "X-API-KEY": process.env.VUE_APP_RESAS_API_KEY,
            },
            data: {},
          })
          .then((response) => {
            let reactiveObject = this.getReactiveObjectForInsert(
              response,
              pref
            );
            Vue.set(this.datacollection, pref.number, reactiveObject);
          });
      } else {
        let reactiveObject = this.getReactiveObjectForDelete(event);
        Vue.delete(this.datacollection, pref.number, reactiveObject);
      }
    },
    getReactiveObjectForInsert(response, pref) {
      let reactiveObject = {};
      reactiveObject.datasets = [];
      reactiveObject = this.datacollection;
      reactiveObject.datasets.push({
        label: pref.name,
        borderColor: this.getRandomColor(),
        fill: false,
        data: response.data.result.data[0].data.map((x) => x.value),
      });
      console.log(reactiveObject.datasets);
      return reactiveObject;
    },
    getReactiveObjectForDelete(event) {
      let reactiveObject = {};
      reactiveObject.datasets = [];
      reactiveObject = this.datacollection;
      var checkedIndex = this.getDeletedCheckedIndex(
        reactiveObject.datasets,
        event
      );
      console.log(reactiveObject.datasets);
      reactiveObject.datasets.splice(checkedIndex, 1);
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    getDeletedCheckedIndex(datasets, event) {
      var checkedIndex = null;
      datasets.forEach((dataset, index) => {
        if (dataset.label == event.target.value) {
          checkedIndex = index;
        }
      });
      return checkedIndex;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 10px auto;
}
.title {
  background-color: gray;
}
.pref_list {
  margin-bottom: 60px;
}
</style>
