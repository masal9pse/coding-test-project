<template>
  <div>
    <h2 class="title">県別人口構成グラフ</h2>
    <div class="small">
      <div class="pref_list">
        <label v-for="(pref, index) in prefList" :key="index">
          <input
            type="checkbox"
            v-on:change="onChange(pref, $event)"
            :value="pref.prefName"
          />
          <span v-text="pref.prefName"></span>
        </label>
      </div>
      <line-chart :chart-data="datacollection" :option="options"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import Vue from "vue";
import ChartContainerModel from "../models/ChartContainerModel";
import ResasApiService from "../services/ResasApiService";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      prefList: [],
      datacollection: {
        labels: [
          1960, 1965, 1970, 1975, 1980, 1985, 1990, 2000, 2005, 2010, 2015,
          2020, 2025, 2030, 2035, 2040, 2045,
        ],
      },
      options: {},
    };
  },
  mounted() {
    this.getPrefsResponse();
  },
  methods: {
    getPrefsResponse() {
      ResasApiService.getFuturePrefsResponse().then((response) => {
        this.prefList = response.data.result;
      });
    },
    onChange(pref, event) {
      if (event.target.checked) {
        ResasApiService.getFuturePopulationResponse(pref.prefCode).then(
          (response) => {
            let reactiveObject = ChartContainerModel.getReactiveObjectForInsert(
              response,
              this.datacollection,
              pref
            );
            Vue.set(this.datacollection, pref.prefCode, reactiveObject);
          }
        );
      } else {
        let reactiveObject = ChartContainerModel.getReactiveObjectForDelete(
          event,
          this.datacollection
        );
        Vue.delete(this.datacollection, pref.prefCode, reactiveObject);
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
