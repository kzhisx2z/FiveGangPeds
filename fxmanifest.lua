fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'FiveGangPeds'
author 'FiveGang'
version '1.0.0'
license 'MIT'
repository 'https://github.com/overextended/oxmysql.git'
description 'FXServer to MySQL communication via node-mysql2'

dependencies {
    '/server:7290',
}

client_script 'ui.lua'
server_script 'dist/build.js'

files {
	'web/build/index.html',
	'web/build/**/*'
}

ui_page 'web/build/index.html'

provide 'mysql-async'
provide 'ghmattimysql'

convar_category 'OxMySQL' {
	'Configuration',
	{
		{ 'Connection string', 'mysql_connection_string', 'CV_STRING', 'mysql://user:password@localhost/database' },
		{ 'Debug', 'mysql_debug', 'CV_BOOL', 'false' }
	}
}
