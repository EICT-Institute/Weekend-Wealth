CREATE TABLE public.sub_topics
(
    _id SERIAL PRIMARY KEY UNIQUE,
    title character varying(255) NOT NULL,
    topicId bigint NOT NULL,
    theory character varying(255) NOT NULL,
    imageUr character varying(255) DEFAULT NULL,
    entryDate TIMESTAMPTZ DEFAULT NOW() ,
    updated_at TIMESTAMPTZ DEFAULT null,
    deleted_at TIMESTAMPTZ DEFAULT null,

    UNIQUE(title, topicId),

      --CONSTRAINT subject_pkey PRIMARY KEY (id),
    CONSTRAINT topics_id_foreign FOREIGN KEY (topicId)
        REFERENCES public.topics (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);