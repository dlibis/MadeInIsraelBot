package http

import (
	"encoding/json"
	"net/http"
)

func (h *handler) HandleTemplatesGet(w http.ResponseWriter, r *http.Request) {
	templates, err := h.twilio_service.GetTemplates()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(templates)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func HandleTemplatesPost(w http.ResponseWriter, r *http.Request) {

}

func HandleTemplatesPatch(w http.ResponseWriter, r *http.Request) {

}

func (h *handler) HandleTemplatesDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("id was empty"))
		return
	}

	if err := h.twilio_service.DeleteTemplate(id); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
