<template>
  <div class="small">
    <h2>県別人口構成グラフ</h2>
    <label v-for="(pref, index) in pref_list" :key="index">
      <input
        type="checkbox"
        v-on:change="onChange(pref, $event)"
        :value="pref.text"
      />
      <span v-text="pref.text"></span>
    </label>
    <line-chart :chart-data="datacollection" :option="options"></line-chart>
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
      selected: 13,
      pref_list: [
        { value: 1, text: "北海道" },
        { value: 2, text: "青森県" },
        { value: 3, text: "岩手県" },
        { value: 4, text: "宮城県" },
        { value: 5, text: "秋田県" },
        { value: 6, text: "山形県" },
        { value: 7, text: "福島県" },
        { value: 8, text: "茨城県" },
        { value: 9, text: "栃木県" },
        { value: 10, text: "群馬県" },
        { value: 11, text: "埼玉県" },
        { value: 12, text: "千葉県" },
        { value: 13, text: "東京都" },
        { value: 14, text: "神奈川県" },
        { value: 15, text: "新潟県" },
        { value: 16, text: "富山県" },
        { value: 17, text: "石川県" },
        { value: 18, text: "福井県" },
        { value: 19, text: "山梨県" },
        { value: 20, text: "長野県" },
        { value: 21, text: "岐阜県" },
        { value: 22, text: "静岡県" },
        { value: 23, text: "愛知県" },
        { value: 24, text: "三重県" },
        { value: 25, text: "滋賀県" },
        { value: 26, text: "京都府" },
        { value: 27, text: "大阪府" },
        { value: 28, text: "兵庫県" },
        { value: 29, text: "奈良県" },
        { value: 30, text: "和歌山県" },
        { value: 31, text: "鳥取県" },
        { value: 32, text: "島根県" },
        { value: 33, text: "岡山県" },
        { value: 34, text: "広島県" },
        { value: 35, text: "山口県" },
        { value: 36, text: "徳島県" },
        { value: 37, text: "香川県" },
        { value: 38, text: "愛媛県" },
        { value: 39, text: "高知県" },
        { value: 40, text: "福岡県" },
        { value: 41, text: "佐賀県" },
        { value: 42, text: "長崎県" },
        { value: 43, text: "熊本県" },
        { value: 44, text: "大分県" },
        { value: 45, text: "宮崎県" },
        { value: 46, text: "鹿児島県" },
        { value: 47, text: "沖縄県" },
      ],
      selected_pref_list: [],
    };
  },
  methods: {
    onChange(value, event) {
      if (event.target.checked) {
        this.url =
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
          value.value;

        axios
          .get(this.url, {
            headers: {
              "X-API-KEY": "xLmOUH2rMuDJJqMWVsqi5bCSB11f0AlsklOLp6JF",
            },
            data: {},
          })
          .then((response) => {
            let obj = {};
            obj.datasets = [];
            obj = this.datacollection;
            obj.datasets.push({
              label: value.text,
              borderColor: this.getRandomColor(),
              fill: false,
              data: response.data.result.data[0].data.map((x) => x.value),
            });
            Vue.set(this.datacollection, value.value, obj);
            console.log("値を追加しました。");
            console.log(obj.datasets);
          });
      } else {
        let obj = {};
        obj.datasets = [];
        obj = this.datacollection;
        var checkedIndex = this.getDeletedCheckedIndex(obj.datasets, event);

        obj.datasets.splice(checkedIndex, 1);
        Vue.delete(this.datacollection, value.value, obj);
        console.log("値を削除しました。");
        console.log(obj.datasets);
      }
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
</style>