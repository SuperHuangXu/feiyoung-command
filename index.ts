import * as inquirer from "inquirer";
import { login } from "./login";
import { getConfig } from "./configs";

async function getToken() {
  return new Promise(resolve => {
    inquirer
      .prompt([
        {
          name: "token",
          message: "请粘贴token：",
          type: "input"
        }
      ])
      .then(answers => {
        const { token } = answers;
        resolve(token);
      });
  });
}

(async () => {
  try {
    const token = await getToken();
    const { nasip, userip, usermac } = await getConfig();
    const { responseCode, replyMessage } = await login(
      nasip,
      usermac,
      userip,
      token
    );
    console.log(responseCode, replyMessage);
  } catch (e) {
    console.error(`错误：${e}`);
  }
})();
