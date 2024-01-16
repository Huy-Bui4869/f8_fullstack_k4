--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255),
    status boolean,
    created_at timestamp with time zone DEFAULT now(),
    update_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, status, created_at, update_at) FROM stdin;
1	user1	user1@gmail.com	1111	t	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
2	user2	user2@gmail.com	2222	t	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
3	user3	user3@gmail.com	1113	f	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
4	user4	user4@gmail.com	1114	t	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
5	user5	user5@gmail.com	5555	f	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
6	user6	user6@gmail.com	1616	f	2024-01-15 19:14:51.736988+07	2024-01-15 19:14:51.736988+07
13	user7	user7@gmail.com	\N	f	2024-01-16 11:39:35.954587+07	2024-01-16 11:39:35.954587+07
14	user8	user8@edu.vn	\N	f	2024-01-16 19:11:50.34312+07	2024-01-16 19:23:45.661241+07
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: users users_id_primary; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_primary PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

