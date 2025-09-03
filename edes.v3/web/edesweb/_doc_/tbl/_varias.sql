# --------------
# TERRITORIALES
# --------------

CREATE TABLE pais (
   cd_pais char(3) NOT NULL,
   nm_pais char(25),
   PRIMARY KEY (cd_pais),
   KEY nom (nm_pais)
);

CREATE TABLE auto (
   cd_auto char(2) NOT NULL,
   nm_auto char(20),
   PRIMARY KEY (cd_auto),
   KEY nom (nm_auto)
);

CREATE TABLE prov (
   cd_auto char(2) NOT NULL,
   cd_prov char(2) NOT NULL,
   nm_prov char(15),
   PRIMARY KEY (cd_auto,cd_prov),
   KEY nom (nm_prov)
);

CREATE TABLE muni (
   cd_prov char(2) NOT NULL,
   cd_muni char(3) NOT NULL,
   nm_muni char(30),
   PRIMARY KEY (cd_prov,cd_muni),
   KEY nom (nm_muni)
);

CREATE TABLE distrito (
   cd_prov char(2) NOT NULL,
   cd_muni char(3) NOT NULL,
   cd_distrito char(3),
   nm_distrito char(30),
   KEY cd_distrito (cd_prov,cd_muni,cd_distrito),
   KEY cd_muni (cd_muni)
);

CREATE TABLE barrio (
   cd_prov char(2) NOT NULL,
   cd_muni char(3) NOT NULL,
   cd_distrito char(3),
   cd_barrio char(3),
   nm_barrio char(30),
   KEY cd_distrito (cd_prov,cd_muni,cd_distrito,cd_barrio),
   KEY cd_barrio (cd_barrio),
   KEY nm_barrio (nm_barrio)
);

CREATE TABLE postal (
   cd_prov char(2),
   cd_muni char(3),
   cd_postal char(5),
   numero int(4),
   nm_loca char(40),
   KEY numero (numero),
   KEY cd_postal (cd_postal),
   KEY nm_loca (nm_loca)
);

# -------
# VARIAS
# -------

CREATE TABLE banco (
   cd_banco char(4) NOT NULL,
   nm_banco char(36) NOT NULL,
   PRIMARY KEY (cd_banco)
);

CREATE TABLE sucursal (
   cd_banco char(4) NOT NULL,
   cd_suc char(4) NOT NULL,
   domicilio char(36),
   cd_post char(5),
   nm_loca char(36),
   PRIMARY KEY (cd_banco, cd_suc)
);
