var dynamicLibrary = undefined;
var logged=false;

function init(){
    script.log('Voicemeeter script Init');
	VMAPI_init();
}

function VMAPI_init() {
	path=local.parameters.voicemeeterAPIDLLPath.get();
	script.log("Voicemeeter API DLL path : " + path );
	dynamicLibrary=util.loadDynamicLibrary(path);

	if (!dynamicLibrary ) {		
		script.log("Voicemeeter DLL Loading error ");		
	}
	return dynamicLibrary;
}

function VMAPI_login() {
	script.log("Starting Voicemeeter API login");
	login = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_Login");
	/*var result=login();
	/*if (result<0) {
		script.log("Voicemeeter API login failed");
	} else {
		script.log("Voicemeeter API login successful");
		local.parameters.loggedIn.set(true);
	}
	return result;*/
	local.parameters.loggedIn.set(true);
	login();
	
	//script.log(li.value);
}

function VMAPI_logout() {
	script.log("Starting Voicemeeter API logout");
	logout = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_Logout");	
	local.parameters.loggedIn.set(false);
	logout();
	/*if (lo == 1) {
		script.log("Voicemeeter API logout done");
		local.parameters.loggedIn.set(false);
	}*/
}

function VMAPI_runVM(arg) {
	script.log("Starting Voicemeeter Application");
	runVM = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_RunVoicemeeter");	
	/*return */runVM(arg);
}

function VMAPI_setParamValue(paramName,value) {
	script.log("Sending param value to Voicemeeter API");
	setParam=util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_SetParameterFloat");
	
	/*return */setParam(paramName,value);
}

function VMAPI_getParamValue(dynamicLibrary,paramName) {
	script.log("Getting param value from Voicemeeter API");
	getParam = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_GetParameterFloat");
	var value=undefined;
	getParam(paramName,value );
	return value;
}

function VMAPI_isParamsDirty() {
	getParam = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_IsParametersDirty");
	getParam();
}

function moduleParameterChanged(param)
{
	//script.log('moduleParameterChanged');	
	if (param.name == "voicemeeterAPIDLLPath") {
		VMAPI_init();
	}
	else if (param.name == "login") {
		//setTimeout(VMAPI_login(),100000);
		VMAPI_login();	
	}
	else if (param.name == "logout") {
		VMAPI_logout();	
	}
	else if (param.name == "runVoiceMeeter") {
		VMAPI_runVM(2);	
	} 
	else if (param.name == "debug") {
		VMAPI_setParamValue("Strip[0].Gain",0.0);
	}
}

function moduleValueChanged(value){

    if (value.isParameter()){
        
    }
}

