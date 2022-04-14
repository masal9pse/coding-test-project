import axios from "axios";

function getFutureResponse(prefNumber) {
  this.url =
    process.env.VUE_APP_RESAS_BASE_URL +
    "/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
    prefNumber;

  let futureResponse = axios.get(this.url, {
    headers: {
      "X-API-KEY": process.env.VUE_APP_RESAS_API_KEY,
    },
    data: {},
  });
  return futureResponse;
}

export default {
  getFutureResponse,
};
