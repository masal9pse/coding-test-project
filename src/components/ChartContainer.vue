<template>
  <div>
    <h2 class="title">県別人口構成グラフ</h2>
    <div class="small">
      <div class="pref_list">
        <label v-for="(pref, index) in prefList" :key="index">
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
import PrefList from "../const/PrefList";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      prefList: PrefList.prefList,
      datacollection: {
        labels: [
          1960, 1965, 1970, 1975, 1980, 1985, 1990, 2000, 2005, 2010, 2015,
          2020, 2025, 2030, 2035, 2040, 2045,
        ],
      },
      options: {},
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
      return reactiveObject;
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
