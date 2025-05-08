# MadeInIsraelBot

### API
- `GET /tables` - Tables + ID + Names + Views
    - ```
        {
            [
                {
                    "table_name": "name",
                    "table_id": "id",
                    "table_views": [
                        {
                            "view_name": "name",
                            "view_id": "id
                        },
                        ...
                    ]
                },
                ...
            ]
        }
        ```
- `GET /tables/[id]/rows` - Table row names
    -   ```
        {
            [
                {
                    "row_name": "name",
                    "row_id":, "id",
                },
                ...
            ]
        }
        ```
- `POST /message` - Template ID, arguments
    - TODO

- `GET /templates`
    -   ```
        {
            [
                {
                    "template_name": "name",
                    "template_id":, "id",
                    "template_type: "type",
                    "template_status": "status",
                    "template_content": "status"
                },
                ...
            ]
        }
        ```
- `POST /templates/message`
    -   ```
        {
            [
                {
                    "template_name": "name",
                    "template_status": "status",
                    "template_content": "status"
                },
                ...
            ]
        }
        ```
    - Response like `GET /templates` except without the list
- `POST /templates/questionare`
    -   ```
        {
            [
                {
                    "template_name": "name",
                    "template_status": "status",
                    "template_content": "status"
                },
                ...
            ]
        }
        ```
- `PATCH /templates/message/[id]` - Cant patch an pending approval / approved template
    - 
- `PATCH /templates/questionare/[id]` - Cant patch an pending approval / approved template
- `DELETE /templates/message/[id]`
- `DELETE /templates/questionare/[id]`