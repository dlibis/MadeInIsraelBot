package twilio

import (
	"fmt"

	openapi1 "github.com/twilio/twilio-go/rest/content/v1"
	openapi2 "github.com/twilio/twilio-go/rest/content/v2"
)

type Template struct {
	Name      string
	Id        string
	Type      interface{}
	Variables interface{}
}

func (ts *TwilioService) GetTemplates() ([]Template, error) {
	// List message templates
	messages, err := ts.client.ContentV2.ListContent(&openapi2.ListContentParams{})
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

func (ts *TwilioService) GetTemplateStatus(id string) (interface{}, error) {
	// List messages
	status, err := ts.client.ContentV1.FetchApprovalFetch(id)
	if err != nil {
		return nil, err
	}

	return status, nil
}

func (ts *TwilioService) CreateMessageTemplate(name string, language string, body string, variables map[string]string, image string) (Template, error) {
	var text_type *openapi1.TwilioText = nil
	var media_type *openapi1.TwilioMedia = nil

	if image == "" {
		text_type = &openapi1.TwilioText{
			Body: body,
		}
	} else {
		media_type = &openapi1.TwilioMedia{
			Body:  body,
			Media: []string{image},
		}
	}

	template, err := ts.client.ContentV1.CreateContent(&openapi1.CreateContentParams{
		ContentCreateRequest: &openapi1.ContentCreateRequest{
			FriendlyName: name,
			Language:     language,
			Types: openapi1.Types{
				TwilioText:  text_type,
				TwilioMedia: media_type,
			},
			Variables: variables,
		},
	})
	if err != nil {
		return Template{}, err
	}

	return Template{
		Name:      *template.FriendlyName,
		Id:        *template.Sid,
		Type:      *template.Types,
		Variables: *template.Variables,
	}, nil
}

func (ts *TwilioService) CreateQuestionareTemplate(name string, language string, body string, button string, variables map[string]string, options map[string]string) (Template, error) {
	var items []openapi1.ListItem

	index := 0
	for name, description := range options {
		items = append(items, openapi1.ListItem{
			Id:          fmt.Sprint(index),
			Item:        name,
			Description: description,
		})
		index += 1
	}

	template, err := ts.client.ContentV1.CreateContent(&openapi1.CreateContentParams{
		ContentCreateRequest: &openapi1.ContentCreateRequest{
			FriendlyName: name,
			Language:     language,
			Types: openapi1.Types{
				TwilioListPicker: &openapi1.TwilioListPicker{
					Body:   body,
					Button: button,
					Items:  items,
				},
			},
			Variables: variables,
		},
	})

	if err != nil {
		return Template{}, err
	}

	return Template{
		Name:      *template.FriendlyName,
		Id:        *template.Sid,
		Type:      *template.Types,
		Variables: *template.Variables,
	}, nil
}

func (ts *TwilioService) DeleteTemplate(id string) error {
	// List messages
	err := ts.client.ContentV1.DeleteContent(id)
	if err != nil {
		return err
	}

	return nil
}
