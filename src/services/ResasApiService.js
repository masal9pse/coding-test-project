import axios from "axios";

function getBaseFutureResponse(parameter) {
  let url = process.env.VUE_APP_RESAS_BASE_URL + parameter;

  let futureResponse = axios.get(url, {
    headers: {
      "X-API-KEY": process.env.VUE_APP_RESAS_API_KEY,
    },
    data: {},
  });
  return futureResponse;
}

function getFuturePrefsResponse() {
  let parameter = "/api/v1/prefectures";
  let futureResponse = getBaseFutureResponse(parameter);
  return futureResponse;
}

function getFuturePopulationResponse(prefNumber) {
  let parameter =
    "/api/v1/population/composition/perYear?cityCode=-&prefCode=" + prefNumber;
  let futureResponse = getBaseFutureResponse(parameter);
  return futureResponse;
}

export default {
  getFuturePrefsResponse,
  getFuturePopulationResponse,
};
