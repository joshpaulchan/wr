# Conversations
## Model

<table>
<thead>
    <tr>
        <th style="width: 50%">name</th>
        <th>description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>id::String</td>
        <td>unique id reqpresenting a single conversation</td>
    </tr>
    <tr>
        <td>id::String</td>
        <td>unique id reqpresenting a single conversation</td>
    </tr>
    <tr>
        <td>id::String</td>
        <td>unique id reqpresenting a single conversation</td>
    </tr>
    <tr>
        <td>id::String</td>
        <td>unique id reqpresenting a single conversation</td>
    </tr>
    <tr>
        <td>id::String</td>
        <td>unique id reqpresenting a single conversation</td>
    </tr>

</tbody>
</table>

## API

**Note** - all endpoints are JSON endpoints uneless otherwise specified.

**Conversations (bulk operations)**

<table>
<thead>
    <tr>
        <th style="width: 30%">method and url</th>
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
                <li>**p** - the page of conversations to retrieve (if not present, defaults to 0)</li>
                <li>**n** - the number of items to return per page</li>
                <li>**q** - the string to search for in the conversations</li>
            </ul>
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
            **id** - id of conversation to fetch
            **body**
            <ul>
            <li>**message** - message to send</li>
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
            <li>**ids** - ids of conversations to update to update</li>
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
