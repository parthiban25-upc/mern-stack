## GitHub Copilot Chat

- Extension: 0.46.2 (prod)
- VS Code: 1.118.1 (034f571df509819cc10b0c8129f66ef77a542f0e)
- OS: darwin 25.4.0 arm64
- GitHub Account: parthiban25-upc

## Network

User Settings:
```json
  "http.systemCertificatesNode": false,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: timed out after 10 seconds
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (1 ms)
- Electron fetch (configured): Error (6356 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: timed out after 10 seconds
- Node.js fetch: timed out after 10 seconds

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: timed out after 10 seconds
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (3 ms)
- Electron fetch (configured): HTTP 200 (9242 ms)
- Node.js https: HTTP 200 (7937 ms)
- Node.js fetch: timed out after 10 seconds

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 4.225.11.192 (9914 ms)
- DNS ipv6 Lookup: 64:ff9b::4e1:bc0 (1123 ms)
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (1003 ms)
- Node.js https: HTTP 200 (1933 ms)
- Node.js fetch: HTTP 200 (974 ms)

Connecting to https://mobile.events.data.microsoft.com: timed out after 10 seconds
Connecting to https://dc.services.visualstudio.com: HTTP 404 (9107 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (2197 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (1924 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (223 ms)

Number of system certificates: 2

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).