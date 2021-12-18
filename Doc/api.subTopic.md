Defined **endpoints** request for this App

 
**Base endpoints SUBTOPICS**

 
  a) [Add SubTopic](#Add-SubTopic)
  b) [Get SubTopics](#Get-SubTopics)
  c) [Update SubTopic](#Update-SubTopic)
  d) [Delete SubTopic](#Delete-SubTopic)


 
### Add SubTopic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /sub-topics/add-one | PUT   | Add a new sub Topic |

```javascript

// Request main.domain.com/sub-topics/add-one
{
    "title":"covalent1",
    "topicId":3,
    "theory":"A covalent bond is a chemical bond that involves the sharing of electron pairs between atoms.",
    "imageUrl":"http://image/one.png"
     
}
// Response Status Code: 200
 {
    "success": true,
 }

```

### Get SubTopics

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /sub-topics/get-many | GET   | Get sub-topics by fields |

```javascript

// Request main.domain.com/sub-topics/get-many
 

// Response Status Code: 200
{
    "success": true,
    "data": {
        "data": [
            {
                "_id": 1,
                "title": "covalent",
                "theory": "theory",
                "imageur": "http://image/one.png",
                "pulicationDate": "2021-12-17T22:21:48.934Z",
                "topic": "two",
                "subject": "one"
            },
            {
                "_id": 2,
                "title": "covalent one",
                "theory": "theory one",
                "imageur": null,
                "pulicationDate": "2021-12-17T22:23:13.063Z",
                "topic": "two",
                "subject": "one"
            }
        ],
        "pagination": {
            "pageNumber": 1,
            "pageLimit": 50,
            "pageCount": 1,
            "totalCount": 2,
            "sortOrder": 1,
            "sortField": "entryDate"
        }
    }
}

```


### Update SubTopic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /sub-topics/update-one | POST   | Update subject by Id |

```javascript

// Request main.domain.com/sub-topics/update-one
{
    "title":"covalent one"  
}

// Response Status Code: 201
 {
    "success": true,
 }

```


### Delete subTopic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /sub-topics/delete-one | DELETE   | Delete subject by Id |

```javascript

// Request main.domain.com/sub-topics/delete-one/1
 

// Response Status Code: 200
 {
    "success": true,
 }

```