## output

> we need to upload the correct type

```bash
Run echo "Uploading dist/ with correct MIME types..."
  echo "Uploading dist/ with correct MIME types..."
  find dist -type f | while read file; do
    object_name="${file#dist/}"  # Remove 'dist/' prefix for object name
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
Uploading 935.e13b300861b9ef25d3e1.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "1528c237-6e84-4f1f-aa94-95c5c2986db1",
  "last-modified": "Sat, 17 May 2025 20:28:20 GMT",
  "opc-content-md5": "DAsGpMZqwJIh6FGVRfyPMQ=="
}
Uploading main.451f3fd90e6817ed8d18.js with type application/javascript
Uploading object
{
  "etag": "59f291ba-338d-404f-baae-f139842b7620",
  "last-modified": "Sat, 17 May 2025 20:28:20 GMT",
  "opc-content-md5": "9Unlv5SAhOLVe3i2BEJERg=="
}
Uploading 294.0e87e067dfd35bf5739c.js.LICENSE.txt with type text/plain
Uploading object
{
  "etag": "9ac62db8-095c-4662-b9f1-3a07394adb5f",
  "last-modified": "Sat, 17 May 2025 20:28:21 GMT",
  "opc-content-md5": "FrfCSwMhEJlBBDvxgtOWOQ=="
}
Uploading 228.94b469ddf973ab5fbd32.js with type application/javascript
Uploading object
{
  "etag": "fb495ee1-cc1e-4321-90cc-13e4ce6f6077",
  "last-modified": "Sat, 17 May 2025 20:28:22 GMT",
  "opc-content-md5": "9VTDUKiFj5k24nkHUfpupA=="
}
Uploading 294.0e87e067dfd35bf5739c.js with type application/javascript
Uploading object
{
  "etag": "802c9078-713c-4871-a12c-98326345ca44",
  "last-modified": "Sat, 17 May 2025 20:28:22 GMT",
  "opc-content-md5": "1wptmAAXiu/gCu33WsD5Uw=="
}
Uploading index.html with type text/html
Uploading object
{
  "etag": "1510b925-1412-4926-85db-ba1dd64fb0b3",
  "last-modified": "Sat, 17 May 2025 20:28:23 GMT",
  "opc-content-md5": "H6NoAQ4Dpcs/JVxdr+bXaw=="
}
Uploading 935.e13b300861b9ef25d3e1.js with type application/javascript
Uploading object
{
  "etag": "75e6de63-e28a-4d1f-83dc-9f4edcc47872",
  "last-modified": "Sat, 17 May 2025 20:28:24 GMT",
  "opc-content-md5": "aJOEYLDBmmuO9ZvDozciSA=="
}
✅ Upload complete.
```

# Test url

```
https://objectstorage.us-ashburn-1.oraclecloud.com/n/id6dibaakt36/b/MGARCIAR-IAD-OP-LAB02-1-BKT-01/o/index.html
```

# HTML (SRC JS)

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

This should be: