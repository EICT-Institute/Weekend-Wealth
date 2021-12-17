CREATE TABLE public.suggestions
(
    _id SERIAL PRIMARY KEY UNIQUE,
    topicId bigint NOT NULL,
    suggestion character varying(255) NOT NULL,
    entryDate TIMESTAMPTZ DEFAULT NOW() ,
    updated_at TIMESTAMPTZ DEFAULT null,
    deleted_at TIMESTAMPTZ DEFAULT null,

    UNIQUE(topicId),

      --CONSTRAINT subject_pkey PRIMARY KEY (id),
    CONSTRAINT topics_id_foreign FOREIGN KEY (topicId)
        REFERENCES public.topics (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);