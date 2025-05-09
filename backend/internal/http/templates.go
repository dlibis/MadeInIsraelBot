package http

import (
	"encoding/json"
	"io"
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

func (h *handler) HandleTemplateStatus(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("id was empty"))
		return
	}

	status, err := h.twilio_service.GetTemplateStatus(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	body, err := json.Marshal(status)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(body)
	w.WriteHeader(http.StatusOK)
}

type CreateMessageTemplate struct {
	Name      string            `json:"name"`
	Language  string            `json:"language"`
	Body      string            `json:"body"`
	Variables map[string]string `json:"variables"`
	Image     string            `json:"image"`
}

func (h *handler) HandleMessageTemplatesPost(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close() // Close the body when done

	var req_body CreateMessageTemplate
	if err := json.Unmarshal(body, &req_body); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	template, err := h.twilio_service.CreateMessageTemplate(
		req_body.Name,
		req_body.Language,
		req_body.Body,
		req_body.Variables,
		req_body.Image,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := json.Marshal(template)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(resp)
}

type CreateQuestionareTemplate struct {
	Name      string            `json:"name"`
	Language  string            `json:"language"`
	Body      string            `json:"body"`
	Button    string            `json:"button"`
	Options   map[string]string `json:"options"`
	Variables map[string]string `json:"variables"`
}

func (h *handler) HandleQuestionareTemplatesPost(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close() // Close the body when done

	var req_body CreateQuestionareTemplate
	if err := json.Unmarshal(body, &req_body); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	template, err := h.twilio_service.CreateQuestionareTemplate(
		req_body.Name,
		req_body.Language,
		req_body.Body,
		req_body.Button,
		req_body.Variables,
		req_body.Options,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, err := json.Marshal(template)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(resp)
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
