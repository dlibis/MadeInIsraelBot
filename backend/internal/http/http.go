package http

import (
	"fmt"
	"net/http"

	"github.com/MichelleGranat/MadeInIsraelBot/internal/mw"
	"github.com/MichelleGranat/MadeInIsraelBot/internal/services/monday"
	"github.com/MichelleGranat/MadeInIsraelBot/internal/services/twilio"
)

type handler struct {
	twilio_service twilio.TwilioService
	monday_service monday.MondayService
}

type Server struct {
	handler handler
	port    string
	router  *http.ServeMux
}

func NewServer() Server {
	// Create handler
	handler := handler{
		twilio_service: twilio.NewTwilioService(),
		monday_service: monday.NewMondayService(),
	}

	// Create api router
	api_router := http.NewServeMux()

	// Tables
	api_router.HandleFunc("GET /tables", handler.HandleTablesGet)

	// Templates
	api_router.HandleFunc("GET /templates", handler.HandleTemplatesGet)
	api_router.HandleFunc("POST /templates", HandleTemplatesPost)
	api_router.HandleFunc("PATCH /templates", HandleTemplatesPatch)
	api_router.HandleFunc("DELETE /templates", HandleTemplatesDelete)

	// Messages

	// Webhooks

	// Merge Routers
	router := http.NewServeMux()
	router.Handle("/", GetFileServer())
	router.Handle("/api/", http.StripPrefix("/api", mw.Cors(api_router)))

	return Server{
		handler: handler,
		port:    "80",
		router:  router,
	}
}

func (s *Server) Serve() error {
	http_server := http.Server{
		Addr:    fmt.Sprintf(":%s", s.port),
		Handler: s.router,
	}

	return http_server.ListenAndServe()
}
