210610: alter table gs_storage modify text_es varchar(9000)
210610: alter table gs_conexion DROP COLUMN sesion
220822: alter table gs_user add pass_error int(5)
220822: alter table gs_user add pass_error_cdi datetime NULL
220822: alter table gs_conexion modify id varchar(65) not null
220822: create table gs_serial( cd_gs_conexion int(10) unsigned not null, pk int(10) unsigned not null, UNIQUE gs_serial(cd_gs_conexion) ) ENGINE=InnoDB DEFAULT CHARSET=latin1
220822: DROP TABLE IF EXISTS gs_context
220822: create table gs_context ( cd_gs_conexion int(10) unsigned NOT NULL, context int(10) unsigned NOT NULL, type varchar(5) NOT NULL, script varchar(160) NOT NULL, data varchar(255) NULL, KEY gs_context (cd_gs_conexion, context, type, script) )  ENGINE=InnoDB DEFAULT CHARSET=latin1
221128: alter table gs_context modify data varchar(900)
230610: create table gs_download ( cd_download int(11) NOT NULL auto_increment, nm_download varchar(100) NOT NULL, cd_gs_user smallint(5) unsigned DEFAULT '0' NOT NULL, cdi datetime NOT NULL, type_file varchar(4) NOT NULL, status char(1), total_sleep int(10) unsigned DEFAULT '0' NOT NULL, total_seconds int(10) unsigned DEFAULT '0' NOT NULL, total_download tinyint(3) unsigned DEFAULT '0' NOT NULL, records int(10) unsigned DEFAULT '0' NOT NULL, PRIMARY KEY (cd_download), KEY gs_download_1 (cd_gs_user, cdi), KEY gs_download_2 (cdi, cd_gs_user) )
240406: create table gs_user_export (cd_gs_user int(10) NOT NULL,mode varchar(2) NULL,script varchar(60) NOT NULL,cd_gs_op int(10) NULL,tools varchar(10) NOT NULL,UNIQUE gs_user_export (cd_gs_user, script, mode)) ENGINE=InnoDB DEFAULT CHARSET=latin1