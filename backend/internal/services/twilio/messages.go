package twilio

import (
	"fmt"

	api "github.com/twilio/twilio-go/rest/api/v2010"
)

func (ts *TwilioService) SendMessage(from string, to string) error {
	params := &api.CreateMessageParams{}
	params.SetFrom(fmt.Sprintf("whatsapp:%s", from))
	params.SetTo(fmt.Sprintf("whatsapp:%s", to))
	// params.ContentSid = "HX3e91db2193389c269c6ebb5e93e4cee6"

	resp, err := ts.client.Api.CreateMessage(params)
	if err != nil {
		return err
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
		return nil
	}
}
