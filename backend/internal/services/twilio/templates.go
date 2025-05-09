package twilio

import (
	openapi "github.com/twilio/twilio-go/rest/content/v2"
)

type Template struct {
	Name      string
	Id        string
	Type      interface{}
	Variables interface{}
}

func (ts *TwilioService) GetTemplates() ([]Template, error) {
	// List message templates
	messages, err := ts.client.ContentV2.ListContent(&openapi.ListContentParams{})
	if err != nil {
		return []Template{}, err
	}

	var templates []Template
	for _, template := range messages {
		templates = append(templates, Template{
			Name:      *template.FriendlyName,
			Id:        *template.Sid,
			Type:      *template.Types,
			Variables: *template.Variables,
		})
	}

	return templates, nil
}

func (ts *TwilioService) DeleteTemplate(id string) error {
	// List messages
	err := ts.client.ContentV1.DeleteContent(id)
	if err != nil {
		return err
	}

	return nil
}
