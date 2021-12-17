CREATE TABLE public.subjects
(
    _id SERIAL PRIMARY KEY UNIQUE,
    name character varying(255) NOT NULL,
    details character varying(255) NOT NULL,
    entryDate TIMESTAMPTZ DEFAULT NOW() ,
    updated_at TIMESTAMPTZ DEFAULT null,
    deleted_at TIMESTAMPTZ DEFAULT null,

     UNIQUE(name)
);