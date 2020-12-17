#Rest API

Name										                        get	    post    delete  put
/module										                        x	    x		o       o
/user										                        x		o       o       o	
/user/all											            	o       o       x	    o
/user/token/{editToken}							                    0       x		o       o
/user/{userid}										                o       x		x	    o
/user/{userid}/module						                        x       o       o       o			
/user/{userid}/module/{modulId}/token							    0       x		x		o
/user/{userid}/module/{moduleId}						            x       o       o       o					    x
/user/{userid}/module/{moduleId}/devices/{deviceId}/functions       x	    o       o       o 
/user/{userid}/module/{moduleId}/devices/{deviceId}/functions/{function} x	o       o       o		

#Enviroment Variablen
ServiceUser
ServicePassword
DatasourceUrl
DatasourceUsername
DatasourcePassword
DatasourceDriver
hibernatedll
maxDbConLifetime