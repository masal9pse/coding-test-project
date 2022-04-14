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
import LineChart from "./LineChart";
import Vue from "vue";
import PrefList from "../consts/PrefList";
import ChartContainerModel from "../models/ChartContainerModel";
import ResasApiService from "../services/ResasApiService";

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
        ResasApiService.getFutureResponse(pref.number).then((response) => {
          let reactiveObject = ChartContainerModel.getReactiveObjectForInsert(
            response,
            this.datacollection,
            pref
          );
          Vue.set(this.datacollection, pref.number, reactiveObject);
        });
      } else {
        let reactiveObject = ChartContainerModel.getReactiveObjectForDelete(
          event,
          this.datacollection
        );
        Vue.delete(this.datacollection, pref.number, reactiveObject);
      }
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
