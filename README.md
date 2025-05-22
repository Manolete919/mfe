# TEST
This applications uses 4 apps, marketing, auth, container and dashboard. The nexst steps are required.
```
cd /home/opc/microfrontend/mfe/packages/marketing
npm i
...
npm start
```
output
```
home/opc/microfrontend/mfe/packages/marketing
[opc@vm-training-mgr marketing]$ ^C
[opc@vm-training-mgr marketing]$ npm start

> marketing@1.0.0 start
> webpack server --config config/webpack.dev.js

? ?wds?: Project is running at http://localhost:9091/
? ?wds?: webpack output is served from http://localhost:9091/
? ?wds?: Content not from webpack is served from /home/opc/microfrontend/mfe/packages/marketing
? ?wds?: 404s will fallback to /index.html
(node:41118) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
        Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
        Make sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.
(Use `node --trace-deprecation ...` to show where the warning was created)
? ?wdm?: asset vendors-node_modules_material-ui_core_esm_Box_Box_js-node_modules_material-ui_core_esm_Button-aead4d.js 1.66 MiB [emitted] (id hint: vendors)
asset main.js 407 KiB [emitted] (name: main)
asset src_bootstrap_js.js 27.1 KiB [emitted]
asset remoteEntry.js 12.6 KiB [emitted] (name: marketing)
asset index.html 229 bytes [emitted]
orphan modules 70.1 KiB [orphan] 58 modules
runtime modules 12.4 KiB 21 modules
modules by path ./node_modules/ 1.76 MiB 209 modules
modules by path ./src/ 13.4 KiB
  modules by path ./src/*.js 2.06 KiB
    ./src/index.js 22 bytes [built] [code generated]
    ./src/bootstrap.js 1.19 KiB [built] [code generated]
    ./src/App.js 871 bytes [built] [code generated]
  modules by path ./src/components/*.js 11.3 KiB
    ./src/components/Landing.js 4.79 KiB [built] [code generated]
    ./src/components/Pricing.js 6.55 KiB [built] [code generated]
container entry 42 bytes [built] [code generated]
./util.inspect (ignored) 15 bytes [built] [code generated]
webpack 5.88.0 compiled successfully in 3182 ms
? ?wdm?: Compiled successfully.
```

# CREDENTIALS

## Repository secrets

[New repository secret](https://github.com/Manolete919/mfe/settings/secrets/actions/new)

| Name                |
| ------------------- |
| `OCI_BUCKET_NAME`   |
| `OCI_FINGERPRINT`   |
| `OCI_NAMESPACE`     |
| `OCI_PRIVATE_KEY`   |
| `OCI_REGION`        |
| `OCI_TENANCY_OCID`  |
| `OCI_USER_OCID`     |
| `PRODUCTION_DOMAIN` |

# OCI BUCKET

## Credential as secrets

> OCI_PRIVATE_KEY

```
-----BEGIN PRIVATE KEY-----
MIIBIjANBgkqhkiG9w0BAQE...
...
-----END PRIVATE KEY-----
OCI_API_KEY
```

> add OCI_API_KEY at the end
>
> https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm

### output

Run PREFIX="marketing/latest"
  PREFIX="marketing/latest"
  BUCKET_NAME="***"
  NAMESPACE="***"
  # Step 1: Delete all objects with the given prefix in OCI bucket
  echo "Deleting existing objects in bucket '$BUCKET_NAME' with prefix '$PREFIX/'..."
  
  oci os object list \
    --bucket-name "$BUCKET_NAME" \
    --namespace "$NAMESPACE" \
    --prefix "$PREFIX/" \
    --all \
    --query "data[].name" \
    --raw-output | \
    sed 's/[",]//g' | grep -vE '^\[|\]$' | while read -r object; do
    echo "Deleting: $object"
    oci os object delete \
    --bucket-name "$BUCKET_NAME" \
    --namespace "$NAMESPACE" \
    --name "$object" \
    --force
  done
  
  # Step 2: Upload new files from dist/
  echo "Uploading dist/ with correct MIME types..."
  
  find dist -type f | while read file; do
    object_name="${file#dist/}"  # Remove 'dist/' prefix for object name
    object_name="${PREFIX}/${object_name}"    # Add 'marketing/' prefix
    content_type=$(file --mime-type -b "$file")  # Detect MIME type
  
    echo "Uploading $object_name with type $content_type"
    oci os object put \
      --bucket-name "$BUCKET_NAME" \
      --namespace "$NAMESPACE" \
      --name "$object_name" \
      --file "$file" \
      --content-type "$content_type" \
      --force
  done
  echo "? Upload complete."
  shell: /usr/bin/bash -e {0}
Deleting existing objects in bucket '***' with prefix 'marketing/latest/'...
Query returned empty result, no output to show.
Uploading dist/ with correct MIME types...
Uploading marketing/latest/750.eadcb0f625d4016ddfa9.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "03822f7e-e522-4bdc-823a-6a13b3d3237f",
  "last-modified": "Thu, 22 May 2025 14:08:48 GMT",
  "opc-content-md5": "PS2It4d5GKMmY0SZ/uq4DA=="
}
Uploading marketing/latest/remoteEntry.js with type application/javascript
Uploading object
{
  "etag": "0d3f7048-e894-4c54-9aec-07aa49d67261",
  "last-modified": "Thu, 22 May 2025 14:08:49 GMT",
  "opc-content-md5": "Fdm+IBUeykm5YCoelGUhtg=="
}
Uploading marketing/latest/main.267a7d72f9b5bffa38d8.js with type application/javascript
Uploading object
{
  "etag": "38a9c40f-9103-4c14-a1ae-0fac5cbd27b5",
  "last-modified": "Thu, 22 May 2025 14:08:50 GMT",
  "opc-content-md5": "0HV/VTqE4Do/oXlE5Rg+Ag=="
}
Uploading marketing/latest/250.150e75b58897a525c110.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "1ba19b4d-2768-4650-93fe-2a93537538ce",
  "last-modified": "Thu, 22 May 2025 14:08:50 GMT",
  "opc-content-md5": "b85Tx8dxPr9hcSzCkpdG+g=="
}
Uploading marketing/latest/935.b277c3b1562ae7b89896.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "728da16d-a29f-4fbc-89c3-15509c36294d",
  "last-modified": "Thu, 22 May 2025 14:08:51 GMT",
  "opc-content-md5": "DAsGpMZqwJIh6FGVRfyPMQ=="
}
Uploading marketing/latest/935.b277c3b1562ae7b89896.js with type application/javascript
Uploading object
{
  "etag": "b333cab7-a2aa-40c6-8e9b-934349b267bd",
  "last-modified": "Thu, 22 May 2025 14:08:51 GMT",
  "opc-content-md5": "LQK3WVGJ1D1hbYFHHRW2Mg=="
}
Uploading marketing/latest/254.e54e451462d220167269.js with type application/javascript
Uploading object
{
  "etag": "095ba7c6-c0b5-4ffb-8ffc-ae29ba6236d1",
  "last-modified": "Thu, 22 May 2025 14:08:52 GMT",
  "opc-content-md5": "y0UaTFC6aFn1rT+AR+gGMw=="
}
Uploading marketing/latest/750.eadcb0f625d4016ddfa9.js with type application/javascript
Uploading object
{
  "etag": "6ddce22a-28d9-4ed9-be0e-8b9bc2e7aaf1",
  "last-modified": "Thu, 22 May 2025 14:08:53 GMT",
  "opc-content-md5": "CCskbLmS2WNqnpxhfYyzrw=="
}
Uploading marketing/latest/250.150e75b58897a525c110.js with type application/javascript
Uploading object
{
  "etag": "06a08f40-a4e4-4828-8536-723967ac3849",
  "last-modified": "Thu, 22 May 2025 14:08:53 GMT",
  "opc-content-md5": "+GoztzDtrYrLc88oQFhGJA=="
}
Uploading marketing/latest/858.407c1d574f62860dc527.js with type application/javascript
Uploading object
{
  "etag": "20c20c1a-0443-41d0-8216-1e909542b355",
  "last-modified": "Thu, 22 May 2025 14:08:54 GMT",
  "opc-content-md5": "o2+hWBtihOELrNvLFt2JAQ=="
}
Uploading marketing/latest/294.14331f88c383b63c4b62.js with type application/javascript
Uploading object
{
  "etag": "c0f29bb9-0c71-4745-9c31-26f406291cfd",
  "last-modified": "Thu, 22 May 2025 14:08:55 GMT",
  "opc-content-md5": "Cjo65rvFovYz/CvfkniYyg=="
}
Uploading marketing/latest/294.14331f88c383b63c4b62.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "9143f76c-099b-4e36-903a-b05dffa36865",
  "last-modified": "Thu, 22 May 2025 14:08:55 GMT",
  "opc-content-md5": "FrfCSwMhEJlBBDvxgtOWOQ=="
}
Uploading marketing/latest/858.407c1d574f62860dc527.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "db549c63-6782-450a-9724-2dbdfe5b9630",
  "last-modified": "Thu, 22 May 2025 14:08:56 GMT",
  "opc-content-md5": "b85Tx8dxPr9hcSzCkpdG+g=="
}
? Upload complete.
```

## Test url

```bash
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/container/latest/index.html
```

## HTML (SRC JS)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Container new</title>
</head>
<body>
  <div id="root"></div>
  <script src="main.451f3fd90e6817ed8d18.js"></script>
</body>
</html>
```

> The problem is, that main.451f3fd90e6817ed8d18.js, doesn't include the URL for the THML

This should be: https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/container/main.451f3fd90e6817ed8d18.js

# Webpack

```json
  output: {
    // template for file names
    // contenthash is used for cashing
    filename: '[name].[contenthash].js',
    // for aws
    //publicPath: '/container/lastest'
  },
```

## Route 1

### path

```
/{anypath*}
```

### Methods

```
GET
```

### URL

```
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/container/latest/index.html
```

### CORS

```
Allowed origins:*
Allowed methods:*
```

## Route 2

### path

```
/container/latest/{files}
```

### Methods

```
GET
```

### URL

```
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/container/latest/${request.path[files]}
```

### CORS

```
Allowed origins:*
Allowed methods:*
```

## Route 3

### path

```
/auth/latest/{files}
```

### Methods

```
GET
```

### URL

```
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/auth/latest/${request.path[files]}
```

### CORS

```
Allowed origins:*
Allowed methods:*
```

## Route 4

### path

```
/marketing/latest/{files}
```

### Methods

```
GET
```

### URL

```
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/marketing/latest/${request.path[files]}
```

### CORS

```
Allowed origins:*
Allowed methods:*
```
