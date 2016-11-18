# Conversations
## Model

**Key**
* **+** public and modifiable
* **#** public, non-modifiable
* **-** private, non-modifiable

### Conversation

<table>
<thead>
    <tr>
        <th style="width: 1%">-</th>
        <th style="width: 24%">name</th>
        <th>type</th>
        <th style="width: 50%">description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>**#**</td>
        <td>**id**</td>
        <td>String</td>
        <td>Unique id representing a single conversation</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**emailFrom**</td>
        <td>String</td>
        <td>The email of the participant that started this conversation</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**subject**</td>
        <td>String</td>
        <td>The subject of the complaint conversation</td>
    </tr>
    <tr>
        <td>**+**</td>
        <td>**status**</td>
        <td>Hashmap</td>
        <td>
            The current status of the conversation. Contains these keys, those of which keyscode are respectively **true or false**:
            <ul>
                <li>**unread** - whether or not this message is unread or not</li>
                <li>**unreplied** - whether or not this message is unreplied or not</li>
            </ul>
            **note** - a message can be both unreplied and unread, read and unreplied, read and replied, but not unread and replied.
        </td>
    </tr>
    <tr>
        <td>**+**</td>
        <td>**location**</td>
        <td>String</td>
        <td>
            The folder this conversation is currently located in. Can be one of the following **String** values:
            <ul>
                <li>**inbox** - whether or not this message is unread or not</li>
                <li>**spam** - whether or not this message is unreplied or not</li>
                <li>**trash** - whether or not this message is unreplied or not</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**createdAt**</td>
        <td>Date</td>
        <td>When the conversation was created</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**lastUpdated**</td>
        <td>Date</td>
        <td>When the conversation was last updated</td>
    </tr>
    <tr>
        <td>**+**</td>
        <td>**messages**</td>
        <td>String[]</td>
        <td>Array of **Message** ids in the conversation</td>
    </tr>
</tbody>
</table>

### Message

<table>
<thead>
    <tr>
        <th style="width: 1%">-</th>
        <th style="width: 24%">name</th>
        <th>type</th>
        <th style="width: 50%">description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>**#**</td>
        <td>**id**</td>
        <td>String</td>
        <td>Unique id referring to this message</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**emailFrom**</td>
        <td>String</td>
        <td>The email of the participant that sent this message</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**emailTo**</td>
        <td>String</td>
        <td>The email of the participant that this message is meant for</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**createdAt**</td>
        <td>Date</td>
        <td>When this message was created</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**lastUpdated**</td>
        <td>Date</td>
        <td>When this message was last updated</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**body**</td>
        <td>String</td>
        <td>A UTF-8 encoded, HTML-safe string representation of the message body</td>
    </tr>
    <tr>
        <td>**#**</td>
        <td>**conversation**</td>
        <td>String</td>
        <td>Id of the **Conversation** record this message is part of</td>
    </tr>
</tbody>
</table>

## API (Version 1.0)

### Routes
**Note** - all endpoints are JSON endpoints uneless otherwise specified.

<table>
<thead>
    <tr>
        <th style="width: 25%">method and url</th>
        <th>description</th>
        <th style="width: 50%">notes</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>**GET** `/conversations`</td>
        <td>retrieve a page of conversations or search results</td>
        <td>
            **query params**
            <ul>
                <li>**page** *[optional] [default 0]* - the page of conversations to retrieve</li>
                <li>**n** *[optional] [default 25]* - the number of items to return per page</li>
                <li>**q** *[optional]* - the string to search for in the conversations</li>
            </ul>
            retrieves a list of conversations with meta-information
        </td>
    </tr>
    <tr>
        <td>**PUT** `/conversations`</td>
        <td>update multiple conversations at once</td>
        <td>
            **body**
            <ul>
            <li>**ids** - ids of conversations to update to update</li>
            <li>**options** - JSON-encoded hash-map of valid key-value pairs to set for each given conversation</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>**GET** `/conversation/{{id}}`</td>
        <td>retrieve a conversation and its messages</td>
        <td>
            **id** - id of conversation to fetch
        </td>
    </tr>
    <tr>
        <td>**POST** `/conversation/{{id}}`</td>
        <td>respond to a conversation (send an email)</td>
        <td>
            **id** - id of conversation to respond to<br/>
            **body**
            <ul>
            <li>**message** - message to send as response</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>**PUT** `/conversation/{{id}}`</td>
        <td>update a conversation</td>
        <td>
            **id** - id of conversation to update<br/>
            **body**
            <ul>
            <li>**options** - JSON-encoded hash-map of valid key-value pairs to set for each given conversation</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>**DELETE** `/conversation/{{id}}`</td>
        <td>delete a conversation</td>
        <td>
            **id** - id of conversation to delete
        </td>
    </tr>
</tbody>
</table>

### Example Responses

**GET** `/conversations`

**Notice**: the *messages* for each conversation are not included in the bulk request.

```bash
$ curl
{
    ""
    "next": "".
    "previous": "",
    "conversations": [
        {
            "id" : 1,
            "subject" : "Subject of conversation",
            "status": {
                "unread" : true,
                "unreplied" : true
            }
        },
        {
            "id" : 1,
            "subject" : "Subject of conversation",
            "status": {
                "unread" : true,
                "unreplied" : true
            }
        }
    ]
}
```
