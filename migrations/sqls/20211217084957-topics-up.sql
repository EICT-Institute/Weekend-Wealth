CREATE TABLE public.topics
(
    _id SERIAL PRIMARY KEY UNIQUE,
    name character varying(255) NOT NULL,
    details character varying(255) NOT NULL,
    subjectId bigint NOT NULL,
    entryDate TIMESTAMPTZ DEFAULT NOW() ,
    updated_at TIMESTAMPTZ DEFAULT null,
    deleted_at TIMESTAMPTZ DEFAULT null,

    UNIQUE(name, subjectId),

      --CONSTRAINT subject_pkey PRIMARY KEY (id),
    CONSTRAINT subject_id_foreign FOREIGN KEY (subjectId)
        REFERENCES public.subjects (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);