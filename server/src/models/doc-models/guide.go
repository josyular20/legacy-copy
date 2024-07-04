package docmodels

type GuideDTO struct {
	GuideName      string `json:"guide_name"`
	Title          string `json:"title"`
	SubTitle       string `json:"sub_title"`
	Author         string `json:"author"`
	AuthorImageUrl string `json:"author_image_url"`
	MinsRead       uint   `json:"mins_read"`
	Date           string `json:"date"`
	FullText       string `json:"full_text"`
}
