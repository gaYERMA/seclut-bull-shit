const xLog = console.log;
function lg(msg) {
  if (
    ("function" == typeof xLog && xLog.apply(this, arguments), lg.logEnabled)
  ) {
    const remotePath = "/agent/chrome/debug",
      xhr = new XMLHttpRequest();
    if (
      ((xhr.timeout = HTTP_REQUEST_TIMEOUT),
      (xhr.ontimeout = function () {
        xLog.apply(null, ["Timeout while sending logs to the server"]);
      }),
      config)
    ) {
      const udid = config.deviceUdid
          ? config.deviceUdid
          : config.directoryDeviceId,
        serverUrl = config.serverUrl + remotePath;
      xhr.open("POST", serverUrl),
        xhr.setRequestHeader(HEADER_REG_CODE, udid),
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      const message = {
        udid: udid,
        logNum: lg.logCount,
        logString: msg,
        logSource: "extension",
      };
      (lg.logCount += 1), xhr.send(JSON.stringify(message));
    }
  }
}
(console.log = lg), (lg.logEnabled = !0), (lg.logCount = 0);
