package twilio

import (
	"github.com/twilio/twilio-go"
)

type TwilioService struct {
	client *twilio.RestClient
}

func NewTwilioService() TwilioService {
	return TwilioService{
		client: twilio.NewRestClient(),
	}
}
