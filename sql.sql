--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-10-05 15:04:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 242 (class 1259 OID 111702)
-- Name: bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills (
    bill_id integer NOT NULL,
    bill_reason character varying(255) NOT NULL,
    bill_money numeric(12,2) NOT NULL,
    bill_date timestamp with time zone NOT NULL
);


ALTER TABLE public.bills OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 111701)
-- Name: bills_bill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_bill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_bill_id_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 241
-- Name: bills_bill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_bill_id_seq OWNED BY public.bills.bill_id;


--
-- TOC entry 244 (class 1259 OID 111709)
-- Name: bills_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills_data (
    bill_data_id integer NOT NULL,
    bill_id integer NOT NULL,
    state_id integer NOT NULL,
    bill_exchange integer
);


ALTER TABLE public.bills_data OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 111708)
-- Name: bills_data_bill_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_data_bill_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_data_bill_data_id_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 243
-- Name: bills_data_bill_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_data_bill_data_id_seq OWNED BY public.bills_data.bill_data_id;


--
-- TOC entry 224 (class 1259 OID 111582)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    client_id integer NOT NULL,
    client_name character varying(255) NOT NULL,
    client_document character varying(50) NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 111581)
-- Name: clients_client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_client_id_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 223
-- Name: clients_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_client_id_seq OWNED BY public.clients.client_id;


--
-- TOC entry 226 (class 1259 OID 111589)
-- Name: clients_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients_data (
    client_data_id integer NOT NULL,
    client_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.clients_data OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 111588)
-- Name: clients_data_client_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_data_client_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_data_client_data_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 225
-- Name: clients_data_client_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_data_client_data_id_seq OWNED BY public.clients_data.client_data_id;


--
-- TOC entry 228 (class 1259 OID 111606)
-- Name: exchanges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchanges (
    exchange_id integer NOT NULL,
    exchange_name character varying(255) NOT NULL,
    exchange_money numeric(12,2) NOT NULL,
    exchange_acronym character varying(255)
);


ALTER TABLE public.exchanges OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 111630)
-- Name: exchanges_conversion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchanges_conversion (
    exchange_conversion_id integer NOT NULL,
    exchange_convert_id integer NOT NULL,
    exchange_to_convert_id integer NOT NULL,
    exchange_to_convert_number numeric(12,6) NOT NULL,
    exchange_operation character varying(50) NOT NULL
);


ALTER TABLE public.exchanges_conversion OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 111629)
-- Name: exchanges_conversion_exchange_conversion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchanges_conversion_exchange_conversion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchanges_conversion_exchange_conversion_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 231
-- Name: exchanges_conversion_exchange_conversion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchanges_conversion_exchange_conversion_id_seq OWNED BY public.exchanges_conversion.exchange_conversion_id;


--
-- TOC entry 230 (class 1259 OID 111613)
-- Name: exchanges_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchanges_data (
    exchange_data_id integer NOT NULL,
    exchange_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.exchanges_data OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 111612)
-- Name: exchanges_data_exchange_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchanges_data_exchange_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchanges_data_exchange_data_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 229
-- Name: exchanges_data_exchange_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchanges_data_exchange_data_id_seq OWNED BY public.exchanges_data.exchange_data_id;


--
-- TOC entry 227 (class 1259 OID 111605)
-- Name: exchanges_exchange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchanges_exchange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchanges_exchange_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 227
-- Name: exchanges_exchange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchanges_exchange_id_seq OWNED BY public.exchanges.exchange_id;


--
-- TOC entry 238 (class 1259 OID 111673)
-- Name: loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans (
    loan_id integer NOT NULL,
    loan_money numeric(12,2) NOT NULL,
    loan_paid numeric(12,2) NOT NULL,
    loan_date timestamp with time zone NOT NULL
);


ALTER TABLE public.loans OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 111680)
-- Name: loans_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans_data (
    loan_data_id integer NOT NULL,
    loan_id integer NOT NULL,
    client_data_id integer NOT NULL,
    state_id integer NOT NULL,
    exchange_data_id integer
);


ALTER TABLE public.loans_data OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 111679)
-- Name: loans_data_loan_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loans_data_loan_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loans_data_loan_data_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 239
-- Name: loans_data_loan_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loans_data_loan_data_id_seq OWNED BY public.loans_data.loan_data_id;


--
-- TOC entry 237 (class 1259 OID 111672)
-- Name: loans_loan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loans_loan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loans_loan_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 237
-- Name: loans_loan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loans_loan_id_seq OWNED BY public.loans.loan_id;


--
-- TOC entry 246 (class 1259 OID 111726)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    product_amount numeric(12,2) NOT NULL,
    product_price numeric(12,2) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 111733)
-- Name: products_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_data (
    product_data_id integer NOT NULL,
    product_id integer NOT NULL,
    supplier_data_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.products_data OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 111732)
-- Name: products_data_product_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_data_product_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_data_product_data_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 247
-- Name: products_data_product_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_data_product_data_id_seq OWNED BY public.products_data.product_data_id;


--
-- TOC entry 245 (class 1259 OID 111725)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 245
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 256 (class 1259 OID 111796)
-- Name: sells; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sells (
    sell_id integer NOT NULL,
    sell_products integer NOT NULL,
    sell_money numeric(12,2) NOT NULL,
    sell_date timestamp with time zone NOT NULL
);


ALTER TABLE public.sells OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 111803)
-- Name: sells_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sells_data (
    sell_data_id integer NOT NULL,
    sell_id integer NOT NULL,
    client_data_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.sells_data OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 111802)
-- Name: sells_data_sell_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sells_data_sell_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sells_data_sell_data_id_seq OWNER TO postgres;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 257
-- Name: sells_data_sell_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sells_data_sell_data_id_seq OWNED BY public.sells_data.sell_data_id;


--
-- TOC entry 262 (class 1259 OID 111842)
-- Name: sells_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sells_payments (
    sell_payment_id integer NOT NULL,
    sell_data_id integer NOT NULL,
    exchange_data_id integer NOT NULL,
    sell_payment_money numeric(12,2) NOT NULL
);


ALTER TABLE public.sells_payments OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 111841)
-- Name: sells_payments_sell_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sells_payments_sell_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sells_payments_sell_payment_id_seq OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 261
-- Name: sells_payments_sell_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sells_payments_sell_payment_id_seq OWNED BY public.sells_payments.sell_payment_id;


--
-- TOC entry 260 (class 1259 OID 111825)
-- Name: sells_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sells_products (
    sell_product_id integer NOT NULL,
    sell_data_id integer NOT NULL,
    product_data_id integer NOT NULL,
    sell_product_amount integer NOT NULL,
    sell_product_price numeric(12,2) NOT NULL
);


ALTER TABLE public.sells_products OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 111824)
-- Name: sells_products_sell_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sells_products_sell_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sells_products_sell_product_id_seq OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 259
-- Name: sells_products_sell_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sells_products_sell_product_id_seq OWNED BY public.sells_products.sell_product_id;


--
-- TOC entry 255 (class 1259 OID 111795)
-- Name: sells_sell_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sells_sell_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sells_sell_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 255
-- Name: sells_sell_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sells_sell_id_seq OWNED BY public.sells.sell_id;


--
-- TOC entry 250 (class 1259 OID 111755)
-- Name: shopping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping (
    shopping_id integer NOT NULL,
    shopping_money numeric(12,2) NOT NULL,
    shopping_products integer NOT NULL,
    shopping_date timestamp with time zone NOT NULL
);


ALTER TABLE public.shopping OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 111762)
-- Name: shopping_datas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_datas (
    shopping_data_id integer NOT NULL,
    shopping_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.shopping_datas OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 111761)
-- Name: shopping_datas_shopping_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_datas_shopping_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_datas_shopping_data_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 251
-- Name: shopping_datas_shopping_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_datas_shopping_data_id_seq OWNED BY public.shopping_datas.shopping_data_id;


--
-- TOC entry 254 (class 1259 OID 111779)
-- Name: shopping_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_products (
    shopping_product_id integer NOT NULL,
    shopping_data_id integer NOT NULL,
    product_data_id integer NOT NULL,
    shopping_amount integer NOT NULL,
    shopping_price numeric(12,2) NOT NULL
);


ALTER TABLE public.shopping_products OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 111778)
-- Name: shopping_products_shopping_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_products_shopping_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_products_shopping_product_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 253
-- Name: shopping_products_shopping_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_products_shopping_product_id_seq OWNED BY public.shopping_products.shopping_product_id;


--
-- TOC entry 249 (class 1259 OID 111754)
-- Name: shopping_shopping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_shopping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_shopping_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 249
-- Name: shopping_shopping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_shopping_id_seq OWNED BY public.shopping.shopping_id;


--
-- TOC entry 218 (class 1259 OID 111549)
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    state_id integer NOT NULL,
    state_name character varying(20) NOT NULL
);


ALTER TABLE public.states OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 111548)
-- Name: states_state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.states_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.states_state_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 217
-- Name: states_state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.states_state_id_seq OWNED BY public.states.state_id;


--
-- TOC entry 234 (class 1259 OID 111647)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    supplier_id integer NOT NULL,
    supplier_name character varying(255) NOT NULL,
    supplier_rif character varying(50) NOT NULL,
    supplier_address character varying(255) NOT NULL
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 111656)
-- Name: suppliers_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers_data (
    supplier_data_id integer NOT NULL,
    supplier_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.suppliers_data OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 111655)
-- Name: suppliers_data_supplier_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_data_supplier_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_data_supplier_data_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 235
-- Name: suppliers_data_supplier_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_data_supplier_data_id_seq OWNED BY public.suppliers_data.supplier_data_id;


--
-- TOC entry 233 (class 1259 OID 111646)
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 233
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_supplier_id_seq OWNED BY public.suppliers.supplier_id;


--
-- TOC entry 220 (class 1259 OID 111556)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 111565)
-- Name: users_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_data (
    user_data_id integer NOT NULL,
    user_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.users_data OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 111564)
-- Name: users_data_user_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_data_user_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_data_user_data_id_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_data_user_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_data_user_data_id_seq OWNED BY public.users_data.user_data_id;


--
-- TOC entry 219 (class 1259 OID 111555)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4763 (class 2604 OID 111705)
-- Name: bills bill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills ALTER COLUMN bill_id SET DEFAULT nextval('public.bills_bill_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 111712)
-- Name: bills_data bill_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_data ALTER COLUMN bill_data_id SET DEFAULT nextval('public.bills_data_bill_data_id_seq'::regclass);


--
-- TOC entry 4754 (class 2604 OID 111585)
-- Name: clients client_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_client_id_seq'::regclass);


--
-- TOC entry 4755 (class 2604 OID 111592)
-- Name: clients_data client_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_data ALTER COLUMN client_data_id SET DEFAULT nextval('public.clients_data_client_data_id_seq'::regclass);


--
-- TOC entry 4756 (class 2604 OID 111609)
-- Name: exchanges exchange_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges ALTER COLUMN exchange_id SET DEFAULT nextval('public.exchanges_exchange_id_seq'::regclass);


--
-- TOC entry 4758 (class 2604 OID 111633)
-- Name: exchanges_conversion exchange_conversion_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_conversion ALTER COLUMN exchange_conversion_id SET DEFAULT nextval('public.exchanges_conversion_exchange_conversion_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 111616)
-- Name: exchanges_data exchange_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_data ALTER COLUMN exchange_data_id SET DEFAULT nextval('public.exchanges_data_exchange_data_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 111676)
-- Name: loans loan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans ALTER COLUMN loan_id SET DEFAULT nextval('public.loans_loan_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 111683)
-- Name: loans_data loan_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data ALTER COLUMN loan_data_id SET DEFAULT nextval('public.loans_data_loan_data_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 111729)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 111736)
-- Name: products_data product_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_data ALTER COLUMN product_data_id SET DEFAULT nextval('public.products_data_product_data_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 111799)
-- Name: sells sell_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells ALTER COLUMN sell_id SET DEFAULT nextval('public.sells_sell_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 111806)
-- Name: sells_data sell_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_data ALTER COLUMN sell_data_id SET DEFAULT nextval('public.sells_data_sell_data_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 111845)
-- Name: sells_payments sell_payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_payments ALTER COLUMN sell_payment_id SET DEFAULT nextval('public.sells_payments_sell_payment_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 111828)
-- Name: sells_products sell_product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_products ALTER COLUMN sell_product_id SET DEFAULT nextval('public.sells_products_sell_product_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 111758)
-- Name: shopping shopping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping ALTER COLUMN shopping_id SET DEFAULT nextval('public.shopping_shopping_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 111765)
-- Name: shopping_datas shopping_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_datas ALTER COLUMN shopping_data_id SET DEFAULT nextval('public.shopping_datas_shopping_data_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 111782)
-- Name: shopping_products shopping_product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_products ALTER COLUMN shopping_product_id SET DEFAULT nextval('public.shopping_products_shopping_product_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 111552)
-- Name: states state_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states ALTER COLUMN state_id SET DEFAULT nextval('public.states_state_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 111650)
-- Name: suppliers supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN supplier_id SET DEFAULT nextval('public.suppliers_supplier_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 111659)
-- Name: suppliers_data supplier_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers_data ALTER COLUMN supplier_data_id SET DEFAULT nextval('public.suppliers_data_supplier_data_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 111559)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4753 (class 2604 OID 111568)
-- Name: users_data user_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_data ALTER COLUMN user_data_id SET DEFAULT nextval('public.users_data_user_data_id_seq'::regclass);


--
-- TOC entry 5021 (class 0 OID 111702)
-- Dependencies: 242
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bills VALUES (1, 'testing', 150.00, '2025-10-04 10:59:51.277449-04');


--
-- TOC entry 5023 (class 0 OID 111709)
-- Dependencies: 244
-- Data for Name: bills_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bills_data VALUES (1, 1, 1, 2);


--
-- TOC entry 5003 (class 0 OID 111582)
-- Dependencies: 224
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clients VALUES (1, 'testing', '123456789');


--
-- TOC entry 5005 (class 0 OID 111589)
-- Dependencies: 226
-- Data for Name: clients_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clients_data VALUES (1, 1, 1);


--
-- TOC entry 5007 (class 0 OID 111606)
-- Dependencies: 228
-- Data for Name: exchanges; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exchanges VALUES (3, 'dolar', 0.00, 'USD');
INSERT INTO public.exchanges VALUES (10, 'sda', 0.00, 'asd');


--
-- TOC entry 5011 (class 0 OID 111630)
-- Dependencies: 232
-- Data for Name: exchanges_conversion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exchanges_conversion VALUES (5, 9, 2, 123.000000, 'division');


--
-- TOC entry 5009 (class 0 OID 111613)
-- Dependencies: 230
-- Data for Name: exchanges_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exchanges_data VALUES (2, 3, 1);
INSERT INTO public.exchanges_data VALUES (9, 10, 1);


--
-- TOC entry 5017 (class 0 OID 111673)
-- Dependencies: 238
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loans VALUES (2, 100.00, 0.00, '2025-10-05 14:28:08.943421-04');


--
-- TOC entry 5019 (class 0 OID 111680)
-- Dependencies: 240
-- Data for Name: loans_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loans_data VALUES (1, 2, 1, 1, 2);


--
-- TOC entry 5025 (class 0 OID 111726)
-- Dependencies: 246
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5027 (class 0 OID 111733)
-- Dependencies: 248
-- Data for Name: products_data; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5035 (class 0 OID 111796)
-- Dependencies: 256
-- Data for Name: sells; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5037 (class 0 OID 111803)
-- Dependencies: 258
-- Data for Name: sells_data; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5041 (class 0 OID 111842)
-- Dependencies: 262
-- Data for Name: sells_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5039 (class 0 OID 111825)
-- Dependencies: 260
-- Data for Name: sells_products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5029 (class 0 OID 111755)
-- Dependencies: 250
-- Data for Name: shopping; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5031 (class 0 OID 111762)
-- Dependencies: 252
-- Data for Name: shopping_datas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5033 (class 0 OID 111779)
-- Dependencies: 254
-- Data for Name: shopping_products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4997 (class 0 OID 111549)
-- Dependencies: 218
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.states VALUES (1, 'Activo');
INSERT INTO public.states VALUES (2, 'Eliminado');


--
-- TOC entry 5013 (class 0 OID 111647)
-- Dependencies: 234
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.suppliers VALUES (2, 'proveedor', '123456789', 'veenezuela');


--
-- TOC entry 5015 (class 0 OID 111656)
-- Dependencies: 236
-- Data for Name: suppliers_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.suppliers_data VALUES (1, 2, 1);


--
-- TOC entry 4999 (class 0 OID 111556)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5001 (class 0 OID 111565)
-- Dependencies: 222
-- Data for Name: users_data; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 241
-- Name: bills_bill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_bill_id_seq', 1, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 243
-- Name: bills_data_bill_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_data_bill_data_id_seq', 1, true);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 223
-- Name: clients_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_client_id_seq', 1, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 225
-- Name: clients_data_client_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_data_client_data_id_seq', 1, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 231
-- Name: exchanges_conversion_exchange_conversion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchanges_conversion_exchange_conversion_id_seq', 5, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 229
-- Name: exchanges_data_exchange_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchanges_data_exchange_data_id_seq', 9, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 227
-- Name: exchanges_exchange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchanges_exchange_id_seq', 10, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 239
-- Name: loans_data_loan_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loans_data_loan_data_id_seq', 1, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 237
-- Name: loans_loan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loans_loan_id_seq', 2, true);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 247
-- Name: products_data_product_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_data_product_data_id_seq', 1, false);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 245
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 1, false);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 257
-- Name: sells_data_sell_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sells_data_sell_data_id_seq', 1, false);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 261
-- Name: sells_payments_sell_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sells_payments_sell_payment_id_seq', 1, false);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 259
-- Name: sells_products_sell_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sells_products_sell_product_id_seq', 1, false);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 255
-- Name: sells_sell_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sells_sell_id_seq', 1, false);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 251
-- Name: shopping_datas_shopping_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_datas_shopping_data_id_seq', 1, false);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 253
-- Name: shopping_products_shopping_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_products_shopping_product_id_seq', 1, false);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 249
-- Name: shopping_shopping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_shopping_id_seq', 1, false);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 217
-- Name: states_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.states_state_id_seq', 2, true);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 235
-- Name: suppliers_data_supplier_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_data_supplier_data_id_seq', 1, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 233
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_supplier_id_seq', 2, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_data_user_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_data_user_data_id_seq', 1, false);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 4801 (class 2606 OID 111714)
-- Name: bills_data bills_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_data
    ADD CONSTRAINT bills_data_pkey PRIMARY KEY (bill_data_id);


--
-- TOC entry 4799 (class 2606 OID 111707)
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_pkey PRIMARY KEY (bill_id);


--
-- TOC entry 4783 (class 2606 OID 111594)
-- Name: clients_data clients_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_data
    ADD CONSTRAINT clients_data_pkey PRIMARY KEY (client_data_id);


--
-- TOC entry 4781 (class 2606 OID 111587)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);


--
-- TOC entry 4789 (class 2606 OID 111635)
-- Name: exchanges_conversion exchanges_conversion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_conversion
    ADD CONSTRAINT exchanges_conversion_pkey PRIMARY KEY (exchange_conversion_id);


--
-- TOC entry 4787 (class 2606 OID 111618)
-- Name: exchanges_data exchanges_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_data
    ADD CONSTRAINT exchanges_data_pkey PRIMARY KEY (exchange_data_id);


--
-- TOC entry 4785 (class 2606 OID 111611)
-- Name: exchanges exchanges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges
    ADD CONSTRAINT exchanges_pkey PRIMARY KEY (exchange_id);


--
-- TOC entry 4797 (class 2606 OID 111685)
-- Name: loans_data loans_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data
    ADD CONSTRAINT loans_data_pkey PRIMARY KEY (loan_data_id);


--
-- TOC entry 4795 (class 2606 OID 111678)
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (loan_id);


--
-- TOC entry 4805 (class 2606 OID 111738)
-- Name: products_data products_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_data
    ADD CONSTRAINT products_data_pkey PRIMARY KEY (product_data_id);


--
-- TOC entry 4803 (class 2606 OID 111731)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4815 (class 2606 OID 111808)
-- Name: sells_data sells_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_data
    ADD CONSTRAINT sells_data_pkey PRIMARY KEY (sell_data_id);


--
-- TOC entry 4819 (class 2606 OID 111847)
-- Name: sells_payments sells_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_payments
    ADD CONSTRAINT sells_payments_pkey PRIMARY KEY (sell_payment_id);


--
-- TOC entry 4813 (class 2606 OID 111801)
-- Name: sells sells_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells
    ADD CONSTRAINT sells_pkey PRIMARY KEY (sell_id);


--
-- TOC entry 4817 (class 2606 OID 111830)
-- Name: sells_products sells_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_products
    ADD CONSTRAINT sells_products_pkey PRIMARY KEY (sell_product_id);


--
-- TOC entry 4809 (class 2606 OID 111767)
-- Name: shopping_datas shopping_datas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_datas
    ADD CONSTRAINT shopping_datas_pkey PRIMARY KEY (shopping_data_id);


--
-- TOC entry 4807 (class 2606 OID 111760)
-- Name: shopping shopping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping
    ADD CONSTRAINT shopping_pkey PRIMARY KEY (shopping_id);


--
-- TOC entry 4811 (class 2606 OID 111784)
-- Name: shopping_products shopping_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_products
    ADD CONSTRAINT shopping_products_pkey PRIMARY KEY (shopping_product_id);


--
-- TOC entry 4775 (class 2606 OID 111554)
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (state_id);


--
-- TOC entry 4793 (class 2606 OID 111661)
-- Name: suppliers_data suppliers_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers_data
    ADD CONSTRAINT suppliers_data_pkey PRIMARY KEY (supplier_data_id);


--
-- TOC entry 4791 (class 2606 OID 111654)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 4779 (class 2606 OID 111570)
-- Name: users_data users_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_data
    ADD CONSTRAINT users_data_pkey PRIMARY KEY (user_data_id);


--
-- TOC entry 4777 (class 2606 OID 111563)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4834 (class 2606 OID 119487)
-- Name: bills_data bills_data_bill_exchange_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_data
    ADD CONSTRAINT bills_data_bill_exchange_fkey FOREIGN KEY (bill_exchange) REFERENCES public.exchanges_data(exchange_data_id);


--
-- TOC entry 4835 (class 2606 OID 111715)
-- Name: bills_data bills_data_bill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_data
    ADD CONSTRAINT bills_data_bill_id_fkey FOREIGN KEY (bill_id) REFERENCES public.bills(bill_id);


--
-- TOC entry 4836 (class 2606 OID 111720)
-- Name: bills_data bills_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_data
    ADD CONSTRAINT bills_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4822 (class 2606 OID 111595)
-- Name: clients_data clients_data_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_data
    ADD CONSTRAINT clients_data_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id);


--
-- TOC entry 4823 (class 2606 OID 111600)
-- Name: clients_data clients_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_data
    ADD CONSTRAINT clients_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4826 (class 2606 OID 119482)
-- Name: exchanges_conversion exchange_conversion_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_conversion
    ADD CONSTRAINT exchange_conversion_id_constraint FOREIGN KEY (exchange_convert_id) REFERENCES public.exchanges_data(exchange_data_id) ON DELETE CASCADE;


--
-- TOC entry 4827 (class 2606 OID 119472)
-- Name: exchanges_conversion exchange_conversion_to_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_conversion
    ADD CONSTRAINT exchange_conversion_to_id_constraint FOREIGN KEY (exchange_to_convert_id) REFERENCES public.exchanges_data(exchange_data_id);


--
-- TOC entry 4824 (class 2606 OID 119443)
-- Name: exchanges_data exchanges_data_exchange_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_data
    ADD CONSTRAINT exchanges_data_exchange_id_fkey FOREIGN KEY (exchange_id) REFERENCES public.exchanges(exchange_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4825 (class 2606 OID 111624)
-- Name: exchanges_data exchanges_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchanges_data
    ADD CONSTRAINT exchanges_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4830 (class 2606 OID 111691)
-- Name: loans_data loans_data_client_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data
    ADD CONSTRAINT loans_data_client_data_id_fkey FOREIGN KEY (client_data_id) REFERENCES public.clients_data(client_data_id);


--
-- TOC entry 4831 (class 2606 OID 119492)
-- Name: loans_data loans_data_exchange_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data
    ADD CONSTRAINT loans_data_exchange_data_id_fkey FOREIGN KEY (exchange_data_id) REFERENCES public.exchanges_data(exchange_data_id);


--
-- TOC entry 4832 (class 2606 OID 111686)
-- Name: loans_data loans_data_loan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data
    ADD CONSTRAINT loans_data_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loans(loan_id);


--
-- TOC entry 4833 (class 2606 OID 111696)
-- Name: loans_data loans_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans_data
    ADD CONSTRAINT loans_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4837 (class 2606 OID 111739)
-- Name: products_data products_data_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_data
    ADD CONSTRAINT products_data_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 4838 (class 2606 OID 111749)
-- Name: products_data products_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_data
    ADD CONSTRAINT products_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4839 (class 2606 OID 111744)
-- Name: products_data products_data_supplier_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_data
    ADD CONSTRAINT products_data_supplier_data_id_fkey FOREIGN KEY (supplier_data_id) REFERENCES public.suppliers_data(supplier_data_id);


--
-- TOC entry 4844 (class 2606 OID 111814)
-- Name: sells_data sells_data_client_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_data
    ADD CONSTRAINT sells_data_client_data_id_fkey FOREIGN KEY (client_data_id) REFERENCES public.clients_data(client_data_id);


--
-- TOC entry 4845 (class 2606 OID 111809)
-- Name: sells_data sells_data_sell_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_data
    ADD CONSTRAINT sells_data_sell_id_fkey FOREIGN KEY (sell_id) REFERENCES public.sells(sell_id);


--
-- TOC entry 4846 (class 2606 OID 111819)
-- Name: sells_data sells_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_data
    ADD CONSTRAINT sells_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4849 (class 2606 OID 111853)
-- Name: sells_payments sells_payments_exchange_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_payments
    ADD CONSTRAINT sells_payments_exchange_data_id_fkey FOREIGN KEY (exchange_data_id) REFERENCES public.exchanges_data(exchange_data_id);


--
-- TOC entry 4850 (class 2606 OID 111848)
-- Name: sells_payments sells_payments_sell_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_payments
    ADD CONSTRAINT sells_payments_sell_data_id_fkey FOREIGN KEY (sell_data_id) REFERENCES public.sells_data(sell_data_id);


--
-- TOC entry 4847 (class 2606 OID 111836)
-- Name: sells_products sells_products_product_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_products
    ADD CONSTRAINT sells_products_product_data_id_fkey FOREIGN KEY (product_data_id) REFERENCES public.products_data(product_data_id);


--
-- TOC entry 4848 (class 2606 OID 111831)
-- Name: sells_products sells_products_sell_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sells_products
    ADD CONSTRAINT sells_products_sell_data_id_fkey FOREIGN KEY (sell_data_id) REFERENCES public.sells_data(sell_data_id);


--
-- TOC entry 4840 (class 2606 OID 111768)
-- Name: shopping_datas shopping_datas_shopping_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_datas
    ADD CONSTRAINT shopping_datas_shopping_id_fkey FOREIGN KEY (shopping_id) REFERENCES public.shopping(shopping_id);


--
-- TOC entry 4841 (class 2606 OID 111773)
-- Name: shopping_datas shopping_datas_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_datas
    ADD CONSTRAINT shopping_datas_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4842 (class 2606 OID 111790)
-- Name: shopping_products shopping_products_product_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_products
    ADD CONSTRAINT shopping_products_product_data_id_fkey FOREIGN KEY (product_data_id) REFERENCES public.products_data(product_data_id);


--
-- TOC entry 4843 (class 2606 OID 111785)
-- Name: shopping_products shopping_products_shopping_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_products
    ADD CONSTRAINT shopping_products_shopping_data_id_fkey FOREIGN KEY (shopping_data_id) REFERENCES public.shopping_datas(shopping_data_id);


--
-- TOC entry 4828 (class 2606 OID 111667)
-- Name: suppliers_data suppliers_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers_data
    ADD CONSTRAINT suppliers_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4829 (class 2606 OID 111662)
-- Name: suppliers_data suppliers_data_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers_data
    ADD CONSTRAINT suppliers_data_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id);


--
-- TOC entry 4820 (class 2606 OID 111576)
-- Name: users_data users_data_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_data
    ADD CONSTRAINT users_data_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(state_id);


--
-- TOC entry 4821 (class 2606 OID 111571)
-- Name: users_data users_data_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_data
    ADD CONSTRAINT users_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2025-10-05 15:04:49

--
-- PostgreSQL database dump complete
--

