package twilio

import (
	"encoding/json"

	openapi "github.com/twilio/twilio-go/rest/content/v2"
)

type Template struct {
	Name string
	Id   string
	Type string
	// Content   string
	Variables string
}

func (ts *TwilioService) GetTemplates() ([]Template, error) {
	// List message templates
	messages, err := ts.client.ContentV2.ListContent(&openapi.ListContentParams{})
	if err != nil {
		return []Template{}, err
	}

	var templates []Template
	for _, template := range messages {
		typ, err := json.Marshal(*template.Types)
		if err != nil {
			return []Template{}, err
		}

		vars, _ := json.Marshal(*template.Types)
		if err != nil {
			return []Template{}, err
		}

		templates = append(templates, Template{
			Name:      *template.FriendlyName,
			Id:        *template.Sid,
			Type:      string(typ),
			Variables: string(vars),
		})
	}

	return templates, nil
}

func (ts *TwilioService) GetTemplate(id string) ([]Template, error) {
	// List messages
	messages, err := ts.client.ContentV2.ListContent(&openapi.ListContentParams{})
	if err != nil {
		return []Template{}, err
	}

	var templates []Template
	for _, template := range messages {
		templates = append(templates, Template{
			Name: *template.FriendlyName,
			Id:   *template.Sid,
		})
	}

	return templates, nil
}

// func (ts *TwilioService) CreateTemplate() ([]Template, error) {
// 	// List messages
// 	messages, err := ts.client.ContentV1.CreateApprovalCreate()
// 	if err != nil {
// 		return []Template{}, err
// 	}

// 	var templates []Template
// 	for _, template := range messages {
// 		templates = append(templates, Template{
// 			Name: *template.FriendlyName,
// 			Id:   *template.Sid,
// 		})
// 	}

// 	return templates, nil
// }
