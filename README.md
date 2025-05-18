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

> we need to upload the correct type

```bash
Run mkdir -p ~/.oci
  mkdir -p ~/.oci
  echo "***
 
  ***" > ~/.oci/oci_api_key.pem
  chmod 600 ~/.oci/oci_api_key.pem
  cat > ~/.oci/config <<EOF
  [DEFAULT]
  user=***
  fingerprint=***
  key_file=~/.oci/oci_api_key.pem
  tenancy=***
  region=***
  EOF
  oci setup repair-file-permissions --file ~/.oci/config
  shell: /usr/bin/bash -e {0}
4s

Run PREFIX="container"
  PREFIX="container"
  echo "Uploading dist/ with correct MIME types..."
  find dist -type f | while read file; do
    object_name="${file#dist/}"  # Remove 'dist/' prefix for object name
    object_name="${PREFIX}/${object_name}"    # Add 'container/' prefix
    content_type=$(file --mime-type -b "$file")  # Detect MIME type
  
    echo "Uploading $object_name with type $content_type"
    oci os object put \
      --bucket-name *** \
      --namespace *** \
      --name "$object_name" \
      --file "$file" \
      --content-type "$content_type" \
      --force
  done
  
  echo "✅ Upload complete."
  shell: /usr/bin/bash -e {0}
Uploading dist/ with correct MIME types...
Uploading container/935.e13b300861b9ef25d3e1.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "ae528705-645b-4a07-b703-15c394088ab7",
  "last-modified": "Sat, 17 May 2025 20:58:33 GMT",
  "opc-content-md5": "DAsGpMZqwJIh6FGVRfyPMQ=="
}
Uploading container/main.451f3fd90e6817ed8d18.js with type application/javascript
Uploading object
{
  "etag": "774cea4f-27c0-477d-b6cd-84ec8141204a",
  "last-modified": "Sat, 17 May 2025 20:58:33 GMT",
  "opc-content-md5": "9Unlv5SAhOLVe3i2BEJERg=="
}
Uploading container/294.0e87e067dfd35bf5739c.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "cde90dc3-b7f4-4a70-94bd-0fe258e4fccc",
  "last-modified": "Sat, 17 May 2025 20:58:34 GMT",
  "opc-content-md5": "FrfCSwMhEJlBBDvxgtOWOQ=="
}
Uploading container/228.94b469ddf973ab5fbd32.js with type application/javascript
Uploading object
{
  "etag": "f451faa2-6112-42f1-ae7b-2246238cb233",
  "last-modified": "Sat, 17 May 2025 20:58:35 GMT",
  "opc-content-md5": "9VTDUKiFj5k24nkHUfpupA=="
}
Uploading container/294.0e87e067dfd35bf5739c.js with type application/javascript
Uploading object
{
  "etag": "1f618b3a-edbb-43eb-a266-fc7f93872d55",
  "last-modified": "Sat, 17 May 2025 20:58:35 GMT",
  "opc-content-md5": "1wptmAAXiu/gCu33WsD5Uw=="
}
Uploading container/index.html with type text/html
Uploading object
{
  "etag": "0cb30ec1-6f7c-414a-bccf-2b8258de9331",
  "last-modified": "Sat, 17 May 2025 20:58:36 GMT",
  "opc-content-md5": "3eAStZvnPnTzx/0zUU06jg=="
}
Uploading container/935.e13b300861b9ef25d3e1.js with type application/javascript
Uploading object
{
  "etag": "b4037d07-097b-4e32-8a08-cdfc7e5d16d3",
  "last-modified": "Sat, 17 May 2025 20:58:36 GMT",
  "opc-content-md5": "aJOEYLDBmmuO9ZvDozciSA=="
}
✅ Upload complete.
```

## Test url

```bash
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/container/index.html
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

## Errors

```bash
main.451f3fd90e6817ed8d18.js:1 Uncaught (in promise) ScriptExternalLoadError: Loading script failed.
(error: http://undefined:9091/marketing/remoteEntry.js)
while loading "./MarketingApp" from 839
    at 839 (main.451f3fd90e6817ed8d18.js:1:123)
    at i (main.451f3fd90e6817ed8d18.js:1:630)
    at main.451f3fd90e6817ed8d18.js:1:3410
    at i.I (main.451f3fd90e6817ed8d18.js:1:3570)
    at main.451f3fd90e6817ed8d18.js:1:5207
    at 271 (main.451f3fd90e6817ed8d18.js:1:5386)
    at main.451f3fd90e6817ed8d18.js:1:5769
    at Array.forEach (<anonymous>)
    at i.f.consumes (main.451f3fd90e6817ed8d18.js:1:5599)
    at main.451f3fd90e6817ed8d18.js:1:907
```

> This needs the other mfe apps

## Troubleshooting

> curl -I "https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/marketing%2FremoteEntry.js"

output

```bash
HTTP/1.1 200 OK
accept-ranges: bytes
Content-Length: 5967
content-md5: 53uM36dy13MW2Ns25ujxUA==
last-modified: Sat, 17 May 2025 22:06:29 GMT
etag: 0995a6a2-e452-4949-98d0-9a104af2cd73
version-id: 5536de97-28b3-4e58-bc0d-d28ae66245d0
storage-tier: Standard
Content-Type: application/javascript
date: Sat, 17 May 2025 22:10:43 GMT
opc-request-id: iad-1:2QCfEWOsU_iiMQ2SYDklewDczHOkOo5JVmx4cD0ufByFexACMhZ5f-7ecHUa2Rhk
x-api-id: native
x-content-type-options: nosniff
strict-transport-security: max-age=31536000; includeSubDomains
access-control-allow-origin: *
access-control-allow-methods: POST,PUT,GET,HEAD,DELETE,OPTIONS
access-control-allow-credentials: true
access-control-expose-headers: accept-ranges,access-control-allow-credentials,access-control-allow-methods,access-control-allow-origin,content-length,content-md5,content-type,date,etag,last-modified,opc-client-info,opc-request-id,storage-tier,strict-transport-security,version-id,x-api-id,x-content-type-options
```

