package main

import (
	"fmt"
	"os"

	"github.com/MichelleGranat/MadeInIsraelBot/internal/http"
	"github.com/MichelleGranat/MadeInIsraelBot/internal/services/twilio"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	godotenv.Load(".env")

	twilio_service := twilio.NewTwilioService()
	// if err := twilio_service.SendMessage(); err != nil {
	// 	fmt.Println(err.Error())

	// 	os.Exit(1)

	// }
	temps, error := twilio_service.GetTemplates()
	fmt.Println(error)

	for _, template := range temps {
		fmt.Println(template)
	}

	server := http.NewServer()
	if err := server.Serve(); err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
