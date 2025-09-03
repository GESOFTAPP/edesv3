# --------------------	#toDo: CREATE TABLE gs_informe/gs_report( ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
# GESTION DE OPCIONES
# --------------------

CREATE TABLE gs_tree (
	cd_gs_tree serial not null,
	nm_gs_tree varchar(60,1) not null,
	cd_tree char(10),
	filename varchar(30,1),
	permission char(1),
	extract char(1),
	print char(1),
	excel char(1),
	xml char(1),
	txt char(1),
	mdb char(1),
	pdf char(1),
	csv	char(1),
	email char(1),
	news char(1),
	rmvfstlvl char(1),
	warnings smallint,
	description varchar(255,1),
	cdi datetime
);
create unique index gs_tree on gs_tree (nm_gs_tree);

create table gs_op (
	mode char(1),
	seq integer DEFAULT '0',
	seq_parent integer DEFAULT '0',
	indent smallint DEFAULT '0',
	caption varchar(255),
	tip varchar(255),
	type char(1),
	cd_gs_op integer,
	script_url varchar(255),
	icon varchar(255),
	status char(1),
	dt_status date,
	cd_gs_user integer,
	icons varchar(60),
	show_type char(1),
	dt_add date,
	alias varchar(20)
);
create UNIQUE index gs_op_1 on gs_op (cd_gs_op);
create index gs_op_2 on gs_op ( seq );

create table gs_tree_op (
	cd_gs_tree integer NOT NULL,
	cd_gs_op integer NOT NULL
);
create UNIQUE index gs_tree_op   on gs_tree_op (cd_gs_tree, cd_gs_op);
create        index gs_tree_op_2 on gs_tree_op (cd_gs_op);

create table gs_op_ico (
	cd_gs_op_ico serial not null,
	nm_gs_op_ico varchar(45),
	activo char(1),
	global char(1),
	position smallint,
	status char(1),
	icon varchar(30),
	title varchar(80),
	add_html varchar(100),
	note varchar(255),
	mode char(1),
	show_type char(1),
	dt_status date NOT NULL,
	cd_gs_user integer,
	alias varchar(20),
	classname varchar(20),
	separator_group char(1)
);

create table gs_user_tree (
	cd_gs_user integer NOT NULL,
	cd_gs_tree smallint NOT NULL,
	mode varchar(19)
);
create UNIQUE index gs_user_tree on gs_user_tree (cd_gs_user, cd_gs_tree);

create table gs_user_op (
	cd_gs_user integer NOT NULL,
	cd_gs_tree smallint NOT NULL,
	action char(1) NOT NULL,
	cd_gs_op integer NOT NULL
);
create UNIQUE index gs_user_op on gs_user_op (cd_gs_user, cd_gs_tree, action, cd_gs_op);
create index gs_user_op_2 on gs_user_op (cd_gs_user,cd_gs_op,action);
create index gs_user_op_3 on gs_user_op (cd_gs_op,action);

create table gs_user_export (
	cd_gs_user integer NOT NULL,
	mode varchar(2) NULL,
	script varchar(60) NOT NULL,
	cd_gs_op integer NULL,
	tools varchar(10) NOT NULL
);
create UNIQUE index gs_user_export on gs_user_op (cd_gs_user, script, mode);


CREATE TABLE gs_tree_admin (
	cd_gs_user integer unsigned NOT NULL,
	cd_gs_tree integer unsigned NOT NULL,
	action char(1)
); 
create UNIQUE index gs_tree_admin_1 on gs_tree_admin (cd_gs_user, cd_gs_tree, action);

#---

create table gs_rol (
	cd_gs_rol_exp serial NOT NULL,
	nm_gs_rol_exp varchar(60) NOT NULL,
	description varchar(255),

	permission char(1),

	webmaster char(1),
	system_user char(1),
		
	export_level char(1),
		
	print_tab_public char(1),
	print_tab_private char(1),
		
	print_public char(1),
	print_private char(1),
		
	pdf_public char(1),
	xls_public char(1),
	xml_public char(1),
	txt_public char(1),
	csv_public char(1),
		
	pdf_private char(1),
	xls_private char(1),
	xml_private char(1),
	txt_private char(1),
	csv_private char(1)
);
create UNIQUE index gs_rol on gs_rol_exp (nm_gs_rol_exp);

create table gs_rol_tree (
	cd_gs_rol integer NOT NULL,
	cd_gs_tree smallint NOT NULL,
	mode varchar(19)
);
create UNIQUE index gs_rol_tree on gs_rol_tree (cd_gs_rol, cd_gs_tree);

create table gs_rol_op (
	cd_gs_rol integer NOT NULL,
	cd_gs_tree smallint NOT NULL,
	action char(1),
	cd_gs_op integer NOT NULL
);
create UNIQUE index gs_rol_op on gs_rol_op (cd_gs_rol, cd_gs_tree, action, cd_gs_op);
create index gs_rol_op_2 on gs_rol_op (cd_gs_rol,cd_gs_op,action);

create table gs_rol_permission (
	cd_gs_rol integer NOT NULL,
	cd_gs_tpermission integer NOT NULL
);
create UNIQUE index gs_rol_permission on gs_rol_permission (cd_gs_rol, cd_gs_tpermission);

# --------------------

create table gs_tpermission (
	cd_gs_tpermission serial NOT NULL,
	nm_gs_tpermission varchar(30),
	script varchar(30),
	active char(1),
	type char(1),
	note varchar(255),
	options varchar(60),
	icons varchar(30),
	dt_add date
);
create UNIQUE index cd_gs_tpermission_1 on gs_tpermission (cd_gs_tpermission);
create UNIQUE index cd_gs_tpermission_2 on gs_tpermission (script, nm_gs_tpermission);
create index cd_gs_tpermission_3 on gs_tpermission (note);

create table gs_permission (
	cd_gs_user integer NOT NULL,
	cd_gs_tpermission integer NOT NULL
);
create UNIQUE index gs_permission on gs_permission (cd_gs_user, cd_gs_tpermission);

create table gs_permission_op (
	cd_gs_user integer NOT NULL,
	option_id integer NOT NULL,
	visible char(1) NOT NULL
);
create UNIQUE index gs_permission_op on gs_permission_op (cd_gs_user, option_id);

create table gs_permission_ico (
	cd_gs_user integer NOT NULL,
	cd_gs_tpermission integer NOT NULL,
	visible char(1)
);
create UNIQUE index gs_permission_ico on gs_permission_ico (cd_gs_user, cd_gs_tpermission);

# ------------
# ESTADISTICA
# ------------

CREATE TABLE gs_navegador (
	cd_gs_navegador serial not null,
	nm_gs_navegador char(50),
	nombre char(30),
	resolucion char(12),
	varios char(7)
);
create unique index gs_navegador  on gs_navegador (cd_gs_navegador);
create        index gs_navegador2 on gs_navegador (nm_gs_navegador,nombre,resolucion,varios);

CREATE TABLE gs_conexion (
	conexion serial not null,
	id char(40),
	exe char(1),
	cd_server tinyint unsigned,
	cd_gs_tree smallint,
	cd_gs_user integer,
	cdi datetime year to second,
	cd_gs_navegador integer,
	ip char(15),
	cd_gs_node smallint,
	sg_carga integer,
	cdi_fin datetime year to second,
	zip char(1),
	cd_gs_pc smallint,
	access tinyint unsigned
);
create index gs_conexion  on gs_conexion (cdi,cd_gs_user);
create index gs_conexion3 on gs_conexion (id) 

CREATE TABLE gs_acceso (
	cd_gs_toperacion char(3),
	conexion integer,
	cdi datetime year to second,
	objeto char(1),
	modo char(2),
	edf char(40),
	tabla char(20),
	parametros varchar(255),
	pagina char(80),
	parametro varchar(255),
	registros integer,
	uso_cpu integer,
	num_acceso serial not null ,
	byts integer,
	cd_gs_node smallint,
	cd_gs_user integer
);
create index gs_acceso1 on gs_acceso (cdi);
create index gs_acceso2 on gs_acceso (cd_gs_toperacion);
create index gs_acceso3 on gs_acceso (parametro);
create index gs_acceso4 on gs_acceso (cd_gs_user,cdi);


CREATE TABLE gs_toperacion (
	cd_gs_toperacion char(3) not null,
	nm_gs_toperacion char(40) not null,
	orden smallint,
	grupo char(10),
	activa char(1)
);
create unique index gs_toperacion on gs_toperacion (cd_gs_toperacion);

CREATE TABLE gs_context (
	cd_gs_conexion integer unsigned NOT NULL,
	context integer unsigned NOT NULL,
	type varchar(5) NOT NULL,
	script varchar(160) NOT NULL,
	data varchar(255) NULL
);
create unique index gs_context on gs_context (cd_gs_conexion,context,type,script);

# ------------------------

CREATE TABLE gs_error (
	codigo serial not null ,
	cdi datetime year to second,
	cd_gs_user smallint,
	tipo char(1),
	desde varchar(60),
	fichero varchar(80),
	linea integer,
	img char(1),
	pendiente char(1) null,
	texto varchar(80),
	trace text
);
create index gs_error1 on gs_error (codigo);
create index gs_error2 on gs_error (cdi);

CREATE TABLE gs_log (
	cdi datetime year to second,
	operacion char(1),
	cd_gs_user integer,
	tabla char(15),
	clave varchar(20,1),
	sqlexe text
);
create index gs_log1 on gs_log (clave);
create index gs_log2 on gs_log (cdi,tabla);

CREATE TABLE gs_log_tmp (
	pk_user integer not null,
	cdi varchar(19) NOT NULL,
	operacion char(1) NOT NULL,
	cd_gs_user integer not null,
	tabla varchar(15) NOT NULL,
	campo varchar(30) NOT NULL,
	valor char(1024),
	borrar char(1)
);
create index gs_log_tmp on gs_log_tmp (pk_user);


create table gs_log_doc (
	cd_gs_log_doc serial NOT NULL,
	dbtable varchar(30) NOT NULL,
	nm_field varchar(30) NOT NULL,
	pk integer unsigned NOT NULL,
	nm_file varchar(120) NOT NULL,
	type_doc varchar(4) NOT NULL,
	doc_size integer unsigned NOT NULL,
	cdi_insert datetime year to second NOT NULL,
	cd_gs_user integer unsigned NOT NULL,
	cdi_log datetime year to second NOT NULL,
	user_log integer unsigned NOT NULL
);
create index gs_log_doc1 on gs_log_doc (cd_gs_log_doc);
create index gs_log_doc2 on gs_log_doc (pk, cdi_insert);


create table gs_log_file (
	cd_gs_log_file serial NOT NULL,
	cdi datetime NOT NULL,
	type_file varchar(4) NOT NULL,
	script varchar(100) NOT NULL,
	records integer unsigned DEFAULT '0' NOT NULL,
	cd_gs_node integer unsigned DEFAULT '0' NOT NULL,
	cd_gs_user integer unsigned DEFAULT '0' NOT NULL
);
create unique index gs_log_file_1 (cd_gs_log_file);
create index gs_log_file_2 (cd_gs_user, cdi);
create index gs_log_file_3 (cdi, cd_gs_user);

create table gs_log_email (  
	pk serial NOT NULL ,
	cd_gs_user integer unsigned,
	psource varchar(40),
	mail_to varchar(95),
   	mail_from  varchar(95),
	mail_cc  varchar(95),
	mail_cco  varchar(95),
	mail_subject  varchar(95),
	mail_message text,
	files integer unsigned,
	files_name varchar(256),
	send_receive char(1),
	cdi datetime
);
create unique index gs_log_email_1 (pk);
create index gs_log_email_2 (cd_gs_user, cdi);
create index gs_log_email_3 (cdi);
create index gs_log_email_4 (mail_from);
create index gs_log_email_5 (psource,mail_to,cdi);

create table gs_robinson (  
	email varchar(95),
	note varchar(95),
	cd_gs_user integer unsigned,
	cdi datetime
);
create unique index gs_robinson (email);

create table gs_spider (
	cd_gs_spider serial NOT NULL,
	nm_gs_spider varchar(60) NOT NULL,
	objeto char(1),
	modo char(2),
	url varchar(60),
	href varchar(60),
	app varchar(30) NOT NULL,
	en_desarrollo char(1) NOT NULL,
	problema varchar(256) NOT NULL,
	estado char(1),
	filename varchar(30) NOT NULL,
	reportado_por varchar(60) NOT NULL,
	cdi_insert datetime,
	cdi_ok datetime NULL,
	version_edes varchar(10)
);
create unique index gs_spider_1 (cd_gs_spider);
create unique index gs_spider_2 (cdi_insert);

# -------------
# EXTRACCIONES
# -------------

CREATE TABLE gs_entidad (
	cd_gs_entidad serial not null ,
	nm_gs_entidad char(30) not null ,
	tabla char(20) not null 
);
create unique index gs_entidad on gs_entidad (cd_gs_entidad);

CREATE TABLE gs_grupo (
	cd_gs_grupo serial not null ,
	nm_gs_grupo char(30) not null ,
	cd_gs_entidad smallint not null ,
	orden smallint not null ,
	nota char(45)
);
create unique index gs_grupo  on gs_grupo (cd_gs_grupo);
create unique index gs_grupo2 on gs_grupo (cd_gs_entidad,nm_gs_grupo);

CREATE TABLE gs_campo (
	cd_gs_campo serial not null,
	tabla varchar(20) not null,
	campo varchar(80) not null,
	tipo varchar(255,1),
	tipo_log varchar(60),
	ancho smallint not null,
	decimales smallint,
	unescape char(1),
	cd_gs_entidad smallint not null,
	cd_gs_grupo smallint not null,
	orden smallint,
	etiqueta varchar(30),
	label_tab varchar(30),
	nivel smallint,
	virtual_field char(1),
	add_campos varchar(30),
	log_history char(1),
	log_no_system char(1),
	log_only char(1),
	alineacion char(1),
	relacion varchar(255,1),
	descripcion varchar(255,1),
	informe char(1),
	extraccion char(1),
	tipo_dato char(1),
	campo_ref varchar(20),
	label_inf varchar(30)
);
create unique index gs_campo  on gs_campo (cd_gs_campo);
create        index gs_campo2 on gs_campo (cd_gs_entidad,cd_gs_grupo,orden,etiqueta);

CREATE TABLE gs_formato (
	cd_gs_formato serial not null,
	cd_gs_user smallint,
	cd_gs_entidad smallint,
	grupo char(20) null,
	nm_gs_formato char(60),
	orientacion char(1),
	tipo_letra char(50),
	ancho_letra smallint,
	titulo_list varchar(255,1) null,
	descripcion varchar(255,1) null,
	formato varchar(500,1),
	cabecera varchar(255,1) null,
	operacion varchar(255,1) null,
	ordenacion varchar(36),
	destino char(1),
	cd_gs_share smallint null,
	cd_gs_user2 smallint null,
	cd_gs_node smallint null,
	cd_gs_position smallint null,
	cd_gs_tree smallint null,
	cd_scope smallint null,
	informe char(1)
);
create unique index gs_formato  on gs_formato (cd_gs_formato);
create        index gs_formato2 on gs_formato (cd_gs_user,cd_gs_entidad,grupo,nm_gs_formato);

CREATE TABLE gs_exp_file (
	cd_gs_exp_file serial not null,
	cd_gs_user integer,
	estado char(1) not null ,
	tipo char(1),
	formato char(3),
	cd_gs_formato integer,
	comprimido smallint not null ,
	cdi datetime year to second not null ,
	download datetime year to second,
	fichero char(20),
	descargado smallint,
	t_reg integer,
	sg integer,
	descripcion char(60),
	sql_1 varchar(255,1),
	sql_2 varchar(255,1),
	sql_3 varchar(255,1)
);
create unique index gs_exp_file1 on gs_exp_file (cd_gs_exp_file);
create index gs_exp_file2 on gs_exp_file (cd_gs_user,cdi,descargado);
create index gs_exp_file3 on gs_exp_file (cdi);

CREATE TABLE gs_dct (
	dct_serial integer unsigned NOT NULL,
	dct_field varchar(15) NOT NULL,
	dct_work varchar(30) NOT NULL
);
create index gs_dct on gs_dct (dct_field, dct_work);

# --------------
# MANTENIMIENTO
# --------------

CREATE TABLE gs_activity (
	cd_gs_user integer,
	cdi datetime,
	script varchar(100),
	cdi_ftp datetime,
	edes char(1),
	byts integer,
	email varchar(65)
);
create index gs_activity_1 on gs_activity (cd_gs_user, cdi);
create index gs_activity_2 on gs_activity (cd_gs_user, cdi_ftp);
create index gs_activity_3 on gs_activity (cdi);
create index gs_activity_4 on gs_activity (cdi_ftp);

CREATE TABLE gs_pack (
  cd_gs_pack not null,
  cdi datetime NOT NULL,
  cd_gs_activity integer DEFAULT NULL,
  cd_type char(1) NOT NULL,
  options varchar(60) DEFAULT '0',
  description text NOT NULL,
  cd_gs_user integer unsigned DEFAULT NULL
);
create index gs_pack_1 on gs_activity (cd_gs_pack);
create index gs_pack_2 on gs_activity (cdi);
create index gs_pack_3 on gs_activity (options,cdi);

CREATE TABLE gs_desarrollo (
	codigo serial not null,
	cd_tipo char(1) not null,
	cd_prioridad smallint not null,
	dt_tope date not null,
	resumen varchar(50) not null,
	descripcion varchar(255) not null,
	respuesta varchar(255) not null,
	cdi_solicitud datetime year to second not null,
	cdi_terminado datetime year to second,
	usu_solicitud int not null,
	usu_terminado int not null,
	cd_estado char(1) not null
	fichero varchar(65),
	menu1 int,
	menu2 int,
	menu3 int,
	menu4 int,
	menu5 int
);
create index gs_desarrollo on gs_desarrollo (codigo, cd_prioridad, cdi_solicitud);

CREATE TABLE gs_novedad (
	codigo serial not null,
	cd_tnovedades integer,
	titulo varchar(90),
	dt_alta date,
	cd_gs_user integer,
	resumen text,
	options varchar(60),
	cdi datetime year to second
);
create index gs_novedad on gs_novedad (cdi);

CREATE TABLE gs_list_store (
	cd_gs_list_store serial(4) not null,
	nm_gs_list_store varchar(150) not null,
	ls_definition text not null,
	dct_sql varchar(250) null,
	cd_gs_user integer,
	cdi_insert datetime year to second,
	cdi_update datetime year to second,
	time varchar(5),
	nm_gs_list_store 	(unique),
	cd_gs_list_store 	(unique)
);
create index gs_list_store on gs_list_store (nm_gs_list_store);

# -----------------
# LUGAR Y USUARIOS
# -----------------

CREATE TABLE gs_node (
	cd_gs_node serial,
	nm_gs_node char(60),
	permission char(1),
	address char(36),
	nm_loca char(30),
	zip char(5),
	phone char(9),
	phone2 char(9),
	fax char(9),
	dt_add date,
	dt_del date,
	email char(65),
	ip char(15),
	ip2 char(15),
	ip_from varchar(15),
	ip_to varchar(15),
	notes char(255)
);
create index gs_node on gs_node (nm_gs_node);

CREATE TABLE gs_user (
	cd_gs_user serial not null,
	login char(65) not null,
	pass char(32) not null,
	cd_gs_tree smallint,
	cd_gs_node smallint,
	new_pass smallint,
	dt_pass date NULL,
	trigger_chr char(1),
	verify_pass char(1),
	verify_cookie varchar(32),
	verify_expire datetime,
	verify_wait char(1),
	pc_with_id char(1),
	pc_total smallint,
	user_name char(20),
	user_surname char(30),
	dni char(8) not null,
	phone char(9),
	phone2 char(9),
	cd_gs_position smallint unsigned DEFAULT '0' NULL,
	cd_gs_office smallint unsigned DEFAULT '0' NULL,
	dt_add date,
	dt_del date null,
	email char(65),
	permission char(1),
	webmaster char(1) NULL,
	system_user char(1) NULL,
	log_user char(1) NULL,
	log_history char(1) NULL,
	cd_type_tree char(1),
	cd_gs_rol_exp integer,
	like_user integer,

	print_tab_public char(1),
	print_tab_private char(1),
		
	print_public char(1),
	print_private char(1),
		
	pdf_public char(1),
	xls_public char(1),
	xml_public char(1),
	txt_public char(1),
	csv_public char(1),
		
	pdf_private char(1),
	xls_private char(1),
	xml_private char(1),
	txt_private char(1),
	csv_private char(1),

	notes char(255),
	ip char(15),
	ip2 char(15),
	ip_from char(15),
	ip_to char(15),
	export_level smallint,
	ys_news datetime year to second,
	desktop_type smallint,
	cd_gs_theme number(2),
	confidential char(1),
	dt_confidential date NULL,
	tf_confidential char(1),
	dt_access_last date,
	view_desktop char(1),
	cd_gs_language char(2),
	host varchar(60),
	zoom_tab smallint,
	zoom_list smallint,
	task_status smallint,
	pass_doc varchar(65) NULL,
	pass_tmp varchar(32) NULL,
	pass_tmp_cdi datetime year to second NULL,
	pass_error smallint NULL,
	pass_error_cdi datetime year to second NULL,
	clipping varchar(60)
);
create unique index gs_user1 on gs_user (login,pass);
create        index gs_user2 on gs_user (user_surname,user_name);
create        index gs_user3 on gs_user (task_status);

CREATE TABLE gs_position (
	cd_gs_position smallint serial NOT NULL,
	nm_gs_position char(30) NOT NULL
);
create unique index cd_gs_position on gs_position (cd_gs_position);

CREATE TABLE gs_office (
	cd_gs_office serial NOT NULL,
	nm_gs_office char(40) NOT NULL
);
create unique index cd_gs_office on gs_office (cd_gs_office);

create table gs_language (
	cd_gs_language char(2) NOT NULL,
	nm_gs_language varchar(10) NOT NULL,
	tf_translation char(1),
	img_sel varchar(40)
);
create unique index cd_gs_language on gs_language (cd_gs_language);

create table gs_mailfrom (
	cd_mailfrom serial(4) not null,
	cd_gs_user integer not null,
	mailfrom varchar(80,0) not null
);
create unique index gs_mailfrom on gs_mailfrom (cd_gs_user, mailfrom);


CREATE TABLE gs_backup (
	cdi datetime year to second DEFAULT CURRENT YEAR TO SECOND,
	nm_file varchar(35) NOT NULL,
	bytes_size integer NOT NULL,
	target varchar(50) NOT NULL,
	type varchar(100) NOT NULL,
	info varchar(255) NOT NULL,
);
create index gs_backup on gs_backup (cdi);

create table gs_color (
	orden integer,
	cd_gs_color char(7),
	nm_gs_color varchar(25),
	luminosidad decimal(7,3),
	luma decimal(7,3)
);
create unique index gs_color1 on gs_color ( cd_gs_color );

create table gs_last (
	cd_gs_user integer unsigned NOT NULL,
	cdi datetime NOT NULL,
	action varchar(1) NOT NULL,
	ac_return varchar(3) NOT NULL,
	script varchar(60) NOT NULL,
	db_field varchar(20) NOT NULL,
	db_value varchar(15) NOT NULL
);
create unique index gs_last_1 on gs_last (cd_gs_user, cdi);
create unique index gs_last_2 on gs_last (cd_gs_user, script, db_value);

#------
# TAPI
#------
CREATE TABLE gs_logtapi (
	cd_gs_logtapi serial not null primary key,
	ds_log datetime year to second not null,
	cd_gs_user smallint not null,
	userext integer not null,
	event char(1) not null,
	remoteext integer,
	line char(1)
);
create index gs_logtapi  on gs_logtapi (ds_log);
create index gs_logtapi2 on gs_logtapi (cd_gs_user);

#----------
# Progress
#----------
create table gs_progress (
	script varchar(30) not null,
	md5 varchar(32),
	seconds smallint not null
);
create index gs_progress2 on gs_progress (script,md5);

#---------
# ALERTAS
#---------

create table gs_event (
	cd_gs_event serial not null,
	nm_gs_event varchar(60) NOT NULL,
	dt_date_ev date,
	hour_ev varchar(5) NOT NULL,
	dt_alert_date_ev date,
	alert_hour_ev varchar(5),
	dt_new_date_ev date,
	new_hour_ev varchar(5),
	status_ev char(1) NOT NULL,
	frequency_ev char(1) NOT NULL,
	dt_start_ev date,
	dt_end_ev date,
	cd_gs_event_type smallint unsigned,
	cd_gs_user int unsigned DEFAULT '0' NOT NULL,
	nt_note text,
	old_delete_ev char(1) NOT NULL
);
create index gs_event  on gs_event (cd_gs_user, dt_date_ev, hour_ev);
create index gs_event2 on gs_event (status_ev, cd_gs_user, dt_date_ev, hour_ev);
create index gs_event3 on gs_event (cd_gs_user, nm_gs_event);

create table gs_event_user (
	cd_gs_event_user serial not null,
	cd_gs_event int DEFAULT '0' NOT NULL,
	cd_gs_user int unsigned DEFAULT '0' NOT NULL,
	dt_new_date_ev date DEFAULT '0000-00-00' NOT NULL,
	new_hour_ev char(5),
	status_ev char(1) NOT NULL
);
create index gs_event_user on gs_event_user (cd_gs_user, dt_new_date_ev, new_hour_ev);

create table gs_event_type (
	cd_gs_event_type serial not null,
	nm_gs_event_type varchar(15) NOT NULL
);
create unique index gs_event_type  on gs_event_type (cd_gs_event_type);
create unique index gs_event_type2 on gs_event_type (nm_gs_event_type);

#--------
# VARIOS
#--------

create table gs_storage (
	type_storage char(1),
	key_storage varchar(30),
	cdi timestamp,
	note varchar(100),
	text_es varchar(9000),
	text_en varchar(2000),
	text_ca varchar(2000),
	text_fr varchar(2000)
);
create unique index gs_storage_1 on gs_storage (type_storage,key_storage);
create index gs_storage_2 on gs_storage (cdi);


CREATE TABLE gs_icon (
	cd_gs_icon integer NOT NULL,
	nm_gs_icon varchar(60) NOT NULL,
	hexa varchar(6),
	description varchar(255),
	cdi datetime,
	contexto varchar(15),
	sin_uso char(1),
	verificado char(1),
	tipo char(1),
	origen varchar(25)
);
create unique index gs_icon on gs_icon (cd_gs_icon);


create table gs_help_file (
	cd_gs_help_file serial not null,
	nm_gs_help_file varchar(80) NOT NULL,
	nm_file varchar(80) NOT NULL,
	options varchar(100) NULL
);
create unique index gs_help_file  on gs_help_file (cd_gs_help_file);
create unique index gs_help_file2 on gs_help_file (nm_gs_help_file);

create table gs_theme (
	cd_gs_theme serial not null,
	path_css varchar(15),
	path_img varchar(15),
	nm_gs_theme varchar(45),
	tf_active char(1)
);
create unique index gs_theme  on cd_gs_theme (cd_gs_theme);
create unique index gs_theme2 on cd_gs_theme (nm_gs_theme);

#------
# CHAT
#------

CREATE TABLE gs_chat (
	cd_gs_chat serial NOT NULL,
	action char(1) NOT NULL,
	user_from integer NOT NULL,
	user_to integer,
	message varchar(80),
	room varchar(30),
	y2s datetime year to second NOT NULL
);
create index gs_chat1  on gs_chat (user_to,y2s);
create index gs_chat2  on gs_chat (room,y2s);

CREATE TABLE gs_chat_log (
	cd_gs_chat integer NOT NULL,
	user_owner integer NOT NULL,
	action char(1) NOT NULL,
	user_from integer NOT NULL,
	user_to integer,
	message varchar(80),
	room varchar(30),
	y2s datetime year to second NOT NULL
);
create index gs_chat_log on gs_chat_log (user_owner,y2s);

CREATE TABLE gs_chat_lost (
	cd_gs_chat integer NOT NULL,
	action char(1) NOT NULL,
	user_from integer NOT NULL,
	user_to integer,
	message varchar(80),
	room varchar(30),
	y2s datetime year to second NOT NULL
);
create index gs_chat_lost on gs_chat_lost (user_to,y2s);

#------------
# BACKGROUND
#------------

create table gs_bkg (
	cd_gs_bkg serial not null,
	cd_gs_user integer,
	bkg_status char(1),
	bkg_unique char(1),
	command varchar(40),
	parameters varchar(125),
	y2s_start datetime year to second,
	y2s_end datetime year to second,
	total_time char(8),
	bkg_pid integer,
	bkg_stime char(8),
	bkg_time char(8),
	y2s_note datetime year to second,
	note varchar(125),
	txt_error char(250)
);
create index gs_bkg1 on gs_bkg (command, bkg_status);
create index gs_bkg2 on gs_bkg (cd_gs_user, y2s_start);
create index gs_bkg3 on gs_bkg (bkg_pid);

#-----------
# RESERVADO
#-----------

CREATE TABLE gs_df (
	nombre varchar(25) NOT NULL,
	codigo text NOT NULL
);
create unique index gs_df on gs_df (nombre);


CREATE TABLE gs_store (
	cd_gs_store serial,
	nm_gs_store varchar(80) NOT NULL,
	fichero varchar(60) NOT NULL,
	tamayo integer unsigned,
	extension varchar(4),
	fecha date,
	hora varchar(8),
	cdi datetime year to second,
	caption varchar(60),
	cd_gs_user integer,
);
create unique index gs_store on gs_store (nm_gs_store);

CREATE TABLE gs_ayuda (
	codigo serial,
	nombre varchar(15) NOT NULL,
	sintaxis varchar(60) NOT NULL,
	grupo char(2) NOT NULL,
	dt_creado date,
	dt_modificado date,
	resumen varchar(60),
	descripcion text
);
create unique index gs_ayuda on gs_ayuda (nombre);

#------------
# TRADUCCION 
#------------

create table gs_script (
	cd_gs_script serial not null,
	cd_gs_script_parent integer unsigned NOT NULL,
	nm_gs_script varchar(100) NOT NULL,
	extension varchar(10) NOT NULL,
	filepath varchar(255) NOT NULL,
	short_desc varchar(255) NOT NULL,
	long_desc text NOT NULL,
	type varchar(1) NOT NULL
);
create unique index filepath_UNIQUE on gs_script (filepath);
create unique index by_parent on gs_script (cd_gs_script_parent, cd_gs_script);
create index nm_gs_script on gs_script (nm_gs_script);

create table gs_transchange (
	cd_gs_transchange serial not null,
	cd_gs_script integer NOT NULL,
	cd_gs_language char(2) NOT NULL,
	word_id varchar(500) NOT NULL,
	word_val varchar(3000) NOT NULL,
	word_val_md5 char(32) NOT NULL,
	cdi_add datetime NOT NULL,
	cdi_changed datetime NOT NULL,
	tf_changed varchar(1) NOT NULL,
	tf_script varchar(1) NOT NULL,
	comment varchar(3000) NOT NULL,
	type varchar(1) NOT NULL,
	word_val_old varchar(3000) NOT NULL,
	word_val_md5_old char(32) NOT NULL,
	gs_transchangecol varchar(45) NOT NULL
);
create unique index gs_transchange on gs_transchange (cd_gs_script, cd_gs_language, word_id);

create table gs_op_lng (
	cd_gs_op serial NOT NULL,
	cd_gs_language varchar(2) NOT NULL,
	caption_tip char(1) NOT NULL,
	caption varchar(255) NOT NULL,
	md5 char(32) NOT NULL,
	tf_changed varchar(1) NOT NULL
);
create index gs_op_lng on gs_op_lng (md5, caption_tip, cd_gs_language);

create table gs_serial (
	cd_gs_conexion integer unsigned not null,
	pk integer unsigned not null
);
create unique index gs_serial on gs_serial (cd_gs_conexion);

create table gs_chart (
  cd_gs_chart serial not null,
  cd_gs_user integer unsigned NOT NULL,
  script varchar(60) NOT NULL,
  dt_update date NOT NULL,
  total integer unsigned NOT NULL,
  definition varchar(2500)
);
create index gs_chart on gs_chart (script,cd_gs_user);
