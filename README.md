# MadeInIsraelBot

### Environment variables
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `MONDAY_API_TOKEN`
- `CORS_POLICY`

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
- `POST /message` - Template ID, arguments
    - TODO

- `GET /templates`
    -   ```go
        type Template struct {
            Name      string
            Id        string
            Type      interface{}
            Variables interface{}
        }
        ```
    - Note: you get a list
- `GET /templates/[id]/status`
    -  string
- `POST /templates/message`
    -   ```go
        type CreateMessageTemplate struct {
            Name      string            `json:"name"`
            Language  string            `json:"language"`
            Body      string            `json:"body"`
            Variables map[string]string `json:"variables"`
            Image     string            `json:"image"`
        }
        ```
    - Response like `GET /templates` except without the list
- `POST /templates/questionare`
    -   ```go
        type CreateQuestionareTemplate struct {
            Name      string            `json:"name"`
            Language  string            `json:"language"`
            Body      string            `json:"body"`
            Button    string            `json:"button"`
            Options   map[string]string `json:"options"`
            Variables map[string]string `json:"variables"`
        }
        ```
    - Response like `GET /templates` except without the list
- `DELETE /templates/[id]`