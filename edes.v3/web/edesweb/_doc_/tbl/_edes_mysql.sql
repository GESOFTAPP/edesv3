# -----------------
# LUGAR Y USUARIOS
# -----------------


CREATE TABLE gs_node (
	cd_gs_node smallint(5) unsigned NOT NULL auto_increment,
	nm_gs_node varchar(60) NOT NULL,
	permission char(1),
	address varchar(36) NULL,
	zip varchar(5) NULL,
	nm_loca varchar(30) NULL,
	phone varchar(9) NULL,
	phone2 varchar(9) NULL,
	fax varchar(9) NULL,
	dt_add date NOT NULL DEFAULT '0000-00-00',
	dt_del date DEFAULT '0000-00-00',
	email varchar(65) NULL,
	ip varchar(15) NULL,
	ip2 varchar(15) NULL,
	ip_from varchar(15) NULL,
	ip_to varchar(15) NULL,
	notes varchar(255) NULL,
	PRIMARY KEY (cd_gs_node),
	KEY cd_gs_node_2 (nm_gs_node)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_position (
	cd_gs_position smallint(5) unsigned NOT NULL auto_increment,
	nm_gs_position varchar(30) NOT NULL,
	PRIMARY KEY (cd_gs_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_office (
	cd_gs_office smallint(5) unsigned NOT NULL auto_increment,
	nm_gs_office varchar(40) NOT NULL,
	PRIMARY KEY (cd_gs_office)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_language (
	cd_gs_language char(2) NOT NULL,
	nm_gs_language varchar(40) NOT NULL,
	tf_translation char(1),
	img_sel varchar(40),
	UNIQUE gs_language (cd_gs_language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_theme (
	cd_gs_theme tinyint(4) unsigned NOT NULL auto_increment,
	path_css varchar(15),
	path_img varchar(15),
	nm_gs_theme varchar(45),
	tf_active char(1),
	PRIMARY KEY (cd_gs_theme),
	UNIQUE gs_theme (nm_gs_theme)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_user (
	cd_gs_user int(10) unsigned NOT NULL auto_increment,
	login varchar(65) NOT NULL,
	pass varchar(32) NOT NULL,
	cd_gs_tree smallint(6) unsigned DEFAULT '0' NOT NULL,
	cd_gs_node smallint(5) unsigned DEFAULT '0' NOT NULL,
	new_pass tinyint(2) DEFAULT '0' NOT NULL,
	dt_pass date NULL,
	trigger_chr char(1),
	verify_pass char(1),
	verify_cookie varchar(32),
	verify_expire datetime,
	verify_wait char(1),
	pc_with_id char(1) NULL,
	pc_total tinyint(1) DEFAULT '0' NOT NULL,
	user_name varchar(20) NOT NULL,
	user_surname varchar(30) NULL,
	dni varchar(8) NOT NULL,
	phone varchar(9) NULL,
	phone2 varchar(9) NULL,
	cd_gs_position smallint(5) unsigned DEFAULT '0' NULL,
	cd_gs_office smallint(5) unsigned DEFAULT '0' NULL,
	dt_add date,
	dt_del date NULL,
	email varchar(65) NULL,
	permission char(1) NOT NULL,
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
	
	notes varchar(255) NULL,
	ip varchar(15) NULL,
	ip2 varchar(15) NULL,
	ip_from varchar(15) NULL,
	ip_to varchar(15) NULL,
	export_level char(1) NOT NULL,
	ys_news datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	desktop_type tinyint(4),
	cd_gs_theme tinyint(4) unsigned,
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
	pass_tmp varchar(32) DEFAULT NULL,
	pass_tmp_cdi datetime DEFAULT NULL,
	pass_error int(5) NULL,
	pass_error_cdi	datetime NULL,
	clipping varchar(60),
	PRIMARY KEY (cd_gs_user),
	UNIQUE gs_user1 (login,pass),
	KEY gs_user2 (user_surname,user_name),
	KEY gs_user3 (task_status)
	#FOREIGN KEY (cd_gs_node)     REFERENCES gs_node(cd_gs_node)          ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_position) REFERENCES gs_position(cd_gs_position)  ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_office)   REFERENCES gs_office(cd_gs_office)      ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_language) REFERENCES gs_language(cd_gs_language)  ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_theme)    REFERENCES gs_theme(cd_gs_theme)        ON DELETE SET NULL		
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# --------------------	#toDo: CREATE TABLE gs_informe/gs_report( ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
# GESTION DE OPCIONES
# --------------------

CREATE TABLE gs_tree (
	cd_gs_tree smallint(6) unsigned NOT NULL auto_increment,
	nm_gs_tree varchar(60) NOT NULL,
	cd_tree char(10),
	filename varchar(30) NOT NULL,
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
	warnings smallint(6) DEFAULT "0" NOT NULL,
	description varchar(255),
	cdi datetime,
	PRIMARY KEY (cd_gs_tree),
	UNIQUE nm_gs_tree (nm_gs_tree)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_op (
	mode char(1),
	seq int(11) DEFAULT '0',
	seq_parent int(11) DEFAULT '0',
	indent smallint(6) DEFAULT '0',
	caption varchar(255),
	tip varchar(255),
	type char(1),
	cd_gs_op smallint(6) unsigned NOT NULL,
	script_url varchar(255),
	icon varchar(255),
	status char(1),
	dt_status date,
	cd_gs_user int(10) unsigned,
	icons varchar(60),
	show_type char(1),
	dt_add date,
	alias varchar(20),
	UNIQUE (cd_gs_op),
	KEY gs_op_1 (seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# Old gs_option: id int(11) DEFAULT "0" NOT NULL,
# Old gs_option: subtree_opt varchar(255),
# Old gs_option: cd_tree varchar(10) NOT NULL,

create table gs_tree_op (
	cd_gs_tree smallint(6) unsigned NOT NULL,
	cd_gs_op smallint(6) unsigned NOT NULL,
	UNIQUE gs_tree_op (cd_gs_tree, cd_gs_op),
	KEY gs_tree_op_2 (cd_gs_op),
	FOREIGN KEY (cd_gs_tree) REFERENCES gs_tree(cd_gs_tree) ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_op)   REFERENCES gs_op(cd_gs_op)     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_op_ico (
	cd_gs_op_ico tinyint(3) unsigned NOT NULL auto_increment,
	nm_gs_op_ico varchar(45),
	activo char(1),
	global char(1),
	position tinyint(3) unsigned,
	status char(1),
	icon varchar(30),
	title varchar(80),
	add_html varchar(100),
	note varchar(255),
	mode char(1),
	show_type char(1),
	dt_status date NOT NULL,
	cd_gs_user int(10) unsigned,
	alias varchar(20),
	classname varchar(20),
	separator_group char(1),
	PRIMARY KEY (cd_gs_op_ico)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_user_tree (
	cd_gs_user int(10) unsigned NOT NULL,
	cd_gs_tree smallint(6) unsigned NOT NULL,
	mode varchar(19),
	UNIQUE gs_user_tree (cd_gs_user, cd_gs_tree),
	FOREIGN KEY (cd_gs_user) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE,
    FOREIGN KEY (cd_gs_tree) REFERENCES gs_tree(cd_gs_tree) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_user_op (
	cd_gs_user int(10) unsigned NOT NULL,
	cd_gs_tree smallint(6) unsigned NOT NULL,
	action char(1) NOT NULL,
	cd_gs_op smallint(6) unsigned NOT NULL,
	UNIQUE gs_user_op (cd_gs_user, cd_gs_tree, action, cd_gs_op),
	KEY gs_user_op_2 (cd_gs_user,cd_gs_op,action),
	KEY gs_user_op_3 (cd_gs_op,action),
	FOREIGN KEY (cd_gs_user) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_tree) REFERENCES gs_tree(cd_gs_tree) ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_op)   REFERENCES gs_op(cd_gs_op)     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_user_export (
	cd_gs_user int(10) unsigned NOT NULL,
	mode varchar(2) NULL,
	script varchar(60) NOT NULL,
	cd_gs_op smallint(6) unsigned NULL,
	tools varchar(10) NOT NULL,
	UNIQUE gs_user_export (cd_gs_user, script, mode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_tree_admin (
	cd_gs_user int(10) unsigned NOT NULL,
	cd_gs_tree smallint(6) unsigned NOT NULL,
	action char(1),
	UNIQUE gs_tree_admin (cd_gs_user,cd_gs_tree,action),
	FOREIGN KEY (cd_gs_user) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_tree) REFERENCES gs_tree(cd_gs_tree) ON DELETE CASCADE	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#---

create table gs_rol_exp (
	cd_gs_rol_exp int(10) unsigned NOT NULL auto_increment,
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
	csv_private char(1),
		
	PRIMARY KEY (cd_gs_rol_exp),
	UNIQUE nm_gs_rol (nm_gs_rol_exp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_rol_tree (
	cd_gs_rol int(10) NOT NULL,
	cd_gs_tree smallint(6) unsigned NOT NULL,
	mode varchar(19),
	UNIQUE gs_rol_tree (cd_gs_rol, cd_gs_tree)
	#FOREIGN KEY (cd_gs_rol) 		 REFERENCES gs_rol(cd_gs_rol)   				ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_tree)		 REFERENCES gs_tree(cd_gs_tree) 				ON DELETE CASCADE;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_rol_op (
	cd_gs_rol int(10) NOT NULL,
	cd_gs_tree smallint(6) unsigned NOT NULL,
	action char(1),
	cd_gs_op smallint(6) unsigned NOT NULL,
	UNIQUE gs_rol_op (cd_gs_rol, cd_gs_tree, action, cd_gs_op),
	KEY gs_rol_op_2 (cd_gs_rol,cd_gs_op,action)
	#FOREIGN KEY (cd_gs_rol) 		 REFERENCES gs_rol(cd_gs_rol)   				ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_tree)		 REFERENCES gs_tree(cd_gs_tree) 				ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_op)  		 REFERENCES gs_op(cd_gs_op)     				ON DELETE CASCADE;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_rol_permission (
	cd_gs_rol int(5) NOT NULL,
	cd_gs_tpermission smallint(6) unsigned NOT NULL,
	UNIQUE gs_rol_permission (cd_gs_rol, cd_gs_tpermission)
	#FOREIGN KEY (cd_gs_rol)		 REFERENCES gs_rol(cd_gs_rol)					ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_tpermission) REFERENCES gs_tpermission(cd_gs_tpermission)	ON DELETE CASCADE;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# --------------------

create table gs_tpermission (
	cd_gs_tpermission smallint(6) unsigned NOT NULL auto_increment,
	nm_gs_tpermission varchar(30),
	script varchar(30),
	active char(1),
	type char(1),
	note varchar(255),
	options varchar(60),
	icons varchar(30),
	dt_add date,
	UNIQUE cd_gs_tpermission_1 (cd_gs_tpermission),
	UNIQUE cd_gs_tpermission_2 (script, nm_gs_tpermission),
	KEY cd_gs_tpermission_3 (note)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_permission (
	cd_gs_user int(10) unsigned NOT NULL,
	cd_gs_tpermission smallint(6) unsigned NOT NULL,
	UNIQUE gs_permission (cd_gs_user, cd_gs_tpermission),
	FOREIGN KEY (cd_gs_user)		REFERENCES gs_user(cd_gs_user)				 ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_tpermission)	REFERENCES gs_tpermission(cd_gs_tpermission) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_permission_op (
	cd_gs_user int(10) unsigned NOT NULL,
	option_id smallint(6) unsigned NOT NULL,
	visible char(1) NOT NULL,
	UNIQUE gs_permission_op (cd_gs_user, option_id),
	FOREIGN KEY (cd_gs_user) REFERENCES gs_user(cd_gs_user)	ON DELETE CASCADE,
	FOREIGN KEY (option_id)  REFERENCES gs_op(cd_gs_op)		ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_permission_ico (
	cd_gs_user int(10) unsigned NOT NULL,
	cd_gs_tpermission smallint(6) unsigned NOT NULL,
	visible char(1),
	UNIQUE gs_permission_ico (cd_gs_user, cd_gs_tpermission),
	FOREIGN KEY (cd_gs_user)		REFERENCES gs_user(cd_gs_user)				 ON DELETE CASCADE,
	FOREIGN KEY (cd_gs_tpermission) REFERENCES gs_tpermission(cd_gs_tpermission) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#------------
# BACKGROUND
#------------

CREATE TABLE gs_bkg (
	cd_gs_bkg int(10) unsigned NOT NULL auto_increment,
	cd_gs_user int(10) unsigned,
	bkg_status char(1),
	bkg_unique char(1),
	command varchar(40),
	parameters varchar(125),
	y2s_start datetime,
	y2s_end datetime,
	total_time char(8),
	bkg_pid int(5),
	bkg_stime char(8),
	bkg_time char(8),
	y2s_note datetime,
	note varchar(125),
	txt_error varchar(250),
	PRIMARY KEY (cd_gs_bkg),
	KEY gs_bkg1 ( command, bkg_status ),
	KEY gs_bkg2 ( cd_gs_user, y2s_start ),
	KEY gs_bkg3 ( bkg_pid )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# ------------
# ESTADISTICA
# ------------

CREATE TABLE gs_navegador (
	cd_gs_navegador mediumint(10) unsigned NOT NULL auto_increment,
	nm_gs_navegador varchar(50) NOT NULL,
	nombre varchar(30) NOT NULL,
	resolucion varchar(12) NOT NULL,
	varios varchar(7) NOT NULL,
	PRIMARY KEY (cd_gs_navegador),
	UNIQUE cd_gs_navegador (cd_gs_navegador),
	KEY gs_navegador2 (nm_gs_navegador, nombre, resolucion, varios)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE gs_conexion (
	conexion int(10) unsigned NOT NULL auto_increment,
	id varchar(40) NOT NULL,
	exe char(1),
	cd_server tinyint unsigned,
	cd_gs_tree smallint(6) unsigned DEFAULT '0' NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	cdi datetime,
	cd_gs_navegador mediumint(10) unsigned DEFAULT '0' NOT NULL,
	ip varchar(15) NOT NULL,
	cd_gs_node smallint(5) unsigned DEFAULT '0' NOT NULL,
	sg_carga smallint(6) DEFAULT '0' NOT NULL,
	cdi_fin datetime,
	zip char(1) NOT NULL,
	cd_gs_pc smallint(6),
	access smallint(5) unsigned,
	PRIMARY KEY (conexion),
	KEY conexion_1 (cdi,cd_gs_user),
	KEY conexion_2 (id)
	#FOREIGN KEY (cd_gs_tree)		REFERENCES gs_tree(cd_gs_tree)				ON DELETE SET NULL
	#FOREIGN KEY (cd_gs_user)		REFERENCES gs_user(cd_gs_user)				ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_navegador)	REFERENCES gs_navegador(cd_gs_navegador)	ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_node)		REFERENCES gs_node(cd_gs_node)				ON DELETE SET NULL	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_acceso (
	num_acceso int(4) NOT NULL auto_increment,
	cd_gs_toperacion char(3) NOT NULL,
	conexion int(10) unsigned DEFAULT '0' NOT NULL,
	objeto char(1),
	modo char(2),
	edf varchar(40),
	tabla varchar(20),
	parametros varchar(255),
	cdi datetime,
	pagina varchar(80) NOT NULL,
	parametro varchar(255),
	registros int(10) unsigned DEFAULT '0' NOT NULL,
	uso_cpu int(10) unsigned DEFAULT '0',
	byts int(10) unsigned DEFAULT '0',
	cd_gs_node smallint(5) unsigned DEFAULT '0' NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	PRIMARY KEY (num_acceso),
	UNIQUE gs_acceso_1 (num_acceso),
	KEY gs_acceso_2 (parametro),
	KEY gs_acceso_3 ( cdi ),
	KEY gs_acceso_4 ( cd_gs_user,cdi )
	#FOREIGN KEY (conexion)			REFERENCES gs_conexion(conexion)			ON DELETE CASCADE,
	#FOREIGN KEY (cd_gs_toperacion)	REFERENCES gs_toperacion(cd_gs_toperacion)	ON DELETE SET NULL,
	#FOREIGN KEY (cd_gs_node)		REFERENCES gs_node(cd_gs_node)				ON DELETE SET NULL
	#FOREIGN KEY (cd_gs_user)		REFERENCES gs_user(cd_gs_user)				ON DELETE SET NULL	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_toperacion (
	cd_gs_toperacion char(3) NOT NULL,
	nm_gs_toperacion varchar(40) NOT NULL,
	orden smallint(5) unsigned DEFAULT '0' NOT NULL,
	grupo varchar(10),
	activa char(1) NOT NULL,
	PRIMARY KEY (cd_gs_toperacion),
	UNIQUE cd_gs_toperacion_1 (cd_gs_toperacion),
	KEY cd_gs_toperacion_2 (cd_gs_toperacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


create table gs_context (
	cd_gs_conexion int(10) unsigned NOT NULL,
	context int(10) unsigned NOT NULL,
	type varchar(5) NOT NULL,
	script varchar(160) NOT NULL,
	data varchar(255) NULL,
	KEY gs_context (cd_gs_conexion, context, type, script)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# ------------------------

CREATE TABLE gs_error (
	codigo int(5) unsigned NOT NULL auto_increment,
	cdi datetime,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	tipo char(1) NOT NULL,
	desde varchar(60) NOT NULL,
	fichero varchar(80),
	linea int(5) DEFAULT '0',
	img char(1),
	pendiente char(1) null,
	texto varchar(80) NOT NULL,
	trace text NOT NULL,
	PRIMARY KEY (codigo),
	UNIQUE gs_error_1 (codigo),
	KEY gs_error_2 (codigo),
	KEY gs_error_3 (cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_log (
	cdi datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	operacion char(1) NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	tabla varchar(15) NOT NULL,
	clave varchar(20) NOT NULL,
	sqlexe varchar(1024) NOT NULL,
	KEY gs_log_1 (clave),
	KEY gs_log_2 (cdi,tabla)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_log_tmp (
	pk_user int(11) NOT NULL,
	cdi varchar(19) NOT NULL,
	operacion char(1) NOT NULL,
	cd_gs_user int(10) unsigned NOT NULL,
	tabla varchar(15) NOT NULL,
	campo varchar(30) NOT NULL,
	valor varchar(1024),
	borrar char(1),
	KEY (pk_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_log_doc (
	cd_gs_log_doc int(10) unsigned NOT NULL auto_increment,
	dbtable varchar(30) NOT NULL,
	nm_field varchar(30) NOT NULL,
	pk int(6) unsigned NOT NULL,
	nm_file varchar(120) NOT NULL,
	type_doc varchar(4) NOT NULL,
	doc_size int(6) unsigned NOT NULL,
	cdi_insert datetime NOT NULL,
	cd_gs_user int(10) unsigned NOT NULL,
	cdi_log datetime NOT NULL,
	user_log int(6) unsigned NOT NULL,
	PRIMARY KEY (cd_gs_log_doc),
	KEY gs_log_doc (pk, cdi_insert)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_log_file (
	cd_gs_log_file int(5) NOT NULL auto_increment,
	cdi datetime NOT NULL,
	type_file varchar(4) NOT NULL,
	script varchar(100) NOT NULL,
	records int(5) unsigned DEFAULT '0' NOT NULL,
	cd_gs_node smallint(5) unsigned DEFAULT '0' NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	PRIMARY KEY (cd_gs_log_file),
	KEY gs_log_file_1 (cd_gs_user, cdi),
	KEY gs_log_file_2 (cdi, cd_gs_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_log_email (  
	pk int(11) NOT NULL auto_increment,
	cd_gs_user int(10) unsigned,
	psource varchar(40),
	mail_to varchar(95),
   	mail_from  varchar(95),
	mail_cc  varchar(95),
	mail_cco  varchar(95),
	mail_subject  varchar(95),
	mail_message text,
	files TINYINT(5) unsigned,
	files_name varchar(256),
	send_receive char(1),
	cdi datetime,
	PRIMARY KEY (pk),
	KEY gs_log_email1 (cd_gs_user, cdi),
	KEY gs_log_email2 (cdi),
	KEY gs_log_email3 (mail_from),
	KEY gs_log_email4 (psource,mail_to,cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
create table gs_robinson (  
	email varchar(95),
	note varchar(95),
	cd_gs_user int(10) unsigned,
	cdi datetime,
	UNIQUE gs_robinson (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


create table gs_spider (
	cd_gs_spider smallint(10) unsigned NOT NULL auto_increment,
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
	version_edes varchar(10),
	PRIMARY KEY (cd_gs_spider),
	UNIQUE gs_spider (cdi_insert)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# -------------
# EXTRACCIONES
# -------------

CREATE TABLE gs_entidad (
	cd_gs_entidad smallint(3) NOT NULL auto_increment,
	nm_gs_entidad char(30) NOT NULL,
	tabla char(20) DEFAULT '0' NOT NULL,
	PRIMARY KEY (cd_gs_entidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_grupo (
	cd_gs_entidad tinyint(3) DEFAULT '0' NOT NULL,
	cd_gs_grupo int(10) unsigned NOT NULL auto_increment,
	nm_gs_grupo char(30),
	nota char(45),
	orden smallint(6),
	PRIMARY KEY (cd_gs_grupo),
	UNIQUE gs_grupo1 (cd_gs_grupo),
	KEY gs_grupo2 (cd_gs_grupo, nm_gs_grupo, cd_gs_entidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_campo (
	cd_gs_campo int(10) unsigned NOT NULL auto_increment,
	tabla varchar(20) NOT NULL,
	campo varchar(80) NOT NULL,
	tipo varchar(255),
	tipo_log varchar(60),
	ancho tinyint(4) DEFAULT '0' NOT NULL,
	decimales tinyint(4) DEFAULT '0',
	unescape char(1),
	cd_gs_entidad smallint(3) DEFAULT '0' NOT NULL,
	cd_gs_grupo smallint(6) DEFAULT '0' NOT NULL,
	orden smallint(6) DEFAULT '0',
	etiqueta varchar(30) NOT NULL,
	label_tab varchar(30),
	nivel smallint(6) DEFAULT '0',
	virtual_field char(1),
	add_campos varchar(30),
	log_history char(1),
	log_no_system char(1),
	log_only char(1),
	alineacion char(1),
	relacion varchar(255),
	descripcion varchar(255),
	informe char(1),
	extraccion char(1),
	tipo_dato char(1),
	campo_ref varchar(20),
	label_inf varchar(30),
	PRIMARY KEY (cd_gs_campo),
	UNIQUE gs_campo_1 (cd_gs_campo),
	KEY gs_campo_2 (cd_gs_entidad,cd_gs_grupo,orden,etiqueta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE gs_formato (
	cd_gs_formato int(5) unsigned NOT NULL auto_increment,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	cd_gs_entidad tinyint(3) DEFAULT '0' NOT NULL,
	grupo varchar(20) NULL,
	nm_gs_formato varchar(60) NOT NULL,
	orientacion char(1),
	tipo_letra varchar(50),
	ancho_letra smallint(5) unsigned DEFAULT '0' NOT NULL,
	titulo_list varchar(255) NULL,
	descripcion varchar(255) NULL,
	formato varchar(500) NOT NULL,
	cabecera varchar(255) NULL,
	operacion varchar(255) NULL,
	ordenacion varchar(36) NOT NULL,
	destino char(1),
	cd_gs_share smallint(5) null,
	cd_gs_user2 smallint(5) null,
	cd_gs_node smallint(5) unsigned null,
	cd_gs_position smallint(5) unsigned null,
	cd_gs_tree smallint(6) unsigned null,
	cd_scope smallint(1) null,
	informe char(1),
	PRIMARY KEY (cd_gs_formato),
	KEY cd_formato_2 (cd_gs_user,cd_gs_entidad,grupo,nm_gs_formato)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_exp_file (
	cd_gs_exp_file INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	estado char(1) NOT NULL,
	tipo char(1) NOT NULL,
	formato tinyint(3) unsigned DEFAULT '0' NOT NULL,
	cd_gs_formato int(5),
	comprimido smallint(5) unsigned DEFAULT '0' NOT NULL,
	cdi datetime,
	download datetime,
	fichero varchar(20) NOT NULL,
	descargado smallint(6) DEFAULT '0' NOT NULL,
	t_reg int(10) unsigned DEFAULT '0' NOT NULL,
	sg int(11) DEFAULT '0' NOT NULL,
	descripcion varchar(60) NOT NULL,
	sql_1 varchar(255) NOT NULL,
	sql_2 varchar(255) NOT NULL,
	sql_3 varchar(255) NOT NULL,
	PRIMARY KEY (cd_gs_exp_file),
	UNIQUE gs_exp_file_1 ( cd_gs_exp_file ),
	KEY gs_exp_file_2 (cd_gs_user,cdi,descargado),
	KEY gs_exp_file_3 (cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE gs_dct (
	dct_serial int(10) unsigned NOT NULL,
	dct_field varchar(15) NOT NULL,
	dct_work varchar(30) NOT NULL,
	KEY gs_dct (dct_field, dct_work)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# --------------
# MANTENIMIENTO
# --------------

CREATE TABLE gs_activity (
	cd_gs_user int(10) unsigned,
	cdi datetime,
	script varchar(100),
	cdi_ftp datetime,
	edes char(1),
	byts int(5),
	email varchar(65),
	key gs_activity_1 ( cd_gs_user, cdi ),
	key gs_activity_2 ( cd_gs_user, cdi_ftp ),
	key gs_activity_3 ( cdi ),
	key gs_activity_4 ( cdi_ftp )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_pack (
  cd_gs_pack int(10) unsigned NOT NULL AUTO_INCREMENT,
  cdi datetime NOT NULL,
  cd_gs_activity int(6) DEFAULT NULL,
  cd_type char(1) NOT NULL,
  options varchar(60) DEFAULT '0',
  description text NOT NULL,
  cd_gs_user int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (cd_gs_pack),
  KEY gs_pack1 (cdi),
  KEY gs_pack2 (options,cdi) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_desarrollo (
	codigo int(10) unsigned NOT NULL auto_increment,
	cd_tipo char(1) NOT NULL,
	cd_prioridad int(10) unsigned DEFAULT '0' NOT NULL,
	dt_tope date NOT NULL DEFAULT '0000-00-00',
	resumen varchar(50),
	descripcion varchar(1000),
	respuesta varchar(255),
	cdi_solicitud datetime NOT NULL,
	cdi_terminado datetime,
	usu_solicitud int(10) unsigned DEFAULT '0' NOT NULL,
	usu_terminado int(10) unsigned DEFAULT '0' NOT NULL,
	cd_estado char(1) NOT NULL,
	fichero varchar(65),
	menu1 smallint(5),
	menu2 smallint(5),
	menu3 smallint(5),
	menu4 smallint(5),
	menu5 smallint(5),
	PRIMARY KEY (codigo),
	UNIQUE gs_desarrollo_1 (codigo),
	KEY gs_desarrollo_2 (codigo, cd_prioridad, cdi_solicitud)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE gs_novedad (
	codigo int(11) NOT NULL auto_increment,
	cd_tnovedades int(11) DEFAULT '0',
	titulo varchar(90),
	dt_alta date DEFAULT '0000-00-00',
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	resumen MediumText,
	options varchar(60),
	cdi datetime,
	PRIMARY KEY (codigo),
	KEY cdi (cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE gs_list_store (
	cd_gs_list_store int(11) NOT NULL auto_increment,
	nm_gs_list_store varchar(150) not null,
	ls_definition text not null,
	dct_sql varchar(250) null,
	cd_gs_user int(10) unsigned,
	cdi_insert datetime,
	cdi_update datetime,
	time varchar(5),
	PRIMARY KEY (cd_gs_list_store),
	KEY gs_list_store (nm_gs_list_store)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# -------
# VARIOS
# -------


create table gs_mailfrom (
	cd_mailfrom int(10) unsigned NOT NULL auto_increment,
	cd_gs_user int(10) unsigned NOT NULL,
	mailfrom varchar(80) NOT NULL,
	PRIMARY KEY (cd_mailfrom),
	KEY Index_2 (cd_gs_user, mailfrom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_backup (
	cdi timestamp DEFAULT CURRENT_TIMESTAMP,
	nm_file varchar(35) NOT NULL,
	bytes_size int(11) NOT NULL,
	target varchar(50) NOT NULL,
	type varchar(100) NOT NULL,
	info varchar(255) NOT NULL,
	KEY gs_backup1 (cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_color (
	orden int(11),
	cd_gs_color char(7),
	nm_gs_color varchar(25),
	luminosidad decimal(7,3),
	luma decimal(7,3),
	UNIQUE gs_color1 (cd_gs_color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_last (
	cd_gs_user int(10) unsigned NOT NULL,
	cdi datetime NOT NULL,
	action varchar(1) NOT NULL,
	ac_return varchar(3) NOT NULL,
	script varchar(60) NOT NULL,
	db_field varchar(20) NOT NULL,
	db_value varchar(15) NOT NULL,
	KEY gs_last_1 (cd_gs_user, cdi),
	KEY gs_last_2 (cd_gs_user, script, db_value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_download (
	cd_download int(11) NOT NULL auto_increment,
	nm_download varchar(100) NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	cdi datetime NOT NULL,
	type_file varchar(4) NOT NULL,
	status char(1),
	total_sleep int(10) unsigned DEFAULT '0' NOT NULL,
	total_seconds int(10) unsigned DEFAULT '0' NOT NULL,
	total_download tinyint(3) unsigned DEFAULT '0' NOT NULL,
	records int(10) unsigned DEFAULT '0' NOT NULL,
	PRIMARY KEY (cd_download),
	KEY gs_download_1 (cd_gs_user, cdi),
	KEY gs_download_2 (cdi, cd_gs_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#------------
# TAPI AVAYA
#------------

CREATE TABLE gs_logtapi (
	cd_gs_logtapi int(10) unsigned NOT NULL auto_increment,
	ds_log datetime not null,
	cd_gs_user int(10) unsigned not null,
	userext integer(5) not null,
	event char(1) not null,
	remoteext integer(9),
	line char(1),
	PRIMARY KEY (cd_gs_logtapi),
	KEY gs_logtapi1  (ds_log),
	KEY gs_logtapi2 (cd_gs_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#----------
# Progress
#----------

create table gs_progress (
	script varchar(30) NOT NULL,
	md5 varchar(32),
	seconds SMALLINT(5) NOT NULL,
	key gs_progress1 (script,md5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#---------
# ALERTAS
#---------

create table gs_event (
	cd_gs_event int(10) unsigned NOT NULL auto_increment,
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
	cd_gs_event_type smallint(5) unsigned,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	nt_note tinytext,
	old_delete_ev char(1) NOT NULL,
	PRIMARY KEY (cd_gs_event),
	KEY gs_event_1 (cd_gs_user, dt_date_ev, hour_ev),
	KEY gs_event_2 (status_ev, cd_gs_user, dt_date_ev, hour_ev),
	KEY gs_event_3 (cd_gs_user, nm_gs_event)
	#FOREIGN KEY (cd_gs_event_type)	REFERENCES gs_event_type(cd_gs_event_type)	ON DELETE SET NULL
	#FOREIGN KEY (cd_gs_user)		REFERENCES gs_user(cd_gs_user)				ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_event_user (
	cd_gs_event_user int(5) unsigned NOT NULL auto_increment,
	cd_gs_event int(5) DEFAULT '0' NOT NULL,
	cd_gs_user int(10) unsigned DEFAULT '0' NOT NULL,
	dt_new_date_ev date NOT NULL DEFAULT '0000-00-00',
	new_hour_ev char(5),
	status_ev char(1) NOT NULL,
	PRIMARY KEY (cd_gs_event_user),
	KEY gs_event_user_1 (cd_gs_user, dt_new_date_ev, new_hour_ev)
	#FOREIGN KEY (cd_gs_event) REFERENCES gs_event(cd_gs_event)	ON DELETE CASCADE
	#FOREIGN KEY (cd_gs_user)  REFERENCES gs_user(cd_gs_user)	ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_event_type (
	cd_gs_event_type smallint(5) unsigned NOT NULL auto_increment,
	nm_gs_event_type varchar(15) NOT NULL,
	PRIMARY KEY (cd_gs_event_type),
	UNIQUE gs_event_type_1 (nm_gs_event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
	text_fr varchar(2000),
	UNIQUE gs_storage_1 (type_storage,key_storage),
	KEY gs_storage_2 (cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_icon (
	cd_gs_icon int(6) NOT NULL,
	nm_gs_icon varchar(60) NOT NULL,
	hexa varchar(6),
	description varchar(255),
	cdi datetime,
	contexto varchar(15),
	sin_uso char(1),
	verificado char(1),
	tipo char(1),
	origen varchar(25),
	UNIQUE gs_icon (cd_gs_icon)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_help_file (
	cd_gs_help_file int(5) unsigned NOT NULL auto_increment,
	nm_gs_help_file varchar(80) NOT NULL,
	nm_file varchar(80) NOT NULL,
	options varchar(100) NULL,
	PRIMARY KEY (cd_gs_help_file),
	UNIQUE gs_help_file (nm_gs_help_file)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#------
# CHAT 
#------

CREATE TABLE gs_chat (
	cd_gs_chat int(5) unsigned NOT NULL auto_increment,
	action char(1) NOT NULL,
	user_from int(5) NOT NULL,
	user_to int(5),
	message varchar(80),
	room varchar(30),
	y2s datetime NOT NULL,
	PRIMARY KEY (cd_gs_chat),
	KEY gs_chat1 (user_to,y2s),
	KEY gs_chat2 (room,y2s)
	#FOREIGN KEY (user_from) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE;
	#FOREIGN KEY (user_to)	 REFERENCES gs_user(cd_gs_user) ON DELETE SET NULL;	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_chat_log (
	cd_gs_chat int(5) unsigned NOT NULL,
	user_owner int(5) NOT NULL,
	action char(1) NOT NULL,
	user_from int(5) NOT NULL,
	user_to int(5),
	message varchar(80),
	room varchar(30),
	y2s datetime NOT NULL,
	KEY gs_chat_log (user_owner, y2s)
	#FOREIGN KEY (user_owner) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE;
	#FOREIGN KEY (user_from)  REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE;
	#FOREIGN KEY (user_to)	  REFERENCES gs_user(cd_gs_user) ON DELETE SET NULL;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_chat_lost (
	cd_gs_chat int(5) unsigned NOT NULL,
	action char(1) NOT NULL,
	user_from int(5) NOT NULL,
	user_to int(5),
	message varchar(80),
	room varchar(30),
	y2s datetime NOT NULL,
	KEY gs_chat_log (user_to, y2s)
	#FOREIGN KEY (user_from) REFERENCES gs_user(cd_gs_user) ON DELETE CASCADE;
	#FOREIGN KEY (user_to)	 REFERENCES gs_user(cd_gs_user) ON DELETE SET NULL;	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


#-----------
# RESERVADO
#-----------


CREATE TABLE gs_df (
	nombre varchar(25) NOT NULL,
	codigo text NOT NULL,
	PRIMARY KEY (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_store (
	cd_gs_store int(4) NOT NULL auto_increment,
	nm_gs_store char(80) NOT NULL,
	fichero char(60) NOT NULL,
	tamayo int(10) unsigned DEFAULT NULL,
	extension varchar(4) DEFAULT NULL,
	fecha date DEFAULT NULL,
	hora varchar(8) DEFAULT NULL,
	cdi datetime DEFAULT CURRENT_TIMESTAMP,
	caption varchar(60) DEFAULT NULL,
	cd_gs_user int(10) unsigned DEFAULT NULL,
	PRIMARY KEY (cd_gs_store),
	KEY nm_gs_store (nm_gs_store)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gs_ayuda (
	codigo int(11) NOT NULL auto_increment,
	nombre varchar(15) NOT NULL,
	sintaxis varchar(60) NOT NULL,
	grupo char(2) NOT NULL,
	dt_creado date NOT NULL DEFAULT '0000-00-00',
	dt_modificado date NOT NULL DEFAULT '0000-00-00',
	resumen varchar(60) NOT NULL,
	descripcion text NOT NULL,
	PRIMARY KEY (codigo),
	UNIQUE nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#------------
# TRADUCCION 
#------------

create table gs_script (
	cd_gs_script int(10) unsigned NOT NULL auto_increment,
	cd_gs_script_parent int(10) unsigned NOT NULL,
	nm_gs_script varchar(100) NOT NULL,
	extension varchar(10) NOT NULL,
	filepath varchar(255) NOT NULL,
	short_desc varchar(255) NOT NULL,
	long_desc text NOT NULL,
	type varchar(1) NOT NULL,
	PRIMARY KEY (cd_gs_script),
	UNIQUE filepath_UNIQUE (filepath),
	UNIQUE by_parent (cd_gs_script_parent, cd_gs_script),
	KEY nm_gs_script (nm_gs_script)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_transchange (
	cd_gs_transchange int(10) unsigned NOT NULL auto_increment,
	cd_gs_script int(11) NOT NULL,
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
	gs_transchangecol varchar(45) NOT NULL,
	PRIMARY KEY (cd_gs_transchange),
	UNIQUE gs_transchange (cd_gs_script, cd_gs_language, word_id)
	#FOREIGN KEY (cd_gs_script)	 REFERENCES gs_script(cd_gs_script)		ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_language) REFERENCES gs_language(cd_gs_language)	ON DELETE CASCADE;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_op_lng (
	cd_gs_op smallint(6) unsigned NOT NULL,
	cd_gs_language varchar(2) NOT NULL,
	caption_tip char(1) NOT NULL,
	caption varchar(255) NOT NULL,
	md5 char(32) NOT NULL,
	tf_changed varchar(1) NOT NULL,
	PRIMARY KEY ( cd_gs_op, caption_tip, cd_gs_language ),
	KEY gs_op_lng ( md5, caption_tip, cd_gs_language )
	#FOREIGN KEY (cd_gs_op)		 REFERENCES gs_op(cd_gs_op)				ON DELETE CASCADE;
	#FOREIGN KEY (cd_gs_language) REFERENCES gs_language(cd_gs_language) ON DELETE CASCADE;	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_serial (
	cd_gs_conexion int(10) unsigned not null,
	pk int(10) unsigned not null,
	UNIQUE gs_serial(cd_gs_conexion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_chart (
  cd_gs_chart int(10) unsigned NOT NULL AUTO_INCREMENT,
  cd_gs_user int(10) unsigned NOT NULL,
  script varchar(60) NOT NULL,
  dt_update date NOT NULL,
  total smallint(5) unsigned NOT NULL,
  definition text,
  PRIMARY KEY (cd_gs_chart),
  KEY gs_chart (script,cd_gs_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#-----------
# LOCALHOST 
#-----------

create table gs_version (
	pk int(5) unsigned NOT NULL auto_increment,
	nombre varchar(40) NOT NULL,
	tipo char(1) NOT NULL,
	url varchar(65),
	pk_server varchar(62),
	version datetime,
	multitenancy varchar(20),
	pk_ddbb varchar(32),
	estado char(1),
	PRIMARY KEY (pk),
	UNIQUE gs_version (nombre, tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create table gs_changelog (
	pk int(5) unsigned NOT NULL auto_increment,
	version datetime not null,
	cdi datetime not null,
	tipo char(1) NOT NULL,
	accion char(1),
	lugar char(1),
	contenido text,
	fichero varchar(80),
	referencia varchar(80),
	PRIMARY KEY (pk),
	KEY gs_changelog (version, cdi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

