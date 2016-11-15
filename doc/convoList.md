## convoList

## Conversation Model

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

# Conversations API

**Note** - all endpoints are JSON endpoints uneless otherwise specified.

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
            <li>**options** - </li>
            </ul>
        </td>
    </tr>
</tbody>
</table>
