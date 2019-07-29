import * as request from "superagent";
import * as url from "url";
import * as qs from "querystring";

async function getConfig() {
  const res: any = await request.get("http://www.msftconnecttest.com/redirect");
  const urlRes = res!.request.url;
  const query = url.parse(urlRes).query;
  const qsObj = qs.parse(query);
  const userip = qsObj["userip"];
  const usermac = qsObj["usermac"];
  const nasip = qsObj["nasip"];

  return {
    userip,
    usermac,
    nasip
  };
}

export { getConfig };
