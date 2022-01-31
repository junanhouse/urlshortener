# urlshortener

## Service
+ create : create input url to shortener 
+ list : show all url,id,stats
+ stats : show visit count, how many people acces shortener url
+ get : If you access the link with the id, redirects to registered url.

## Test Case

### create
+ Request : if type of url isn't string, error and 400 status code returned


```
POST
https://kb0tt6cnwc.execute-api.ap-northeast-2.amazonaws.com/dev/create/

{
  "url": "https://www.github.com"
}
```
+ Response

```
Content-type: application/json
Status code: 200

{
  "id": "77230570-8293-11ec-aa6d-f1efeb0f5807"
  "url": "https://www.github.com"
  "stats": "0"
}
```

### list
+ Request : Show all items

```
GET
https://kb0tt6cnwc.execute-api.ap-northeast-2.amazonaws.com/dev/list
```

+ Response
```
Content-type: application/json
Status code: 200
[
  {
    "stats": 2,
    "id": "64937690-8290-11ec-be97-018ec5c69f5c",
    "url": "https://www.naver.com"
  },
  {
    "stats": 29,
    "id": "test",
    "url": "https://www.naver.com"
  },
  {
    "stats": 0,
    "url": "https://www.github.com",
    "id": "77230570-8293-11ec-aa6d-f1efeb0f5807"
  }
]
```

### url
+ Request : if you access invalid url, return 500 status code

```
GET
https://kb0tt6cnwc.execute-api.ap-northeast-2.amazonaws.com/dev/url/test
```
+ Response
```
Status code: 301
redirect registered url
```

### stats

+ Request : if you access invalid url, return 500 status code

```
GET
https://kb0tt6cnwc.execute-api.ap-northeast-2.amazonaws.com/dev/url/test/stats
```

+ Response
```
Content-type: application/json
Status code: 200
{
  "visit" : "29"
}
```
